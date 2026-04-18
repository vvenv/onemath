import type { Grade, ProblemModule } from "./problem";

/**
 * Slim per-problem record used by the layout chunk (AppBar, GlobalSearch,
 * WebMCP listing tools) and by listing/filter pages.
 *
 * Generated at predev / prebuild time by scripts/build-data-indexes.mjs
 * from src/data/problems/*.ts. The full ProblemData (solutions, scenes,
 * inlined SVG figures) is loaded lazily via @/lib/problem-loader so it
 * does not bloat shared chunks.
 */
export type ProblemIndexEntry = {
  id: string;
  title: string;
  grade: Grade;
  module: ProblemModule;
  difficulty?: string;
  tags: string[];
  hasFigure: boolean;
  /** First ~160 chars of the question stem, for global search scoring. */
  questionSnippet: string;
};
