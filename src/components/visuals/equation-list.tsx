import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { EquationStatus, EquationRowSpec } from "@/types/visual";

const statusRowClass: Record<EquationStatus, string> = {
  keep: "",
  cancel: "text-muted-foreground",
  neutral: "",
};

const statusRhsClass: Record<EquationStatus, string> = {
  keep: "text-foreground",
  cancel: "line-through decoration-muted-foreground/70",
  neutral: "",
};

export function EquationList({ rows }: { rows: EquationRowSpec[] }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[3fr_5fr]">
        {rows.map((row, i) => {
          const status: EquationStatus = row.status ?? "neutral";
          return (
            <Fragment key={i}>
              <div
                className={cn(
                  "whitespace-nowrap pr-2 text-right text-muted-foreground",
                  statusRowClass[status],
                )}
              >
                {row.lhs}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/70">=</span>
                <span
                  className={cn(
                    "whitespace-nowrap font-mono",
                    statusRhsClass[status],
                  )}
                >
                  {row.rhs}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
