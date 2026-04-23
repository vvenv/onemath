import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

import { getPrerenderPaths } from "./prerender-paths";

export default {
  appDirectory: "src",
  // Static export: no Node server at runtime; every route is prerendered to HTML.
  ssr: false,
  // Opt into Vercel's react-router preset so the build populates
  // `.vercel/output/static` with *all* files from `build/client` (including
  // unreferenced static assets like `sitemap.xml` and `robots.txt`). Without
  // the preset, Vercel's zero-config adapter only deploys files reachable
  // from the Vite bundle manifest and silently drops the rest.
  presets: [vercelPreset()],
  async prerender() {
    return getPrerenderPaths();
  },
} satisfies Config;
