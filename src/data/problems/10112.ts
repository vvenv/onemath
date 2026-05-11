import type { ProblemData } from "@/types/problem";

export default {
  id: "10112",
  title: "四组 2×2 子方和相等·最小值",
  grade: "六年级",
  difficulty: "挑战",
  module: "杂题",
  question:
    "如图，在 3×3 的方格表中，将 1, 2, 3, 4, 5, 6, 7, 8, 9 这 9 个数字各填入一格，使每行、每列、每条对角线上的 3 个数字之和都相等（即 3 阶幻方）。\n\n求满足上述条件的所有填法中，中心格（第 2 行第 2 列）的数字必须是多少？子方格内 4 数之和都相等，记为 S。\n\n问：S 的最小可能值是多少？请给出一种使 S 达到最小的具体填法。",
  solutions: [
    {
      key: "formula",
      label: "累加法推出下界",
      steps: [
        {
          text: "分析：按位置把 4 个 2×2 子方相加得 4S，每格被算的次数恰好是：中心 4 次、4 条边中各 2 次、4 个角各 1 次。\n\n设中心为 c、边中 4 数之和为 E，则 角和 = 45 − c − E，故 4S = 4c + (45 − c − E) + 2E = 45 + 3c + E。",
        },
        {
          text: "要 4S 为 4 倍数：45 + 3c + E ≡ 0 (mod 4)，即 3c + E ≡ 3 (mod 4)。为使 S 最小就让 3c + E 最小：取 c = 1 时需 E ≡ 0 (mod 4)，从 {2..9} 中取 4 个数且和为 4 的倍数的最小值是 2 + 3 + 4 + 7 = 16，得 4S = 45 + 3 + 16 = 64，S = 16。",
        },
        {
          text: "具体存在性：取 c = 1、边中 {2, 3, 4, 7}、角 {5, 6, 8, 9}，按相邻 2×2 差为 0 的配对方程枚举出一组填法：5 3 8 / 7 1 4 / 6 2 9，四个子方皆为 16 ✓。",
        },
        {
          text: "结论：S 的最小可能值为 16。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "4S", rhs: "45 + 3c + E" },
                { lhs: "c = 1 ⇒ E ≡ 0 (mod 4)", rhs: "最小 E = 2+3+4+7 = 16" },
                { lhs: "4S (最小)", rhs: "64 ⇒ S = 16", status: "keep" },
              ],
            },
            {
              kind: "number-grid",
              rows: 3,
              cols: 3,
              cells: [
                { row: 0, col: 0, value: 5 },
                { row: 0, col: 1, value: 3 },
                { row: 0, col: 2, value: 8 },
                { row: 1, col: 0, value: 7 },
                { row: 1, col: 1, value: 1, tone: "primary" },
                { row: 1, col: 2, value: 4 },
                { row: 2, col: 0, value: 6 },
                { row: 2, col: 1, value: 2 },
                { row: 2, col: 2, value: 9 },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在 3×3 方格中填入 1–9，使每行、每列、每对角线三数之和相等（3 阶幻方）。\n\n求所有满足条件的填法中，中心格的数字必须是多少？",
    fields: [
      {
        key: "max",
        label: "最大 S",
        type: "number",
      },
      {
        key: "center",
        label: "中心",
        type: "number",
      },
    ],
    answer: {
      max: 24,
      center: 9,
    },
    hint: "由 4S = 45 + 3c + E，c 最大取 9；此时 E ≡ 0 (mod 4)，从 {1..8} 中取 4 个数，和最大且是 4 倍数的为 3+6+7+8 = 24，4S = 45+27+24 = 96，S = 24。可验证填法 5 3 4 / 7 9 8 / 2 6 1 满足（各子方均 = 24）。",
  },
  tags: ["累加法", "比较法", "分类讨论"],
} satisfies ProblemData;
