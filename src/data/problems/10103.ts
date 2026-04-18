import svg1 from "./figures/10103-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10103",
  title: "三角形边阵·1 到 9",
  grade: "五年级",
  difficulty: "进阶",
  module: "杂题",
  question:
    "如图，把 1, 2, 3, …, 9 各用一次填入这 9 个位置，使每条边上 4 个数的和都相等。\n问：这个相等的边和 S 必须满足什么数论条件？\n最小可能的 S 是多少？请给出对应的一种填法。",
  figures: [
    {
      svg: svg1,
      alt: "三角形边阵 9 个位置",
    },
  ],
  solutions: [
    {
      key: "sum",
      label: "累加法（顶点被两条边共用）",
      steps: [
        {
          text: "分析：每个顶点同时属于 2 条边，每个内点只属于 1 条边。把三条边的和相加，顶点各被算 2 次、内点各被算 1 次。\n设 3 个顶点之和为 V，则 3S = 2V + (1+2+…+9 − V) = V + 45，所以 V 必须是 3 的倍数。",
        },
        {
          text: "V 的范围：最小 V = 1 + 2 + 3 = 6，最大 V = 7 + 8 + 9 = 24。S 越小则 V 越小，最小 V = 6 给出最小 S = (6 + 45) / 3 = 17。",
        },
        {
          text: "取顶点 {1, 2, 3}：3 条边的内点对之和分别为 S − (1 + 2) = 14、S − (1 + 3) = 13、S − (2 + 3) = 12。从剩余 {4, 5, 6, 7, 8, 9} 中可拼出 (5, 9), (6, 7), (4, 8)，分别填入对应边的两个内点，3 条边的和均为 17。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "3S", rhs: "V + 45" },
                { lhs: "V 须为 3 的倍数", rhs: "V ∈ {6, 9, 12, …, 24}" },
                {
                  lhs: "最小 S",
                  rhs: "17（V = 6，顶点 {1, 2, 3}）",
                  status: "keep",
                },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "最小 S", rhs: "17" },
                { lhs: "顶点和 V", rhs: "6" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 3 顶点 + 每边 2 内点共 9 格，填入 1–9 使每边 4 数和相等。问最大可能的 S 是多少？此时 3 个顶点应填哪 3 个数？",
    fields: [
      {
        key: "max",
        label: "最大 S",
        type: "number",
      },
      {
        key: "vsum",
        label: "顶点和 V",
        type: "number",
      },
    ],
    answer: {
      max: 23,
      vsum: 24,
    },
    hint: "3S = V + 45，V 越大 S 越大；V 必为 3 的倍数且最大为 7+8+9 = 24，对应 S = 23。",
  },
  tags: ["累加法", "比较法"],
} satisfies ProblemData;
