import { Link, useLocation } from "react-router";
import { BookOpen, Clock, Heart, ListFilter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { GlobalSearch } from "./global-search";
import { Logo } from "./logo";
import {
  clearRecentProblems,
  getRecentProblemIds,
  removeRecentProblem,
} from "@/lib/recent-problems";
import {
  clearFavorites,
  getFavoritesList,
  removeFavorite,
} from "@/lib/favorites";
import { getKnowledgeIndexBySlug, knowledgeIndex } from "@/lib/knowledge-index";
import { getProblemIndexById, problemsIndex } from "@/lib/problems-index";
import { useEffect, useState, startTransition } from "react";

export function AppBar() {
  const [recentOpen, setRecentOpen] = useState(false);
  const [recentProblemIds, setRecentProblemIds] = useState<string[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState(getFavoritesList());
  const location = useLocation();

  useEffect(() => {
    setRecentProblemIds(getRecentProblemIds());
  }, [location.pathname]);

  useEffect(() => {
    if (recentOpen) {
      setRecentProblemIds(getRecentProblemIds());
    }
  }, [recentOpen]);

  useEffect(() => {
    if (favoritesOpen) {
      setFavorites(getFavoritesList());
    }
  }, [favoritesOpen]);

  const recentProblems = recentProblemIds
    .map((id) => getProblemIndexById(id))
    .filter((p): p is (typeof problemsIndex)[number] => p !== undefined);

  const favoriteProblems = favorites
    .filter((f) => f.type === "problem")
    .map((f) => getProblemIndexById(f.id))
    .filter((p): p is (typeof problemsIndex)[number] => p !== undefined);

  const favoriteKnowledge = favorites
    .filter((f) => f.type === "knowledge")
    .map((f) => getKnowledgeIndexBySlug(f.id))
    .filter((e): e is (typeof knowledgeIndex)[number] => e !== undefined);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div className="relative mx-auto flex h-14 w-full max-w-3xl items-center gap-3 px-4">
          <Link
            to="/"
            aria-label="返回 edao.plus 首页"
            className="flex min-w-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo />
            <span className="truncate">
              <span className="text-base font-semibold tracking-tight">
                一道<sup>+</sup> / edao.plus
              </span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1">
            <GlobalSearch />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => startTransition(() => setRecentOpen(true))}
              className="text-muted-foreground hover:text-foreground"
              aria-label="最近看过"
              title="最近看过"
            >
              <Clock />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => startTransition(() => setFavoritesOpen(true))}
              className="text-muted-foreground hover:text-foreground"
              aria-label="收藏"
              title="收藏"
            >
              <Heart />
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label="题目列表"
              title="题目列表"
            >
              <Link to="/p">
                <ListFilter />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label="方法手册"
              title="方法手册"
            >
              <Link to="/k">
                <BookOpen />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={favoritesOpen} onOpenChange={setFavoritesOpen}>
        <SheetContent side="right">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <SheetTitle className="flex items-center gap-2 text-base font-semibold">
              <Heart className="size-4" />
              收藏
            </SheetTitle>
            <SheetDescription>收藏的题目</SheetDescription>
            <div className="flex items-center gap-2">
              {favorites.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearFavorites();
                    setFavorites([]);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  清空
                </Button>
              )}
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="关闭"
                >
                  <X className="size-4" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-4">
            {favoriteProblems.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-muted-foreground">
                  题目
                </h3>
                <div className="flex flex-col gap-2">
                  {favoriteProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all hover:border-primary/40 hover:shadow-md"
                    >
                      <Link
                        to={`/p/${problem.id}`}
                        onClick={() =>
                          startTransition(() => setFavoritesOpen(false))
                        }
                        className="flex min-w-0 flex-1 flex-col gap-1"
                      >
                        <span className="truncate text-base font-semibold text-card-foreground group-hover:text-primary">
                          <span className="font-normal text-muted-foreground">
                            #{problem.id}
                          </span>{" "}
                          {problem.title}
                        </span>
                        <div className="truncate text-xs text-muted-foreground">
                          {problem.grade} · {problem.module}
                        </div>
                      </Link>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFavorite(problem.id, "problem");
                          setFavorites(getFavoritesList());
                        }}
                        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label={`移除 ${problem.title}`}
                      >
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {favoriteKnowledge.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-muted-foreground">
                  知识点
                </h3>
                <div className="flex flex-col gap-2">
                  {favoriteKnowledge.map((entry) => (
                    <div
                      key={entry.slug}
                      className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all hover:border-primary/40 hover:shadow-md"
                    >
                      <Link
                        to={`/k/${entry.slug}`}
                        onClick={() =>
                          startTransition(() => setFavoritesOpen(false))
                        }
                        className="flex min-w-0 flex-1 flex-col gap-1"
                      >
                        <span className="truncate text-base font-semibold text-card-foreground group-hover:text-primary">
                          {entry.name}
                        </span>
                        <div className="truncate text-xs text-muted-foreground">
                          {entry.summary}
                        </div>
                      </Link>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFavorite(entry.slug, "knowledge");
                          setFavorites(getFavoritesList());
                        }}
                        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label={`移除 ${entry.name}`}
                      >
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {favorites.length === 0 && (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border/70 py-8 text-center">
                <Heart className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium">暂无收藏</p>
                <p className="text-xs text-muted-foreground">
                  收藏题目和知识点后会显示在这里
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={recentOpen} onOpenChange={setRecentOpen}>
        <SheetContent side="right">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <SheetTitle className="flex items-center gap-2 text-base font-semibold">
              <Clock className="size-4" />
              最近看过
            </SheetTitle>
            <div className="flex items-center gap-2">
              {recentProblems.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearRecentProblems();
                    setRecentProblemIds([]);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  清空
                </Button>
              )}
              <SheetDescription className="text-xs">
                最多 15 条
              </SheetDescription>
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="关闭"
                >
                  <X className="size-4" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-2 overflow-y-auto px-4 pb-4">
            {recentProblems.length > 0 ? (
              recentProblems.map((problem) => (
                <div
                  key={problem.id}
                  className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-border/70 bg-card p-3 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <Link
                    to={`/p/${problem.id}`}
                    onClick={() => startTransition(() => setRecentOpen(false))}
                    className="flex min-w-0 flex-1 flex-col gap-1"
                  >
                    <span className="truncate text-base font-semibold text-card-foreground group-hover:text-primary">
                      <span className="font-normal text-muted-foreground">
                        #{problem.id}
                      </span>{" "}
                      {problem.title}
                    </span>
                    <div className="truncate text-xs text-muted-foreground">
                      {problem.grade} · {problem.module}
                    </div>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      removeRecentProblem(problem.id);
                      setRecentProblemIds(getRecentProblemIds());
                    }}
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`移除 ${problem.title}`}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border/70 py-8 text-center">
                <Clock className="size-6 text-muted-foreground" />
                <p className="text-sm font-medium">暂无最近访问记录</p>
                <p className="text-xs text-muted-foreground">
                  浏览题目后会显示在这里
                </p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
