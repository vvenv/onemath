import type { Config } from "@react-router/dev/config";

import { getPrerenderPaths } from "./prerender-paths.js";

export default {
  appDirectory: "src",
  // Static export: no Node server at runtime; every route is prerendered to HTML.
  ssr: false,
  async prerender() {
    return getPrerenderPaths();
  },
} satisfies Config;
