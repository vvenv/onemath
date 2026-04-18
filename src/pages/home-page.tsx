import { useMemo, useState } from "react";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { problems } from "@/lib/problems";
import { GRADES, MODULES, type ModuleKey } from "@/lib/modules";
import { cn } from "@/lib/utils";
import type { ProblemData } from "@/types/problem";

export default function HomePage() {
  const moduleCounts = useMemo(() => {
    const counts = new Map<ModuleKey, number>();
    for (const p of problems) {
      counts.set(p.module, (counts.get(p.module) ?? 0) + 1);
    }
    return counts;
  }, []);

  const [activeModule, setActiveModule] = useState<ModuleKey | null>(null);

  const visibleProblems = useMemo(
    () =>
      activeModule
        ? problems.filter((p) => p.module === activeModule)
        : problems,
    [activeModule],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, ProblemData[]>();
    for (const p of visibleProblems) {
      const list = map.get(p.grade) ?? [];
      list.push(p);
      map.set(p.grade, list);
    }
    return map;
  }, [visibleProblems]);

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight">
          小学奥数 · 七大模块
        </h1>
        <p className="text-sm text-muted-foreground">
          按年级循序渐进，从典型应用题到综合建模，覆盖 计算 / 几何 / 数论 /
          应用题 / 行程 / 计数 / 杂题。
        </p>
      </section>

      <section className="flex flex-wrap gap-2">
        <ModuleChip
          label="全部"
          count={problems.length}
          active={activeModule === null}
          onClick={() => setActiveModule(null)}
        />
        {MODULES.map((m) => {
          const count = moduleCounts.get(m.key) ?? 0;
          const disabled = count === 0;
          return (
            <ModuleChip
              key={m.key}
              label={m.label}
              count={count}
              accent={m.accent}
              active={activeModule === m.key}
              disabled={disabled}
              onClick={() => setActiveModule(m.key)}
            />
          );
        })}
      </section>

      <div className="flex flex-col gap-4">
        {GRADES.map((grade) => {
          const list = grouped.get(grade.label);
          if (!list || list.length === 0) return null;
          return (
            <section key={grade.label} className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-base font-semibold tracking-tight">
                  {grade.label}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {grade.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {list.map((item) => (
                  <ProblemRow key={item.id} problem={item} />
                ))}
              </div>
            </section>
          );
        })}

        {visibleProblems.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            该模块暂无题目。
          </p>
        ) : null}
      </div>
    </div>
  );
}

type ModuleChipProps = {
  label: string;
  count: number;
  accent?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

function ModuleChip({
  label,
  count,
  accent,
  active,
  disabled,
  onClick,
}: ModuleChipProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "h-auto gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        "disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "bg-primary text-primary-foreground ring-primary hover:bg-primary hover:text-primary-foreground"
          : accent
            ? `${accent} hover:opacity-80`
            : "bg-muted text-foreground ring-border hover:bg-accent",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "rounded-full px-1.5 text-[10px] leading-4 tabular-nums",
          active ? "bg-primary-foreground/20" : "bg-background/60",
        )}
      >
        {count}
      </span>
    </Button>
  );
}

function ProblemRow({ problem }: { problem: ProblemData }) {
  const mod = MODULES.find((m) => m.key === problem.module)!;
  return (
    <Link
      to={`/problems/${problem.id}`}
      className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent"
    >
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate text-sm font-medium text-card-foreground group-hover:text-accent-foreground">
          {problem.title}
        </span>
        <span className="text-xs text-muted-foreground">
          #{problem.id} · {problem.tags.slice(0, 3).join(" / ")}
        </span>
      </div>
      <Badge
        variant="outline"
        className={cn("shrink-0 border-transparent ring-1", mod.accent)}
      >
        {mod.label}
      </Badge>
    </Link>
  );
}
