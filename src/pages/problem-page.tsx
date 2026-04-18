import { Navigate, useParams, type MetaFunction } from "react-router";

import { Methods } from "@/components/methods";
import { PracticeCard } from "@/components/practice-card";
import { ProblemHeader } from "@/components/problem-header";
import { QuestionCard } from "@/components/question-card";
import { RelatedProblems } from "@/components/related-problems";
import { SolutionTabs } from "@/components/solution-tabs";
import { getProblemById } from "@/lib/problems";
import { buildMeta } from "@/lib/seo";
import { useTrackRecentProblem } from "@/lib/recent-problems";

export const meta: MetaFunction = ({ params }) => {
  const id = params.id as string | undefined;
  const problem = id ? getProblemById(id) : undefined;
  if (!problem) {
    return buildMeta({
      title: "题目 - 一道+ / edao.plus",
      description: "小学奥数题目详解",
      path: "/p",
    });
  }
  const description = problem.question.replace(/\s+/g, " ").slice(0, 160);
  return buildMeta({
    title: `${problem.title} - 一道+ / edao.plus`,
    description,
    path: `/p/${problem.id}`,
    type: "article",
    keywords: problem.tags,
  });
};

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const problem = id ? getProblemById(id) : undefined;

  // Hook must be called unconditionally; pass undefined if no problem.
  useTrackRecentProblem(id);

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
      <Methods key={`methods-${problem.id}`} tags={problem.tags} />
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold tracking-tight text-foreground">练一练</h2>
        <PracticeCard
          key={`practice-${problem.id}`}
          prompt={problem.variant.question}
          figures={problem.variant.figures}
          fields={problem.variant.fields}
          answer={problem.variant.answer}
          hint={problem.variant.hint}
        />
      </section>
      <RelatedProblems key={`related-${problem.id}`} id={problem.id} />
    </div>
  );
}
