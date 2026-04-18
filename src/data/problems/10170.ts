import type { ProblemData } from "@/types/problem";

export default {
  id: "10170",
  title: "经济问题·利润折扣",
  grade: "五年级",
  difficulty: "进阶",
  module: "应用题",
  question:
    "一件商品原价 200 元，先提价 20%，再降价 20%。\n现在的价格是多少元？",
  solutions: [
    {
      key: "percentage",
      label: "百分数计算法",
      steps: [
        {
          text: "200 × 1.2 × 0.8 = 200 × 0.96 = 192 元。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "提价后价格", rhs: "200 × 1.2 = 240", status: "keep" },
                { lhs: "降价后价格", rhs: "240 × 0.8 = 192", status: "keep" },
              ],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "原价", value: 200, max: 240, tone: "muted" },
                { label: "提价后", value: 240, max: 240, tone: "primary" },
                { label: "现价", value: 192, max: 240, tone: "primary" },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "💰", count: 192, label: "现价（元）" }],

            },
          ],
        },
      ],
    },
    {
      key: "formula",
      label: "综合公式法",
      steps: [
        {
          text: "200 × 1.2 × 0.8 = 192 元。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "现价", rhs: "200 × 1.2 × 0.8" },
                { lhs: "", rhs: "200 × 0.96" },
                { lhs: "", rhs: "192", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一件商品先降价 25%，再提价 25%。如果现价是 180 元，原价是多少元？",
    fields: [
      {
        key: "original",
        label: "原价（元）",
      },
    ],
    answer: {
      original: 192,
    },
    hint: "设原价为 x，则 x × 0.75 × 1.25 = 180。",
  },
  tags: [],
} satisfies ProblemData;
