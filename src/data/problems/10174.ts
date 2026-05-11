import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10174-1.svg?raw";

export default {
  id: "10174",
  title: "立体几何·三视图",
  grade: "五年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "一个长方体长 8 厘米、宽 6 厘米、高 4 厘米。如果把它切成棱长 2 厘米的小正方体，\n\n可以切成多少块？",
  solutions: [
    {
      key: "volume",
      label: "体积法",
      steps: [
        {
          text: "长方体体积 = 8 × 6 × 4 = 192 立方厘米，小正方体体积 = 2 × 2 × 2 = 8 立方厘米。\n\n数量 = 192 ÷ 8 = 24 块。",
          scenes: [
            {
              kind: "svg",
              svg: svg1,
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "长方体体积", rhs: "8 × 6 × 4 = 192", status: "keep" },
                { lhs: "小正方体体积", rhs: "2 × 2 × 2 = 8", status: "keep" },
                { lhs: "数量", rhs: "192 ÷ 8 = 24", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "edge",
      label: "棱长分割法",
      steps: [
        {
          text: "沿长、宽、高分别可分 8 ÷ 2 = 4 段、6 ÷ 2 = 3 段、4 ÷ 2 = 2 段。",
        },
        {
          text: "总数 = 4 × 3 × 2 = 24 块。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "长边分段", rhs: "8 ÷ 2 = 4" },
                { lhs: "宽边分段", rhs: "6 ÷ 2 = 3" },
                { lhs: "高边分段", rhs: "4 ÷ 2 = 2" },
                { lhs: "总数", rhs: "4 × 3 × 2 = 24", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个正方体棱长 12 厘米，如果把它切成棱长 3 厘米的小正方体。\n\n可以切成多少块？",
    fields: [
      {
        key: "count",
        label: "小正方体块数",
      },
    ],
    answer: {
      count: 64,
    },
    hint: "每条棱长可以分成 12 ÷ 3 = 4 段，总共 4 × 4 × 4 = 64 块。",
  },
  tags: [],
} satisfies ProblemData;
