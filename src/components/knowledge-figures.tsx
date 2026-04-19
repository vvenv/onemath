import type { KnowledgeFigure } from "@/lib/knowledge/types";
import { cn } from "@/lib/utils";

type KnowledgeFiguresProps = {
  figures: KnowledgeFigure[];
  className?: string;
};

export function KnowledgeFigures({ figures, className }: KnowledgeFiguresProps) {
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
          <FigureBody figure={figure} />
          {figure.caption ? (
            <figcaption className="text-center text-xs text-muted-foreground">
              {figure.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

function FigureBody({ figure }: { figure: KnowledgeFigure }) {
  const ariaLabel = figure.alt ?? figure.caption ?? "配图";
  if ("svg" in figure) {
    return (
      <div
        className="flex w-full items-center justify-center [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-sm"
        role="img"
        aria-label={ariaLabel}
        dangerouslySetInnerHTML={{ __html: figure.svg }}
      />
    );
  }
  if ("image" in figure) {
    return (
      <img
        src={figure.image}
        alt={figure.alt ?? figure.caption ?? ""}
        className="h-auto w-full max-w-sm"
      />
    );
  }
  const Component = figure.component;
  return (
    <div
      className="flex w-full items-center justify-center [&>svg]:h-auto [&>svg]:w-full [&>svg]:max-w-sm"
      role="img"
      aria-label={ariaLabel}
    >
      <Component />
    </div>
  );
}
