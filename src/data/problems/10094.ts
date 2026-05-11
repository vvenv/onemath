import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10094-1.svg?raw";

export default {
  id: "10094",
  title: "十字辐射阵·1 到 5",
  grade: "三年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "如图，把 1, 2, 3, 4, 5 这 5 个数字各用一次，填入十字形的 5 个格子（中心 1 格 + 横向 2 格 + 竖向 2 格）。\n\n要求横向 3 个数字之和与竖向 3 个数字之和相等。问中心格必须填几？",
  figures: [
    {
      svg: svg1,
      alt: "由 5 个相同方格拼成的十字形，横排 3 格、竖排 3 格、中心格共用",
    },
  ],
  solutions: [
    {
      key: "center",
      label: "中心数法",
      steps: [
        {
          text: "用中心数法：设中心为 c，建立两行之和的关系，推导 c 的可能取值。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "2S",
                  rhs: "15 + c",
                },
                {
                  lhs: "c 必为奇数",
                  rhs: "c ∈ {1,3,5}",
                },
                {
                  lhs: "对应的 S",
                  rhs: "8, 9, 10",
                  status: "keep",
                },
              ],
            },
          ],
        },
        {
          text: "每种 c 都能把剩下 4 个数按和相等分成两对：c = 1 → {2, 5} 与 {3, 4}（S = 8）；c = 3 → {1, 5} 与 {2, 4}（S = 9）；c = 5 → {1, 4} 与 {2, 3}（S = 10）。共 3 种 S 值；最小 S = 8 的一种填法是中心 1，横 2, 1, 5、竖 3, 1, 4。",
          scenes: [],
        },
      ],
    },
  ],
  variant: {
    question:
      "在十字形 5 格中填 1–5，使横行三数和等于竖行三数和。\n\n问这个相等和最大是多少？此时中心填几？",
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
      max: 10,
      center: 5,
    },
    hint: "2S = 15 + c，中心越大和越大；c = 5 时 S = 10，是最大值。",
  },
  tags: ["中心数法", "累加法"],
} satisfies ProblemData;
