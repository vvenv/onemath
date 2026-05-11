import type { ProblemData } from "@/types/problem";

export default {
  id: "10035",
  title: "排列组合·选人组队",
  grade: "五年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "从 5 名同学中选出 3 人参加比赛。请问：\n\n（1）有多少种不同的选法？\n\n（2）如果选出的 3 人还要分配不同的任务（队长、副队长、记录员），有多少种不同的安排方式？",
  solutions: [
    {
      key: "combination-permutation",
      label: "组合与排列法",
      steps: [
        {
          text: "（1）C(5,3) = (5×4×3) ÷ (3×2×1) = 10 种。",
          scenes: [
            {
              kind: "heads",
              heads: { count: 5 },
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "C(5,3) (组合数)", rhs: "(5×4×3) ÷ (3×2×1)" },
                { lhs: "", rhs: "10", status: "keep" },
              ],
            },
          ],
        },
        {
          text: "（2）A(5,3) = 5×4×3 = 60 种。",
          scenes: [
            {
              kind: "heads-split",
              left: {
                count: 10,
                ticks: [{ count: 1 }],
              },
              right: {
                count: 6,
                ticks: [{ count: 1 }],
              },
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "A(5,3) (排列数)", rhs: "5×4×3" },
                { lhs: "", rhs: "60", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "从6本不同的书中选出4本送给朋友。\n\n如果选出的书要按顺序排列在书架上，有多少种方式？",
    fields: [
      {
        key: "ways",
        label: "排列方式",
      },
    ],
    answer: {
      ways: 360,
    },
    hint: "从6本中选4本排列：A(6,4) = 6×5×4×3 = 360。",
  },
  tags: ["组合", "排列", "乘法原理"],
} satisfies ProblemData;
