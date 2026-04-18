import type { ProblemData } from "@/types/problem";

export default {
  id: "10166",
  title: "巧算·乘法分配律",
  grade: "四年级",
  difficulty: "进阶",
  module: "计算",
  question: "计算：99 × 101",
  solutions: [
    {
      key: "difference-of-squares",
      label: "平方差公式",
      steps: [
        {
          text: "99 × 101 = (100 − 1)(100 + 1) = 100² − 1² = 10000 − 1 = 9999。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "(100 − 1)(100 + 1)" },
                { lhs: "", rhs: "100² − 1² (平方差)" },
                { lhs: "", rhs: "10000 − 1", status: "keep" },
                { lhs: "", rhs: "9999", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：98 × 102",
    fields: [
      {
        key: "result",
        label: "结果",
      },
    ],
    answer: {
      result: 9996,
    },
    hint: "将 98 改写为 100 − 2，102 改写为 100 + 2，利用平方差公式。",
  },
  tags: ["平方差"],
} satisfies ProblemData;
