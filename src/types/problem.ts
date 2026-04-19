import type { SceneSpec } from "./visual";

export type PracticeField = {
  key: string;
  label: string;
  type?: "number" | "text";
  placeholder?: string;
  enum?: string[];
};

export type ProblemModule =
  | "calc"
  | "geometry"
  | "numberTheory"
  | "word"
  | "travel"
  | "counting"
  | "misc";

export type Grade = "三年级" | "四年级" | "五年级" | "六年级";

export type VariantAnswerValue =
  | number
  | string
  | boolean
  | Array<number | string | boolean>;

export type ProblemFigure = {
  svg: string;
  caption?: string;
  alt?: string;
};

export type KnowledgePoint = {
  slug: string;
  name: string;
  summary?: string;
};

export type ProblemData = {
  id: string;
  title: string;
  grade: Grade;
  difficulty?: string;
  module: ProblemModule;
  question: string;
  figures?: ProblemFigure[];
  solutions: Array<{
    key: string;
    label: string;
    steps: string[];
    scenes?: Array<SceneSpec | null>;
  }>;
  variant: {
    question: string;
    figures?: ProblemFigure[];
    fields: PracticeField[];
    answer: Record<string, VariantAnswerValue>;
    hint?: string;
  };
  knowledgePoints?: KnowledgePoint[];
  tags: string[];
};
