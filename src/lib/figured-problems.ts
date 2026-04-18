// Slim accessor for the home-page featured carousel. Filters from the
// full problems array to get only problems with figures, so the home route
// does not have to pull in all 192 full ProblemData modules.

import { problems } from "@/lib/problems";
import type { FiguredProblemEntry } from "@/types/figured-problem";

declare const __BUILD_ID__: string;

export type { FiguredProblemEntry };

// Filter problems that have figures and convert to slim format
const FIGURED_PROBLEMS: FiguredProblemEntry[] = problems
  .filter(
    (p): p is typeof p & { figures: NonNullable<typeof p.figures> } =>
      p.figures !== undefined && p.figures.length > 0,
  )
  .map((p) => ({
    id: p.id,
    title: p.title,
    grade: p.grade,
    module: p.module,
    difficulty: p.difficulty,
    tags: p.tags,
    figures: p.figures.map((f) => ({
      svg: f.svg,
      ...(f.alt ? { alt: f.alt } : {}),
    })),
  }))
  .sort((a, b) => a.id.localeCompare(b.id));

export const figuredProblems: FiguredProblemEntry[] = FIGURED_PROBLEMS;

// FNV-1a → Mulberry32 seeded shuffle. Mirrors the helpers previously in
// @/lib/problems so the per-deploy default pick stays stable across SSR
// HTML and the client's first hydration.
function hashStringToSeed(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

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

/**
 * Deterministic per-deploy pick used as SSR/SSG initial state so the
 * prerendered HTML is stable and hydration-safe.
 */
export function getDefaultFiguredProblem(): FiguredProblemEntry | undefined {
  if (figuredProblems.length === 0) return undefined;
  const seed = hashStringToSeed(__BUILD_ID__);
  return seededShuffle(figuredProblems, seed)[0];
}

/** Pick a random figured problem, optionally excluding a given id. */
export function getRandomFiguredProblem(
  excludeId?: string,
): FiguredProblemEntry | undefined {
  const pool = excludeId
    ? figuredProblems.filter((p) => p.id !== excludeId)
    : figuredProblems;
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}
