import type { ProblemData } from "@/types/problem";

export default {
  id: "10169",
  title: "比较大小·通分法",
  grade: "五年级",
  difficulty: "基础",
  module: "计算",
  question: "比较大小：3/7 和 4/9，哪个更大？",
  solutions: [
    {
      key: "cross",
      label: "交叉相乘法",
      steps: [
        {
          text: "3 × 9 = 27，4 × 7 = 28，因为 27 < 28，所以 3/7 < 4/9。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "3/7", rhs: "3 × 9 = 27" },
                { lhs: "4/9", rhs: "4 × 7 = 28" },
                { lhs: "比较", rhs: "27 < 28", status: "keep" },
                { lhs: "结论", rhs: "3/7 < 4/9", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "比较大小：5/8 和 7/12，哪个更大？",
    fields: [
      {
        key: "larger",
        label: "更大的分数",
        type: "text",
        enum: ["5/8", "7/12"],
      },
    ],
    answer: {
      larger: "5/8",
    },
    hint: "可以用交叉相乘法：5 × 12 = 60，7 × 8 = 56。",
  },
  tags: ["分数比较"],
} satisfies ProblemData;
