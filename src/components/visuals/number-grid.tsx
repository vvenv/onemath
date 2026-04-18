import { cn } from "@/lib/utils";
import type { NumberGridSpec } from "@/types/visual";

const TONE_CLASS: Record<
  NonNullable<NumberGridSpec["cells"][number]["tone"]>,
  string
> = {
  default: "border-foreground/50 bg-background text-foreground",
  primary: "border-primary bg-primary/15 text-primary font-semibold",
  accent: "border-accent-foreground/60 bg-accent text-accent-foreground",
  muted: "border-foreground/25 bg-muted/40 text-foreground/70",
};

export function NumberGrid({
  rows,
  cols,
  cells,
  rowLabel,
  colLabel,
  cellSize = 40,
  className,
}: NumberGridSpec & { className?: string }) {
  const map = new Map<string, (typeof cells)[number]>();
  for (const c of cells) map.set(`${c.row},${c.col}`, c);

  return (
    <div className={cn("mx-auto flex w-fit flex-col items-center", className)}>
      {colLabel ? (
        <div className="mb-1 text-xs text-muted-foreground">{colLabel}</div>
      ) : null}
      <div className="flex items-center gap-2">
        {rowLabel ? (
          <div
            className="text-xs text-muted-foreground"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {rowLabel}
          </div>
        ) : null}
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          }}
          role="img"
          aria-label={`${rows} × ${cols} 标数网格`}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const cell = map.get(`${r},${c}`);
            if (!cell) {
              return (
                <span
                  key={i}
                  className="block rounded border border-dashed border-foreground/20"
                  aria-hidden
                />
              );
            }
            const tone = cell.tone ?? "default";
            return (
              <span
                key={i}
                className={cn(
                  "flex items-center justify-center rounded border text-base tabular-nums",
                  TONE_CLASS[tone],
                )}
              >
                {cell.value}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
