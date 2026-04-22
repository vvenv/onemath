import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ResultBadge = {
  icon: ReactNode;
  count: number | string;
  label?: ReactNode;
};

export type ResultBadgesLayout = "count-first" | "label-first";

export function ResultBadges({
  items,
  separator = "+",
  layout = "count-first",
  className,
}: {
  items: ResultBadge[];
  separator?: ReactNode;
  layout?: ResultBadgesLayout;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 py-1 text-sm",
        className,
      )}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 ? (
            <span className="text-muted-foreground">{separator}</span>
          ) : null}
          {layout === "label-first" ? (
            <div className="flex items-center gap-2">
              {item.label ? (
                <span className="font-medium">{item.label}</span>
              ) : null}
              <span className="text-muted-foreground">=</span>
              <span className="font-medium">{item.count}</span>
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              = <span className="font-medium">{item.count}</span>
              {item.label ? (
                <span className="text-muted-foreground">{item.label}</span>
              ) : null}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
