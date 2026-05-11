import svg1 from "./figures/10132-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10132",
  title: "相似模型·长方形中点线与对角线相交",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，长方形 ABCD 中 AB = 8，BC = 6。\n\nE 是 CD 的中点。\n\n连接 AE 与对角线 BD 相交于点 F。\n\n(1) 求 AF : FE\n(2) 求三角形 ABF 的面积",
  figures: [
    {
      svg: svg1,
      alt: "长方形中点与对角线交点",
    },
  ],
  solutions: [
    {
      key: "hourglass",
      label: "沙漏相似一步到位",
      steps: [
        {
          text: "分析：AB ∥ DE（都在长方形一对对边上）⇒ 在 F 点形成沙漏模型 △ABF ∼ △EDF。",
        },
        {
          text: "AB = 8，DE = DC/2 = 4，对应边比 AB : DE = 2 : 1，所以 AF : FE = 2 : 1，BF : FD = 2 : 1。",
        },
        {
          text: "△ABD 是长方形的一半，面积 = 8 × 6 ÷ 2 = 24。F 在 BD 上且 BF : BD = 2 : 3 ⇒ △ABF 与 △ABD 以 AB 为公共边、高比 = BF : BD = 2 : 3 ⇒ △ABF = 24 × 2/3 = 16。",
        },
        {
          text: "答案：(1) AF : FE = 2 : 1；(2) △ABF = 16。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "AB : DE", rhs: "8 : 4 = 2 : 1" },
                { lhs: "AF : FE (= BF : FD)", rhs: "2 : 1", badge: "(1)" },
                { lhs: "△ABD = 长方形 / 2", rhs: "24" },
                { lhs: "△ABF = 24 × 2/3", rhs: "16", badge: "(2)" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "长方形 ABCD", value: 48, max: 48, tone: "muted" },
                { label: "△ABD", value: 24, max: 48, tone: "muted" },
                { label: "△ABF", value: 16, max: 48, tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "长方形 ABCD 中 AB = 10，BC = 6。F 是 CD 上一点，DF : FC = 1 : 4。AF 与对角线 BD 交于 G。求 △ABG 的面积。",
    fields: [
      {
        key: "area",
        label: "△ABG 面积",
        type: "number",
      },
    ],
    answer: {
      area: 25,
    },
    hint: "AB ∥ DF ⇒ △ABG ∼ △FDG，AB : DF = 10 : 2 = 5 : 1 ⇒ BG : GD = 5 : 1；△ABD = 30，△ABG = 30 × 5/6 = 25。",
  },
  tags: ["相似模型", "面积法"],
} satisfies ProblemData;
