import { cn } from "@/lib/utils";
import type { HeadsFragment, SceneSpec } from "@/types/visual";

import { Caption } from "./scene";
import { Scene } from "./scene";
import { HeadGrid } from "./head-grid";
import { Lattice } from "./lattice";
import { CompareBars } from "./compare-bars";
import { ResultBadges } from "./result-badges";
import { NumberLine } from "./number-line";
import { CubeNet } from "./cube-net";
import { PitDiagram } from "./pit-diagram";
import { StatementTable } from "./statement-table";
import { EquationList } from "./equation-list";
import { NumberGrid } from "./number-grid";
import { SvgFigure } from "./svg-figure";

function HeadsBlock({ spec }: { spec: HeadsFragment }) {
  return (
    <div>
      <HeadGrid count={spec.count} ticks={spec.ticks} tone={spec.tone} />
      {spec.caption ? (
        <Caption>
          <span
            className={cn(
              spec.captionTone === "primary" && "font-medium text-primary",
            )}
          >
            {spec.caption}
          </span>
        </Caption>
      ) : null}
    </div>
  );
}

export function SceneRenderer({ spec }: { spec: SceneSpec }) {
  switch (spec.kind) {
    case "heads":
      return (
        <Scene>
          <HeadsBlock spec={spec.heads} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "lattice":
      return (
        <Scene>
          <Lattice
            rows={spec.lattice.rows}
            cols={spec.lattice.cols}
            tone={spec.lattice.tone}
          />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "heads-split":
      return (
        <Scene>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <HeadsBlock spec={spec.left} />
            </div>
            <div className="hidden w-px bg-border sm:block" aria-hidden />
            <div className="flex-1">
              <HeadsBlock spec={spec.right} />
            </div>
          </div>
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "compare-bars":
      return (
        <Scene>
          <CompareBars rows={spec.rows} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "result-badges":
      return (
        <Scene>
          <ResultBadges items={spec.items} separator={spec.separator} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "number-line":
      return (
        <Scene>
          <NumberLine
            min={spec.min}
            max={spec.max}
            points={spec.points}
            segments={spec.segments}
          />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "cube-net":
      return (
        <Scene>
          <CubeNet face={spec.face} tone={spec.tone} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "pit-diagram":
      return (
        <Scene>
          <PitDiagram removed={spec.removed} added={spec.added} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "statement-table":
      return (
        <Scene>
          <StatementTable
            rows={spec.rows}
            headers={spec.headers}
            note={spec.note}
          />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "equation-list":
      return (
        <Scene>
          <EquationList rows={spec.rows} note={spec.note} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "number-grid":
      return (
        <Scene>
          <NumberGrid
            rows={spec.rows}
            cols={spec.cols}
            cells={spec.cells}
            rowLabel={spec.rowLabel}
            colLabel={spec.colLabel}
            cellSize={spec.cellSize}
          />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
    case "svg":
      return (
        <Scene>
          <SvgFigure svg={spec.svg} alt={spec.alt} />
          {spec.caption ? <Caption>{spec.caption}</Caption> : null}
        </Scene>
      );
  }
}
