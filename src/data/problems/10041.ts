import type { ProblemData } from "@/types/problem";

export default {
  id: "10041",
  title: "整除特征·数字谜",
  grade: "五年级",
  difficulty: "进阶",
  module: "数论",
  question:
    "在四位数 2A7B 中，A、B 各代表一个数字。已知这个四位数能同时被 3 和 5 整除，\n求 A + B 的最大值。",
  solutions: [
    {
      key: "rule",
      label: "整除特征分析法",
      steps: [
        {
          text: "B=0 时 A 为 3 的倍数，最大 A=9，A+B=9；\nB=5 时 A≡1(mod3)，最大 A=7，A+B=12。\n取最大得 A+B=12。",
          scenes: [
            {
              kind: "statement-table",
              headers: { speaker: "B", claim: "条件", verdict: "A+B是3的倍数" },
              rows: [
                {
                  speaker: "0",
                  claim: "个位为0",
                  verdict: "true",
                  badge: "A最大=9",
                },
                {
                  speaker: "5",
                  claim: "个位为5",
                  verdict: "true",
                  badge: "A最大=7",
                },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "数字和",
                  rhs: "2 + A + 7 + B = 9 + A + B",
                  status: "keep",
                },
                {
                  lhs: "B = 0 时 (A+B=9)",
                  rhs: "A + 0 是 3 的倍数 → A最大 = 9",
                  status: "keep",
                },
                {
                  lhs: "B = 5 时 (A+B=12)",
                  rhs: "A + 5 是 3 的倍数 → A最大 = 7",
                  status: "keep",
                },
              ],

            },
            {
              kind: "result-badges",
              items: [
                { icon: "🔢", count: "2970", label: "B=0 时的最大数" },
                { icon: "🔢", count: "2775", label: "B=5 时的最大数" },
                { icon: "✅", count: 12, label: "A+B 最大值" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question: "四位数 5A2B 能同时被 2 和 3 整除。求 A × B 的最大值。",
    fields: [
      {
        key: "max_product",
        label: "A×B 最大值",
      },
    ],
    answer: {
      max_product: 72,
    },
    hint: "被 2 整除：B 为偶数。被 3 整除：数字和是 3 的倍数。",
  },
  tags: ["整除特征"],
} satisfies ProblemData;
