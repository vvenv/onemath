import { cn } from "@/lib/utils";
import { SceneRenderer } from "@/components/visuals";
import type { SceneSpec } from "@/types/visual";

type DrawingVisualProps = {
  step: number;
  scenes: Array<SceneSpec | null>;
  className?: string;
};

export function DrawingVisual({ step, scenes, className }: DrawingVisualProps) {
  const spec = scenes[step];
  if (!spec) return null;
  return (
    <div className={cn("mt-2", className)}>
      <SceneRenderer spec={spec} />
    </div>
  );
}
