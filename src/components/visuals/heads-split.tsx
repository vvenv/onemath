import type { HeadsFragment } from "@/types/visual";

import { HeadGrid } from "./head-grid";

export function HeadsSplit({ left, right }: { left: HeadsFragment; right: HeadsFragment }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <HeadGrid count={left.count} ticks={left.ticks} tone={left.tone} />
      </div>
      <div className="hidden w-px bg-border sm:block" aria-hidden />
      <div className="flex-1">
        <HeadGrid count={right.count} ticks={right.ticks} tone={right.tone} />
      </div>
    </div>
  );
}
