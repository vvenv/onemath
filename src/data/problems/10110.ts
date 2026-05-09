import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10110-1.svg?raw";

export default {
  id: "10110",
  title: "相邻差约束圆阵·1 到 7",
  grade: "五年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "把 1, 2, 3, 4, 5, 6, 7 这 7 个数字各用一次填入圆周上依次排列的 7 个圆 A₁, A₂, …, A₇（首尾相接）。\n已知相邻两圆上的数字之差的绝对值依次为 2, 1, 3, 1, 3, 1, 5（即 |A₂ − A₁| = 2，|A₃ − A₂| = 1，…，|A₁ − A₇| = 5）。\n若规定 A₁ = 1，请从 A₁ 开始顺时针写出 7 个圆上的数字。",
  figures: [
    {
      svg: svg1,
      alt: "圆周上依次排列的 7 个圆 A₁ 到 A₇",
    },
  ],
  solutions: [
    {
      key: "parity",
      label: "奇偶性 + 试填",
      steps: [
        {
          text: "分析：相邻两数之差可以是加或减。绕圆一周后必须回到起点，所以所有「加的步数」之和必须等于「减的步数」之和。7 个差值 2, 1, 3, 1, 3, 1, 5 的总和是 16，因此加的步数和 = 减的步数和 = 8。",
          scenes: [],
        },
        {
          text: "从 A₁ = 1 开始尝试。若第一步是加 2，得到 A₂ = 3；继续按差值序列试填，恰好用完 1–7 且满足闭合条件（详见 scenes）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "A₁ = 1",
                  rhs: "",
                },
                {
                  lhs: "A₂ = 1 + 2",
                  rhs: "3",
                },
                {
                  lhs: "A₃ = 3 − 1",
                  rhs: "2",
                },
                {
                  lhs: "A₄ = 2 + 3",
                  rhs: "5",
                },
                {
                  lhs: "A₅ = 5 − 1",
                  rhs: "4",
                },
                {
                  lhs: "A₆ = 4 + 3",
                  rhs: "7",
                },
                {
                  lhs: "A₇ = 7 − 1",
                  rhs: "6",
                },
                {
                  lhs: "验证 |A₁ − A₇|",
                  rhs: "|1 − 6| = 5 ✓",
                  status: "keep",
                },
              ],
            },
          ],
        },
        {
          text: "结论：7 个圆上的数字依次为 1, 3, 2, 5, 4, 7, 6。",
          scenes: [],
        },
      ],
    },
  ],
  variant: {
    question:
      "把 1–7 各用一次填入圆周 7 个位置（首尾相接），相邻差绝对值依次为 2, 1, 3, 1, 3, 1, 5（与原题相同）。若规定 A₁ = 7（而不是 1），请写出 A₂, A₃。",
    fields: [
      {
        key: "a2",
        label: "A₂",
        type: "number",
      },
      {
        key: "a3",
        label: "A₃",
        type: "number",
      },
    ],
    answer: {
      a2: 5,
      a3: 6,
    },
    hint: "把原解 1,3,2,5,4,7,6 关于圆周做镜像反转，得到 7,5,6,3,4,1,2。",
  },
  tags: ["奇偶性"],
} satisfies ProblemData;
