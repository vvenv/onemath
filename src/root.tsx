import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { themeScript } from "@/lib/theme";
import { pwaUnregisterScript } from "@/lib/pwa";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "@/styles/globals.css";

const isDev = import.meta.env.DEV;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#262626" />
        <meta name="application-name" content="一道+" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="一道+" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <Meta />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <Links />
        {!isDev && <link rel="manifest" href="/manifest.webmanifest" />}
        {!isDev && (
          <script dangerouslySetInnerHTML={{ __html: pwaUnregisterScript }} />
        )}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {!isDev && <Analytics />}
        {!isDev && <SpeedInsights />}
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
