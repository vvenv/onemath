import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { getModule } from "@/lib/modules";
import { getRelatedProblems } from "@/lib/problems-index";
import { cn } from "@/lib/utils";

type RelatedProblemsProps = {
  id: string;
  limit?: number;
};

export function RelatedProblems({ id, limit = 2 }: RelatedProblemsProps) {
  const related = getRelatedProblems(id, limit);
  if (related.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold tracking-tight text-foreground">相关题目</h2>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {related.map((p) => {
          const mod = getModule(p.module);
          return (
            <Link
              key={p.id}
              to={`/p/${p.id}`}
              className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 no-underline transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate font-medium text-card-foreground group-hover:text-primary">
                  <span className="text-muted-foreground">#{p.id}</span>{" "}
                  {p.title}
                </span>
                {p.tags.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-muted-foreground">
                    <span className="truncate">
                      {p.tags.slice(0, 3).join(" / ")}
                    </span>
                  </div>
                ) : null}
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className={cn(
                      "h-5 border-transparent px-1.5 text-[10px] ring-1 ring-inset",
                      mod.accent,
                    )}
                  >
                    {mod.label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="h-5 border-transparent px-1.5 text-[10px] ring-1 ring-inset"
                  >
                    {p.grade}
                  </Badge>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
