// Synchronous slim index of all problems. Safe to import from layout-level
// modules (AppBar, GlobalSearch, WebMCPProvider) and listing pages without
// pulling in the full ProblemData (solutions, scenes, SVG figures).

import { problems } from "@/lib/problems";
import type { ProblemIndexEntry } from "@/types/problem-index";
import type { ProblemModule } from "@/types/problem";

export type { ProblemIndexEntry };

export const problemsIndex: ProblemIndexEntry[] = problems.map((p) => ({
  id: p.id,
  title: p.title,
  grade: p.grade,
  module: p.module,
  difficulty: p.difficulty,
  tags: p.tags,
  hasFigure: p.figures !== undefined && p.figures.length > 0,
  questionSnippet: p.question.slice(0, 160),
}));

const BY_ID = new Map(problemsIndex.map((p) => [p.id, p]));

export function getProblemIndexById(
  id: string | undefined,
): ProblemIndexEntry | undefined {
  if (!id) return undefined;
  return BY_ID.get(id);
}

const BY_MODULE = new Map<ProblemModule, ProblemIndexEntry[]>();
for (const p of problemsIndex) {
  const list = BY_MODULE.get(p.module) ?? [];
  list.push(p);
  BY_MODULE.set(p.module, list);
}

export function getProblemIndexByModule(
  module: ProblemModule,
): ProblemIndexEntry[] {
  return BY_MODULE.get(module) ?? [];
}

/**
 * Pick one random problem, optionally filtered by module / excluding a
 * given id. Slim equivalent of the previous helper in @/lib/problems —
 * callers that only need an id to navigate to should use this.
 */
export function getRandomProblem(opts?: {
  module?: ProblemModule;
  excludeId?: string;
}): ProblemIndexEntry | undefined {
  const pool = problemsIndex.filter((p) => {
    if (opts?.module && p.module !== opts.module) return false;
    if (opts?.excludeId && p.id === opts.excludeId) return false;
    return true;
  });
  if (pool.length === 0) {
    const wider = problemsIndex.filter((p) => p.id !== opts?.excludeId);
    if (wider.length === 0) return undefined;
    return wider[Math.floor(Math.random() * wider.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Score-based "related problems" lookup. Tag overlap weighs most, then
 * same module, then same grade — same scoring as the previous helper in
 * @/lib/problems. Returns slim entries (id/title/grade/module/tags),
 * which is all the related-problems UI needs.
 */
export function getRelatedProblems(
  id: string | undefined,
  limit = 6,
): ProblemIndexEntry[] {
  const current = getProblemIndexById(id);
  if (!current) return [];
  const currentTags = new Set(current.tags);
  return problemsIndex
    .filter((p) => p.id !== current.id)
    .map((p) => {
      const tagOverlap = p.tags.reduce(
        (acc, t) => acc + (currentTags.has(t) ? 1 : 0),
        0,
      );
      const sameModule = p.module === current.module ? 1 : 0;
      const sameGrade = p.grade === current.grade ? 1 : 0;
      const score = tagOverlap * 3 + sameModule * 2 + sameGrade;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.id.localeCompare(b.p.id))
    .slice(0, limit)
    .map((x) => x.p);
}

/** Problems whose `tags` include the given method tag (slim, capped). */
export function getProblemsForTag(
  tag: string | undefined,
  limit = 8,
): ProblemIndexEntry[] {
  if (!tag) return [];
  return problemsIndex.filter((p) => p.tags.includes(tag)).slice(0, limit);
}
