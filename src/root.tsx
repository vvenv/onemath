import { type ReactNode, useEffect } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { applyStoredTheme, themeScript } from "@/lib/theme";
import { pwaUnregisterScript } from "@/lib/pwa";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import "@/styles/globals.css";

const isDev = import.meta.env.DEV;

export function Layout({ children }: { children: ReactNode }) {
  // Re-apply the stored theme after React hydration. The inline themeScript
  // in <head> sets the correct class before first paint, but React's
  // hydration reconciliation may strip attributes it doesn't control.
  useEffect(() => {
    applyStoredTheme();
  }, []);

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3b82f6" />
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
