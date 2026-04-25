import { BookOpen, ChevronDown } from "lucide-react";
import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { resolveKnowledge } from "@/data/knowledge";
import { TAG_WHITELIST } from "@/lib/tags";
import type { KnowledgePoint } from "@/types/problem";

type KnowledgePointsProps = {
  points?: KnowledgePoint[];
  tags?: string[];
};

type ResolvedPoint = {
  key: string;
  name: string;
  summary?: string;
  /** slug of an authored knowledge page, if available */
  knowledgeSlug?: string;
};

function resolvePoints(
  points: KnowledgePoint[] | undefined,
  tags: string[] | undefined,
): ResolvedPoint[] {
  if (points && points.length > 0) {
    return points.map((p) => {
      const entry = resolveKnowledge({ slug: p.slug, name: p.name });
      return {
        key: p.slug,
        name: p.name,
        summary: p.summary ?? entry?.summary,
        knowledgeSlug: entry?.slug,
      };
    });
  }
  const fromTags = (tags ?? []).filter((t) => TAG_WHITELIST.has(t));
  return fromTags.map((name) => {
    const entry = resolveKnowledge(name);
    return {
      key: name,
      name,
      summary: entry?.summary,
      knowledgeSlug: entry?.slug,
    };
  });
}

export function KnowledgePoints({ points, tags }: KnowledgePointsProps) {
  const resolved = resolvePoints(points, tags);
  if (resolved.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold tracking-tight text-foreground">知识点</h2>
      <Card>
        <CardContent>
          <div className="flex flex-col">
            {resolved.map((point) =>
              point.knowledgeSlug ? (
                <Link
                  key={point.key}
                  to={`/k/${point.knowledgeSlug}`}
                  className="group flex items-center gap-2 border-b py-2.5 last:border-b-0"
                >
                  <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                  <span className="font-medium group-hover:text-primary whitespace-nowrap">
                    {point.name}
                  </span>
                  {point.summary ? (
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {point.summary}
                    </span>
                  ) : null}
                </Link>
              ) : (
                <Collapsible
                  key={point.key}
                  className="border-b last:border-b-0"
                >
                  <CollapsibleTrigger className="group flex w-full items-center gap-2 py-2.5 text-left font-medium">
                    <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium">{point.name}</span>
                    {point.summary ? (
                      <span className="text-xs font-normal text-muted-foreground">
                        {point.summary}
                      </span>
                    ) : null}
                    <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-2.5 text-muted-foreground">
                    <p>
                      讲解内容正在整理中，敬请期待。想第一时间看到「
                      {point.name}」的直观推导与例题，可以先把这道题收藏起来。
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
