import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NodeHtmlMarkdown } from "node-html-markdown";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Post-prerender step: convert every `build/client/**\/index.html` into a
 * sibling `index.md` so the site can honor `Accept: text/markdown` content
 * negotiation (see `vercel.json`).
 *
 * React Router's prerender writes the HTML files near the end of the build.
 * Vite invokes multiple bundles (client + ssr), each firing their own
 * `closeBundle`. We guard with `hasRun` + an existence check so we only
 * execute once, after the HTML is on disk.
 *
 * Spec: https://isitagentready.com/.well-known/agent-skills/markdown-negotiation/SKILL.md
 */
export function markdownNegotiationPlugin(): Plugin {
  const BUILD_DIR = path.resolve(__dirname, "../build/client");
  const nhm = new NodeHtmlMarkdown({
    keepDataImages: false,
    useLinkReferenceDefinitions: false,
  });

  async function* walkIndexHtml(dir: string): AsyncGenerator<string> {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        yield* walkIndexHtml(full);
      } else if (entry.isFile() && entry.name === "index.html") {
        yield full;
      }
    }
  }

  function extractTag(html: string, tag: string): string | null {
    const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
    const m = html.match(re);
    return m ? m[1] : null;
  }

  function extractMeta(html: string, name: string): string | null {
    const re = new RegExp(
      `<meta[^>]+name=["']${name}["'][^>]*content=(?:"([^"]*)"|'([^']*)')`,
      "i",
    );
    const m = html.match(re);
    return m ? (m[1] ?? m[2] ?? null) : null;
  }

  function decodeHtmlEntities(s: string): string {
    return s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  }

  async function generateForFile(htmlPath: string): Promise<string | null> {
    const html = await readFile(htmlPath, "utf-8");
    const title = decodeHtmlEntities(
      (extractTag(html, "title") ?? "").replace(/\s+/g, " ").trim(),
    );
    const description = extractMeta(html, "description");
    const main = extractTag(html, "main");
    if (!main) return null;

    const body = nhm.translate(main).trim();
    const parts: string[] = [];
    if (title) parts.push(`# ${title}`);
    if (description) parts.push(decodeHtmlEntities(description));
    parts.push(body);
    const markdown = `${parts.join("\n\n")}\n`;

    const mdPath = path.join(path.dirname(htmlPath), "index.md");
    await writeFile(mdPath, markdown, "utf-8");
    return mdPath;
  }

  let hasRun = false;

  return {
    name: "onemath-markdown-negotiation",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      if (hasRun) return;
      try {
        const s = await stat(BUILD_DIR);
        if (!s.isDirectory()) return;
      } catch {
        return;
      }
      let sawIndex = false;
      for await (const _ of walkIndexHtml(BUILD_DIR)) {
        sawIndex = true;
        break;
      }
      if (!sawIndex) return;

      hasRun = true;
      let count = 0;
      for await (const htmlPath of walkIndexHtml(BUILD_DIR)) {
        const out = await generateForFile(htmlPath);
        if (out) {
          count += 1;
          this.info(`Markdown: ${path.relative(BUILD_DIR, out)}`);
        }
      }
      this.info(`wrote ${count} file(s).`);
    },
  };
}
