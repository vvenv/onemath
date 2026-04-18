import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { kv } from "@vercel/kv";

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  send: (body: string | Buffer) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

const TTL_SECONDS = Number(process.env.SYNC_TTL_SECONDS) || 600;
const MAX_PAYLOAD_BYTES = 50 * 1024;
const CODE_PATTERN = /^[a-f0-9]{6}$/i;

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.setHeader("Access-Control-Expose-Headers", "Content-Type");
}

async function handlePost(req: VercelRequest, res: VercelResponse) {
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "无效的 JSON" });
      return;
    }
  }
  if (!body || typeof body !== "object") {
    res.status(400).json({ error: "无效的请求体" });
    return;
  }

  const raw = JSON.stringify(body);
  if (Buffer.byteLength(raw, "utf8") > MAX_PAYLOAD_BYTES) {
    res.status(413).json({ error: "数据过大（最大 50KB）" });
    return;
  }

  const { favorites, recentProblems, theme } = body as Record<string, unknown>;
  const data = { favorites, recentProblems, theme };
  const code = crypto.randomBytes(3).toString("hex").toUpperCase();

  await kv.set(`sync:${code}`, JSON.stringify(data), { ex: TTL_SECONDS });

  res.status(200).json({ code, ttl: TTL_SECONDS });
}

async function handleGet(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const code = (url.searchParams.get("code") ?? "").trim();

  if (!CODE_PATTERN.test(code)) {
    res.status(404).json({ error: "同步码无效或已过期" });
    return;
  }

  const normalizedCode = code.toUpperCase();
  const raw = await kv.get(`sync:${normalizedCode}`);
  if (raw === null) {
    res.status(404).json({ error: "同步码无效或已过期" });
    return;
  }

  const data = typeof raw === "string" ? JSON.parse(raw) : raw;
  res.status(200).json({ data });
}

async function handleDelete(req: VercelRequest, res: VercelResponse) {
  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const code = (url.searchParams.get("code") ?? "").trim();

  if (!CODE_PATTERN.test(code)) {
    res.status(404).json({ error: "同步码无效" });
    return;
  }

  const normalizedCode = code.toUpperCase();
  await kv.del(`sync:${normalizedCode}`);
  res.status(204).end();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    if (req.method === "POST") {
      await handlePost(req, res);
    } else if (req.method === "GET") {
      await handleGet(req, res);
    } else if (req.method === "DELETE") {
      await handleDelete(req, res);
    } else {
      res.status(405).json({ error: "不允许的方法" });
    }
  } catch (err) {
    console.error("sync handler error:", err);
    res.status(500).json({ error: "服务器内部错误" });
  }
}
