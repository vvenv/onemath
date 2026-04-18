import { cn } from "@/lib/utils";
import type { CubeNetFaceSpec, HeadTone } from "@/types/visual";

type FaceKey = "top" | "bottom" | "front" | "back" | "left" | "right";

const FACE_POSITION: Record<FaceKey, { row: number; col: number }> = {
  top: { row: 1, col: 2 },
  left: { row: 2, col: 1 },
  front: { row: 2, col: 2 },
  right: { row: 2, col: 3 },
  back: { row: 2, col: 4 },
  bottom: { row: 3, col: 2 },
};

const FACE_LABEL: Record<FaceKey, string> = {
  top: "上",
  bottom: "下",
  front: "前",
  back: "后",
  left: "左",
  right: "右",
};

function Face({
  face,
  tone = "default",
  label,
}: {
  face: CubeNetFaceSpec;
  tone?: HeadTone;
  label: string;
}) {
  const { rows, cols, holes = [] } = face;
  const holeSet = new Set(holes.map((h) => `${h.row},${h.col}`));
  const cellTone =
    tone === "accent"
      ? "bg-primary/5 border-primary/40"
      : "bg-background border-foreground/30";
  return (
    <div
      className="relative"
      role="img"
      aria-label={`${label} 面 ${rows}×${cols}`}
    >
      <div
        className="grid border border-foreground/60"
        style={{ gridTemplateColumns: `repeat(${cols}, 10px)` }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const isHole = holeSet.has(`${r},${c}`);
          return (
            <span
              key={i}
              className={cn(
                "block h-[10px] w-[10px] border",
                isHole
                  ? "border-dashed border-destructive/80 bg-destructive/20"
                  : cellTone,
              )}
              aria-hidden
            />
          );
        })}
      </div>
      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-foreground/50">
        {label}
      </span>
    </div>
  );
}

export function CubeNet({
  face,
  tone = "default",
  className,
}: {
  face: CubeNetFaceSpec;
  tone?: HeadTone;
  className?: string;
}) {
  const faces: FaceKey[] = ["top", "left", "front", "right", "back", "bottom"];
  return (
    <div
      className={cn("mx-auto grid w-fit gap-2", className)}
      style={{
        gridTemplateColumns: "repeat(4, auto)",
        gridTemplateRows: "auto auto auto",
      }}
    >
      {faces.map((key) => {
        const pos = FACE_POSITION[key];
        return (
          <div key={key} style={{ gridRow: pos.row, gridColumn: pos.col }}>
            <Face face={face} tone={tone} label={FACE_LABEL[key]} />
          </div>
        );
      })}
    </div>
  );
}
