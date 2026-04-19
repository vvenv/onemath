import { BookOpen } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
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
};

function resolvePoints(
  points: KnowledgePoint[] | undefined,
  tags: string[] | undefined,
): ResolvedPoint[] {
  if (points && points.length > 0) {
    return points.map((p) => ({
      key: p.slug,
      name: p.name,
      summary: p.summary,
    }));
  }
  const fromTags = (tags ?? []).filter((t) => TAG_WHITELIST.has(t));
  return fromTags.map((name) => ({ key: name, name }));
}

export function KnowledgePoints({ points, tags }: KnowledgePointsProps) {
  const resolved = resolvePoints(points, tags);
  if (resolved.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold tracking-tight text-foreground">
        知识点
      </h2>
      <Card size="sm">
        <CardContent>
          <Accordion type="single" collapsible className="flex flex-col">
            {resolved.map((point) => (
              <AccordionItem key={point.key} value={point.key}>
                <AccordionTrigger className="gap-2 py-2.5">
                  <span className="flex items-center gap-2">
                    <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium">{point.name}</span>
                    {point.summary ? (
                      <span className="text-xs font-normal text-muted-foreground">
                        {point.summary}
                      </span>
                    ) : null}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <p>
                    讲解内容正在整理中，敬请期待。想第一时间看到「{point.name}
                    」的直观推导与例题，可以先把这道题收藏起来。
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
