import { cn } from "@/lib/utils";
import type { HeadTone, LatticeSpec } from "@/types/visual";

import { Head } from "./head-grid";

export function Lattice({
  rows,
  cols,
  tone = "default",
  className,
}: LatticeSpec & { className?: string }) {
  return (
    <div
      className={cn("mx-auto grid w-fit gap-2", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, auto))` }}
      role="img"
      aria-label={`${rows} × ${cols} 格点阵列`}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <Head key={i} tone={tone as HeadTone} />
      ))}
    </div>
  );
}
