import { useEffect, useMemo, useState, startTransition } from "react";
import { Link, useSearchParams } from "react-router";
import { ChevronDown, Search, X, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GRADES, MODULES, type ModuleKey } from "@/lib/modules";
import { problems } from "@/lib/problems";
import { TAG_WHITELIST } from "@/lib/tags";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, buildMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Grade, ProblemData } from "@/types/problem";
import type { MetaFunction } from "react-router";

const HOME_TITLE = "一道 / edao.plus - 小学数学思维训练";

export const meta: MetaFunction = () =>
  buildMeta({
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: ["一道", "edao.plus"],
        url: SITE_URL,
        inLanguage: "zh-CN",
        description: SITE_DESCRIPTION,
      },
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
      },
    ],
  });

const DIFFICULTIES = ["基础", "进阶", "挑战"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

const DIFFICULTY_DOT: Record<Difficulty, string> = {
  基础: "bg-emerald-500/50",
  进阶: "bg-amber-500/50",
  挑战: "bg-rose-500/50",
};

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  // Avoid hydration mismatch: the prerendered HTML is built with empty
  // searchParams, so on the first client render we must also ignore
  // query params. After mount we switch to URL-driven state.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const moduleKeys = useMemo(
    () => new Set<ModuleKey>(MODULES.map((m) => m.key)),
    [],
  );
  const gradeLabels = useMemo(
    () => new Set<string>(GRADES.map((g) => g.label)),
    [],
  );
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of problems)
      for (const t of p.tags) if (TAG_WHITELIST.has(t)) set.add(t);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "zh"));
  }, []);

  const rawModule = hydrated ? searchParams.get("module") : null;
  const activeModule: ModuleKey | null =
    rawModule && moduleKeys.has(rawModule as ModuleKey)
      ? (rawModule as ModuleKey)
      : null;
  const rawGrade = hydrated ? searchParams.get("grade") : null;
  const activeGrade: Grade | null =
    rawGrade && gradeLabels.has(rawGrade) ? (rawGrade as Grade) : null;
  const rawDifficulty = hydrated ? searchParams.get("difficulty") : null;
  const activeDifficulty: Difficulty | null =
    rawDifficulty && (DIFFICULTIES as readonly string[]).includes(rawDifficulty)
      ? (rawDifficulty as Difficulty)
      : null;
  const rawTag = hydrated ? searchParams.get("tag") : null;
  const activeTag: string | null =
    rawTag && TAG_WHITELIST.has(rawTag) ? rawTag : null;

  const updateParam = (key: string, value: string | null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === null) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  };

  const setActiveModule = (v: ModuleKey | null) => updateParam("module", v);
  const setActiveGrade = (v: Grade | null) => updateParam("grade", v);
  const setActiveDifficulty = (v: Difficulty | null) =>
    updateParam("difficulty", v);
  const setActiveTag = (v: string | null) => updateParam("tag", v);

  const visibleProblems = useMemo(() => {
    return problems.filter((p) => {
      if (activeModule && p.module !== activeModule) return false;
      if (activeGrade && p.grade !== activeGrade) return false;
      if (activeDifficulty && p.difficulty !== activeDifficulty) return false;
      if (activeTag && !p.tags.includes(activeTag)) return false;
      return true;
    });
  }, [activeModule, activeGrade, activeDifficulty, activeTag]);

  const moduleCounts = useMemo(() => {
    const counts = new Map<ModuleKey, number>();
    for (const p of problems) {
      counts.set(p.module, (counts.get(p.module) ?? 0) + 1);
    }
    return counts;
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, ProblemData[]>();
    for (const p of visibleProblems) {
      const list = map.get(p.grade) ?? [];
      list.push(p);
      map.set(p.grade, list);
    }
    return map;
  }, [visibleProblems]);

  const hasFilter =
    activeModule !== null ||
    activeGrade !== null ||
    activeDifficulty !== null ||
    activeTag !== null;

  const resetAll = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sr-only">一道 / edao.plus — 小学数学思维训练题库</h1>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <FilterRow label="模块">
            {MODULES.map((m) => {
              const count = moduleCounts.get(m.key) ?? 0;
              return (
                <FilterChip
                  key={m.key}
                  label={m.label}
                  count={count}
                  active={activeModule === m.key}
                  disabled={count === 0}
                  onClick={() =>
                    setActiveModule(activeModule === m.key ? null : m.key)
                  }
                />
              );
            })}
          </FilterRow>

          <FilterRow label="年级">
            {GRADES.map((g) => (
              <FilterChip
                key={g.label}
                label={g.label}
                active={activeGrade === g.label}
                onClick={() =>
                  setActiveGrade(
                    activeGrade === g.label ? null : (g.label as Grade),
                  )
                }
              />
            ))}
          </FilterRow>

          <div className="flex items-center gap-2 pt-0.5 text-xs text-muted-foreground">
            <Sheet
              open={filterDrawerOpen}
              onOpenChange={(open) =>
                startTransition(() => setFilterDrawerOpen(open))
              }
            >
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs text-muted-foreground"
                >
                  <Filter className="size-3.5" />
                  更多（难度 / 方法）
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <SheetTitle className="flex items-center gap-2 text-base font-semibold">
                    <Filter className="size-4" />
                    筛选
                  </SheetTitle>
                  <SheetDescription>
                    按模块、年级、难度和方法筛选题目
                  </SheetDescription>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="关闭"
                    >
                      <X className="size-4" />
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <div className="space-y-4 overflow-y-auto px-4 pb-4">
                  <FilterRow label="模块">
                    {MODULES.map((m) => {
                      const count = moduleCounts.get(m.key) ?? 0;
                      return (
                        <FilterChip
                          key={m.key}
                          label={m.label}
                          count={count}
                          active={activeModule === m.key}
                          disabled={count === 0}
                          onClick={() =>
                            setActiveModule(
                              activeModule === m.key ? null : m.key,
                            )
                          }
                        />
                      );
                    })}
                  </FilterRow>

                  <FilterRow label="年级">
                    {GRADES.map((g) => (
                      <FilterChip
                        key={g.label}
                        label={g.label}
                        active={activeGrade === g.label}
                        onClick={() =>
                          setActiveGrade(
                            activeGrade === g.label ? null : (g.label as Grade),
                          )
                        }
                      />
                    ))}
                  </FilterRow>

                  <FilterRow label="难度">
                    {DIFFICULTIES.map((d) => (
                      <FilterChip
                        key={d}
                        label={d}
                        dot={DIFFICULTY_DOT[d]}
                        active={activeDifficulty === d}
                        onClick={() =>
                          setActiveDifficulty(activeDifficulty === d ? null : d)
                        }
                      />
                    ))}
                  </FilterRow>

                  {tags.length > 0 ? (
                    <FilterRow label="方法" twoColumn>
                      {tags.map((t) => (
                        <FilterChip
                          key={t}
                          label={t}
                          active={activeTag === t}
                          onClick={() =>
                            setActiveTag(activeTag === t ? null : t)
                          }
                        />
                      ))}
                    </FilterRow>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
            {hasFilter ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetAll}
                className="h-7 gap-1 px-2 text-xs text-muted-foreground"
              >
                <X className="size-3.5" />
                清空
              </Button>
            ) : null}
            <span className="ml-auto tabular-nums">
              {visibleProblems.length}
              <span className="text-muted-foreground/70">
                {" "}
                / {problems.length}
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        {GRADES.map((grade) => {
          const list = grouped.get(grade.label);
          if (!list || list.length === 0) return null;
          return (
            <Collapsible key={grade.label} defaultOpen>
              <CollapsibleTrigger className="group flex w-full items-center gap-3 py-2">
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-lg font-semibold tracking-tight">
                        {grade.label}
                      </h2>
                      <Badge
                        variant="outline"
                        className="h-5 rounded-full px-2 text-[11px] tabular-nums"
                      >
                        {list.length} 题
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{grade.subtitle}</p>
                  </div>
                </div>
                <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {list.map((item) => (
                    <ProblemRow key={item.id} problem={item} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      <div>
        {visibleProblems.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/70 py-12 text-center">
            <Search className="size-6 text-muted-foreground" />
            <p className="font-medium">没有符合条件的题目</p>
            <p className="text-muted-foreground">试试调整筛选</p>
            {hasFilter ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetAll}
                className="mt-1 h-8"
              >
                清空筛选
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  children,
  twoColumn = false,
}: {
  label: string;
  children: React.ReactNode;
  twoColumn?: boolean;
}) {
  return (
    <div className="space-y-2">
      <span className="block text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          twoColumn && "grid grid-cols-2 gap-2",
        )}
      >
        {children}
      </div>
    </div>
  );
}

type FilterChipProps = {
  label: string;
  count?: number;
  dot?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function FilterChip({
  label,
  count,
  dot,
  active,
  disabled,
  onClick,
}: FilterChipProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "h-7 gap-1.5 rounded-full px-2.5 text-xs font-medium ring-1 ring-inset ring-transparent transition",
        "disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "bg-foreground text-background ring-foreground"
          : "bg-transparent text-muted-foreground ring-border/60",
      )}
    >
      {dot ? (
        <span aria-hidden className={cn("size-1.5 rounded-full", dot)} />
      ) : null}
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="tabular-nums">{count}</span>
      ) : null}
    </Button>
  );
}

function ProblemRow({ problem }: { problem: ProblemData }) {
  const mod = MODULES.find((m) => m.key === problem.module)!;
  const difficulty = problem.difficulty as Difficulty | undefined;
  return (
    <Link
      to={`/p/${problem.id}`}
      className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-base font-semibold text-card-foreground group-hover:text-primary">
          <span className="font-normal text-muted-foreground">
            #{problem.id}
          </span>{" "}
          {problem.title}
        </span>
        <div className="truncate text-[11px] text-muted-foreground">
          {[mod.label, difficulty, problem.tags.slice(0, 3).join(" / ") || null]
            .filter(Boolean)
            .join(" · ")}
        </div>
      </div>
    </Link>
  );
}
