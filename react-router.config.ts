import type { Config } from "@react-router/dev/config";

import { getPrerenderPaths } from "./prerender-paths";

export default {
  appDirectory: "src",
  // Static export: no Node server at runtime; every route is prerendered to HTML.
  ssr: false,
  async prerender() {
    return getPrerenderPaths();
  },
} satisfies Config;
