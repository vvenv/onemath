import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Search, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GRADES, MODULES, type ModuleKey } from "@/lib/modules";
import { problems } from "@/lib/problems";
import { cn } from "@/lib/utils";
import type { Grade, ProblemData } from "@/types/problem";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "一道 / edao.plus - 小学数学思维训练" },
    {
      name: "description",
      content:
        "一道(edao.plus)是专注小学数学思维训练的在线平台，涵盖计算、几何、数论、应用题等模块，提供经典例题与互动练习。",
    },
  ];
};

const DIFFICULTIES = ["基础", "进阶", "挑战"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

type PersistedSearchState = {
  module: ModuleKey | null;
  grade: Grade | null;
  difficulty: Difficulty | null;
  tag: string | null;
  showMore: boolean;
  collapsedGrades?: Grade[];
};

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

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);
  const [activeGrade, setActiveGrade] = useState<Grade | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | null>(
    null,
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [collapsedGrades, setCollapsedGrades] = useState<Set<Grade>>(
    () => new Set(),
  );
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("filter");
      if (raw) {
        const s = JSON.parse(raw) as Partial<PersistedSearchState>;
        if (s.module !== undefined) setActiveModule(s.module);
        if (s.grade !== undefined) setActiveGrade(s.grade);
        if (s.difficulty !== undefined) setActiveDifficulty(s.difficulty);
        if (s.tag !== undefined) setActiveTag(s.tag);
        if (typeof s.showMore === "boolean") setShowMore(s.showMore);
        if (Array.isArray(s.collapsedGrades))
          setCollapsedGrades(new Set(s.collapsedGrades));
      }
    } catch {
      // ignore malformed storage
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      const payload: PersistedSearchState = {
        module: activeModule,
        grade: activeGrade,
        difficulty: activeDifficulty,
        tag: activeTag,
        showMore,
        collapsedGrades: Array.from(collapsedGrades),
      };
      sessionStorage.setItem("filter", JSON.stringify(payload));
    } catch {
      // ignore quota/availability errors
    }
  }, [
    restored,
    activeModule,
    activeGrade,
    activeDifficulty,
    activeTag,
    showMore,
    collapsedGrades,
  ]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of problems) for (const t of p.tags) set.add(t);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "zh"));
  }, []);

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

  const visibleGradeLabels = useMemo(
    () =>
      GRADES.map((g) => g.label as Grade).filter((label) => {
        const list = grouped.get(label);
        return !!list && list.length > 0;
      }),
    [grouped],
  );

  const expandedGradeValues = useMemo(
    () => visibleGradeLabels.filter((label) => !collapsedGrades.has(label)),
    [visibleGradeLabels, collapsedGrades],
  );

  const handleAccordionChange = (next: string[]) => {
    const nextSet = new Set(next as Grade[]);
    setCollapsedGrades((prev) => {
      const updated = new Set(prev);
      for (const label of visibleGradeLabels) {
        if (nextSet.has(label)) updated.delete(label);
        else updated.add(label);
      }
      return updated;
    });
  };

  const resetAll = () => {
    setActiveModule(null);
    setActiveGrade(null);
    setActiveDifficulty(null);
    setActiveTag(null);
  };

  return (
    <div className="flex flex-col gap-6">
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

              {tags.length > 0 ? (
                <FilterRow label="方法">
                  {tags.map((t) => (
                    <FilterChip
                      key={t}
                      label={t}
                      active={activeTag === t}
                      onClick={() => setActiveTag(activeTag === t ? null : t)}
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
              {showMore ? "收起筛选" : "更多筛选（难度 / 方法）"}
            </Button>
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

      <Accordion
        type="multiple"
        value={expandedGradeValues}
        onValueChange={handleAccordionChange}
        className="gap-2"
      >
        {GRADES.map((grade) => {
          const list = grouped.get(grade.label);
          if (!list || list.length === 0) return null;
          const gradeLabel = grade.label as Grade;
          return (
            <AccordionItem
              key={grade.label}
              value={gradeLabel}
              className="not-last:border-b-0"
            >
              <AccordionTrigger className="items-center gap-3 py-2 hover:no-underline">
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
                    <p className="text-xs text-muted-foreground">
                      {grade.subtitle}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="h-auto pt-1 pb-3 [&_a]:no-underline">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {list.map((item) => (
                    <ProblemRow key={item.id} problem={item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div>
        {visibleProblems.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/70 py-12 text-center">
            <Search className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">没有符合条件的题目</p>
            <p className="text-xs text-muted-foreground">试试调整筛选</p>
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
      to={`/p/${problem.id}`}
      className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-medium text-card-foreground group-hover:text-primary">
          <span className="text-muted-foreground">#{problem.id}</span>{" "}
          {problem.title}
        </span>
        {problem.tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
            <span className="truncate">
              {problem.tags.slice(0, 3).join(" / ")}
            </span>
          </div>
        ) : null}
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
