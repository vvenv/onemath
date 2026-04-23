import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";

// Vercel's Node.js launcher adds request/response helpers at runtime when
// `.vc-config.json` sets `shouldAddHelpers: true`. These types model only
// the subset of the augmented surface this handler actually uses.
type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  send: (body: string | Buffer) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

/**
 * Minimal Streamable HTTP MCP server for edao.plus.
 *
 * Speaks a stateless subset of the MCP spec over HTTP POST + JSON-RPC 2.0:
 *   - `initialize`                → serverInfo + capabilities
 *   - `notifications/initialized` → no-op ack
 *   - `ping`                      → empty result
 *   - `resources/list`            → problems + knowledge entries as resources
 *   - `resources/read`            → JSON payload for a single resource URI
 *   - `tools/list`                → the `search` tool
 *   - `tools/call`                → search execution
 *
 * No session state, no SSE stream: every POST is self-contained and returns a
 * single JSON-RPC response (or empty 202 for notifications). GET/DELETE are
 * explicitly rejected so the absence of streaming is unambiguous to clients.
 */

const PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER_NAME = "plus.edao/onemath";
const SERVER_VERSION = "0.1.0";

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: JsonRpcId;
  method: string;
  params?: unknown;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: JsonRpcId;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
};

type Problem = {
  id: string;
  title: string;
  grade: string;
  module: string;
  difficulty?: string;
  question: string;
  tags?: string[];
  knowledgePoints?: Array<{ slug: string; name: string; summary?: string }>;
  solutions?: Array<{ key: string; label: string; steps: string[] }>;
  variant?: unknown;
};

type Knowledge = {
  slug: string;
  name: string;
  tag?: string;
  category?: string;
  summary: string;
  intuition: string;
  derivation: string[];
  keyPoints?: string[];
  examples?: unknown[];
  pitfalls?: string[];
  relatedSlugs?: string[];
};

type Catalog = { problems: Problem[]; knowledge: Knowledge[] };

let cached: Catalog | null = null;
function loadCatalog(): Catalog {
  if (cached) return cached;
  const here = path.dirname(fileURLToPath(import.meta.url));
  const raw = readFileSync(path.join(here, "_catalog.json"), "utf8");
  cached = JSON.parse(raw) as Catalog;
  return cached;
}

function problemUri(id: string) {
  return `onemath://problem/${id}`;
}
function knowledgeUri(slug: string) {
  return `onemath://knowledge/${slug}`;
}

function listResources(catalog: Catalog) {
  return [
    ...catalog.problems.map((p) => ({
      uri: problemUri(p.id),
      name: `${p.id} · ${p.title}`,
      description: `[${p.grade} · ${p.module}${p.difficulty ? ` · ${p.difficulty}` : ""}] ${p.question.slice(0, 80)}`,
      mimeType: "application/json",
    })),
    ...catalog.knowledge.map((k) => ({
      uri: knowledgeUri(k.slug),
      name: `${k.name} (${k.slug})`,
      description: k.summary,
      mimeType: "application/json",
    })),
  ];
}

function readResource(catalog: Catalog, uri: string) {
  const problemMatch = uri.match(/^onemath:\/\/problem\/([^/]+)$/);
  if (problemMatch) {
    const problem = catalog.problems.find((p) => p.id === problemMatch[1]);
    if (!problem) return null;
    return {
      uri,
      mimeType: "application/json",
      text: JSON.stringify(problem, null, 2),
    };
  }
  const knowledgeMatch = uri.match(/^onemath:\/\/knowledge\/([^/]+)$/);
  if (knowledgeMatch) {
    const entry = catalog.knowledge.find((k) => k.slug === knowledgeMatch[1]);
    if (!entry) return null;
    return {
      uri,
      mimeType: "application/json",
      text: JSON.stringify(entry, null, 2),
    };
  }
  return null;
}

const searchTool = {
  name: "search",
  description:
    "Full-text search across edao.plus problems and knowledge entries. Matches against title, question, tags, and summary.",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Search string" },
      limit: {
        type: "integer",
        description: "Maximum number of results (default 10, max 50)",
        minimum: 1,
        maximum: 50,
      },
    },
    required: ["query"],
    additionalProperties: false,
  },
};

function runSearch(catalog: Catalog, query: string, limit: number) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const matches: Array<{ kind: "problem" | "knowledge"; uri: string; title: string; snippet: string; score: number }> = [];

  for (const p of catalog.problems) {
    const haystack = [
      p.id,
      p.title,
      p.question,
      p.module,
      p.grade,
      ...(p.tags ?? []),
    ]
      .join(" \n ")
      .toLowerCase();
    if (haystack.includes(needle)) {
      const score =
        (p.title.toLowerCase().includes(needle) ? 3 : 0) +
        (p.tags?.some((t) => t.toLowerCase().includes(needle)) ? 2 : 0) +
        (p.question.toLowerCase().includes(needle) ? 1 : 0);
      matches.push({
        kind: "problem",
        uri: problemUri(p.id),
        title: `${p.id} · ${p.title}`,
        snippet: p.question.slice(0, 160),
        score,
      });
    }
  }

  for (const k of catalog.knowledge) {
    const haystack = [k.name, k.slug, k.tag ?? "", k.summary, k.intuition]
      .join(" \n ")
      .toLowerCase();
    if (haystack.includes(needle)) {
      const score =
        (k.name.toLowerCase().includes(needle) ? 3 : 0) +
        (k.tag?.toLowerCase().includes(needle) ? 2 : 0) +
        (k.summary.toLowerCase().includes(needle) ? 1 : 0);
      matches.push({
        kind: "knowledge",
        uri: knowledgeUri(k.slug),
        title: k.name,
        snippet: k.summary,
        score,
      });
    }
  }

  matches.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return matches.slice(0, limit);
}

function success(id: JsonRpcId, result: unknown): JsonRpcResponse {
  return { jsonrpc: "2.0", id, result };
}

function failure(
  id: JsonRpcId,
  code: number,
  message: string,
  data?: unknown,
): JsonRpcResponse {
  return { jsonrpc: "2.0", id, error: { code, message, data } };
}

function handleRpc(msg: JsonRpcRequest): JsonRpcResponse | null {
  const id = msg.id ?? null;
  const isNotification = msg.id === undefined;

  switch (msg.method) {
    case "initialize": {
      const params = (msg.params ?? {}) as { protocolVersion?: string };
      const negotiated = SUPPORTED_PROTOCOL_VERSIONS.includes(
        params.protocolVersion ?? "",
      )
        ? (params.protocolVersion as string)
        : PROTOCOL_VERSION;
      return success(id, {
        protocolVersion: negotiated,
        capabilities: {
          resources: { listChanged: false },
          tools: { listChanged: false },
        },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        instructions:
          "Read-only access to edao.plus math problems (onemath://problem/{id}) and knowledge entries (onemath://knowledge/{slug}). Use the `search` tool to discover relevant resources.",
      });
    }

    case "notifications/initialized":
    case "notifications/cancelled":
    case "notifications/roots/list_changed":
      return null;

    case "ping":
      return success(id, {});

    case "resources/list": {
      return success(id, { resources: listResources(loadCatalog()) });
    }

    case "resources/read": {
      const params = (msg.params ?? {}) as { uri?: string };
      if (!params.uri) {
        return failure(id, -32602, "Missing required parameter: uri");
      }
      const content = readResource(loadCatalog(), params.uri);
      if (!content) {
        return failure(id, -32602, `Resource not found: ${params.uri}`);
      }
      return success(id, { contents: [content] });
    }

    case "resources/templates/list":
      return success(id, {
        resourceTemplates: [
          {
            uriTemplate: "onemath://problem/{id}",
            name: "Problem",
            description: "A single edao.plus problem by id (e.g. 10001).",
            mimeType: "application/json",
          },
          {
            uriTemplate: "onemath://knowledge/{slug}",
            name: "Knowledge entry",
            description: "A method/technique explainer by slug.",
            mimeType: "application/json",
          },
        ],
      });

    case "tools/list":
      return success(id, { tools: [searchTool] });

    case "tools/call": {
      const params = (msg.params ?? {}) as {
        name?: string;
        arguments?: { query?: string; limit?: number };
      };
      if (params.name !== "search") {
        return failure(id, -32601, `Unknown tool: ${params.name}`);
      }
      const query = params.arguments?.query;
      if (typeof query !== "string" || query.trim() === "") {
        return success(id, {
          content: [
            { type: "text", text: "Missing or empty `query` argument." },
          ],
          isError: true,
        });
      }
      const limit = Math.max(
        1,
        Math.min(50, Number(params.arguments?.limit) || 10),
      );
      const results = runSearch(loadCatalog(), query, limit);
      const text = results.length
        ? results
            .map(
              (r) =>
                `[${r.kind}] ${r.title}\n  uri: ${r.uri}\n  ${r.snippet}`,
            )
            .join("\n\n")
        : `No matches for "${query}".`;
      return success(id, {
        content: [{ type: "text", text }],
        structuredContent: { results },
      });
    }

    default:
      if (isNotification) return null;
      return failure(id, -32601, `Method not found: ${msg.method}`);
  }
}

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version, Authorization",
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Mcp-Session-Id, MCP-Protocol-Version",
  );
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  setCorsHeaders(res);
  res.setHeader("MCP-Protocol-Version", PROTOCOL_VERSION);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res
      .status(200)
      .send(
        JSON.stringify({
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
          protocolVersion: PROTOCOL_VERSION,
          transport: "streamable-http",
          hint: "POST JSON-RPC 2.0 requests to this endpoint to interact with the MCP server.",
        }),
      );
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json(failure(null, -32700, "Parse error"));
      return;
    }
  }
  if (!body) {
    res.status(400).json(failure(null, -32600, "Invalid Request"));
    return;
  }

  const isBatch = Array.isArray(body);
  if (isBatch && body.length === 0) {
    // JSON-RPC 2.0 §6: an empty batch is not a valid request.
    res.status(400).json(failure(null, -32600, "Invalid Request: empty batch"));
    return;
  }

  const messages = isBatch ? body : [body];
  const responses: JsonRpcResponse[] = [];
  for (const msg of messages) {
    if (!msg || typeof msg !== "object" || msg.jsonrpc !== "2.0") {
      responses.push(failure(null, -32600, "Invalid Request"));
      continue;
    }
    const response = handleRpc(msg as JsonRpcRequest);
    if (response) responses.push(response);
  }

  if (responses.length === 0) {
    res.status(202).end();
    return;
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).send(JSON.stringify(Array.isArray(body) ? responses : responses[0]));
}
