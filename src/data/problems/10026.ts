import type { ProblemData } from "@/types/problem";

export default {
  id: "10026",
  title: "计算·分组巧算",
  grade: "三年级",
  difficulty: "基础",
  module: "计算",
  question: "计算：1 − 2 + 3 − 4 + 5 − 6 + ... + 99 − 100",
  solutions: [
    {
      key: "grouping",
      label: "分组法",
      steps: [
        {
          text: "算式共 100 项，两两分组：(1−2) + (3−4) + ... + (99−100) = 50 × (−1) = −50。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "(1 − 2)", rhs: "−1" },
                { lhs: "(3 − 4)", rhs: "−1" },
                { lhs: "…", rhs: "…" },
                { lhs: "(99 − 100)", rhs: "−1", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：100 − 99 + 98 − 97 + ... + 2 − 1",
    fields: [
      {
        key: "result",
        label: "计算结果",
      },
    ],
    answer: {
      result: 50,
    },
    hint: "也是两两分组，但这次是 (100−99), (98−97) ... 每组的结果是 +1。",
  },
  tags: ["分类讨论"],
} satisfies ProblemData;
