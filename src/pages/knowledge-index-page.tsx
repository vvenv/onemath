import { useMemo } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { Link, type MetaFunction } from "react-router";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  knowledgeEntries,
  type KnowledgeCategory,
  type KnowledgeEntry,
} from "@/data/knowledge";
import { SITE_NAME, SITE_URL, buildMeta } from "@/lib/seo";

const KNOWLEDGE_INDEX_TITLE = "方法手册 - 一道+ / edao.plus";
const KNOWLEDGE_INDEX_DESCRIPTION =
  "一道+(edao.plus) 方法手册：小学奥数常用解题方法与几何模型的直观讲解、推导与典型例题。";

export const meta: MetaFunction = () =>
  buildMeta({
    title: KNOWLEDGE_INDEX_TITLE,
    description: KNOWLEDGE_INDEX_DESCRIPTION,
    path: "/k",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: KNOWLEDGE_INDEX_TITLE,
      description: KNOWLEDGE_INDEX_DESCRIPTION,
      url: `${SITE_URL}/k`,
      inLanguage: "zh-CN",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  });

const CATEGORY_ORDER: KnowledgeCategory[] = [
  "word",
  "travel",
  "counting",
  "geometry",
  "numberCalc",
  "magicSquare",
  "planning",
  "general",
];

const CATEGORY_LABEL: Record<KnowledgeCategory, string> = {
  counting: "计数",
  word: "应用题",
  travel: "行程",
  numberCalc: "计算 / 数论",
  geometry: "几何",
  magicSquare: "幻方",
  planning: "统筹规划",
  general: "通用思想",
};

export default function KnowledgeIndexPage() {
  const grouped = useMemo(() => {
    const map = new Map<KnowledgeCategory, KnowledgeEntry[]>();
    for (const e of knowledgeEntries) {
      const list = map.get(e.category) ?? [];
      list.push(e);
      map.set(e.category, list);
    }
    return map;
  }, []);

  const visibleCategories = useMemo(
    () => CATEGORY_ORDER.filter((cat) => (grouped.get(cat)?.length ?? 0) > 0),
    [grouped],
  );

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight">
            方法手册
          </h1>
        </div>
        <p className="text-muted-foreground">
          按模块收录小学奥数常用的解题方法与几何模型。点任意条目查看直观场景、推导与例题。
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {visibleCategories.map((cat) => {
          const list = grouped.get(cat)!;
          return (
            <Collapsible key={cat} defaultOpen>
              <CollapsibleTrigger className="group flex w-full items-center gap-3 py-2">
                <div className="flex flex-1 items-center gap-2">
                  <h2 className="font-heading text-lg font-semibold tracking-tight">
                    {CATEGORY_LABEL[cat]}
                  </h2>
                  <Badge
                    variant="outline"
                    className="h-5 rounded-full px-2 text-[11px] tabular-nums"
                  >
                    {list.length}
                  </Badge>
                </div>
                <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {list.map((entry) => (
                    <Link
                      key={entry.slug}
                      to={`/k/${entry.slug}`}
                      className="group no-underline"
                    >
                      <div className="h-full rounded-xl border border-border/70 p-4 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                        <h3 className="text-sm font-semibold leading-none group-hover:text-primary">
                          {entry.name}
                          {entry.tag && entry.tag !== entry.name ? (
                            <Badge variant="outline" className="font-normal">
                              #{entry.tag}
                            </Badge>
                          ) : null}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {entry.summary}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
