import { problems } from "@/lib/problems";
import type { ProblemData } from "@/types/problem";
import type { KnowledgeEntry } from "@/types/knowledge";

export type {
  KnowledgeCategory,
  KnowledgeEntry,
  KnowledgeExample,
} from "@/types/knowledge";

const modules = import.meta.glob<KnowledgeEntry>("./knowledge/*.ts", {
  eager: true,
  import: "default",
});

const ENTRIES: KnowledgeEntry[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, e]) => e);

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
 * Resolve a knowledge entry from either an explicit slug or a method tag
 * (as declared on a problem's `tags`).
 */
export function resolveKnowledge(
  key: { slug?: string; tag?: string; name?: string } | string,
): KnowledgeEntry | undefined {
  if (typeof key === "string") {
    return BY_SLUG.get(key) ?? BY_TAG.get(key);
  }
  return getKnowledgeBySlug(key.slug) ?? getKnowledgeByTag(key.tag ?? key.name);
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
