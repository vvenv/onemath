import { cn } from "@/lib/utils";
import type { CubeFaceKey } from "@/types/visual";

const FACE_POSITION: Record<CubeFaceKey, { row: number; col: number }> = {
  top: { row: 1, col: 2 },
  left: { row: 2, col: 1 },
  front: { row: 2, col: 2 },
  right: { row: 2, col: 3 },
  back: { row: 2, col: 4 },
  bottom: { row: 3, col: 2 },
};

const FACE_LABEL: Record<CubeFaceKey, string> = {
  top: "上",
  bottom: "下",
  front: "前",
  back: "后",
  left: "左",
  right: "右",
};

type FaceState = "removed" | "added" | "neutral";

function FaceTile({ state, label }: { state: FaceState; label: string }) {
  const classes: Record<FaceState, string> = {
    removed:
      "border-dashed border-destructive/70 bg-destructive/15 text-destructive",
    added:
      "border-emerald-500/70 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    neutral: "border-foreground/30 bg-muted/50 text-muted-foreground",
  };
  const marker: Record<FaceState, string> = {
    removed: "−",
    added: "+",
    neutral: "",
  };
  return (
    <div
      className={cn(
        "flex h-10 w-10 flex-col items-center justify-center border text-xs font-medium",
        classes[state],
      )}
      role="img"
      aria-label={`${label}面 ${state === "removed" ? "移除" : state === "added" ? "新增" : ""}`}
    >
      <span className="text-xs leading-none">{marker[state]}</span>
      <span className="leading-none">{label}</span>
    </div>
  );
}

export function PitDiagram({
  removed,
  added,
  className,
}: {
  removed: CubeFaceKey[];
  added: CubeFaceKey[];
  className?: string;
}) {
  const removedSet = new Set(removed);
  const addedSet = new Set(added);
  const allFaces: CubeFaceKey[] = [
    "top",
    "left",
    "front",
    "right",
    "back",
    "bottom",
  ];
  const net = added.length - removed.length;
  const netStr = net >= 0 ? `+${net}` : `${net}`;

  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: "repeat(4, auto)",
          gridTemplateRows: "auto auto auto",
        }}
      >
        {allFaces.map((key) => {
          const pos = FACE_POSITION[key];
          const state: FaceState = removedSet.has(key)
            ? "removed"
            : addedSet.has(key)
              ? "added"
              : "neutral";
          return (
            <div
              key={key}
              style={{ gridRow: pos.row, gridColumn: pos.col }}
            >
              <FaceTile state={state} label={FACE_LABEL[key]} />
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded border border-destructive/50 bg-destructive/10 px-2 py-0.5 text-destructive">
          减 {removed.length}
        </span>
        <span className="text-muted-foreground">+</span>
        <span className="rounded border border-emerald-500/50 bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:text-emerald-400">
          增 {added.length}
        </span>
        <span className="text-muted-foreground">=</span>
        <span className="rounded border border-primary/50 bg-primary/10 px-2 py-0.5 font-medium text-primary">
          净 {netStr}
        </span>
      </div>
    </div>
  );
}
