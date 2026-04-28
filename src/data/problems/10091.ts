import type { ProblemData } from "@/types/problem";

export default {
  id: "10091",
  title: "三阶积幻方·2 的幂",
  grade: "六年级",
  module: "杂题",
  difficulty: "挑战",
  question:
    "把下面 9 个数字各用一次：1, 2, 4, 8, 16, 32, 64, 128, 256，填入 3 × 3 方格中，使每一行、每一列、两条对角线上三个数的乘积都相等。问：这个公共乘积（幻积）是多少？",
  solutions: [
    {
      key: "logSum",
      label: "指数累加法",
      steps: [
        {
          text: "分析：这 9 个数都是 2 的幂：2⁰, 2¹, 2², …, 2⁸。把每个数用指数代替，乘法就转化成指数的加法——于是积幻方变成了指数为 0–8 的和幻方。",
          scenes: [],
        },
        {
          text: "指数 0 到 8 的和为 36，由 3 行指数和相等得 3S = 36，故指数幻和 S = 12。",
          scenes: [],
        },
        {
          text: "因此幻积 P = 2¹² = 4096。一种填法如下：",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "幻积 P = 2^S",
                  rhs: "（S = 指数幻和）",
                },
                {
                  lhs: "指数 0+1+…+8",
                  rhs: "36",
                },
                {
                  lhs: "3S",
                  rhs: "36 → S = 12",
                },
                {
                  lhs: "P",
                  rhs: "2¹² = 4096",
                  status: "keep",
                  badge: "幻积",
                },
              ],
            },
            {
              kind: "number-grid",
              rows: 3,
              cols: 3,
              cells: [
                {
                  row: 0,
                  col: 0,
                  value: 2,
                },
                {
                  row: 0,
                  col: 1,
                  value: 64,
                },
                {
                  row: 0,
                  col: 2,
                  value: 32,
                },
                {
                  row: 1,
                  col: 0,
                  value: 256,
                },
                {
                  row: 1,
                  col: 1,
                  value: 16,
                  tone: "primary",
                },
                {
                  row: 1,
                  col: 2,
                  value: 1,
                },
                {
                  row: 2,
                  col: 0,
                  value: 8,
                },
                {
                  row: 2,
                  col: 1,
                  value: 4,
                },
                {
                  row: 2,
                  col: 2,
                  value: 128,
                },
              ],
              caption: "一种积幻方填法（中心 16 = 2⁴）",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "用 9 个数 3⁰, 3¹, 3², …, 3⁸（即 1, 3, 9, 27, 81, 243, 729, 2187, 6561）组三阶积幻方，每行/列/对角线乘积相等。这个幻积是多少？中心格填哪个数？",
    fields: [
      {
        key: "product",
        label: "幻积",
        type: "text",
      },
      {
        key: "center",
        label: "中心",
        type: "number",
      },
    ],
    answer: {
      product: "3^12",
      center: 81,
    },
    hint: "指数 0 到 8 的和幻方中心为 4，幻和为 12；换回 3 的幂，中心 = 3⁴ = 81，幻积 = 3¹² = 531441。",
  },
  tags: ["累加法"],
} satisfies ProblemData;
