import type { ProblemData } from "./problem";
import type { KnowledgeEntry } from "./knowledge";

/**
 * MCP wire-format types: the JSON-serialized subset of `ProblemData` and
 * `KnowledgeEntry` that the MCP server (`api/mcp.ts`) ships to clients via
 * `_catalog.json`. These deliberately drop fields that don't survive
 * serialization (React `ComponentType`, `SceneSpec`, raw SVG figures) and
 * loosen a few enums to plain strings so the protocol stays stable when the
 * authoring whitelists evolve.
 *
 * Derived via `Pick<>` so renames in the canonical types fail loudly here.
 */

export type McpProblem = Pick<
  ProblemData,
  "id" | "title" | "grade" | "module" | "difficulty" | "question" | "tags"
> & {
  solutions?: Array<{ key: string; label: string; steps: string[] }>;
  variant?: unknown;
};

export type McpKnowledge = Pick<
  KnowledgeEntry,
  | "slug"
  | "name"
  | "tag"
  | "summary"
  | "intuition"
  | "derivation"
  | "keyPoints"
  | "pitfalls"
  | "relatedSlugs"
> & {
  category?: string;
  examples?: unknown[];
};

export type McpCatalog = {
  problems: McpProblem[];
  knowledge: McpKnowledge[];
};
