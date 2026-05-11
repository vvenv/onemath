import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10175-1.svg?raw";
import svg2 from "./figures/10175-2.svg?raw";

export default {
  id: "10175",
  title: "圆与扇形·容斥原理",
  grade: "五年级",
  module: "几何",
  difficulty: "进阶",
  question:
    "如图，两个半径都是 4 厘米的圆相交，圆心距也是 4 厘米。\n\n求阴影部分的面积。",
  figures: [
    {
      svg: svg1,
      alt: "两个半径4cm的圆相交，圆心距4cm",
    },
  ],
  solutions: [
    {
      key: "inclusion",
      label: "容斥原理法",
      steps: [
        {
          text: "分析：阴影部分是两圆的公共部分，圆心距等于半径，每个圆心角为 60°。",
          scenes: [
            {
              kind: "svg",
              svg: svg2,
            },
          ],
        },
        {
          text: "用容斥原理计算阴影面积。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "一个扇形面积",
                  rhs: "16π/6",
                  status: "keep",
                },
                {
                  lhs: "菱形面积",
                  rhs: "8√3",
                  status: "keep",
                },
                {
                  lhs: "阴影面积",
                  rhs: "2 × 16π/6 − 8√3",
                  status: "keep",
                },
                {
                  lhs: "",
                  rhs: "≈ 2.9",
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
      "两个半径都是 6 厘米的圆相交，圆心距也是 6 厘米。求阴影部分的面积。（结果保留π）",
    fields: [
      {
        key: "area",
        label: "阴影面积（保留π）",
      },
    ],
    answer: {
      area: "12π − 18√3",
    },
    hint: "阴影面积 = 2 × (36π/6 − 36√3/4) = 12π − 18√3。",
  },
  tags: ["容斥原理"],
} satisfies ProblemData;
