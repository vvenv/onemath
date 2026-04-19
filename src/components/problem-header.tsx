import { Link, useNavigate } from "react-router";
import { ArrowLeft, Dices, Shuffle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getModule, type ModuleKey } from "@/lib/modules";
import { getRandomProblem } from "@/lib/problems";
import { cn } from "@/lib/utils";

type ProblemHeaderProps = {
  id: string;
  title: string;
  grade?: string;
  module?: ModuleKey;
  tags?: string[];
};

export function ProblemHeader({
  id,
  title,
  grade,
  module,
  tags,
}: ProblemHeaderProps) {
  const navigate = useNavigate();
  const handleShuffle = () => {
    const next = getRandomProblem({ module, excludeId: id });
    if (next) navigate(`/p/${next.id}`);
  };
  const handleShuffleAll = () => {
    const next = getRandomProblem({ excludeId: id });
    if (next) navigate(`/p/${next.id}`);
  };
  const mod = module ? getModule(module) : undefined;
  const hasMeta = Boolean(grade || mod);
  const metaLabels = new Set(
    [grade, mod?.label].filter((v): v is string => Boolean(v)),
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
        <div className="ml-auto flex items-center gap-1">
          {mod ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleShuffle}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`换一道${mod.label}题`}
              title={`换一道${mod.label}题`}
            >
              <Shuffle />
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleShuffleAll}
            className="text-muted-foreground hover:text-foreground"
            aria-label="随机换一题（全部题目）"
            title="随机换一题（全部题目）"
          >
            <Dices />
          </Button>
        </div>
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
