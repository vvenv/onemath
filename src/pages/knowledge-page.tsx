import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  ListChecks,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Link, Navigate, useParams, type MetaFunction } from "react-router";

import { ProblemFigures } from "@/components/problem-figures";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getModule } from "@/lib/modules";
import {
  getKnowledgeBySlug,
  getProblemsForKnowledge,
  knowledgeEntries,
  type KnowledgeEntry,
} from "@/lib/knowledge";
import { cn } from "@/lib/utils";

export const meta: MetaFunction = ({ params }) => {
  const entry = getKnowledgeBySlug(params.slug as string | undefined);
  if (!entry) return [{ title: "知识点未找到 - 一道 / edao.plus" }];
  return [
    { title: `${entry.name} - 知识点讲解 - 一道 / edao.plus` },
    { name: "description", content: entry.summary },
  ];
};

const CATEGORY_LABEL: Record<KnowledgeEntry["category"], string> = {
  counting: "计数",
  word: "应用题",
  numberCalc: "计算 / 数论",
  geometry: "几何",
  magicSquare: "幻方",
  general: "通用思想",
};

export default function KnowledgePage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = getKnowledgeBySlug(slug);

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  const problems = getProblemsForKnowledge(entry);
  const related = (entry.relatedSlugs ?? [])
    .map((s) => knowledgeEntries.find((e) => e.slug === s))
    .filter((e): e is KnowledgeEntry => Boolean(e));

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            aria-label="返回题库"
          >
            <Link to="/k">
              <ArrowLeft />
            </Link>
          </Button>
          <Badge variant="secondary" className="font-normal">
            {CATEGORY_LABEL[entry.category]}
          </Badge>
          {entry.tag ? (
            <Badge variant="outline" className="font-normal">
              #{entry.tag}
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight">
            {entry.name}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{entry.summary}</p>
      </header>

      <Section icon={<Sparkles className="size-4" />} title="直观场景">
        <p className="text-sm leading-relaxed text-foreground/90">
          {entry.intuition}
        </p>
        {entry.figures && entry.figures.length > 0 ? (
          <ProblemFigures figures={entry.figures} className="mt-3" />
        ) : null}
      </Section>

      <Section icon={<ListChecks className="size-4" />} title="推导思路">
        <ol className="flex list-none flex-col gap-2 text-sm leading-relaxed text-foreground/90">
          {entry.derivation.map((step, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {entry.keyPoints && entry.keyPoints.length > 0 ? (
          <div className="mt-3 rounded-lg bg-muted/50 p-3">
            <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground">
              公式 / 要点
            </p>
            <ul className="flex flex-col gap-1 text-sm text-foreground/90">
              {entry.keyPoints.map((k, i) => (
                <li key={i}>· {k}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <Section icon={<Lightbulb className="size-4" />} title="典型例题">
        <div className="flex flex-col gap-3">
          {entry.examples.map((ex, i) => (
            <Card key={i} size="sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold tabular-nums text-primary">
                    {i + 1}
                  </span>
                  {ex.title ?? `例 ${i + 1}`}
                </CardTitle>
                <CardDescription className="text-foreground/80">
                  {ex.problem}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="flex list-none flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
                  {ex.solution.map((line, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
                {ex.takeaway ? (
                  <p className="mt-3 rounded-md bg-muted/40 px-3 py-2 text-xs text-foreground/80">
                    <span className="font-medium text-foreground">小结：</span>
                    {ex.takeaway}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {entry.pitfalls && entry.pitfalls.length > 0 ? (
        <Section icon={<TriangleAlert className="size-4" />} title="常见误区">
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {entry.pitfalls.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-amber-500/70" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {problems.length > 0 ? (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            用到「{entry.name}」的题目
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {problems.map((p) => {
              const mod = getModule(p.module);
              return (
                <Link
                  key={p.id}
                  to={`/p/${p.id}`}
                  className="group flex items-start gap-3 rounded-xl border border-border/70 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-sm font-medium text-card-foreground group-hover:text-primary">
                      <span className="text-muted-foreground">#{p.id}</span>{" "}
                      {p.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "h-5 border-transparent px-1.5 text-[10px] ring-1 ring-inset",
                          mod.accent,
                        )}
                      >
                        {mod.label}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {p.grade}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            相关知识点
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Button
                key={r.slug}
                asChild
                variant="outline"
                size="sm"
                className="h-8 rounded-full"
              >
                <Link to={`/k/${r.slug}`}>
                  <BookOpen className="size-3.5" />
                  {r.name}
                </Link>
              </Button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {title}
      </h2>
      <Card size="sm">
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}
