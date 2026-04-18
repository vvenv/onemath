import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  StatementHeadersSpec,
  StatementRowSpec,
  StatementVerdict,
} from "@/types/visual";

const defaultHeaders: Required<StatementHeadersSpec> = {
  speaker: "角色",
  claim: "陈述",
  verdict: "真假",
  badge: "结论",
};

const verdictMark: Record<StatementVerdict, string> = {
  unknown: "?",
  true: "✓",
  false: "✗",
};

const verdictClass: Record<StatementVerdict, string> = {
  unknown: "bg-muted text-muted-foreground",
  true: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  false: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

const highlightRowClass = {
  contradiction:
    "bg-primary/10 ring-1 ring-inset ring-primary/40 dark:bg-amber-400/10",
  target: "bg-primary/10 ring-1 ring-inset ring-primary/40",
  muted: "opacity-60",
} as const;

export function StatementTable({
  rows,
  headers,
  note,
}: {
  rows: StatementRowSpec[];
  headers?: StatementHeadersSpec;
  note?: string;
}) {
  const h = { ...defaultHeaders, ...headers };
  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-md border border-border/70">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>{h.speaker}</TableHead>
              <TableHead>{h.claim}</TableHead>
              <TableHead className="text-center">{h.verdict}</TableHead>
              <TableHead>{h.badge}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => {
              const verdict: StatementVerdict = row.verdict ?? "unknown";
              return (
                <TableRow
                  key={i}
                  className={cn(
                    "hover:bg-transparent",
                    row.highlight && highlightRowClass[row.highlight],
                  )}
                >
                  <TableCell className="font-semibold">{row.speaker}</TableCell>
                  <TableCell className="text-muted-foreground">
                    “{row.claim}”
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-6 min-w-6 rounded px-1.5 font-semibold",
                        verdictClass[verdict],
                      )}
                    >
                      {verdictMark[verdict]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {row.badge ? (
                      <Badge
                        variant={
                          row.highlight === "target" ? "default" : "secondary"
                        }
                        className={cn(
                          row.highlight === "contradiction" &&
                            "bg-primary/20 text-primary dark:text-amber-300",
                        )}
                      >
                        {row.badge}
                      </Badge>
                    ) : null}
                  </TableCell>
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
