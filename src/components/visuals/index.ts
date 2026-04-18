export { Scene } from "./scene";
export { Head, HeadGrid } from "./head-grid";
export { Lattice } from "./lattice";
export { CompareBars } from "./compare-bars";
export { ResultBadges } from "./result-badges";
export { NumberLine } from "./number-line";
export { CubeNet } from "./cube-net";
export { PitDiagram } from "./pit-diagram";
export { StatementTable } from "./statement-table";
export { EquationList } from "./equation-list";
export { NumberGrid } from "./number-grid";
export { SvgFigure } from "./svg-figure";
export { SceneRenderer } from "./scene-renderer";

// Re-export types from types/visual.ts for convenience
export type {
  HeadTone,
  CompareRowSpec,
  ResultBadgeSpec,
  NumberLinePointTone,
  NumberLinePointSpec,
  NumberLineSegmentSpec,
  EquationStatus,
  EquationRowSpec,
} from "@/types/visual";
