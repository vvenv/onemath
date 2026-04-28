import { Fragment } from "react";
import { Badge } from "@/components/ui/badge";
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

const statusBadgeVariant: Record<EquationStatus, "secondary" | "outline"> = {
  keep: "secondary",
  cancel: "outline",
  neutral: "outline",
};

export function EquationList({
  rows,
  note,
}: {
  rows: EquationRowSpec[];
  note?: string;
}) {
  const hasNote = rows.some((r) => r.note);
  const hasBadge = rows.some((r) => r.badge);
  return (
    <div className="space-y-2">
      <div
        className={cn(
          "grid",
          hasNote && hasBadge
            ? "grid-cols-[3fr_5fr_2fr_2fr]"
            : hasNote || hasBadge
              ? "grid-cols-[3fr_5fr_2fr]"
              : "grid-cols-[3fr_5fr]",
        )}
      >
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
              {hasNote ? (
                <div className="text-xs text-muted-foreground">
                  {row.note ?? ""}
                </div>
              ) : null}
              {hasBadge ? (
                <div className="text-right">
                  {row.badge ? (
                    <Badge variant={statusBadgeVariant[status]}>
                      {row.badge}
                    </Badge>
                  ) : null}
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      {note ? (
        <p className="text-center text-xs text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}
