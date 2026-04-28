import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ResultBadgeSpec } from "@/types/visual";

export function ResultBadges({
  items,
  separator = "+",
  layout = "default",
  className,
}: {
  items: ResultBadgeSpec[];
  separator?: ReactNode;
  layout?: "default" | "label-first";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 py-1",
        className,
      )}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 ? (
            <span className="text-muted-foreground">{separator}</span>
          ) : null}
          <div className="flex items-center gap-2">
            {layout === "label-first" && item.label ? (
              <span className="font-medium">{item.label}</span>
            ) : null}
            {layout === "label-first" && item.label ? (
              <span className="text-muted-foreground">:</span>
            ) : null}
            <span className="text-xl" aria-hidden>
              {item.icon}
            </span>
            {layout === "default" && item.label ? (
              <span className="font-medium">{item.label}</span>
            ) : null}
            <span className="text-muted-foreground">=</span>
            <span className="font-medium">{item.count}</span>
            {item.note ? (
              <span className="text-muted-foreground">{item.note}</span>
            ) : null}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
