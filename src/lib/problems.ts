import type { ProblemData, ProblemModule } from "@/types/problem";

const modules = import.meta.glob<ProblemData>("@/data/problems/*.ts", {
  eager: true,
  import: "default",
});

export const problems: ProblemData[] = Object.values(modules).sort((a, b) =>
  a.id.localeCompare(b.id),
);

export function getProblemById(id: string | undefined) {
  return problems.find((p) => p.id === id);
}

export function getRandomProblem(opts?: {
  module?: ProblemModule;
  excludeId?: string;
}): ProblemData | undefined {
  const pool = problems.filter((p) => {
    if (opts?.module && p.module !== opts.module) return false;
    if (opts?.excludeId && p.id === opts.excludeId) return false;
    return true;
  });
  if (pool.length === 0) {
    // fallback: ignore module constraint if it left nothing
    const wider = problems.filter((p) => p.id !== opts?.excludeId);
    if (wider.length === 0) return undefined;
    return wider[Math.floor(Math.random() * wider.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRelatedProblems(
  id: string | undefined,
  limit = 6,
): ProblemData[] {
  const current = getProblemById(id);
  if (!current) return [];
  const currentTags = new Set(current.tags);
  return problems
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
