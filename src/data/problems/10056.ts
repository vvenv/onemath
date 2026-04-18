import type { ProblemData } from "@/types/problem";

export default {
  id: "10056",
  title: "速算与巧算·凑整法",
  grade: "三年级",
  difficulty: "基础",
  module: "计算",
  question: "计算：999 + 99 + 9",
  solutions: [
    {
      key: "rounding",
      label: "凑整法",
      steps: [
        {
          text: "999 + 99 + 9 = (1000 − 1) + (100 − 1) + (10 − 1) = 1000 + 100 + 10 − 3 = 1110 − 3 = 1107。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "原式", rhs: "(1000 − 1) + (100 − 1) + (10 − 1)" },
                { lhs: "", rhs: "1000 + 100 + 10 − 3" },
                { lhs: "", rhs: "1110 − 3", status: "keep" },
                { lhs: "", rhs: "1107", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：2998 + 498 + 98",
    fields: [
      {
        key: "result",
        label: "结果",
      },
    ],
    answer: {
      result: 3594,
    },
    hint: "2998 = 3000 − 2，498 = 500 − 2，98 = 100 − 2",
  },
  tags: ["凑整法"],
} satisfies ProblemData;
