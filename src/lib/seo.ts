import type { MetaDescriptor } from "react-router";

/**
 * Canonical origin for the production site. Used for canonical URLs, og:url,
 * sitemap entries, and absolute og:image URLs.
 */
export const SITE_URL = "https://edao.plus";
export const SITE_NAME = "一道 / edao.plus";
export const SITE_LOCALE = "zh_CN";
export const SITE_DESCRIPTION =
  "一道(edao.plus)是专注小学数学思维训练的在线平台，涵盖计算、几何、数论、应用题等模块，提供经典例题、分步讲解、方法手册与互动练习。";

/**
 * Default social preview image. Absolute URL is built in `buildMeta`.
 * Replace with a dedicated PNG/JPG when one is designed — most crawlers
 * (Twitter, WeChat) handle SVG poorly.
 */
export const DEFAULT_OG_IMAGE = "/apple-touch-icon.svg";

export type BuildMetaOptions = {
  title: string;
  description: string;
  /** Route path, e.g. "/", "/p/10001", "/k/sum-trick". Leading slash required. */
  path: string;
  type?: "website" | "article";
  /** Path or absolute URL to a social preview image. */
  image?: string;
  /** Optional schema.org JSON-LD object(s) to inject into <head>. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Optional keyword list; rendered as `<meta name="keywords">`. */
  keywords?: string[];
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build the `meta()` return array for a page. Covers: title, description,
 * canonical link, Open Graph, Twitter Card, and optional JSON-LD / keywords.
 *
 * Every page's `meta()` should go through this helper so the set of SEO
 * tags stays consistent across routes.
 */
export function buildMeta(opts: BuildMetaOptions): MetaDescriptor[] {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image ?? DEFAULT_OG_IMAGE);
  const type = opts.type ?? "website";

  const descriptors: MetaDescriptor[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { tagName: "link", rel: "canonical", href: url },

    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },

    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];

  if (opts.keywords && opts.keywords.length > 0) {
    descriptors.push({ name: "keywords", content: opts.keywords.join(",") });
  }

  if (opts.jsonLd) {
    const items = Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd];
    for (const obj of items) {
      descriptors.push({ "script:ld+json": obj });
    }
  }

  return descriptors;
}
