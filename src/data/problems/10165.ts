import type { ProblemData } from "@/types/problem";

export default {
  id: "10165",
  title: "速算与巧算·凑整法",
  grade: "三年级",
  module: "计算",
  difficulty: "基础",
  question: "计算：125 × 32",
  solutions: [
    {
      key: "grouping",
      label: "凑整法",
      steps: [
        {
          text: "125 × 32 = 125 × (4 × 8) = (125 × 8) × 4 = 1000 × 4 = 4000。",
        },
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "125 × 32 (拆分 32)",
              rhs: "125 × (4 × 8)",
            },
            {
              lhs: " (结合律)",
              rhs: "= (125 × 8) × 4",
            },
            {
              lhs: "",
              rhs: "= 1000 × 4",
              status: "keep",
            },
            {
              lhs: "",
              rhs: "= 4000",
              status: "keep",
            },
          ],
          caption: "利用 125 × 8 = 1000 的凑整技巧",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "125 × 8",
              value: 1000,
              max: 1000,
              tone: "primary",
            },
            {
              label: "1000 × 4",
              value: 4000,
              max: 4000,
              tone: "primary",
            },
          ],
          caption: "先凑成 1000，再乘以 4",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔢",
              count: 4000,
            },
          ],
          caption: "125 × 32 = 4000",
        },
      ],
    },
    {
      key: "distributive",
      label: "乘法分配律",
      steps: [
        {
          text: "125 × 32 = 125 × (30 + 2) = 125 × 30 + 125 × 2 = 3750 + 250 = 4000。",
        },
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "125 × 32 (拆分 32)",
              rhs: "125 × (30 + 2)",
            },
            {
              lhs: " (分配律)",
              rhs: "= 125 × 30 + 125 × 2",
            },
            {
              lhs: "",
              rhs: "= 3750 + 250",
              status: "keep",
            },
            {
              lhs: "",
              rhs: "= 4000",
              status: "keep",
            },
          ],
          caption: "乘法分配律的另一种解法",
        },
      ],
    },
  ],
  variant: {
    question: "计算：25 × 48",
    fields: [
      {
        key: "result",
        label: "计算结果",
      },
    ],
    answer: {
      result: 1200,
    },
    hint: "25 × 4 = 100，试着把 48 拆成 4 × 12。",
  },
  tags: ["凑整法", "乘法分配律"],
} satisfies ProblemData;
