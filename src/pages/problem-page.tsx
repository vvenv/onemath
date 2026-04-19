import { Navigate, useParams, type MetaFunction } from "react-router";

import { PracticeCard } from "@/components/practice-card";
import { ProblemHeader } from "@/components/problem-header";
import { QuestionCard } from "@/components/question-card";
import { SolutionTabs } from "@/components/solution-tabs";
import { getProblemById } from "@/lib/problems";
import type { ProblemData } from "@/types/problem";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const problem = data as ProblemData | null;
  if (!problem) {
    return [{ title: "题目未找到 - 一道 / edao.plus" }];
  }
  const title = `${problem.title} (#${problem.id}) - 一道 / edao.plus`;
  const description = `${problem.grade}数学${problem.module === "calc" ? "计算" : problem.module === "geometry" ? "几何" : problem.module === "numberTheory" ? "数论" : problem.module === "word" ? "应用题" : problem.module === "travel" ? "行程" : problem.module === "counting" ? "计数" : "杂题"}：${problem.question.slice(0, 100)}${problem.question.length > 100 ? "..." : ""}`;
  return [{ title }, { name: "description", content: description }];
};

export function loader({ params }: { params: { id: string } }) {
  return getProblemById(params.id);
}

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
    </div>
  );
}
