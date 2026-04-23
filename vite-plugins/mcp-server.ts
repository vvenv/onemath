import { build as esbuild } from "esbuild";
import { existsSync, mkdirSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Names of the modules under `src/data/knowledge/` whose default exports are
 * flat arrays of `KnowledgeEntry`. Listed explicitly (instead of globbing) so
 * the catalog bundle stays decoupled from `src/data/knowledge.ts`, which
 * transitively imports `@/lib/problems` (and therefore `import.meta.glob`,
 * which esbuild can't evaluate).
 */
const KNOWLEDGE_MODULES = [
  ["countingEntries", "counting"],
  ["generalEntries", "general"],
  ["geometryEntries", "geometry"],
  ["magicSquareEntries", "magic-square"],
  ["numberCalcEntries", "number-calc"],
  ["wordEntries", "word"],
] as const;

type Problem = Record<string, unknown>;
type Knowledge = Record<string, unknown>;

/**
 * Bundle all `src/data/problems/*.ts` and `src/data/knowledge/*.ts` modules
 * into a single ESM file and evaluate it to extract a JSON-serializable
 * catalog of problems and knowledge entries. Vite-only features (`@/…`
 * aliases, `?raw` SVG imports) are stubbed at bundle time.
 */
async function generateCatalog(repoRoot: string): Promise<{
  problems: Problem[];
  knowledge: Knowledge[];
}> {
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
            // Vite `?raw` imports — stub to empty string; agents consume the
            // structured problem data, not the SVG markup.
            b.onResolve({ filter: /\?raw$/ }, (args) => ({
              path: args.path,
              namespace: "raw-stub",
            }));
            b.onLoad({ filter: /.*/, namespace: "raw-stub" }, () => ({
              contents: "export default '';",
              loader: "js",
            }));
            // Alias `@/…` → `<repo>/src/…`.
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
        knowledgePoints: q.knowledgePoints,
        solutions: (q.solutions as Array<Record<string, unknown>> | undefined)?.map(
          (s) => ({ key: s.key, label: s.label, steps: s.steps }),
        ),
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

export type McpServerPluginOptions = {
  /** Absolute path to the repo root. Defaults to the current working dir. */
  repoRoot?: string;
  /** Path to the MCP entry file, relative to `repoRoot`. */
  entry?: string;
  /** Directory (relative to `repoRoot`) where the Vercel BOA function is emitted. */
  outDir?: string;
};

/**
 * Emit a Vercel Build Output API (BOA) serverless function that speaks the
 * MCP Streamable HTTP protocol at `/mcp`.
 *
 * Why BOA instead of a top-level `api/` file: the `@vercel/react-router`
 * preset (see `react-router.config.ts`) switches this project to BOA, which
 * disables Vercel's zero-config scanning of the root `api/` directory. The
 * only way to ship additional functions under that preset is to write them
 * directly into the BOA layout ourselves.
 *
 * A directory at `.vercel/output/functions/mcp.func/` is served by Vercel at
 * the `/mcp` URL path automatically (see
 * https://vercel.com/docs/build-output-api/v3/primitives#functions).
 */
export function mcpServerPlugin(options: McpServerPluginOptions = {}): Plugin {
  const repoRoot = options.repoRoot ?? process.cwd();
  const entry = path.resolve(repoRoot, options.entry ?? "api/mcp.ts");
  const outDir = path.resolve(
    repoRoot,
    options.outDir ?? ".vercel/output/functions/mcp.func",
  );

  return {
    name: "onemath-mcp-server",
    apply: "build",
    async closeBundle() {
      const catalog = await generateCatalog(repoRoot);

      if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
      mkdirSync(outDir, { recursive: true });

      await esbuild({
        entryPoints: [entry],
        bundle: true,
        format: "esm",
        platform: "node",
        target: "node22",
        outfile: path.join(outDir, "index.mjs"),
        // `@vercel/node` only supplies types at dev time; the runtime helpers
        // come from Vercel's Node.js launcher (via `shouldAddHelpers: true`
        // in `.vc-config.json`), so it must be marked external here.
        external: ["@vercel/node"],
        logLevel: "warning",
      });

      writeFileSync(
        path.join(outDir, "_catalog.json"),
        JSON.stringify(catalog),
      );

      writeFileSync(
        path.join(outDir, ".vc-config.json"),
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

      // eslint-disable-next-line no-console
      console.log(
        `[onemath-mcp-server] wrote ${outDir} (${catalog.problems.length} problems, ${catalog.knowledge.length} knowledge)`,
      );
    },
  };
}
