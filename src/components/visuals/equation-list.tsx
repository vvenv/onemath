import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export type EquationStatus = "keep" | "cancel" | "neutral";

export type EquationRowSpec = {
  lhs: string;
  rhs?: string;
  note?: string;
  badge?: string;
  status?: EquationStatus;
};

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
  const hasRhs = rows.some((r) => r.rhs !== undefined);
  const hasNote = rows.some((r) => r.note);
  const hasBadge = rows.some((r) => r.badge);
  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-md border border-border/70">
        <Table>
          <TableBody>
            {rows.map((row, i) => {
              const status: EquationStatus = row.status ?? "neutral";
              return (
                <TableRow
                  key={i}
                  className={cn("hover:bg-transparent", statusRowClass[status])}
                >
                  <TableCell className="w-px whitespace-nowrap pr-2 text-right text-muted-foreground">
                    {row.lhs}
                  </TableCell>
                  {hasRhs ? (
                    <>
                      <TableCell className="w-px px-1 text-center text-muted-foreground/70">
                        {row.rhs !== undefined ? "=" : null}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "whitespace-nowrap font-mono",
                          statusRhsClass[status],
                        )}
                      >
                        {row.rhs ?? ""}
                      </TableCell>
                    </>
                  ) : null}
                  {hasNote ? (
                    <TableCell className="text-xs text-muted-foreground">
                      {row.note ?? ""}
                    </TableCell>
                  ) : null}
                  {hasBadge ? (
                    <TableCell className="w-px text-right">
                      {row.badge ? (
                        <Badge variant={statusBadgeVariant[status]}>
                          {row.badge}
                        </Badge>
                      ) : null}
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {note ? (
        <p className="text-center text-xs text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}
