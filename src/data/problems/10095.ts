import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10095-1.svg?raw";

export default {
  id: "10095",
  title: "米字辐射阵·1 到 7",
  grade: "四年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "把 1, 2, 3, 4, 5, 6, 7 这 7 个数字各用一次，填入如图 3 条过中心的直线上（共 1 个中心圆 + 3 × 2 = 6 个外围圆，共 7 个位置），使每条直线上 3 个数字之和都相等。\n问：中心圆里可以填哪些数字？并各写出一种对应的填法。",
  figures: [
    {
      svg: svg1,
      alt: "米字形 7 圆",
    },
  ],
  solutions: [
    {
      key: "center",
      label: "中心数法",
      steps: [
        {
          text: "用中心数法：3 条线相加时中心 c 算 3 次，建立关系式并推导 c 的可能取值。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "3S",
                  rhs: "28 + 2c",
                },
                {
                  lhs: "中心 c",
                  rhs: "1 / 4 / 7",
                  status: "keep",
                },
                {
                  lhs: "对应 S",
                  rhs: "10 / 12 / 14",
                },
              ],
            },
          ],
        },
        {
          text: "三种情形都能把剩下 6 数按和相等分成 3 对：c = 1 → {2,7}/{3,6}/{4,5}（S = 10）；c = 4 → {1,7}/{2,6}/{3,5}（S = 12）；c = 7 → {1,6}/{2,5}/{3,4}（S = 14）。",
          scenes: [],
        },
      ],
    },
  ],
  variant: {
    question:
      "在 3 条过中心的直线上（7 个位置）填入 1–7，各条直线三数和相等。问可能的最大和是多少？",
    fields: [
      {
        key: "max",
        label: "最大 S",
        type: "number",
      },
    ],
    answer: {
      max: 14,
    },
    hint: "3S = 28 + 2c，中心越大和越大；c = 7 时 S = 14。",
  },
  tags: ["中心数法", "累加法"],
} satisfies ProblemData;
