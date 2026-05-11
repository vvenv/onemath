import type { ProblemData } from "@/types/problem";

export default {
  id: "10196",
  title: "归纳与递推·吃鸡蛋问题",
  grade: "四年级",
  difficulty: "进阶",
  module: "计数",
  question:
    "小明每天吃鸡蛋，每天只能吃 1 个或 2 个。如果要在一周内（7 天）正好吃完 10 个鸡蛋，问一共有多少种不同的吃法？",
  solutions: [
    {
      key: "combination",
      label: "组合法",
      steps: [
        {
          text: "设 x 为吃 1 个鸡蛋的天数，y 为吃 2 个鸡蛋的天数。",
        },
        {
          text: "列方程组：x + y = 7（总天数），x + 2y = 10（总鸡蛋数）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "x + y", rhs: "7" },
                { lhs: "x + 2y", rhs: "10" },
              ],
            },
          ],
        },
        {
          text: "相减得 y = 3，代入得 x = 4。即 3 天吃 2 个，4 天吃 1 个。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "y", rhs: "10 − 7 = 3" },
                { lhs: "x", rhs: "7 − 3 = 4" },
              ],
            },
          ],
        },
        {
          text: "问题转化为：从 7 天中选出 3 天吃 2 个鸡蛋（其余 4 天吃 1 个）。",
        },
        {
          text: "组合数：C(7, 3) = 7 × 6 × 5 / (3 × 2 × 1) = 35。",
        },
      ],
    },
  ],
  variant: {
    question:
      "每天吃 1 个或 2 个鸡蛋，要在 5 天内正好吃完 8 个鸡蛋，一共有多少种不同的吃法？",
    fields: [
      {
        key: "ways",
        label: "吃法数",
        type: "number",
      },
    ],
    answer: {
      ways: 10,
    },
    hint: "设 3 天吃 2 个、2 天吃 1 个，排列数 C(5, 3) = 10。",
  },
  tags: ["组合"],
} satisfies ProblemData;
