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

  const maxWidth = cols * cellSize + (cols - 1) * 4;

  return (
    <div
      className={cn("mx-auto w-full", className)}
      style={{ maxWidth: maxWidth + 24 }}
    >
      <div
        className="grid gap-x-2 gap-y-1"
        style={{
          gridTemplateColumns: rowLabel
            ? "auto minmax(0, 1fr)"
            : "minmax(0, 1fr)",
        }}
      >
        {colLabel ? (
          <div
            className="text-center text-xs text-muted-foreground"
            style={{ gridColumn: rowLabel ? "2" : "1" }}
          >
            {colLabel}
          </div>
        ) : null}
        {rowLabel ? (
          <div
            className="flex items-center justify-center text-xs text-muted-foreground"
            style={{ writingMode: "vertical-rl" }}
          >
            {rowLabel}
          </div>
        ) : null}
        <div
          className="@container grid min-w-0 gap-[2px] sm:gap-1"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
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
                  className="block aspect-square rounded border border-dashed border-foreground/20"
                  aria-hidden
                />
              );
            }
            const tone = cell.tone ?? "default";
            return (
              <span
                key={i}
                className={cn(
                  "flex aspect-square items-center justify-center rounded border tabular-nums leading-none",
                  "text-[clamp(0.625rem,2.2cqi,1rem)]",
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
