import { Navigate, useParams, type MetaFunction } from "react-router";

import { KnowledgePoints } from "@/components/knowledge-points";
import { PracticeCard } from "@/components/practice-card";
import { ProblemHeader } from "@/components/problem-header";
import { QuestionCard } from "@/components/question-card";
import { RelatedProblems } from "@/components/related-problems";
import { SolutionTabs } from "@/components/solution-tabs";
import { getProblemById } from "@/lib/problems";
import type { ProblemModule } from "@/types/problem";

const MODULE_LABEL: Record<ProblemModule, string> = {
  calc: "计算",
  geometry: "几何",
  numberTheory: "数论",
  word: "应用题",
  travel: "行程",
  counting: "计数",
  misc: "杂题",
};

export const meta: MetaFunction = ({ params }) => {
  const problem = getProblemById(params.id);
  if (!problem) {
    return [{ title: "题目未找到 - 一道 / edao.plus" }];
  }
  const title = `${problem.title} (#${problem.id}) - 一道 / edao.plus`;
  const snippet = problem.question.slice(0, 100);
  const description = `${problem.grade}数学${MODULE_LABEL[problem.module]}：${snippet}${problem.question.length > 100 ? "..." : ""}`;
  return [{ title }, { name: "description", content: description }];
};

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const problem = getProblemById(id);
  // Note: loader is used for SSR/meta, but client-side we still use getProblemById
  // to avoid hydration mismatch since loader data may not be available in client transitions

  if (!problem) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col gap-4">
      <ProblemHeader
        id={problem.id}
        title={problem.title}
        grade={problem.grade}
        module={problem.module}
        tags={problem.tags}
      />
      <QuestionCard question={problem.question} figures={problem.figures} />
      <SolutionTabs
        key={`solutions-${problem.id}`}
        methods={problem.solutions}
      />
      <KnowledgePoints
        key={`knowledge-${problem.id}`}
        points={problem.knowledgePoints}
        tags={problem.tags}
      />
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          练一练
        </h2>
        <PracticeCard
          key={`practice-${problem.id}`}
          prompt={problem.variant.question}
          fields={problem.variant.fields}
          answer={problem.variant.answer}
          hint={problem.variant.hint}
        />
      </section>
      <RelatedProblems key={`related-${problem.id}`} id={problem.id} />
    </div>
  );
}
