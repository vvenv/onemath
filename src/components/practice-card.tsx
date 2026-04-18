import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ProblemFigures } from "@/components/problem-figures";
import { cn } from "@/lib/utils";
import type {
  PracticeField,
  ProblemFigure,
  VariantAnswerValue,
} from "@/types/problem";

type PracticeCardProps = {
  prompt: string;
  fields: PracticeField[];
  answer: Record<string, VariantAnswerValue>;
  hint?: string;
  figures?: ProblemFigure[];
};

function matchesAnswer(input: string, expected: VariantAnswerValue): boolean {
  const trimmed = input.trim();
  if (typeof expected === "number") {
    return trimmed !== "" && Number(trimmed) === expected;
  }
  if (typeof expected === "boolean") {
    return trimmed === String(expected);
  }
  if (Array.isArray(expected)) {
    return trimmed === expected.join(",");
  }
  return trimmed === expected;
}

function formatAnswer(expected: VariantAnswerValue): string {
  return Array.isArray(expected) ? expected.join(", ") : String(expected);
}

export function PracticeCard({
  prompt,
  fields,
  answer,
  hint,
  figures,
}: PracticeCardProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, ""])),
  );
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    setValues(Object.fromEntries(fields.map((f) => [f.key, ""])));
    setResult(null);
  }, [fields]);

  const checkAnswer = () => {
    const allMatch = fields.every((f) =>
      matchesAnswer(values[f.key] ?? "", answer[f.key]),
    );
    setResult(allMatch ? "correct" : "wrong");
  };

  const standardAnswer = fields
    .map((f) => `${f.label} ${formatAnswer(answer[f.key])}`)
    .join("，");

  return (
    <Card>
      <CardContent>
        <Markdown>{prompt}</Markdown>
        {figures && figures.length > 0 ? (
          <div className="mt-3">
            <ProblemFigures figures={figures} />
          </div>
        ) : null}
        <div className="mt-3 flex flex-col gap-2">
          {fields.map((field) => {
            if (field.enum && field.enum.length > 0) {
              const current = values[field.key] ?? "";
              return (
                <div
                  key={field.key}
                  role="radiogroup"
                  aria-label={field.label}
                  className="flex flex-wrap gap-1.5"
                >
                  {field.enum.map((option) => {
                    const selected = current === option;
                    return (
                      <Button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        variant={selected ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          setValues((prev) => ({
                            ...prev,
                            [field.key]: option,
                          }))
                        }
                      >
                        {option}
                      </Button>
                    );
                  })}
                </div>
              );
            }
            return (
              <Input
                key={field.key}
                type={field.type ?? "number"}
                inputMode={field.type === "text" ? "text" : "numeric"}
                aria-label={field.label}
                value={values[field.key] ?? ""}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    [field.key]: event.target.value,
                  }))
                }
                placeholder={field.placeholder ?? field.label}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Button type="button" variant="outline" onClick={checkAnswer}>
            提交
          </Button>
          {result && (
            <p
              className={cn(
                "text-xs font-medium",
                result === "correct"
                  ? "text-primary dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              )}
            >
              {result === "correct"
                ? "回答正确，继续保持！"
                : (hint ?? "再试一次，仔细检查。")}
            </p>
          )}
        </div>

        {result && (
          <Collapsible
            key={result}
            defaultOpen={result === "wrong"}
            className="mt-3"
          >
            <CollapsibleTrigger className="group flex w-full items-center gap-2 py-2.5 text-left font-medium">
              <span>标准答案</span>
              <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-2.5">
              {standardAnswer}。
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
