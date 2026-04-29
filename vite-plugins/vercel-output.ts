import { build as esbuild } from "esbuild";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Problem = Record<string, unknown>;
type Knowledge = Record<string, unknown>;

async function generateCatalog(
  repoRoot: string,
): Promise<{ problems: Problem[]; knowledge: Knowledge[] }> {
  const problemsDir = path.join(repoRoot, "src/data/problems");
  const problemIds = readdirSync(problemsDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();

  const knowledgeDir = path.join(repoRoot, "src/data/knowledge");
  const knowledgeSlugs = readdirSync(knowledgeDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();

  const entrySource = [
    ...problemIds.map(
      (id, i) => `import p${i} from "${path.join(problemsDir, id)}";`,
    ),
    ...knowledgeSlugs.map(
      (slug, i) => `import k${i} from "${path.join(knowledgeDir, slug)}";`,
    ),
    "",
    `export const problems = [${problemIds.map((_, i) => `p${i}`).join(", ")}];`,
    `export const knowledge = [${knowledgeSlugs.map((_, i) => `k${i}`).join(", ")}];`,
    "",
  ].join("\n");

  const tmpEntry = path.join(repoRoot, "node_modules", ".mcp-catalog-entry.ts");
  const tmpOut = path.join(repoRoot, "node_modules", ".mcp-catalog-bundle.mjs");
  writeFileSync(tmpEntry, entrySource);

  try {
    await esbuild({
      entryPoints: [tmpEntry],
      bundle: true,
      format: "esm",
      platform: "node",
      target: "node22",
      outfile: tmpOut,
      external: ["react"],
      resolveExtensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
      logLevel: "warning",
      plugins: [
        {
          name: "stub-vite-only",
          setup(b) {
            b.onResolve({ filter: /\?raw$/ }, (args) => ({
              path: args.path,
              namespace: "raw-stub",
            }));
            b.onLoad({ filter: /.*/, namespace: "raw-stub" }, () => ({
              contents: "export default '';",
              loader: "js",
            }));
            b.onResolve({ filter: /^@\// }, (args) => {
              const rel = args.path.replace(/^@\//, "");
              const base = path.resolve(repoRoot, "src", rel);
              for (const ext of [
                "",
                ".ts",
                ".tsx",
                "/index.ts",
                "/index.tsx",
              ]) {
                if (existsSync(base + ext)) return { path: base + ext };
              }
              return { path: base };
            });
          },
        },
      ],
    });

    const mod = (await import(
      `${pathToFileURL(tmpOut).href}?t=${Date.now()}`
    )) as { problems: Problem[]; knowledge: Knowledge[] };

    const problems = mod.problems.map((p) => {
      const q = p as Record<string, unknown>;
      const variant = q.variant as Record<string, unknown> | undefined;
      return {
        id: q.id,
        title: q.title,
        grade: q.grade,
        module: q.module,
        difficulty: q.difficulty,
        question: q.question,
        tags: q.tags,
        solutions: (
          q.solutions as Array<Record<string, unknown>> | undefined
        )?.map((s) => ({ key: s.key, label: s.label, steps: s.steps })),
        variant: variant
          ? {
              question: variant.question,
              fields: variant.fields,
              answer: variant.answer,
              hint: variant.hint,
            }
          : undefined,
      };
    });

    const knowledge = mod.knowledge.map((k) => {
      const q = k as Record<string, unknown>;
      return {
        slug: q.slug,
        name: q.name,
        tag: q.tag,
        category: q.category,
        summary: q.summary,
        intuition: q.intuition,
        derivation: q.derivation,
        keyPoints: q.keyPoints,
        examples: q.examples,
        pitfalls: q.pitfalls,
        relatedSlugs: q.relatedSlugs,
      };
    });

    return { problems, knowledge };
  } finally {
    if (existsSync(tmpEntry)) unlinkSync(tmpEntry);
    if (existsSync(tmpOut)) unlinkSync(tmpOut);
  }
}

export type VercelOutputPluginOptions = {
  /** Absolute path to the repo root. Defaults to the current working dir. */
  repoRoot?: string;
};

/**
 * Assemble the full Vercel Build Output API v3 tree under `.vercel/output/`:
 *
 *   static/                     build/client/ copied verbatim (all prerendered
 *                               HTML, public/* assets, sitemap.xml, robots.txt,
 *                               .well-known/*, __spa-fallback.html).
 *   functions/mcp.func/
 *     index.mjs                 bundled `api/mcp.ts` (MCP Streamable HTTP
 *                               server). Served at `/mcp` automatically.
 *     _catalog.json             142 problems + 51 knowledge entries, loaded by
 *                               the handler at runtime.
 *     .vc-config.json           Node.js 22, launcher helpers on, 15s timeout.
 *   config.json                 Link headers, `Accept: text/markdown` negotiation,
 *                               pretty-URL rewrites, `{ handle: "filesystem" }`,
 *                               SPA fallback.
 *
 * Why do this from a Vite plugin instead of relying on `@vercel/react-router`:
 *
 *  - The preset owns `.vercel/output/` on Vercel's cloud side and overwrites
 *    any functions emitted alongside it, so ad-hoc serverless functions under
 *    the preset are effectively unreachable.
 *  - Populating `.vercel/output/` ourselves makes Vercel serve this tree
 *    verbatim (Build Output API mode), bypassing the framework builder and
 *    giving us full control over routing and function registration.
 *
 * Why `closeBundle` with a prerender-completion guard: react-router v7 runs
 * two bundle passes (SSR, then client-with-prerender) and each fires
 * `closeBundle`. Only the final pass has `build/client/__spa-fallback.html`
 * and the prerendered route HTML on disk. Running any earlier would ship a
 * tree missing every prerendered page.
 */
export function vercelOutputPlugin(
  options: VercelOutputPluginOptions = {},
): Plugin {
  const repoRoot = options.repoRoot ?? path.resolve(__dirname, "..");
  const clientDir = path.join(repoRoot, "build/client");
  const outputDir = path.join(repoRoot, ".vercel/output");
  const staticDir = path.join(outputDir, "static");
  const mcpFuncDir = path.join(outputDir, "functions/mcp.func");
  const syncFuncDir = path.join(outputDir, "functions/api/sync.func");

  return {
    name: "onemath-vercel-output",
    apply: "build",
    closeBundle: {
      order: "post",
      sequential: true,
      async handler() {
        // react-router v7 fires `closeBundle` once per build pass (SSR + client).
        // Only the pass that produced the SPA fallback (after prerender) has
        // a complete `build/client/` tree. Skip the earlier pass.
        if (!existsSync(path.join(clientDir, "__spa-fallback.html"))) {
          return;
        }

        // Fresh BOA tree: there is exactly one writer (this plugin), so a
        // blanket wipe is safe and keeps the output free of stale artifacts.
        rmSync(outputDir, { recursive: true, force: true });
        mkdirSync(outputDir, { recursive: true });

        cpSync(clientDir, staticDir, { recursive: true });

        // --- MCP function ---
        mkdirSync(mcpFuncDir, { recursive: true });

        await esbuild({
          entryPoints: [path.join(repoRoot, "api/mcp.ts")],
          bundle: true,
          format: "esm",
          platform: "node",
          target: "node22",
          outfile: path.join(mcpFuncDir, "index.mjs"),
          external: ["@vercel/node"],
          logLevel: "warning",
        });

        const catalog = await generateCatalog(repoRoot);
        writeFileSync(
          path.join(mcpFuncDir, "_catalog.json"),
          JSON.stringify(catalog),
        );

        const vcConfig = {
          runtime: "nodejs22.x",
          handler: "index.mjs",
          launcherType: "Nodejs",
          shouldAddHelpers: true,
          maxDuration: 15,
        };

        writeFileSync(
          path.join(mcpFuncDir, ".vc-config.json"),
          JSON.stringify(vcConfig, null, 2),
        );

        // --- Sync function ---
        mkdirSync(syncFuncDir, { recursive: true });

        await esbuild({
          entryPoints: [path.join(repoRoot, "api/sync.ts")],
          bundle: true,
          format: "esm",
          platform: "node",
          target: "node22",
          outfile: path.join(syncFuncDir, "index.mjs"),
          external: ["@vercel/node"],
          logLevel: "warning",
        });

        writeFileSync(
          path.join(syncFuncDir, ".vc-config.json"),
          JSON.stringify(vcConfig, null, 2),
        );

        const config = {
          version: 3,
          routes: [
            // Expose agent/registry discovery headers on document responses
            // (paths without an extension). `continue: true` so routing falls
            // through to the next rule.
            {
              src: "^/((?!.*\\.).*)$",
              headers: {
                Link: '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json", </openapi.json>; rel="service-desc"; type="application/openapi+json", </manifest.webmanifest>; rel="manifest"; type="application/manifest+json", </manifest.webmanifest>; rel="describedby"; type="application/manifest+json", </icon.svg>; rel="icon"; type="image/svg+xml"',
              },
              continue: true,
            },
            {
              src: "^/\\.well-known/api-catalog$",
              headers: {
                "Content-Type":
                  'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
                Link: '</.well-known/api-catalog>; rel="api-catalog"',
              },
              continue: true,
            },
            {
              src: "^/openapi\\.json$",
              headers: { "Content-Type": "application/openapi+json" },
              continue: true,
            },
            // Content negotiation: agents asking for text/markdown get the
            // prerendered `.md` twin of each route instead of the HTML page.
            {
              src: "^/$",
              has: [
                {
                  type: "header",
                  key: "accept",
                  value: "(.*)text/markdown(.*)",
                },
              ],
              dest: "/index.md",
              headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                Vary: "Accept",
              },
            },
            {
              src: "^/(.+?)/?$",
              has: [
                {
                  type: "header",
                  key: "accept",
                  value: "(.*)text/markdown(.*)",
                },
              ],
              dest: "/$1/index.md",
              headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                Vary: "Accept",
              },
            },
            // Map pretty prerendered paths to their index.html files (no
            // trailing slash) before the filesystem handle runs. `[^/.]+` so
            // the capture cannot swallow a filename with an extension (e.g.
            // `/k/index.md` produced by the markdown-negotiation route above).
            { src: "^/(p|k)/([^/.]+)/?$", dest: "/$1/$2/index.html" },
            { src: "^/(k)/?$", dest: "/k/index.html" },
            // `handle: filesystem` resolves both static files under static/
            // and serverless functions under functions/*.func/ — so the MCP
            // handler at functions/mcp.func/ serves /mcp and the sync handler
            // at functions/api/sync.func/ serves /api/sync automatically.
            { handle: "filesystem" },
            // Anything still unmatched falls back to react-router's SPA shell.
            // This is a catch-all that only runs if the filesystem didn't find
            // the file (i.e., it's a document route, not a static asset).
            { src: "/.*", dest: "/__spa-fallback.html" },
          ],
        };

        writeFileSync(
          path.join(outputDir, "config.json"),
          JSON.stringify(config, null, 2),
        );

        console.log(
          `[onemath-vercel-output] wrote ${outputDir}
  - static/                   (${readdirSync(staticDir).length} top-level entries from build/client)
  - functions/mcp.func/       (${catalog.problems.length} problems, ${catalog.knowledge.length} knowledge)
  - functions/api/sync.func/  (QR sync endpoint)
  - config.json               (${config.routes.length} routes)`,
        );
      },
    },
  };
}
