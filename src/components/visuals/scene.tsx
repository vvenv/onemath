import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Scene({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-dashed border-border/70 bg-background/60 p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Caption({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-2 text-center text-xs text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
