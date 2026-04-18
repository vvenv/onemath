import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "node:child_process";
import path from "node:path";
import { defineConfig } from "vite";
import { agentSkills } from "./vite-plugins/agent-skills";
import { markdownNegotiationPlugin } from "./vite-plugins/markdown-negotiation";
import { sitemapPlugin } from "./vite-plugins/sitemap";
import { silenceChromeDevtoolsProbe } from "./vite-plugins/silence-chrome-devtools-probe";
import { vercelOutputPlugin } from "./vite-plugins/vercel-output";
import { devApiProxy } from "./vite-plugins/dev-api-proxy";

// Use git commit hash so the value is identical across React Router's two
// build passes (SSR + client).  `Date.now()` differed between passes,
// causing a hydration mismatch in the featured-problem picker.
const buildRevision =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ??
  execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
const buildYear = `${new Date().getFullYear()}`;

export default defineConfig({
  define: {
    // Frozen at build time so SSG HTML and client hydration observe the same
    // value. Consumed by deterministic helpers (e.g. seeded shuffle for the
    // home-page figured carousel) that must stay stable per deploy.
    __BUILD_ID__: JSON.stringify(buildRevision),
    // Frozen at build time so the Footer's copyright year is identical in
    // SSG HTML and the client's first render — `new Date().getFullYear()`
    // would otherwise mismatch across the New Year boundary and trigger
    // React hydration error #418.
    __BUILD_YEAR__: JSON.stringify(buildYear),
  },
  plugins: [
    tailwindcss(),
    silenceChromeDevtoolsProbe,
    devApiProxy(),
    agentSkills({
      skills: [
        {
          name: "generate-problem",
          sourceFile: ".windsurf/workflows/generate-problem.md",
        },
        {
          name: "optimize-problem",
          sourceFile: ".windsurf/workflows/optimize-problem.md",
        },
      ],
    }),
    sitemapPlugin(),
    reactRouter(),
    markdownNegotiationPlugin(),
    vercelOutputPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Use local mock for @vercel/kv during development
      "@vercel/kv": path.resolve(__dirname, "./lib/mocks/vercel-kv.ts"),
    },
  },
  ssr: {
    noExternal: ["@vercel/kv"],
  },
});
