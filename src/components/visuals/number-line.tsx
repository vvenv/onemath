import { cn } from "@/lib/utils";

export type NumberLinePointTone = "default" | "primary" | "accent" | "muted";

export type NumberLinePoint = {
  value: number;
  label?: string;
  sublabel?: string;
  tone?: NumberLinePointTone;
};

export type NumberLineSegment = {
  from: number;
  to: number;
  label?: string;
  tone?: "default" | "primary" | "accent";
};

const dotToneClass: Record<NumberLinePointTone, string> = {
  default: "border-foreground/60 bg-background",
  primary: "border-primary bg-primary",
  accent: "border-primary bg-primary/20",
  muted: "border-muted-foreground/60 bg-muted",
};

const segmentToneClass: Record<
  NonNullable<NumberLineSegment["tone"]>,
  string
> = {
  default: "border-foreground/50 text-foreground",
  primary: "border-primary text-primary",
  accent: "border-primary/70 text-primary",
};

export function NumberLine({
  min,
  max,
  points,
  segments,
  className,
}: {
  min: number;
  max: number;
  points: NumberLinePoint[];
  segments?: NumberLineSegment[];
  className?: string;
}) {
  const range = max - min || 1;
  const pct = (v: number) => ((v - min) / range) * 100;

  return (
    <div className={cn("px-3 pt-1", className)}>
      <div className="relative h-16">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        {points.map((p, i) => {
          const left = pct(p.value);
          const tone = p.tone ?? "default";
          return (
            <div
              key={i}
              className="absolute top-0 flex h-full flex-col items-center justify-center"
              style={{ left: `${left}%`, transform: "translateX(-50%)" }}
            >
              <div className="flex flex-1 items-end pb-1">
                {p.label ? (
                  <span className="whitespace-nowrap text-[10px] leading-tight text-muted-foreground">
                    {p.label}
                  </span>
                ) : null}
              </div>
              <span
                className={cn(
                  "z-10 block h-2.5 w-2.5 rounded-full border",
                  dotToneClass[tone],
                )}
                aria-hidden
              />
              <div className="flex flex-1 items-start pt-1">
                {p.sublabel ? (
                  <span className="whitespace-nowrap text-xs font-medium">
                    {p.sublabel}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {segments && segments.length > 0
        ? (() => {
            const NARROW_PCT = 8;
            let narrowIdx = -1;
            const computed = segments.map((s) => {
              const widthPct = pct(s.to) - pct(s.from);
              const isNarrow = widthPct < NARROW_PCT;
              if (isNarrow) narrowIdx += 1;
              return {
                s,
                widthPct,
                isNarrow,
                narrowOrder: isNarrow ? narrowIdx : -1,
              };
            });
            const hasNarrow = computed.some((c) => c.isNarrow);
            return (
              <div className={cn("relative mt-1", hasNarrow ? "h-12" : "h-6")}>
                {computed.map(({ s, widthPct, isNarrow, narrowOrder }, i) => {
                  const left = pct(s.from);
                  const tone = s.tone ?? "primary";
                  const midLeft = left + widthPct / 2;
                  const belowRow = narrowOrder % 2; // 0 = near, 1 = far
                  return (
                    <div key={i} className="contents">
                      <div
                        className={cn(
                          "absolute top-0 h-6 flex items-center justify-center border-x border-t",
                          segmentToneClass[tone],
                        )}
                        style={{ left: `${left}%`, width: `${widthPct}%` }}
                      >
                        {s.label && !isNarrow ? (
                          <span className="-mt-3 bg-background px-1 text-[11px] font-medium leading-none">
                            {s.label}
                          </span>
                        ) : null}
                      </div>
                      {s.label && isNarrow ? (
                        <>
                          <div
                            className={cn(
                              "absolute top-6 w-px border-l border-dashed",
                              segmentToneClass[tone],
                            )}
                            style={{
                              left: `${midLeft}%`,
                              height: belowRow === 0 ? 6 : 18,
                            }}
                          />
                          <span
                            className="absolute -translate-x-1/2 whitespace-nowrap text-[11px] font-medium leading-none"
                            style={{
                              left: `${midLeft}%`,
                              top: belowRow === 0 ? 30 : 42,
                            }}
                          >
                            {s.label}
                          </span>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })()
        : null}
    </div>
  );
}
