import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Config } from "@react-router/dev/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const problemsDir = path.resolve(__dirname, "./src/data/problems");
const knowledgeDir = path.resolve(__dirname, "./src/data/knowledge");

// Problem IDs come from the filename (e.g. `10001.ts` → `10001`) so we avoid
// parsing TS source at config time.
const problemIds = readdirSync(problemsDir)
  .filter((name) => name.endsWith(".ts"))
  .map((name) => name.replace(/\.ts$/, ""))
  .sort();

// Knowledge entries are split by category under `src/data/knowledge/*.ts`.
// Every entry still carries a literal `slug: "…"` field, so we can cheaply
// collect them by regex without evaluating the modules.
const knowledgeSlugs = readdirSync(knowledgeDir)
  .filter((name) => name.endsWith(".ts") && name !== "types.ts")
  .flatMap((name) =>
    Array.from(
      readFileSync(path.join(knowledgeDir, name), "utf-8").matchAll(
        /^\s*slug:\s*"([^"]+)"/gm,
      ),
      (m) => m[1],
    ),
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
