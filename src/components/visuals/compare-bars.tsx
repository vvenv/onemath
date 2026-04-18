import { cn } from "@/lib/utils";
import type { CompareRowSpec } from "@/types/visual";

function toNumber(value: string | number): number {
  if (typeof value === "string") {
    if (value.includes("/")) {
      const [num, den] = value.split("/");
      return parseFloat(num) / parseFloat(den);
    }
    return parseFloat(value);
  }
  return value;
}

export function CompareBars({
  rows,
  className,
}: {
  rows: CompareRowSpec[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-2",
        className,
      )}
    >
      {rows.map((row, i) => {
        const pct = Math.max(
          0,
          Math.min(100, (toNumber(row.value) / row.max) * 100),
        );
        const barClass =
          row.tone === "muted" ? "bg-foreground/40" : "bg-primary";
        return (
          <div key={i} className="contents">
            <span className="text-xs text-muted-foreground">{row.label}</span>
            <div className="relative h-3 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full", barClass)}
                style={{ width: `${pct}%` }}
              />
              {row.marker ? (
                <div
                  className="absolute inset-y-0 border-l-2 border-dashed border-primary"
                  style={{ left: `${pct}%` }}
                />
              ) : null}
            </div>
            <span className="w-8 text-right text-xs font-medium">
              {row.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
