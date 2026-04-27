import { BookOpen } from "lucide-react";
import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { resolveKnowledge } from "@/data/knowledge";
import type { KnowledgePoint } from "@/types/problem";

type KnowledgePointsProps = {
  points: KnowledgePoint[];
};

type ResolvedPoint = {
  key: string;
  name: string;
  summary?: string;
  knowledgeSlug: string;
};

function resolvePoints(points: KnowledgePoint[]): ResolvedPoint[] {
  const resolved: ResolvedPoint[] = [];
  for (const p of points) {
    const entry = resolveKnowledge({ slug: p.slug, name: p.name });
    if (!entry) continue;
    resolved.push({
      key: p.slug,
      name: p.name,
      summary: p.summary ?? entry.summary,
      knowledgeSlug: entry.slug,
    });
  }
  return resolved;
}

export function KnowledgePoints({ points }: KnowledgePointsProps) {
  const resolved = resolvePoints(points);
  if (resolved.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold tracking-tight text-foreground">知识点</h2>
      <Card>
        <CardContent>
          <div className="flex flex-col">
            {resolved.map((point) => (
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
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
