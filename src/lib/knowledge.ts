import { problems } from "@/lib/problems";
import type { ProblemData } from "@/types/problem";
import { countingEntries } from "./knowledge/counting";
import { generalEntries } from "./knowledge/general";
import { geometryEntries } from "./knowledge/geometry";
import { magicSquareEntries } from "./knowledge/magic-square";
import { numberCalcEntries } from "./knowledge/number-calc";
import type { KnowledgeEntry } from "./knowledge/types";
import { wordEntries } from "./knowledge/word";

export type {
  KnowledgeCategory,
  KnowledgeEntry,
  KnowledgeExample,
} from "./knowledge/types";

const ENTRIES: KnowledgeEntry[] = [
  ...wordEntries,
  ...countingEntries,
  ...geometryEntries,
  ...generalEntries,
  ...magicSquareEntries,
  ...numberCalcEntries,
];

const BY_SLUG = new Map(ENTRIES.map((e) => [e.slug, e]));
const BY_TAG = new Map(
  ENTRIES.filter((e) => e.tag).map((e) => [e.tag as string, e]),
);

export const knowledgeEntries: KnowledgeEntry[] = ENTRIES;

export function getKnowledgeBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return BY_SLUG.get(slug);
}

export function getKnowledgeByTag(tag: string | undefined) {
  if (!tag) return undefined;
  return BY_TAG.get(tag);
}

/**
 * Resolve a knowledge entry from either an explicit slug (as declared on
 * a problem's `knowledgePoints[].slug`) or a raw method tag name.
 */
export function resolveKnowledge(
  key: { slug?: string; tag?: string; name?: string } | string,
): KnowledgeEntry | undefined {
  if (typeof key === "string") {
    return BY_SLUG.get(key) ?? BY_TAG.get(key);
  }
  return (
    getKnowledgeBySlug(key.slug) ??
    getKnowledgeByTag(key.tag ?? key.name)
  );
}

export function getProblemsForKnowledge(
  entry: KnowledgeEntry,
  limit = 8,
): ProblemData[] {
  if (!entry.tag) return [];
  return problems
    .filter((p) => p.tags.includes(entry.tag as string))
    .slice(0, limit);
}
