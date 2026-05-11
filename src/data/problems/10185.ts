import type { ProblemData } from "@/types/problem";

export default {
  id: "10185",
  title: "整除特征·多重约束",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "在五位数 3A7B0 中，A、B 各代表一个数字。已知这个五位数能同时被 3、4、5 整除，\n\n求 A + B 的最大值。",
  solutions: [
    {
      key: "divisibility-rules",
      label: "整除特征综合分析",
      steps: [
        {
          text: "分析：被 5 整除 ⇒ 个位是 0（题目已固定）。被 4 整除 ⇒ 末两位 B0 能被 4 整除，即 B0 ÷ 4 为整数。\n\n检验 B 的取值：B0 能被 4 整除的 B ∈ {0, 2, 4, 6, 8}。最大 B = 8。",
        },
        {
          text: "被 3 整除 ⇒ 数字和 3 + A + 7 + B + 0 = 10 + A + B 是 3 的倍数。当 B = 8 时，18 + A 是 3 的倍数，A ∈ {0, 3, 6, 9}，最大 A = 9。\n\nA + B 的最大值 = 9 + 8 = 17。对应五位数 39780，验证：39780 ÷ 3 = 13260 ✓，39780 ÷ 4 = 9945 ✓，39780 ÷ 5 = 7956 ✓。",
          scenes: [
            {
              kind: "statement-table",
              headers: {
                speaker: "B",
                claim: "末两位",
                verdict: "÷4",
              },
              rows: [
                { speaker: "0", claim: "00", verdict: "true" },
                { speaker: "2", claim: "20", verdict: "true" },
                { speaker: "4", claim: "40", verdict: "true" },
                { speaker: "6", claim: "60", verdict: "true" },
                { speaker: "8", claim: "80", verdict: "true" },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "被 5 整除", rhs: "个位固定为 0 ✓", status: "keep" },
                {
                  lhs: "被 4 整除",
                  rhs: "B ∈ {0, 2, 4, 6, 8}，最大 B = 8",
                  status: "keep",
                },
                {
                  lhs: "被 3 整除",
                  rhs: "10 + A + B 是 3 的倍数",
                  status: "keep",
                },
                {
                  lhs: "B = 8 时",
                  rhs: "18 + A 是 3 的倍数，A ∈ {0, 3, 6, 9}",
                  status: "keep",
                },
                { lhs: "最大 A + B", rhs: "9 + 8 = 17", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在五位数 2A9B0 中，A、B 各代表一个数字。已知这个五位数能同时被 3、4、5 整除，求 A × B 的最大值。",
    fields: [
      {
        key: "max_product",
        label: "A×B 最大值",
        type: "number",
      },
    ],
    answer: {
      max_product: 72,
    },
    hint: "被 5 整除 ⇒ 个位 0。被 4 整除 ⇒ B 为偶数。被 3 整除 ⇒ 11 + A + B 是 3 的倍数。",
  },
  tags: ["整除特征"],
} satisfies ProblemData;
