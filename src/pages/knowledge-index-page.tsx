import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import { Link, type MetaFunction } from "react-router";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  knowledgeEntries,
  type KnowledgeCategory,
  type KnowledgeEntry,
} from "@/lib/knowledge";

export const meta: MetaFunction = () => [
  { title: "方法手册 - 一道 / edao.plus" },
  {
    name: "description",
    content:
      "一道(edao.plus) 方法手册：小学奥数常用解题方法与模型的直观讲解与例题。",
  },
];

const CATEGORY_ORDER: KnowledgeCategory[] = [
  "word",
  "counting",
  "geometry",
  "numberCalc",
  "magicSquare",
  "general",
];

const CATEGORY_LABEL: Record<KnowledgeCategory, string> = {
  counting: "计数",
  word: "应用题",
  numberCalc: "计算 / 数论",
  geometry: "几何",
  magicSquare: "幻方",
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
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight">
            方法手册
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          按模块收录小学奥数常用的解题方法与几何模型。点任意条目查看直观场景、推导与例题。
        </p>
      </header>

      <Accordion
        type="multiple"
        defaultValue={visibleCategories}
        className="gap-2"
      >
        {visibleCategories.map((cat) => {
          const list = grouped.get(cat)!;
          return (
            <AccordionItem
              key={cat}
              value={cat}
              className="not-last:border-b-0"
            >
              <AccordionTrigger className="items-center gap-3 py-2 hover:no-underline">
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
              </AccordionTrigger>
              <AccordionContent className="h-auto px-px pt-1 pb-3 [&_a]:no-underline">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {list.map((entry) => (
                    <Link
                      key={entry.slug}
                      to={`/k/${entry.slug}`}
                      className="group no-underline"
                    >
                      <Card
                        size="sm"
                        className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                            <span className="group-hover:text-primary">
                              {entry.name}
                            </span>
                            {entry.tag && entry.tag !== entry.name ? (
                              <Badge variant="outline" className="font-normal">
                                #{entry.tag}
                              </Badge>
                            ) : null}
                          </CardTitle>
                          <CardDescription>{entry.summary}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0" />
                      </Card>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
