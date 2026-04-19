import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ResultBadge = {
  icon: ReactNode;
  count: number | string;
  label?: ReactNode;
};

export function ResultBadges({
  items,
  separator = "+",
  className,
}: {
  items: ResultBadge[];
  separator?: ReactNode;
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
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {item.icon}
            </span>
            <span className="font-medium">× {item.count}</span>
            {item.label ? (
              <span className="text-muted-foreground">{item.label}</span>
            ) : null}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
