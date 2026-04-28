import type { ProblemData } from "@/types/problem";

export default {
  id: "10151",
  title: "掷骰子·期望值",
  grade: "六年级",
  module: "计数",
  difficulty: "挑战",
  question: "掷一枚质地均匀的骰子，求掷出点数的期望值是多少？",
  solutions: [
    {
      key: "definition",
      label: "期望值定义法",
      steps: [
        "分析：期望值 = 每个可能结果 × 该结果的概率，然后求和。",
        "骰子有 6 个面，每个面出现的概率都是 1/6。",
        "点数分别是 1、2、3、4、5、6。",
        "期望值 = (1+2+3+4+5+6) × (1/6)。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "1 的贡献 (P=1/6)", rhs: "1 × 1/6 = 1/6" },
            { lhs: "2 的贡献 (P=1/6)", rhs: "2 × 1/6 = 2/6" },
            { lhs: "3 的贡献 (P=1/6)", rhs: "3 × 1/6 = 3/6" },
            { lhs: "4 的贡献 (P=1/6)", rhs: "4 × 1/6 = 4/6" },
            { lhs: "5 的贡献 (P=1/6)", rhs: "5 × 1/6 = 5/6" },
            { lhs: "6 的贡献 (P=1/6)", rhs: "6 × 1/6 = 6/6" },
            {
              lhs: "期望值",
              rhs: "(1+2+3+4+5+6)/6 = 21/6 = 3.5",
              status: "keep",
            },
          ],
          caption: "期望值 = Σ(结果 × 概率)",
        },
        {
          kind: "result-badges",
          items: [{ icon: "🎲", count: "3.5", label: "期望值" }],
          caption: "掷出点数的期望值是 3.5",
        },
      ],
    },
    {
      key: "symmetry",
      label: "对称性法",
      steps: [
        "分析：骰子的点数分布是对称的。",
        "1 和 6 对称，平均是 3.5。",
        "2 和 5 对称，平均是 3.5。",
        "3 和 4 对称，平均是 3.5。",
        "所以期望值就是 3.5。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "1 和 6 平均 (对称)", rhs: "(1+6)/2 = 3.5" },
            { lhs: "2 和 5 平均 (对称)", rhs: "(2+5)/2 = 3.5" },
            { lhs: "3 和 4 平均 (对称)", rhs: "(3+4)/2 = 3.5" },
            { lhs: "期望值", rhs: "3.5", status: "keep" },
          ],
          caption: "利用对称性快速计算期望值",
        },
      ],
    },
  ],
  variant: {
    question:
      "掷一枚质地均匀的骰子，如果掷出点数大于 4 得 10 分，否则得 0 分，求得分的期望值。",
    fields: [
      {
        key: "expected",
        label: "得分的期望值",
        type: "text",
      },
    ],
    answer: {
      expected: "10/3",
    },
    hint: "大于 4 的点数是 5 和 6，共 2 种，概率是 2/6 = 1/3。期望值 = 10 × (1/3) + 0 × (2/3) = 10/3。",
  },
  tags: ["期望值"],
} satisfies ProblemData;
