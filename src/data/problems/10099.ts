import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10099-1.svg?raw";

export default {
  id: "10099",
  title: "分数辐射阵·1/8 到 7/8",
  grade: "六年级",
  module: "杂题",
  difficulty: "挑战",
  question:
    "把 7 个分数 1/8, 2/8, 3/8, 4/8, 5/8, 6/8, 7/8 各用一次，填入如图 3 条过中心的直线上（1 个中心圆 + 3 × 2 = 6 个外围圆），使每条直线上 3 个分数之和都相等。\n请问：中心圆必须填哪一个分数？此时每条直线的和 S 等于多少？并给出一种完整的填法。",
  figures: [
    {
      svg: svg1,
      alt: "7 圆辐射阵",
    },
  ],
  solutions: [
    {
      key: "center",
      label: "中心数法（分子视角）",
      steps: [
        {
          text: "所有分数分母相同，只需看分子。7 个分子为 1, 2, 3, 4, 5, 6, 7，总和 28。设中心分子为 c。",
          scenes: [],
        },
        {
          text: "每条线 3 个分子和为 T，则 3T = 3c + (28 − c) = 28 + 2c，即 T = (28 + 2c)/3。",
          scenes: [],
        },
        {
          text: "T 必须为整数，故 28 + 2c 能被 3 整除。28 ≡ 1 (mod 3)，所以 1 + 2c ≡ 0 (mod 3)，即 2c ≡ 2 (mod 3)，得 c ≡ 1 (mod 3)。",
          scenes: [],
        },
        {
          text: "在 1~7 中满足 c ≡ 1 (mod 3) 的有 c = 1, 4, 7。",
          scenes: [],
        },
        {
          text: "每条线外围两分子之和为 T − c = (28 − c)/3。当 c = 1, 4, 7 时，该值分别为 9, 8, 7，都在可行范围内（最大 7+6=13，最小 1+2=3）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "c = 1",
                  rhs: "T − c = (28 − 1)/3 = 9",
                },
                {
                  lhs: "c = 4",
                  rhs: "T − c = (28 − 4)/3 = 8",
                },
                {
                  lhs: "c = 7",
                  rhs: "T − c = (28 − 7)/3 = 7",
                },
              ],
            },
          ],
        },
        {
          text: "取 c = 1：外围需配成和为 9 的三对，剩余 {2,3,4,5,6,7} 可配成 {2,7}, {3,6}, {4,5}。",
          scenes: [],
        },
        {
          text: "三条线分子分别为 1+2+7=10, 1+3+6=10, 1+4+5=10，分数和 S = 10/8 = 5/4。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "c = 1",
                  rhs: "S = 5/4",
                },
                {
                  lhs: "c = 4",
                  rhs: "S = 3/2",
                },
                {
                  lhs: "c = 7",
                  rhs: "S = 7/4",
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
      "在相同辐射阵中填入 7 个分数 1/8, 2/8, …, 7/8，每线三数和相等。问：最小的线和 S 是多少？",
    fields: [
      {
        key: "min",
        label: "最小 S",
        type: "text",
        placeholder: "如 5/4",
      },
    ],
    answer: {
      min: "5/4",
    },
    hint: "S = (28 + 2c)/3 / 8；c 越小 S 越小，取 c = 1，S = 10/8 = 5/4。",
  },
  tags: ["中心数法", "累加法"],
} satisfies ProblemData;
