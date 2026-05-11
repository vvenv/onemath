import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10097-1.svg?raw";

export default {
  id: "10097",
  title: "多线辐射阵·1 到 13",
  grade: "五年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "如图，把 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 这 13 个数字各用一次，填入 4 条过中心的直线上（1 个中心圆 + 4 × 3 = 12 个外围圆），使每条直线上 4 个数字之和都相等。\n\n问中心圆必须填几？每条直线的和 S 是多少？",
  figures: [
    {
      svg: svg1,
      alt: "13 圆辐射阵：中心 1 个圆，4 条过中心的直线上各有 3 个外围圆，共 12 个外围圆",
    },
  ],
  solutions: [
    {
      key: "center",
      label: "中心数法",
      steps: [
        {
          text: "分析：设中心圆填 c。4 条直线共享中心，4S = 中心算 4 次 + 其余 12 数算 1 次 = 4c + (91 − c) = 91 + 3c，其中 1+2+…+13 = 91。",
          scenes: [],
        },
        {
          text: "分析模 4 条件：4 S 须为 4 的倍数，推导中心 c 的可能取值。",
          scenes: [],
        },
        {
          text: "三种情形都能把剩下 12 个数分成 4 组（每组和 = S − c）实现：c = 3 取 {1,9,12}/{2,7,13}/{4,8,10}/{5,6,11}；c = 7 取 {1,9,11}/{2,6,13}/{3,8,10}/{4,5,12}；c = 11 取 {1,6,13}/{2,8,10}/{3,5,12}/{4,7,9}。",
          scenes: [],
        },
        {
          text: "S 的所有可能取值为 25、28、31。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "4S",
                  rhs: "91 + 3c",
                },
                {
                  lhs: "c mod 4",
                  rhs: "3 → c ∈ {3,7,11}",
                },
                {
                  lhs: "S",
                  rhs: "25, 28, 31",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在上述阵形中填 1–13，各条直线 4 数和 S 相同。\n\n问 S 的最小值是多少？此时中心填几？",
    fields: [
      {
        key: "min",
        label: "最小 S",
        type: "number",
      },
      {
        key: "center",
        label: "中心",
        type: "number",
      },
    ],
    answer: {
      min: 25,
      center: 3,
    },
    hint: "由 4S = 91 + 3c 得 c 越小 S 越小；c ∈ {3,7,11}，取 c = 3，S = 25。",
  },
  tags: ["中心数法", "累加法"],
} satisfies ProblemData;
