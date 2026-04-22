import { Link, useNavigate } from "react-router";
import { ArrowLeft, Dices, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getModule, type ModuleKey } from "@/lib/modules";
import { getRandomProblem } from "@/lib/problems";

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
  const metaLabels = new Set(
    [grade, mod?.label].filter((v): v is string => Boolean(v)),
  );
  const extraTags = (tags ?? []).filter((t) => !metaLabels.has(t));
  type MetaLink = { key: string; label: string; to: string };
  const metaLinks: MetaLink[] = [];
  if (grade)
    metaLinks.push({
      key: "grade",
      label: grade,
      to: `/?grade=${encodeURIComponent(grade)}`,
    });
  if (mod)
    metaLinks.push({
      key: "module",
      label: mod.label,
      to: `/?module=${encodeURIComponent(mod.key)}`,
    });
  for (const t of extraTags)
    metaLinks.push({
      key: `tag:${t}`,
      label: t,
      to: `/?tag=${encodeURIComponent(t)}`,
    });

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
      <div className="flex items-center gap-2">
        {metaLinks.length > 0 ? (
          <div className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
            {metaLinks.map((m, i) => (
              <span key={m.key}>
                {i > 0 ? (
                  <span className="mx-1 text-muted-foreground/60">·</span>
                ) : null}
                <Link
                  to={m.to}
                  className="transition-colors hover:text-foreground hover:underline"
                >
                  {m.label}
                </Link>
              </span>
            ))}
          </div>
        ) : (
          <div className="flex-1" />
        )}
        <div className="flex items-center gap-1">
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
    </header>
  );
}
