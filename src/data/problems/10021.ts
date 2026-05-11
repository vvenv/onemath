import type { ProblemData } from "@/types/problem";
import svgV from "./figures/10021-v.svg?raw";

export default {
  id: "10021",
  title: "立体图形·挖洞后的表面积",
  grade: "五年级",
  module: "几何",
  difficulty: "进阶",
  question:
    "一个棱长为 4 厘米的正方体，在它的上下、前后、左右的正中位置各挖去一个棱长为 1 厘米的小正方体。\n\n挖洞后物体的表面积是多少平方厘米？",
  solutions: [
    {
      key: "surface",
      label: "平移法",
      steps: [
        {
          text: "原表面积 6 × 4² = 96 cm²，每坑净增 5−1=4 cm²，6 坑共增 24 cm²。\n\n总表面积 96 + 24 = 120 cm²。",
          scenes: [
            {
              kind: "cube-net",
              face: {
                rows: 4,
                cols: 4,
                holes: [
                  {
                    row: 1,
                    col: 1,
                  },
                ],
              },
            },
            {
              kind: "pit-diagram",
              removed: ["top"],
              added: ["bottom", "front", "back", "left", "right"],
            },
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "原表面积",
                  value: 96,
                  max: 120,
                  tone: "muted",
                },
                {
                  label: "挖洞后表面积",
                  value: 120,
                  max: 120,
                  tone: "primary",
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
      "一个棱长 5 厘米的正方体，在它的前后、左右、上下分别打穿一个边长 1 厘米的正方形孔洞（对穿）。求剩下立体图形的表面积。",
    figures: [
      {
        svg: svgV,

        alt: "正方体三方向对穿孔洞示意图",
      },
    ],
    fields: [
      {
        key: "area",
        label: "表面积",
      },
    ],
    answer: {
      area: 174,
    },
    hint: "打通的情况下，减少的面积是 2 个面，但增加了内部的侧面积。",
  },
  tags: ["平移法"],
} satisfies ProblemData;
