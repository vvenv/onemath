import { Outlet } from "react-router";

import { AppBar } from "@/components/app-bar";
import { WebMCPProvider } from "@/components/web-mcp-provider";

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppBar />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-3 px-4 py-6">
        <Outlet />
      </main>
      <WebMCPProvider />
    </div>
  );
}
