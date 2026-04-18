import { Link, useNavigate } from "react-router";
import { ArrowLeft, Dices, Heart, Shuffle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/share-button";
import { getModule, type ModuleKey } from "@/lib/modules";
import { getRandomProblem } from "@/lib/problems-index";
import { isFavorited, toggleFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";

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
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorited(id, "problem"));
  }, [id]);

  const handleFavoriteToggle = () => {
    const newState = toggleFavorite(id, "problem");
    setFavorited(newState);
  };

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

  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="返回题库"
        >
          <Link to="/p">
            <ArrowLeft />
          </Link>
        </Button>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          #{id}
        </span>
        <h1 className="font-heading text-2xl leading-tight font-semibold tracking-tight">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {mod ? (
          <Badge asChild variant="secondary" className="font-normal">
            <Link to={`/p?module=${encodeURIComponent(mod.key)}`}>
              {mod.label}
            </Link>
          </Badge>
        ) : null}
        {grade ? (
          <Badge asChild variant="outline" className="font-normal">
            <Link to={`/p?grade=${encodeURIComponent(grade)}`}>{grade}</Link>
          </Badge>
        ) : null}
        {extraTags.map((t) => (
          <Badge key={t} asChild variant="outline" className="font-normal">
            <Link to={`/p?tag=${encodeURIComponent(t)}`}>#{t}</Link>
          </Badge>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <ShareButton
            title={`${title} (#${id}) - 一道+`}
            url={
              typeof window !== "undefined"
                ? `${window.location.origin}/p/${id}`
                : ""
            }
            text={`${grade ? grade + "数学" : ""}${mod?.label ? mod?.label : ""}：${title}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleFavoriteToggle}
            className={
              favorited
                ? "text-primary hover:text-red-600"
                : "text-muted-foreground hover:text-foreground"
            }
            aria-label={favorited ? "取消收藏" : "收藏"}
            title={favorited ? "取消收藏" : "收藏"}
          >
            <Heart className={favorited ? "fill-current" : ""} />
          </Button>
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
