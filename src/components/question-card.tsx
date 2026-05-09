import { Markdown } from "@/components/markdown";
import { ProblemFigures } from "@/components/problem-figures";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProblemFigure } from "@/types/problem";

type QuestionCardProps = {
  question: string;
  figures?: ProblemFigure[];
};

export function QuestionCard({ question, figures }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-medium text-muted-foreground">
          题目
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Markdown>
          {question}
        </Markdown>
        {figures && figures.length > 0 ? (
          <ProblemFigures figures={figures} />
        ) : null}
      </CardContent>
    </Card>
  );
}
