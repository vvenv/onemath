import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { DrawingVisual } from "@/components/drawing-visual";
import type { ProblemData } from "@/types/problem";
import { Card, CardContent } from "./ui/card";

type SolutionTabsProps = {
  methods: ProblemData["solutions"];
};

export function SolutionTabs({ methods }: SolutionTabsProps) {
  const [activeKey, setActiveKey] = useState(methods[0]?.key ?? "");

  const activeMethod = useMemo(() => {
    return methods.find((method) => method.key === activeKey) ?? methods[0];
  }, [activeKey, methods]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 overflow-x-auto">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          解法
        </h2>
        <div className="flex gap-2">
          {methods.map((method) => (
            <Button
              key={method.key}
              type="button"
              variant={method.key === activeKey ? "default" : "outline"}
              size="sm"
              className="shrink-0"
              onClick={() => setActiveKey(method.key)}
            >
              {method.label}
            </Button>
          ))}
        </div>
      </div>
      <Card>
        <CardContent>
          <ol className="space-y-3 text-sm">
            {activeMethod?.steps.map((step, index) => (
              <li key={step} className="leading-6">
                <span className="mr-1 font-medium text-foreground">
                  {index + 1}.
                </span>
                {step}
                {activeMethod?.scenes?.length ? (
                  <DrawingVisual step={index} scenes={activeMethod.scenes} />
                ) : null}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
