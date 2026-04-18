import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("pages/home-page.tsx"),
    route("p", "pages/problem-index-page.tsx"),
    route("p/:id", "pages/problem-page.tsx"),
    route("k", "pages/knowledge-index-page.tsx"),
    route("k/:slug", "pages/knowledge-page.tsx"),
    route("sync", "pages/sync-page.tsx"),
    route("sync/:code", "pages/sync-import-page.tsx"),
  ]),
] satisfies RouteConfig;
