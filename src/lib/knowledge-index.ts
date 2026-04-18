// Synchronous slim index of all knowledge entries. Safe to import from
// layout-level modules (AppBar, GlobalSearch, WebMCPProvider) and listing
// pages without pulling in the full KnowledgeEntry (examples, pitfalls).

import { knowledgeEntries } from "@/data/knowledge";
import type { KnowledgeIndexEntry } from "@/types/knowledge-index";

export type { KnowledgeIndexEntry };

export const knowledgeIndex: KnowledgeIndexEntry[] = knowledgeEntries.map(
  (e) => ({
    slug: e.slug,
    name: e.name,
    category: e.category,
    tag: e.tag,
    summary: e.summary,
  }),
);

const BY_SLUG = new Map(knowledgeIndex.map((e) => [e.slug, e]));
const BY_TAG = new Map(
  knowledgeIndex.filter((e) => e.tag).map((e) => [e.tag as string, e]),
);

export function getKnowledgeIndexBySlug(
  slug: string | undefined,
): KnowledgeIndexEntry | undefined {
  if (!slug) return undefined;
  return BY_SLUG.get(slug);
}

export function getKnowledgeIndexByTag(
  tag: string | undefined,
): KnowledgeIndexEntry | undefined {
  if (!tag) return undefined;
  return BY_TAG.get(tag);
}
