import type { Config } from "@react-router/dev/config";

import { getPrerenderPaths } from "./prerender-paths";

export default {
  appDirectory: "src",
  // Static export: no Node server at runtime; every route is prerendered to HTML.
  ssr: false,
  // Output goes directly to `build/client/`; `scripts/emit-vercel-output.mjs`
  // then assembles `.vercel/output/` (Vercel Build Output API v3) from it,
  // adding the `/mcp` serverless function. This replaces the
  // `@vercel/react-router` preset, which only emitted static assets and
  // prevented us from registering additional serverless functions.
  async prerender() {
    return getPrerenderPaths();
  },
} satisfies Config;
