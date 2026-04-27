import { Navigate, useParams, type MetaFunction } from "react-router";

import { Methods } from "@/components/methods";
import { PracticeCard } from "@/components/practice-card";
import { ProblemHeader } from "@/components/problem-header";
import { QuestionCard } from "@/components/question-card";
import { RelatedProblems } from "@/components/related-problems";
import { SolutionTabs } from "@/components/solution-tabs";
import { getProblemById } from "@/lib/problems";
import { SITE_NAME, SITE_URL, buildMeta } from "@/lib/seo";

export const meta: MetaFunction = ({ params }) => {
  const problem = getProblemById(params.id);
  if (!problem) {
    return buildMeta({
      title: "题目未找到 - 一道+ / edao.plus",
      description: "抱歉，该题目不存在或已被移除。",
      path: `/p/${params.id ?? ""}`,
    });
  }
  const title = `${problem.title} (#${problem.id}) - 一道+ / edao.plus`;
  const snippet = problem.question.slice(0, 100);
  const truncated = problem.question.length > 100;
  const description = `${problem.grade}数学${problem.module}：${snippet}${truncated ? "..." : ""}`;
  const path = `/p/${problem.id}`;
  const keywords = [
    "小学奥数",
    problem.grade,
    problem.module,
    problem.title,
    ...(problem.difficulty ? [problem.difficulty] : []),
    ...problem.tags,
  ];
  return buildMeta({
    title,
    description,
    path,
    type: "article",
    keywords,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: problem.title,
      identifier: problem.id,
      url: `${SITE_URL}${path}`,
      inLanguage: "zh-CN",
      learningResourceType: "Problem",
      educationalLevel: problem.grade,
      educationalUse: "奥数训练",
      about: [problem.module, ...problem.tags],
      keywords: keywords.join(","),
      description,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  });
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
