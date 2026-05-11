import svg1 from "./figures/10101-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10101",
  title: "正方形边阵·1 到 8",
  grade: "四年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "如图，把 1, 2, 3, 4, 5, 6, 7, 8 这 8 个数字各用一次填入 8 个圆，使正方形每条边上 3 个数的和都相等。\n\n问：\n\n- 这个相等的边和 S 可能的取值有几种？\n\n- 最大是多少？",
  figures: [
    {
      svg: svg1,
      alt: "正方形，4 个顶点（较大圆点）和 4 条边中点（较小圆点）",
    },
  ],
  solutions: [
    {
      key: "sum",
      label: "累加法",
      steps: [
        {
          text: "分析：每个顶点被 2 条边共用，每个中点只被 1 条边共用。将 4 条边的和相加，顶点各算 2 次、中点各算 1 次。",
          scenes: [],
        },
        {
          text: "4S = 2·(顶点和) + (中点和) = (顶点和) + (顶点和 + 中点和) = (顶点和) + (1+2+…+8) = V + 36。",
          scenes: [],
        },
        {
          text: "其中 V 为 4 个顶点的和。于是 V = 4S − 36，V 必为 4 的倍数偏移量 = 能使 V 整数。",
          scenes: [],
        },
        {
          text: "V 的取值范围：最小 1+2+3+4 = 10，最大 5+6+7+8 = 26；同时 V 必须让 4S = V + 36 被 4 整除，即 V 被 4 整除，V ∈ {12, 16, 20, 24}。",
          scenes: [],
        },
        {
          text: "对应 S = (V+36)/4 = 12, 13, 14, 15，共 4 种；最大 S = 15（V = 24，顶点 = {3,6,7,8} 或 {4,5,7,8} 等）。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "4S",
                  rhs: "V + 36",
                },
                {
                  lhs: "V ∈",
                  rhs: "{12, 16, 20, 24}",
                },
                {
                  lhs: "S ∈",
                  rhs: "{12, 13, 14, 15}",
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
      "正方形 4 顶点 + 4 边中点填入 1–8，每边三数和相等。问最小 S 是多少？此时 4 个顶点的和 V 等于多少？",
    fields: [
      {
        key: "min",
        label: "最小 S",
        type: "number",
      },
      {
        key: "vsum",
        label: "顶点和 V",
        type: "number",
      },
    ],
    answer: {
      min: 12,
      vsum: 12,
    },
    hint: "4S = V + 36，V 要是 4 的倍数且在 [10,26] 中最小为 12。",
  },
  tags: ["累加法"],
} satisfies ProblemData;
