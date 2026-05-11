import { useMemo, useState } from "react";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import type { ProblemData } from "@/types/problem";
import { Card, CardContent } from "./ui/card";
import { SceneRenderer } from "./visuals/scene-renderer";

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
        <h2 className="font-semibold tracking-tight text-foreground">解法</h2>
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
          <ol className="space-y-3 list-decimal list-inside marker:text-foreground/50">
            {activeMethod?.steps.map(({ text, scenes }, index) => {
              return (
                <li
                  key={index}
                  className="leading-6 only:list-none"
                >
                  <Markdown>{text}</Markdown>
                  {scenes?.map((scene, i) => (
                    <SceneRenderer key={i} spec={scene} />
                  ))}
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
