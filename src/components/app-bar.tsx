import { useEffect, useState } from "react";
import { Link } from "react-router";
import { BookOpen, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Theme, getInitialTheme, setSelectedTheme } from "@/lib/theme";
import { GlobalSearch } from "./global-search";
import { Logo } from "./logo";

export function AppBar() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const onToggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setSelectedTheme(next);
    setTheme(next);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="relative mx-auto flex h-14 w-full max-w-3xl items-center gap-3 px-4">
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
          <GlobalSearch />
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            aria-label="方法手册"
            title="方法手册"
          >
            <Link to="/k">
              <BookOpen />
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="active:translate-y-0!"
            aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
            onClick={onToggleTheme}
            disabled={theme === null}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </header>
  );
}
