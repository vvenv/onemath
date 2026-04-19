import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getModule, type ModuleKey } from "@/lib/modules";
import { cn } from "@/lib/utils";

type ProblemHeaderProps = {
  id: number;
  title: string;
  grade?: string;
  module?: ModuleKey;
  topic?: string;
  tags?: string[];
};

export function ProblemHeader({
  id,
  title,
  grade,
  module,
  topic,
  tags,
}: ProblemHeaderProps) {
  const mod = module ? getModule(module) : undefined;
  const hasMeta = Boolean(grade || mod || topic);
  const metaLabels = new Set(
    [grade, mod?.label, topic].filter((v): v is string => Boolean(v)),
  );
  const extraTags = (tags ?? []).filter((t) => !metaLabels.has(t));
  const hasTags = extraTags.length > 0;

  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          title="返回题库"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <span className="text-sm font-medium text-muted-foreground tabular-nums">
          #{id}
        </span>
        <h1 className="font-heading text-xl leading-tight font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      {hasMeta ? (
        <div className="flex flex-wrap gap-1.5">
          {grade ? (
            <Badge variant="secondary" className="font-normal">
              {grade}
            </Badge>
          ) : null}
          {mod ? (
            <Badge
              variant="outline"
              className={cn(
                "border-transparent ring-1 font-normal",
                mod.accent,
              )}
            >
              {mod.label}
            </Badge>
          ) : null}
          {topic ? (
            <Badge variant="outline" className="font-normal">
              {topic}
            </Badge>
          ) : null}
        </div>
      ) : null}
      {hasTags ? (
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {extraTags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      ) : null}
    </header>
  );
}
