import svg1 from "./figures/10111-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10111",
  title: "数阵最值·三角顶点和最大",
  grade: "五年级",
  difficulty: "挑战",
  module: "杂题",
  question:
    "如图，把 1, 2, 3, 4, 5, 6 这 6 个数字各用一次，填入三角形的 3 个顶点和 3 条边的中点，使三角形每条边上 3 个数字（两端顶点 + 中点）之和都相等。\n\n问：\n\n- 这个公共边和 S 的最大值是多少？\n- 此时 3 个顶点上的数字之和等于多少？\n- 请给出一种使 S 达到最大的具体填法。",
  figures: [
    {
      svg: svg1,
      alt: "三角形数阵 6 个位置",
    },
  ],
  solutions: [
    {
      key: "max",
      label: "累加法 + 比较法",
      steps: [
        {
          text: "用累加法建立三边和与顶点和的关系，求 S 的最大值。",
        },
        {
          text: "此时中点来自 {1, 2, 3}，按“12 − 两端顶点”配：4–5 边缺 3、4–6 边缺 2、5–6 边缺 1，正好填完。最大 S = 12，顶点和 V = 15。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "3S", rhs: "V + 21" },
                { lhs: "V 最大 = 4+5+6", rhs: "15" },
                { lhs: "S 最大 (最大)", rhs: "12", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在相同的三角形 6 格数阵（填 1–6）中，S 的最小可能值是多少？此时 3 个顶点上的数之和 V 是多少？",
    fields: [
      {
        key: "min",
        label: "最小 S",
        type: "number",
      },
      {
        key: "vsum",
        label: "V",
        type: "number",
      },
    ],
    answer: {
      min: 9,
      vsum: 6,
    },
    hint: "3S = V + 21；V 最小 = 1+2+3 = 6，S = 9。对应边中点 {4,5,6}，每边和 9。",
  },
  tags: ["累加法", "比较法", "分类讨论"],
} satisfies ProblemData;
