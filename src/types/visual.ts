export type HeadTone = "default" | "accent";
export type CaptionTone = "muted" | "primary";
export type TickTone = "default" | "accent";

export type TickGroup = {
  count: number;
  tone?: TickTone;
};

export type HeadsFragment = {
  count: number;
  ticks?: TickGroup[];
  tone?: HeadTone;
  caption?: string;
  captionTone?: CaptionTone;
};

export type CompareRowSpec = {
  label: string;
  /**
   * Numeric value. String is accepted for expressive content
   * (e.g. `"1/3"`, `"15×2"`); the renderer coerces it to a number
   * for bar width and displays the original string as the label.
   */
  value: number | string;
  max: number;
  tone?: "primary" | "muted";
  marker?: boolean;
};

export type ResultBadgeSpec = {
  icon: string;
  /** Displayed after `×`. String is accepted for non-numeric tallies (e.g. `"星期四"`, `"√2,√5,…"`). */
  count: number | string;
  label?: string;
};

export type NumberLinePointTone = "default" | "primary" | "accent" | "muted";

export type NumberLinePointSpec = {
  value: number;
  label?: string;
  sublabel?: string;
  tone?: NumberLinePointTone;
};

export type NumberLineSegmentSpec = {
  from: number;
  to: number;
  label?: string;
  tone?: "default" | "primary" | "accent" | "muted";
};

export type LatticeSpec = {
  rows: number;
  cols: number;
  tone?: HeadTone;
};

export type CubeFaceKey =
  | "top"
  | "bottom"
  | "front"
  | "back"
  | "left"
  | "right";

export type CubeNetFaceSpec = {
  rows: number;
  cols: number;
  holes?: { row: number; col: number }[];
};

export type CubeNetSpec = {
  face: CubeNetFaceSpec;
  tone?: HeadTone;
};

export type PitDiagramSpec = {
  removed: CubeFaceKey[];
  added: CubeFaceKey[];
};

export type EquationStatus = "keep" | "cancel" | "neutral";

export type EquationRowSpec = {
  lhs: string;
  rhs?: string;
  note?: string;
  badge?: string;
  status?: EquationStatus;
};

export type StatementVerdict = "unknown" | "true" | "false";

export type StatementHighlight = "contradiction" | "target" | "muted";

export type StatementRowSpec = {
  speaker: string;
  claim: string;
  verdict?: StatementVerdict;
  badge?: string;
  highlight?: StatementHighlight;
};

export type StatementHeadersSpec = {
  speaker?: string;
  claim?: string;
  verdict?: string;
  badge?: string;
};

export type NumberGridCellTone = "default" | "primary" | "accent" | "muted";

export type NumberGridCellSpec = {
  row: number;
  col: number;
  value: string | number;
  tone?: NumberGridCellTone;
};

export type NumberGridSpec = {
  rows: number;
  cols: number;
  cells: NumberGridCellSpec[];
  rowLabel?: string;
  colLabel?: string;
  cellSize?: number;
};

export type SceneSpec =
  | { kind: "heads"; heads: HeadsFragment; caption?: string }
  | { kind: "lattice"; lattice: LatticeSpec; caption?: string }
  | {
      kind: "heads-split";
      left: HeadsFragment;
      right: HeadsFragment;
      caption?: string;
    }
  | { kind: "compare-bars"; rows: CompareRowSpec[]; caption?: string }
  | {
      kind: "result-badges";
      items: ResultBadgeSpec[];
      separator?: string;
      layout?: "count-first" | "label-first";
      caption?: string;
    }
  | {
      kind: "number-line";
      min: number;
      max: number;
      points: NumberLinePointSpec[];
      segments?: NumberLineSegmentSpec[];
      caption?: string;
    }
  | {
      kind: "cube-net";
      face: CubeNetFaceSpec;
      tone?: HeadTone;
      caption?: string;
    }
  | {
      kind: "pit-diagram";
      removed: CubeFaceKey[];
      added: CubeFaceKey[];
      caption?: string;
    }
  | {
      kind: "statement-table";
      rows: StatementRowSpec[];
      headers?: StatementHeadersSpec;
      note?: string;
      caption?: string;
    }
  | {
      kind: "equation-list";
      rows: EquationRowSpec[];
      note?: string;
      caption?: string;
    }
  | ({ kind: "number-grid"; caption?: string } & NumberGridSpec)
  | {
      kind: "svg";
      svg: string;
      alt?: string;
      caption?: string;
    };
