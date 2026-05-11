import type { ProblemData } from "@/types/problem";

export default {
  id: "10191",
  title: "完全平方数·范围计数",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "在 200 到 500 之间，有多少个完全平方数？\n\n这些完全平方数的和是多少？",
  solutions: [
    {
      key: "perfect-square-range",
      label: "完全平方数范围分析",
      steps: [
        {
          text: "分析：完全平方数可以表示为 n²。求满足 200 ≤ n² ≤ 500 的整数 n。\n\n对应的完全平方数：225、256、289、324、361、400、441、484。和为 225 + 256 + 289 + 324 + 361 + 400 + 441 + 484 = 2780。",
        },
      ],
    },
  ],
  variant: {
    question:
      "在 300 到 600 之间，有多少个完全平方数？这些完全平方数的和是多少？",
    fields: [
      {
        key: "count",
        label: "个数",
        type: "number",
      },
      {
        key: "sum",
        label: "和",
        type: "number",
      },
    ],
    answer: {
      count: 7,
      sum: 2695,
    },
    hint: "√300 ≈ 17.32，√600 ≈ 24.49。n ∈ {18, 19, 20, 21, 22, 23, 24}。",
  },
  tags: ["完全平方数"],
} satisfies ProblemData;
