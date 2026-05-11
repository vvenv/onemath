import type { ProblemData } from "@/types/problem";

export default {
  id: "10192",
  title: "因数个数·构造问题",
  grade: "六年级",
  difficulty: "挑战",
  module: "数论",
  question:
    "一个自然数恰好有 18 个因数，且这个数在 200 到 500 之间。\n\n满足条件的数有哪些？",
  solutions: [
    {
      key: "divisor-count-construction",
      label: "因数个数公式与构造",
      steps: [
        {
          text: "分析：因数个数 18 = 18×1 = 9×2 = 6×3 = 3×3×2，对应形式 p¹⁷、p⁸q¹、p⁵q²、p²q²r¹。p¹⁷ 和 p⁸q¹ 形式超出范围。\n\n满足条件的数：252 = 2²×3²×7，288 = 2⁵×3²，300 = 2²×3×5²，396 = 2²×3²×11，450 = 2×3²×5²，468 = 2²×3²×13，共 6 个。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "252", rhs: "2² × 3² × 7" },
                { lhs: "288", rhs: "2⁵ × 3²" },
                { lhs: "300", rhs: "2² × 3 × 5²" },
                { lhs: "396", rhs: "2² × 3² × 11" },
                { lhs: "450", rhs: "2 × 3² × 5²" },
                { lhs: "468", rhs: "2² × 3² × 13" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个自然数恰好有 16 个因数，且这个数在 100 到 300 之间。\n\n满足条件的数有哪些？",
    fields: [
      {
        key: "count",
        label: "满足条件的数个数",
        type: "number",
      },
    ],
    answer: {
      count: 8,
    },
    hint: "16 = 16 = 8×2 = 4×4 = 4×2×2 = 2×2×2×2，对应形式 p¹⁵、p⁷q¹、p³q³、p³q¹r¹、p¹q¹r¹s¹。",
  },
  tags: ["因数个数", "质因数分解"],
} satisfies ProblemData;
