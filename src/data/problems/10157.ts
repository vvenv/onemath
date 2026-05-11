import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10157-1.svg?raw";
import svg2 from "./figures/10157-2.svg?raw";

export default {
  id: "10157",
  title: "三等分正方形·阴影面积",
  grade: "五年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，一个边长为10厘米的正方形，每条边被三等分。\n\n将每个顶点与对边的一个三等分点连接，四条连接线围成一个旋转的四边形（阴影部分）。\n\n求阴影部分的面积是多少平方厘米？",
  figures: [
    {
      svg: svg1,
      alt: "正方形ABCD，边长10cm，每边三等分，内部有一个旋转的正方形阴影区域",
    },
  ],
  solutions: [
    {
      key: "area_subtraction",
      label: "面积减法",
      steps: [
        {
          text: "分析：总面积 = 10 × 10 = 100 平方厘米。计算四个角三角形的面积。以 A 角为例，三角形由 AD 和 AH 构成，底 AD=10，高为 H 到 AD 的距离=10/3。\n\n一个三角形面积 = 10 × (10/3) ÷ 2 = 50/3。",
        },
        {
          text: "四个三角形总面积 = 4 × 50/3 = 200/3。",
        },
        {
          text: "阴影四边形 PQRS 是正方形，其顶点 P(9,3)、Q(7,9)、R(1,7)、S(3,1) 可通过相似三角形求得。边长 PQ = √[(9-7)² + (3-9)²] = √(4+36) = √40 = 2√10。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "正方形边长", rhs: "10" },
                { lhs: "阴影正方形边长", rhs: "2√10" },
                { lhs: "阴影面积", rhs: "(2√10)² = 40", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个边长为12厘米的正方形，每条边被三等分。\n\n将每个顶点与对边的一个三等分点连接，四条连接线围成一个旋转的四边形（阴影部分）。求阴影部分的面积是多少平方厘米？",
    figures: [
      {
        svg: svg2,
        alt: "正方形ABCD，边长12cm，每边三等分，内部有一个旋转的正方形阴影区域",
      },
    ],
    fields: [
      {
        key: "area",
        label: "阴影面积（平方厘米）",
      },
    ],
    answer: {
      area: 57.6,
    },
    hint: "旋转正方形边长 = 2.4√10，面积 = (2.4√10)² = 57.6。",
  },
  tags: ["面积法"],
} satisfies ProblemData;
