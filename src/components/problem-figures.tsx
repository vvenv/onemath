import { cn } from "@/lib/utils";
import type { ProblemFigure } from "@/types/problem";

type ProblemFiguresProps = {
  figures: ProblemFigure[];
  className?: string;
};

export function ProblemFigures({ figures, className }: ProblemFiguresProps) {
  if (!figures.length) return null;
  return (
    <div
      className={cn(
        "grid gap-3",
        figures.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1",
        className,
      )}
    >
      {figures.map((figure, index) => (
        <figure
          key={index}
          className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border/70 bg-background/60 p-3 text-foreground"
        >
          <div
            className="flex w-full items-center justify-center [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-sm"
            role="img"
            aria-label={figure.alt ?? "题目配图"}
            dangerouslySetInnerHTML={{ __html: figure.svg }}
          />
        </figure>
      ))}
    </div>
  );
}
