import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10114-1.svg?raw";

export default {
  id: "10114",
  title: "等积变换·正方形三等分点三角形",
  grade: "五年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，正方形 ABCD 的边长为 12。E、F、G 分别在 AB、BC、CD 上，且 AE = 8，BF = 8，CG = 8。\n连接 EF、FG、GE，求三角形 EFG 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "正方形内部由三等分点构成的三角形",
    },
  ],
  solutions: [
    {
      key: "cut",
      label: "整体减去三角",
      steps: [
        {
          text: "分析：正方形面积 12² = 144。从中切掉 △EFG 之外的三块：两个直角 △BEF、△CFG 与一个梯形 AEGD。\nEB = FC = GD = 4。",
        },
        {
          text: "逐块算：△BEF = (1/2)·4·8 = 16；△CFG = (1/2)·4·8 = 16；梯形 AEGD（平行边 AE = 8、DG = 4，高 AD = 12）= (8 + 4)·12/2 = 72。",
        },
        {
          text: "△EFG = 144 − 16 − 16 − 72 = 40。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "正方形面积", rhs: "12 × 12 = 144" },
                { lhs: "△BEF", rhs: "1/2 × 4 × 8 = 16" },
                { lhs: "△CFG", rhs: "1/2 × 4 × 8 = 16" },
                { lhs: "梯形 AEGD", rhs: "(8 + 4) × 12 ÷ 2 = 72" },
                {
                  lhs: "△EFG = 144 − 16 − 16 − 72",
                  rhs: "40",
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
      "正方形 ABCD 的边长为 10。E、F、G 分别在 AB、BC、CD 上，且 AE = 6，BF = 6，CG = 6。求三角形 EFG 的面积。",
    fields: [
      {
        key: "area",
        label: "△EFG 面积",
        type: "number",
      },
    ],
    answer: {
      area: 26,
    },
    hint: "正方形面积 100；EB = FC = GD = 4。△BEF = (1/2)·4·6 = 12，△CFG = (1/2)·4·6 = 12，梯形 AEGD = (6 + 4)·10/2 = 50。△EFG = 100 − 12 − 12 − 50 = 26。",
  },
  tags: ["等积变形", "面积法"],
} satisfies ProblemData;
