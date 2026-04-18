import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("pages/home-page.tsx"),
    route("problems/:id", "pages/problem-page.tsx"),
  ]),
] satisfies RouteConfig;
