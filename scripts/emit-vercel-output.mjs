#!/usr/bin/env node
/**
 * Post-build script that produces the full Vercel Build Output API (BOA)
 * layout this site deploys to production:
 *
 *   .vercel/output/
 *     static/                    copied from build/client/ (all prerendered HTML,
 *                                CSS/JS bundles, public/ assets, sitemap.xml,
 *                                robots.txt, .well-known/*)
 *     functions/mcp.func/
 *       index.mjs                bundled Vercel-Node handler for /mcp
 *       _catalog.json            problems + knowledge catalog (loaded at runtime)
 *       .vc-config.json          Node.js runtime config
 *     config.json                rewrites, headers, markdown negotiation, SPA fallback
 *
 * Why explicit BOA instead of the `@vercel/react-router` preset:
 *  - The preset owns `.vercel/output/` on Vercel's cloud side, and overwrites
 *    any functions we write into it from Vite plugins — so top-level `api/*.ts`
 *    and plugin-emitted `.vercel/output/functions/…` both fail to land.
 *  - Writing a complete BOA tree here bypasses Vercel's framework builder
 *    entirely (Vercel serves `.vercel/output/` verbatim when it is populated),
 *    so we keep full control over routing and function registration.
 */

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const clientDir = path.join(repoRoot, "build/client");
const outputDir = path.join(repoRoot, ".vercel/output");
const staticDir = path.join(outputDir, "static");
const funcDir = path.join(outputDir, "functions/mcp.func");

if (!existsSync(clientDir)) {
  console.error(
    `[emit-vercel-output] build/client not found at ${clientDir}; run \`react-router build\` first.`,
  );
  process.exit(1);
}

/** Knowledge data modules that export flat `KnowledgeEntry[]` arrays. */
const KNOWLEDGE_MODULES = [
  ["countingEntries", "counting"],
  ["generalEntries", "general"],
  ["geometryEntries", "geometry"],
  ["magicSquareEntries", "magic-square"],
  ["numberCalcEntries", "number-calc"],
  ["wordEntries", "word"],
];

async function generateCatalog() {
  const problemsDir = path.join(repoRoot, "src/data/problems");
  const problemIds = readdirSync(problemsDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();

  const entrySource = [
    ...problemIds.map(
      (id, i) => `import p${i} from "${path.join(problemsDir, id)}";`,
    ),
    ...KNOWLEDGE_MODULES.map(
      ([name, file]) =>
        `import { ${name} } from "${path.join(repoRoot, "src/data/knowledge", file)}";`,
    ),
    "",
    `export const problems = [${problemIds.map((_, i) => `p${i}`).join(", ")}];`,
    `export const knowledge = [${KNOWLEDGE_MODULES.map(([n]) => `...${n}`).join(", ")}];`,
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
              for (const ext of ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]) {
                if (existsSync(base + ext)) return { path: base + ext };
              }
              return { path: base };
            });
          },
        },
      ],
    });

    const mod = await import(`${pathToFileURL(tmpOut).href}?t=${Date.now()}`);

    const problems = mod.problems.map((p) => ({
      id: p.id,
      title: p.title,
      grade: p.grade,
      module: p.module,
      difficulty: p.difficulty,
      question: p.question,
      tags: p.tags,
      knowledgePoints: p.knowledgePoints,
      solutions: p.solutions?.map((s) => ({
        key: s.key,
        label: s.label,
        steps: s.steps,
      })),
      variant: p.variant
        ? {
            question: p.variant.question,
            fields: p.variant.fields,
            answer: p.variant.answer,
            hint: p.variant.hint,
          }
        : undefined,
    }));

    const knowledge = mod.knowledge.map((k) => ({
      slug: k.slug,
      name: k.name,
      tag: k.tag,
      category: k.category,
      summary: k.summary,
      intuition: k.intuition,
      derivation: k.derivation,
      keyPoints: k.keyPoints,
      examples: k.examples,
      pitfalls: k.pitfalls,
      relatedSlugs: k.relatedSlugs,
    }));

    return { problems, knowledge };
  } finally {
    if (existsSync(tmpEntry)) unlinkSync(tmpEntry);
    if (existsSync(tmpOut)) unlinkSync(tmpOut);
  }
}

// ---------------------------------------------------------------------------

// 1. Fresh output dir.
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

// 2. Copy build/client → .vercel/output/static (all prerendered HTML, assets,
//    public/ files including sitemap.xml, robots.txt, .well-known/*).
cpSync(clientDir, staticDir, { recursive: true });

// 3. Emit MCP serverless function.
mkdirSync(funcDir, { recursive: true });

await esbuild({
  entryPoints: [path.join(repoRoot, "api/mcp.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  outfile: path.join(funcDir, "index.mjs"),
  external: ["@vercel/node"],
  logLevel: "warning",
});

const catalog = await generateCatalog();
writeFileSync(path.join(funcDir, "_catalog.json"), JSON.stringify(catalog));

writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: true,
      maxDuration: 15,
    },
    null,
    2,
  ),
);

// 4. Write config.json with all routing rules previously held in vercel.json,
//    plus the SPA fallback for non-prerendered paths. The function at
//    .vercel/output/functions/mcp.func/ is served at /mcp automatically via
//    the `handle: filesystem` step — no explicit rewrite needed.
const config = {
  version: 3,
  routes: [
    // Expose agent/registry discovery headers on document responses (paths
    // without an extension). `continue: true` so routing falls through.
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
    // Content negotiation for agents that request text/markdown.
    {
      src: "^/$",
      has: [
        { type: "header", key: "accept", value: "(.*)text/markdown(.*)" },
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
        { type: "header", key: "accept", value: "(.*)text/markdown(.*)" },
      ],
      dest: "/$1/index.md",
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
      },
    },
    // Map pretty prerendered paths to their index.html files (no trailing
    // slash) before the filesystem handle runs. `[^/.]+` so the capture
    // cannot swallow a filename with an extension (e.g. `/k/index.md`
    // produced by the markdown-negotiation route above).
    { src: "^/(p|k)/([^/.]+)/?$", dest: "/$1/$2/index.html" },
    { src: "^/(k)/?$", dest: "/k/index.html" },
    { handle: "filesystem" },
    // Everything else falls back to the SPA shell generated by react-router.
    { src: "^/.*$", dest: "/__spa-fallback.html" },
  ],
};

writeFileSync(
  path.join(outputDir, "config.json"),
  JSON.stringify(config, null, 2),
);

console.log(
  `[emit-vercel-output] wrote ${outputDir}
  - static/        (${readdirSync(staticDir).length} top-level entries from build/client)
  - functions/mcp.func/  (${catalog.problems.length} problems, ${catalog.knowledge.length} knowledge)
  - config.json    (${config.routes.length} routes)`,
);
