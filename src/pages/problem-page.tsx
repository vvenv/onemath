import { Navigate, useParams } from "react-router";

import { PracticeCard } from "@/components/practice-card";
import { ProblemHeader } from "@/components/problem-header";
import { QuestionCard } from "@/components/question-card";
import { SolutionTabs } from "@/components/solution-tabs";
import { getProblemById } from "@/lib/problems";

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const problem = getProblemById(id);

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
        topic={problem.topic}
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
