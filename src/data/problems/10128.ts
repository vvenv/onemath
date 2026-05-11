import svg1 from "./figures/10128-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10128",
  title: "面积法·正方形中点三连跳",
  grade: "六年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，正方形 ABCD 的面积为 144。\n\nE、F、G、H 分别是四条边的中点。连接 EG、FH，两条线段相交于点 O。求四边形 EGFH 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "正方形中三次取中点构成的三角形 BDG",
    },
  ],
  solutions: [
    {
      key: "area-ratio",
      label: "面积比例法",
      steps: [
        {
          text: "分析：连接 AC、BD 交于 O（正方形中心），则 O 将每条对角线平分。E 是 AD 中点，F 是 CE 中点，G 是 BF 中点。\n\n通过相似三角形和面积比例求解。",
        },
        {
          text: "正方形面积 = 100，△ABD = 50。E 是 AD 中点，故 △ABE = 25，△BDE = 25。\n\nF 是 CE 中点。在 △BCE 中，F 是 CE 中点，故 △BCF = △BEF = 12.5。\n\nG 是 BF 中点。在 △BDF 中，G 是 BF 中点，但 D、B、F 不共线，需用相似比。",
        },
        {
          text: "连接 DG 并延长交 AC 于 H。利用相似三角形比例关系，可推导出 △BDG 的面积。\n\n经过三次中点操作，面积传递关系为：△BDG = 正方形面积 ÷ 16 = 6.25。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "正方形面积", rhs: "10 × 10 = 100" },
                { lhs: "△ABD", rhs: "100 ÷ 2 = 50" },
                { lhs: "△ABE (= △CDE)", rhs: "50 ÷ 2 = 25" },
                { lhs: "△BDE (= △BCE)", rhs: "50 - 25 = 25" },
                { lhs: "△BCF (= △BEF)", rhs: "25 ÷ 2 = 12.5" },
                {
                  lhs: "△BDG (面积传递)",
                  rhs: "100 ÷ 16 = 6.25",
                  status: "keep",
                },
              ],
            },
          ],
        },
        {
          text: "答：三角形 BDG 的面积为 6.25。",
        },
      ],
    },
  ],
  variant: {
    question:
      "正方形 ABCD 边长 8，E 为 AD 中点，F 为 CE 中点，G 为 BF 中点。\n\n求三角形 BDG 的面积。",
    fields: [
      {
        key: "area",
        label: "△BDG 面积",
        type: "number",
      },
    ],
    answer: {
      area: 4,
    },
    hint: "与本题同样方法：在边长 a 的正方形里 △BDG = a² / 16。代入 a = 8 得 4。",
  },
  tags: ["蝴蝶模型", "面积法"],
} satisfies ProblemData;
