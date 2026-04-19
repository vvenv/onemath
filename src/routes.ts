import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("pages/home-page.tsx"),
    route("p/:id", "pages/problem-page.tsx"),
    route("knowledge/:slug", "pages/knowledge-page.tsx"),
  ]),
] satisfies RouteConfig;
