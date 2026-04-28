import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10100-1.svg?raw";

export default {
  id: "10100",
  title: "三角形数阵·1 到 6",
  grade: "三年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "如图，一个三角形有 3 个顶点和 3 条边上的中点，共 6 个位置。把 1, 2, 3, 4, 5, 6 这 6 个数字各用一次填入这 6 个位置，使三角形每条边上 3 个数（两个顶点 + 1 个中点）的和都相等。问：这个相等的边和 S 可能的取值有几种？请各写出一种填法。",
  figures: [
    {
      svg: svg1,
      caption: "三角形 3 顶点 + 3 边中点 = 6 个位置",
      alt: "三角形数阵 6 个位置",
    },
  ],
  solutions: [
    {
      key: "sum",
      label: "累加法（顶点被两条边共用）",
      steps: [
        "分析：顶点各属 2 条边，中点各属 1 条边；三条边和相加得 3S = 2V + 中点和 = V + (V + 中点和) = V + 21（V 为顶点和）。故 V 须是 3 的倍数。",
        "从 {1, …, 6} 中取 3 个做顶点，V 恰能取 6, 9, 12, 15 四个 3 的倍数，对应 S = 9, 10, 11, 12，共 4 种。举例 S = 10（顶点 {1, 3, 5}）：边 (1,3)/(1,5)/(3,5) 的中点分别填 6/4/2，每边和均 10。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "3S",
              rhs: "V + 21",
            },
            {
              lhs: "V 的可能值",
              rhs: "6, 9, 12, 15",
            },
            {
              lhs: "S 的可能值",
              rhs: "9, 10, 11, 12",
              status: "keep",
            },
          ],
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔢",
              count: 4,
              label: "种 S 值",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 3 顶点 + 3 边中点填入 1–6，使每边三数和相等。问最大 S 是多少？此时顶点填的是哪 3 个数？",
    fields: [
      {
        key: "max",
        label: "最大 S",
        type: "number",
      },
      {
        key: "vertices",
        label: "顶点和",
        type: "number",
      },
    ],
    answer: {
      max: 12,
      vertices: 15,
    },
    hint: "3S = V + 21，V 越大 S 越大；V = 4+5+6 = 15 时 S = 12，中点分别填 1, 2, 3。",
  },
  tags: ["累加法", "比较法"],
} satisfies ProblemData;
