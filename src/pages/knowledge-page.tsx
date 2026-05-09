import {
  ArrowLeft,
  BookOpen,
  Heart,
  Lightbulb,
  ListChecks,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Link, Navigate, useParams, type MetaFunction } from "react-router";

import { KnowledgeFigures } from "@/components/knowledge-figures";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/share-button";
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
} from "@/data/knowledge";
import { buildMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { isFavorited, toggleFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";
import type { KnowledgeEntry } from "@/types/knowledge";

export const meta: MetaFunction = ({ params }) => {
  const slug = params.slug as string | undefined;
  const entry = getKnowledgeBySlug(slug);
  if (!entry) {
    return buildMeta({
      title: "知识点 - 一道+ / edao.plus",
      description: "小学奥数知识点讲解",
      path: "/k",
    });
  }
  const description = entry.summary.replace(/\s+/g, " ").slice(0, 160);
  return buildMeta({
    title: `${entry.name} - 知识点 - 一道+ / edao.plus`,
    description,
    path: `/k/${entry.slug}`,
    type: "article",
    keywords: entry.tag ? [entry.tag] : undefined,
  });
};

export default function KnowledgePage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = getKnowledgeBySlug(slug) ?? null;
  const problems = entry ? getProblemsForKnowledge(entry) : [];
  const related: KnowledgeEntry[] = entry
    ? (entry.relatedSlugs ?? [])
        .map((s) => knowledgeEntries.find((e) => e.slug === s))
        .filter((e): e is KnowledgeEntry => Boolean(e))
    : [];

  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (slug) {
      setFavorited(isFavorited(slug, "knowledge"));
    }
  }, [slug]);

  const handleFavoriteToggle = () => {
    if (slug) {
      const newState = toggleFavorite(slug, "knowledge");
      setFavorited(newState);
    }
  };

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
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
            <h1 className="text-2xl leading-tight font-semibold tracking-tight">
              {entry.name}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <ShareButton
              title={`${entry.name} - 知识点讲解 - 一道+`}
              url={typeof window !== "undefined" ? window.location.href : ""}
              text={entry.summary}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleFavoriteToggle}
              className={
                favorited
                  ? "text-primary hover:text-red-600"
                  : "text-muted-foreground hover:text-foreground"
              }
              aria-label={favorited ? "取消收藏" : "收藏"}
              title={favorited ? "取消收藏" : "收藏"}
            >
              <Heart className={favorited ? "fill-current" : ""} />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">{entry.summary}</p>
      </header>

      <Section icon={<Sparkles className="size-4" />} title="直观场景">
        <p className="leading-relaxed text-foreground/90">{entry.intuition}</p>
        {entry.figures && entry.figures.length > 0 ? (
          <KnowledgeFigures figures={entry.figures} className="mt-3" />
        ) : null}
      </Section>

      <Section icon={<ListChecks className="size-4" />} title="推导思路">
        <ol className="list-decimal list-inside marker:text-foreground/50">
          {entry.derivation.map((step) => (
            <li key={step} className="leading-loose only:list-none">
              {step}
            </li>
          ))}
        </ol>
        {entry.keyPoints && entry.keyPoints.length > 0 ? (
          <div className="mt-3 rounded-lg bg-muted/50 p-3">
            <p className="mb-1 font-semibold tracking-wide text-muted-foreground">
              公式 / 要点
            </p>
            <ul className="list-disc list-inside">
              {entry.keyPoints.map((k) => (
                <li key={k} className="leading-loose only:list-none">
                  {k}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <Section
        icon={<Lightbulb className="size-4" />}
        title="典型例题"
        seamless
      >
        <div className="flex flex-col gap-3">
          {entry.examples.map(
            (ex: (typeof entry.examples)[number], i: number) => (
              <Card key={i}>
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
                  <ol className="list-decimal list-inside marker:text-foreground/50">
                    {ex.solution.map((line: string) => (
                      <li key={line} className="leading-loose only:list-none">
                        {line}
                      </li>
                    ))}
                  </ol>
                  {ex.takeaway ? (
                    <p className="mt-3 rounded-md bg-muted/40 text-foreground/80">
                      <span className="font-medium text-foreground">
                        小结：
                      </span>
                      {ex.takeaway}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </Section>

      {entry.pitfalls && entry.pitfalls.length > 0 ? (
        <Section icon={<TriangleAlert className="size-4" />} title="常见误区">
          <ul className="list-disc list-inside">
            {entry.pitfalls.map((p: string, i: number) => (
              <li key={i} className="leading-loose only:list-none">
                {p}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {problems.length > 0 ? (
        <Section
          icon={<BookOpen className="size-4" />}
          title={`用到「${entry.name}」的题目`}
          seamless
        >
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
                    <span className="truncate font-medium text-card-foreground group-hover:text-primary">
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
        </Section>
      ) : null}

      {related.length > 0 ? (
        <section className="flex flex-col gap-2">
          <h2 className="font-semibold tracking-tight text-foreground">
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
  seamless,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  seamless?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-1.5 font-semibold tracking-tight text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {title}
      </h2>
      {seamless ? (
        children
      ) : (
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      )}
    </section>
  );
}
