import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { problems } from "@/lib/problems";
import { GRADES, MODULES, type ModuleKey } from "@/lib/modules";
import { cn } from "@/lib/utils";
import type { Grade, ProblemData } from "@/types/problem";

const DIFFICULTIES = ["基础", "进阶", "挑战"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

const DIFFICULTY_ACCENT: Record<Difficulty, string> = {
  基础: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  进阶: "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
  挑战: "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300",
};

const DIFFICULTY_DOT: Record<Difficulty, string> = {
  基础: "bg-emerald-500",
  进阶: "bg-amber-500",
  挑战: "bg-rose-500",
};

const GRADE_ACCENT: Record<string, string> = {
  三年级: "from-sky-500/70 to-sky-500/10",
  四年级: "from-emerald-500/70 to-emerald-500/10",
  五年级: "from-violet-500/70 to-violet-500/10",
  六年级: "from-rose-500/70 to-rose-500/10",
};

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);
  const [activeGrade, setActiveGrade] = useState<Grade | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | null>(
    null,
  );
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [showMore, setShowMore] = useState(false);

  const topics = useMemo(() => {
    const set = new Set<string>();
    for (const p of problems) if (p.topic) set.add(p.topic);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "zh"));
  }, []);

  const normalizedKeyword = keyword.trim().toLowerCase();

  const visibleProblems = useMemo(() => {
    return problems.filter((p) => {
      if (activeModule && p.module !== activeModule) return false;
      if (activeGrade && p.grade !== activeGrade) return false;
      if (activeDifficulty && p.difficulty !== activeDifficulty) return false;
      if (activeTopic && p.topic !== activeTopic) return false;
      if (normalizedKeyword) {
        const haystack = [
          p.title,
          p.topic ?? "",
          p.question,
          p.tags.join(" "),
          String(p.id),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(normalizedKeyword)) return false;
      }
      return true;
    });
  }, [
    activeModule,
    activeGrade,
    activeDifficulty,
    activeTopic,
    normalizedKeyword,
  ]);

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
    activeTopic !== null ||
    normalizedKeyword.length > 0;

  const resetAll = () => {
    setActiveModule(null);
    setActiveGrade(null);
    setActiveDifficulty(null);
    setActiveTopic(null);
    setKeyword("");
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索题目 / 标签 / 编号"
              className="h-9 pl-8"
              aria-label="关键字搜索"
            />
            {keyword ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="清空关键字"
                onClick={() => setKeyword("")}
                className="absolute top-1/2 right-1 -translate-y-1/2"
              >
                <X className="size-3.5" />
              </Button>
            ) : null}
          </div>
          {hasFilter ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetAll}
              className="h-9 px-2 text-xs"
            >
              <X className="size-3.5" />
              清空
            </Button>
          ) : null}
        </div>

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

          {showMore ? (
            <>
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

              {topics.length > 0 ? (
                <FilterRow label="主题">
                  {topics.map((t) => (
                    <FilterChip
                      key={t}
                      label={t}
                      active={activeTopic === t}
                      onClick={() =>
                        setActiveTopic(activeTopic === t ? null : t)
                      }
                    />
                  ))}
                </FilterRow>
              ) : null}
            </>
          ) : null}

          <div className="flex items-center gap-2 pt-0.5 text-xs text-muted-foreground">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowMore((v) => !v)}
              className="h-7 gap-1 px-2 text-xs text-muted-foreground"
              aria-expanded={showMore}
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  showMore && "rotate-180",
                )}
              />
              {showMore ? "收起筛选" : "更多筛选（难度 / 主题）"}
            </Button>
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

      <div className="flex flex-col gap-6">
        {GRADES.map((grade) => {
          const list = grouped.get(grade.label);
          if (!list || list.length === 0) return null;
          const accent =
            GRADE_ACCENT[grade.label] ?? "from-primary/60 to-primary/10";
          return (
            <section key={grade.label} className="flex flex-col gap-3">
              <div className="flex items-end justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "h-8 w-1 rounded-full bg-linear-to-b",
                      accent,
                    )}
                  />
                  <div className="flex flex-col gap-0.5">
                    <h2 className="font-heading text-lg font-semibold tracking-tight">
                      {grade.label}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {grade.subtitle}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="h-6 shrink-0 rounded-full px-2 tabular-nums"
                >
                  {list.length} 题
                </Badge>
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {list.map((item) => (
                  <ProblemRow key={item.id} problem={item} />
                ))}
              </div>
            </section>
          );
        })}

        {visibleProblems.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/70 py-12 text-center">
            <Search className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">没有符合条件的题目</p>
            <p className="text-xs text-muted-foreground">
              试试调整筛选或清空关键字
            </p>
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="shrink-0 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      {children}
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
      to={`/problems/${problem.id}`}
      className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold tabular-nums ring-1 ring-inset",
          mod.accent,
        )}
      >
        #{problem.id}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-medium text-card-foreground group-hover:text-primary">
          {problem.title}
        </span>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
          {problem.topic ? (
            <span className="font-medium text-foreground/70">
              {problem.topic}
            </span>
          ) : null}
          {problem.topic && problem.tags.length > 0 ? (
            <span aria-hidden>·</span>
          ) : null}
          <span className="truncate">
            {problem.tags.slice(0, 3).join(" / ")}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
          <Badge
            variant="outline"
            className={cn(
              "h-5 border-transparent px-1.5 text-[10px] ring-1 ring-inset",
              mod.accent,
            )}
          >
            {mod.label}
          </Badge>
          {difficulty ? (
            <Badge
              variant="outline"
              className={cn(
                "h-5 gap-1 border-transparent px-1.5 text-[10px] ring-1 ring-inset",
                DIFFICULTY_ACCENT[difficulty],
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full",
                  DIFFICULTY_DOT[difficulty],
                )}
              />
              {difficulty}
            </Badge>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
