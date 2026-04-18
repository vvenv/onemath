import { BookOpen } from "lucide-react";
import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { getKnowledgeIndexByTag } from "@/lib/knowledge-index";

type MethodsProps = {
  tags: string[];
};

type ResolvedMethod = {
  tag: string;
  slug: string;
  summary?: string;
};

function resolve(tags: string[]): ResolvedMethod[] {
  const seen = new Set<string>();
  const out: ResolvedMethod[] = [];
  for (const tag of tags) {
    const entry = getKnowledgeIndexByTag(tag);
    if (!entry || seen.has(entry.slug)) continue;
    seen.add(entry.slug);
    out.push({ tag, slug: entry.slug, summary: entry.summary });
  }
  return out;
}

export function Methods({ tags }: MethodsProps) {
  const resolved = resolve(tags);
  if (resolved.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold tracking-tight text-foreground">方法</h2>
      <Card>
        <CardContent>
          <div className="flex flex-col">
            {resolved.map((m) => (
              <Link
                key={m.slug}
                to={`/k/${m.slug}`}
                className="group flex items-center gap-2 border-b py-2.5 last:border-b-0"
              >
                <BookOpen className="size-4 shrink-0 text-muted-foreground" />
                <span className="font-medium group-hover:text-primary whitespace-nowrap">
                  {m.tag}
                </span>
                {m.summary ? (
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {m.summary}
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
