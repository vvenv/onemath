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
        "rounded-md border border-dashed border-border/70 bg-background/60 mt-3 p-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
