import { Link } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "onemath-theme";

export function AppBar() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const onToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // ignore storage failures
      }
      return next;
    });
  };

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center gap-3 px-4">
        <Link
          to="/"
          aria-label="返回 edao.plus 首页"
          className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
          <span className="flex items-baseline gap-1.5">
            <span className="font-heading text-base font-semibold tracking-tight">
              一道 / edao.plus
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="active:translate-y-0!"
            aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
            onClick={onToggleTheme}
            suppressHydrationWarning
          >
            <span suppressHydrationWarning className="contents">
              {isDark ? <Sun /> : <Moon />}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
