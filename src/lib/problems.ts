import type { ProblemData, ProblemModule } from "@/types/problem";

declare const __BUILD_ID__: string;

const modules = import.meta.glob<ProblemData>("@/data/problems/*.ts", {
  eager: true,
  import: "default",
});

export const problems: ProblemData[] = Object.values(modules).sort((a, b) =>
  a.id.localeCompare(b.id),
);

// FNV-1a hash → 32-bit unsigned int. Stable across JS runtimes.
function hashStringToSeed(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Mulberry32 PRNG: deterministic pseudo-random given a numeric seed.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice();
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function getProblemById(id: string | undefined) {
  return problems.find((p) => p.id === id);
}

/**
 * Pick one random problem that has at least one figure, optionally excluding
 * a given id (so the user can cycle to a different one).
 */
export function getRandomFiguredProblem(
  excludeId?: string,
): ProblemData | undefined {
  const pool = problems.filter((p) => p.figures?.length && p.id !== excludeId);
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Deterministic per-deploy pick used as SSR/SSG initial state so the
 * prerendered HTML is stable and hydration-safe. Seeded by the build id, so
 * the featured problem rotates every deploy but stays identical between the
 * SSG HTML and the client's first render.
 */
export function getDefaultFiguredProblem(): ProblemData | undefined {
  const pool = problems.filter((p) => p.figures?.length);
  if (pool.length === 0) return undefined;
  const seed = hashStringToSeed(__BUILD_ID__);
  return seededShuffle(pool, seed)[0];
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
