import type { ProblemData } from "@/types/problem";

export default {
  id: "10028",
  title: "计算·分数裂项",
  grade: "六年级",
  difficulty: "挑战",
  module: "计算",
  question: "计算：1/2 + 1/6 + 1/12 + 1/20 + 1/30",
  solutions: [
    {
      key: "split",
      label: "裂项相消法",
      steps: [
        {
          text: "裂项：1/2=1-1/2, 1/6=1/2-1/3, 1/12=1/3-1/4, 1/20=1/4-1/5, 1/30=1/5-1/6。\n\n相消后原式=1-1/6=5/6。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1/2", rhs: "1 − 1/2" },
                { lhs: "1/6", rhs: "1/2 − 1/3" },
                { lhs: "1/12", rhs: "1/3 − 1/4" },
                { lhs: "1/20", rhs: "1/4 − 1/5" },
                { lhs: "1/30", rhs: "1/5 − 1/6" },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "原式",
                  rhs: "1 − 1/2 + 1/2 − 1/3 + 1/3 − 1/4 + 1/4 − 1/5 + 1/5 − 1/6",
                },
                { lhs: "", rhs: "1 − 1/6", status: "keep" },
                { lhs: "", rhs: "5/6", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "计算：1/12 + 1/20 + 1/30 + 1/42 + 1/56",
    fields: [
      {
        key: "result",
        label: "计算结果",
      },
    ],
    answer: {
      result: "5/24",
    },
    hint: "分母的规律是 3×4， 4×5， 5×6， 6×7， 7×8。",
  },
  tags: ["裂项"],
} satisfies ProblemData;
