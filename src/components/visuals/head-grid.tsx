import { cn } from "@/lib/utils";
import type { HeadTone, TickGroup } from "@/types/visual";

export type { HeadTone };

export function Head({
  ticks,
  tone = "default",
}: {
  ticks?: TickGroup[];
  tone?: HeadTone;
}) {
  const circleClass =
    tone === "accent"
      ? "border-primary bg-primary/10"
      : "border-foreground/50 bg-background";
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className={cn("block h-3 w-3 rounded-full border", circleClass)}
        aria-hidden
      />
      {ticks?.map((group, gi) =>
        group.count > 0 ? (
          <span key={gi} className="flex gap-[3px]" aria-hidden>
            {Array.from({ length: group.count }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "block h-2 w-px",
                  group.tone === "accent" ? "bg-primary" : "bg-foreground/60",
                )}
              />
            ))}
          </span>
        ) : null,
      )}
    </div>
  );
}

export function HeadGrid({
  count,
  ticks,
  tone = "default",
  columns = 10,
  className,
}: {
  count: number;
  ticks?: TickGroup[];
  tone?: HeadTone;
  columns?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("grid gap-x-2 gap-y-1", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Head key={i} ticks={ticks} tone={tone} />
      ))}
    </div>
  );
}
