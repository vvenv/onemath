import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MODULES } from "@/lib/modules";
import { problems } from "@/lib/problems";
import { cn } from "@/lib/utils";
import type { ProblemData } from "@/types/problem";

const MAX_RESULTS = 8;

function scoreProblem(p: ProblemData, q: string): number {
  if (!q) return 0;
  const id = p.id.toLowerCase();
  const title = p.title.toLowerCase();
  const tags = p.tags.map((t) => t.toLowerCase());
  if (id === q) return 1000;
  if (id.startsWith(q)) return 800;
  if (id.includes(q)) return 600;
  if (title.startsWith(q)) return 500;
  if (title.includes(q)) return 400;
  if (tags.some((t) => t.includes(q))) return 200;
  if (p.question.toLowerCase().includes(q)) return 100;
  return 0;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // global keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // focus input on open; reset selection
  useEffect(() => {
    if (open) {
      setActive(0);
      // defer so the panel is mounted
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const results = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return [];
    const scored: Array<{ p: ProblemData; s: number }> = [];
    for (const p of problems) {
      const s = scoreProblem(p, q);
      if (s > 0) scored.push({ p, s });
    }
    scored.sort((a, b) => b.s - a.s || a.p.id.localeCompare(b.p.id));
    return scored.slice(0, MAX_RESULTS).map((x) => x.p);
  }, [keyword]);

  useEffect(() => {
    if (active >= results.length) setActive(0);
  }, [results.length, active]);

  const go = (p: ProblemData) => {
    setOpen(false);
    setKeyword("");
    navigate(`/p/${p.id}`);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[active];
      if (hit) go(hit);
    }
  };

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="sm"
        aria-label="搜索题目"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-7 gap-1.5 px-2 text-muted-foreground"
      >
        <Search className="size-4" />
        <span className="hidden text-xs sm:inline">搜索题目</span>
        <kbd className="ml-1 hidden items-center gap-0.5 rounded border border-border/60 bg-muted/50 px-1 font-mono text-[10px] text-muted-foreground sm:inline-flex">
          <span className="text-[11px]">⌘</span>K
        </kbd>
      </Button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="全局搜索"
          className="absolute top-full right-4 left-4 z-50 mt-1 overflow-hidden rounded-xl border border-border/70 bg-popover text-popover-foreground shadow-lg sm:left-auto sm:w-[min(28rem,calc(100vw-2rem))]"
        >
          <div className="relative border-b border-border/60">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="按编号 / 标题 / 方法搜索，Enter 进入"
              aria-label="全局搜索题目"
              className="h-10 rounded-none border-0 pr-9 pl-9 focus-visible:ring-0"
            />
            {keyword ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="清空"
                onClick={() => {
                  setKeyword("");
                  inputRef.current?.focus();
                }}
                className="absolute top-1/2 right-1.5 -translate-y-1/2"
              >
                <X className="size-3.5" />
              </Button>
            ) : null}
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-1">
            {keyword.trim().length === 0 ? (
              <EmptyHint />
            ) : results.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                没有匹配的题目
              </div>
            ) : (
              <ul className="flex flex-col">
                {results.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(p)}
                      aria-selected={i === active}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors",
                        i === active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate">
                        <span className="text-muted-foreground">#{p.id}</span>{" "}
                        <span className="text-foreground">{p.title}</span>
                      </span>
                      <ModuleBadge moduleKey={p.module} />
                      <span className="shrink-0 text-[10px] text-muted-foreground/70">
                        {p.grade}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-border/60 bg-muted/30 px-3 py-1.5 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span>选择</span>
              <Kbd>Enter</Kbd>
              <span>打开</span>
            </span>
            <span className="flex items-center gap-1">
              <Kbd>Esc</Kbd>
              <span>关闭</span>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-4 items-center rounded border border-border/60 bg-background px-1 font-mono text-[10px] text-muted-foreground">
      {children}
    </kbd>
  );
}

function EmptyHint() {
  return (
    <div className="px-3 py-6 text-center text-xs text-muted-foreground">
      输入题号、标题或方法关键字
    </div>
  );
}

function ModuleBadge({ moduleKey }: { moduleKey: ProblemData["module"] }) {
  const mod = MODULES.find((m) => m.key === moduleKey);
  if (!mod) return null;
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-5 shrink-0 border-transparent px-1.5 text-[10px] ring-1 ring-inset",
        mod.accent,
      )}
    >
      {mod.label}
    </Badge>
  );
}
