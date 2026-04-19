import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Config } from "@react-router/dev/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemsDir = path.resolve(__dirname, "./src/data/problems");
const knowledgeFile = path.resolve(__dirname, "./src/lib/knowledge.ts");

const problemIds = readdirSync(problemsDir)
  .filter((name) => name.endsWith(".json"))
  .map(
    (name) =>
      (
        JSON.parse(
          readFileSync(path.join(problemsDir, name), "utf-8"),
        ) as { id: number }
      ).id,
  )
  .sort((a, b) => a - b);

const knowledgeSlugs = Array.from(
  readFileSync(knowledgeFile, "utf-8").matchAll(/^\s*slug:\s*"([^"]+)"/gm),
  (m) => m[1],
);

export default {
  appDirectory: "src",
  // Static export: no Node server at runtime; every route is prerendered to HTML.
  ssr: false,
  async prerender() {
    return [
      "/",
      ...problemIds.map((id) => `/p/${id}`),
      "/k",
      ...knowledgeSlugs.map((slug) => `/k/${slug}`),
    ];
  },
} satisfies Config;
