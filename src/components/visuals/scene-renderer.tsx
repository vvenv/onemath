import type { SceneSpec } from "@/types/visual";

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
import { HeadsSplit } from "./heads-split";


export function SceneRenderer({ spec }: { spec: SceneSpec }) {
  switch (spec.kind) {
    case "heads":
      return (
        <Scene>
          <HeadGrid count={spec.heads.count} ticks={spec.heads.ticks} tone={spec.heads.tone} />
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
        </Scene>
      );
    case "heads-split":
      return (
        <Scene>
          <HeadsSplit left={spec.left} right={spec.right} />
        </Scene>
      );
    case "compare-bars":
      return (
        <Scene>
          <CompareBars rows={spec.rows} />
        </Scene>
      );
    case "result-badges":
      return (
        <Scene>
          <ResultBadges
            items={spec.items}
            separator={spec.separator}
            layout={spec.layout}
          />
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
        </Scene>
      );
    case "cube-net":
      return (
        <Scene>
          <CubeNet face={spec.face} tone={spec.tone} />
        </Scene>
      );
    case "pit-diagram":
      return (
        <Scene>
          <PitDiagram removed={spec.removed} added={spec.added} />
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
        </Scene>
      );
    case "equation-list":
      return (
        <Scene>
          <EquationList rows={spec.rows} />
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
        </Scene>
      );
    case "svg":
      return (
        <Scene>
          <SvgFigure svg={spec.svg} alt={spec.alt} />
        </Scene>
      );
  }
}
