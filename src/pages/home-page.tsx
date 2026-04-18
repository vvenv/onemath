import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, BookOpen, ListFilter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SvgFigure } from "@/components/visuals/svg-figure";
import {
  getDefaultFiguredProblem,
  getRandomFiguredProblem,
} from "@/lib/figured-problems";
import { knowledgeIndex } from "@/lib/knowledge-index";
import { problemsIndex } from "@/lib/problems-index";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, buildMeta } from "@/lib/seo";
import type { FiguredProblemEntry } from "@/types/figured-problem";
import type { MetaFunction } from "react-router";

const HOME_TITLE = "一道+ / edao.plus - 小学数学思维训练";

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
        alternateName: ["一道+", "edao.plus"],
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

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            小学数学思维训练题库
          </h1>
          <p className="text-muted-foreground">
            按小学奥数体系整理，每题配可视化解法与知识点讲解。
          </p>
          <p className="text-xs tabular-nums text-muted-foreground">
            已收录 {problemsIndex.length} 题 · {knowledgeIndex.length} 种方法
          </p>
        </div>
        <FeaturedProblem />
      </section>

      <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <EntryCard
          to="/p"
          icon={<ListFilter className="size-7" />}
          title="题目列表"
          description="按模块、年级、难度和方法筛选全部题目。"
        />
        <EntryCard
          to="/k"
          icon={<BookOpen className="size-7" />}
          title="方法手册"
          description="小学奥数常用解题方法与几何模型。"
        />
      </section>
    </div>
  );
}

function EntryCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex p-2 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center justify-between gap-2 text-base font-semibold text-card-foreground group-hover:text-primary">
          {title}
          <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </span>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function FeaturedProblem() {
  // Initial state is a deterministic per-deploy pick so SSR HTML is stable
  // and hydration-safe. User explicitly reshuffles via the refresh button.
  const [featured, setFeatured] = useState<FiguredProblemEntry | undefined>(
    () => getDefaultFiguredProblem(),
  );

  if (!featured) return null;
  const fig = featured.figures?.[0];
  if (!fig) return null;

  const reshuffle = () => {
    const next = getRandomFiguredProblem(featured.id);
    if (next) setFeatured(next);
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={reshuffle}
        aria-label="换一道"
        className="absolute right-2 top-2 z-10 text-muted-foreground hover:text-foreground"
      >
        <RefreshCw className="size-4" />
      </Button>
      <Link
        to={`/p/${featured.id}`}
        aria-label={`查看示例题：${featured.title}`}
        className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-border/70 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-md"
      >
        <div className="flex aspect-square w-full items-center justify-center">
          <SvgFigure
            svg={fig.svg}
            alt={fig.alt}
            className="size-full [&>svg]:size-full"
          />
        </div>
        <div className="-mx-4 -mb-4 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="truncate">
            <span className="font-normal text-muted-foreground/70">
              #{featured.id}
            </span>{" "}
            <span className="text-card-foreground">{featured.title}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-muted-foreground group-hover:text-primary">
            看解题过程
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
