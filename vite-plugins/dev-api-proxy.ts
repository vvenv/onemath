import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import type { Plugin } from "vite";

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  send: (body: string | Buffer) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

/**
 * Dev-time API proxy plugin.
 *
 * In production (Vercel), API routes are served as serverless functions via the
 * Build Output API. During Vite dev with ssr: false, React Router doesn't serve
 * resource routes. This plugin handles /api/* requests by importing and executing
 * the API handlers directly in the middleware.
 */
export function devApiProxy(): Plugin {
  return {
    name: "onemath-dev-api-proxy",
    apply: "serve",
    async configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) {
          return next();
        }

        const url = req.url || "";
        const pathname = new URL(url, `http://${req.headers.host}`).pathname;

        // Wrap Node.js response to provide Vercel-style API
        const wrappedRes = res as unknown as VercelResponse;
        wrappedRes.status = (code: number) => {
          res.statusCode = code;
          return wrappedRes;
        };
        wrappedRes.send = (body: string | Buffer) => {
          res.end(body);
          return wrappedRes;
        };
        wrappedRes.json = (body: unknown) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
          return wrappedRes;
        };

        // Parse request body for POST/PUT requests
        const wrappedReq = req as VercelRequest;
        if (req.method === "POST" || req.method === "PUT") {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const body = Buffer.concat(chunks).toString("utf8");
          const contentType = req.headers["content-type"] || "";
          if (contentType.includes("application/json")) {
            try {
              wrappedReq.body = JSON.parse(body);
            } catch {
              wrappedReq.body = body;
            }
          } else {
            wrappedReq.body = body;
          }
        }

        try {
          // Use Vite's module loader with paths relative to project root
          const vite = server.ssrLoadModule;
          if (pathname === "/api/sync") {
            const mod = await vite("/api/sync.ts");
            const handler = mod.default;
            await handler(wrappedReq, wrappedRes);
          } else if (pathname === "/api/mcp") {
            const mod = await vite("/api/mcp.ts");
            const handler = mod.default;
            await handler(wrappedReq, wrappedRes);
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Not Found" }));
          }
        } catch (err) {
          console.error("API proxy error:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Internal Server Error" }));
          }
        }
      });
    },
  };
}
