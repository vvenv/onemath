import type { ProblemData } from "@/types/problem";

export default {
  id: "10086",
  title: "等差数列幻方·连续奇数",
  grade: "四年级",
  difficulty: "基础",
  module: "杂题",
  question:
    "把 1, 3, 5, 7, 9, 11, 13, 15, 17 这 9 个连续奇数各用一次，填入一个 3 × 3 的方格中，使每一行、每一列、两条对角线上三个数之和都相等。\n问：这个公共和（幻和）是多少？",
  solutions: [
    {
      key: "sum",
      label: "累加法",
      steps: [
        {
          text: "分析：3 行恰好覆盖全部 9 个数各一次，所以 3 行之和 = 9 个数之总和。设幻和为 S，则 3S = 1+3+…+17。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "1+3+…+17 (前 9 个奇数之和 = 9² = 81)", rhs: "81" },
                { lhs: "3S", rhs: "81" },
                { lhs: "S (幻和)", rhs: "27", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "middle",
      label: "等差数列法（中位数 × 3）",
      steps: [
        {
          text: "分析：9 个数构成公差为 2 的等差数列。三阶幻方的性质：中心格 = 中位数，幻和 = 3 × 中位数。",
        },
        {
          text: "中位数为 9，所以 S = 3 × 9 = 27。",
        },
      ],
    },
  ],
  variant: {
    question:
      "把 2, 4, 6, 8, 10, 12, 14, 16, 18 这 9 个连续偶数各填一次，组成一个 3×3 幻方。幻和等于多少？中心格必须填几？",
    fields: [
      {
        key: "sum",
        label: "幻和",
        type: "number",
      },
      {
        key: "center",
        label: "中心",
        type: "number",
      },
    ],
    answer: {
      sum: 30,
      center: 10,
    },
    hint: "等差数列构三阶幻方时，中心 = 中位数，幻和 = 3 × 中位数。",
  },
  tags: ["累加法", "等差数列法"],
} satisfies ProblemData;
