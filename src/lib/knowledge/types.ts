import type { ComponentType } from "react";
import { METHOD_TAGS } from "@/lib/tags";

/**
 * Knowledge base for method/technique explainer pages (`/k/:slug`).
 *
 * Each entry is authored around a single canonical method tag from
 * `@/lib/tags.ts`. The `tag` field bridges problems → knowledge: any
 * problem whose `tags` include that string can link here, and we can
 * list "uses this method" problems on the explainer page.
 */

export type KnowledgeCategory = keyof typeof METHOD_TAGS;

/**
 * Figures shown alongside knowledge entries. Three rendering modes:
 *   - `svg`: raw SVG markup string (inlined via dangerouslySetInnerHTML)
 *   - `image`: external/public image URL
 *   - `component`: a React component rendered directly
 * The required key acts as the discriminant.
 */
export type KnowledgeFigure = {
  caption?: string;
  alt?: string;
} & (
  | { svg: string }
  | { image: string }
  | { component: ComponentType }
);

export type KnowledgeExample = {
  title?: string;
  problem: string;
  solution: string[];
  takeaway?: string;
};

export type KnowledgeEntry = {
  slug: string;
  name: string;
  /** canonical method tag this page explains, if any */
  tag?: string;
  category: KnowledgeCategory;
  /** one-line positioning, shown under the title */
  summary: string;
  /** concrete, visualizable scene that builds intuition */
  intuition: string;
  /** step-by-step derivation / why it works */
  derivation: string[];
  /** short formulas or invariants worth memorizing */
  keyPoints?: string[];
  /** 2–3 progressive worked examples */
  examples: KnowledgeExample[];
  /** common pitfalls / when this method does NOT apply */
  pitfalls?: string[];
  /** other knowledge slugs that pair naturally with this one */
  relatedSlugs?: string[];
  /** illustrative figures rendered alongside the intuition section */
  figures?: KnowledgeFigure[];
};
