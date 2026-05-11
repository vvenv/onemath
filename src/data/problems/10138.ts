import svg1 from "./figures/10138-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10138",
  title: "燕尾模型·中点与三等分点组合",
  grade: "六年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，三角形 ABC 中，D 是 AC 的中点，E、F 是 BC 的三等分点（BE = EF = FC，E 靠近 B）。\n\n连接 AE 与 BD 相交于点 M。\n\n已知 △ABC 的面积为 1，求四边形 CDMF 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "三角形内中点 + 三等分点构造及围出的四边形",
    },
  ],
  solutions: [
    {
      key: "swallowtail",
      label: "燕尾三块 + 两次底比",
      steps: [
        {
          text: "分析：M 是塞瓦线 AE、BD 的交点。燕尾定理：由 BE : EC = 1 : 2 得 △ABM : △ACM = 1 : 2；由 AD : DC = 1 : 1 得 △ABM : △BCM = 1 : 1。\n\n设 △ABM = k，则 △ACM = 2k、△BCM = k，总 △ABC = 4k = 1，k = 1/4。",
        },
        {
          text: "再按 D、F 位置两次拆块：△CDM = △ACM · (DC/AC) = 2k · 1/2 = k = 1/4；△CFM = △BCM · (CF/CB) = k · 1/3 = 1/12。",
        },
        {
          text: "CDMF = 1/4 + 1/12 = 1/3。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△ABM : △ACM : △BCM (燕尾)", rhs: "1 : 2 : 1" },
                { lhs: "△CDM = △ACM × 1/2", rhs: "1/4" },
                { lhs: "△CFM = △BCM × 1/3", rhs: "1/12" },
                { lhs: "CDMF = 1/4 + 1/12", rhs: "1/3", status: "keep" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "△ABM", value: 1, max: 4, tone: "muted" },
                { label: "△ACM", value: 2, max: 4, tone: "muted" },
                { label: "△BCM", value: 1, max: 4, tone: "muted" },
                { label: "CDMF", value: 1.33, max: 4, tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 ABC 面积为 60。D 是 AC 中点，E、F 三等分 BC（BE = EF = FC）。\n\nAE 与 BD 交于 M。求 △CFM 的面积。",
    fields: [
      {
        key: "area",
        label: "△CFM 面积",
        type: "number",
      },
    ],
    answer: {
      area: 5,
    },
    hint: "燕尾比 △ABM:△ACM:△BCM = 1:2:1 ⇒ △BCM = 60/4 = 15；△CFM = △BCM × (CF/CB) = 15 × 1/3 = 5。",
  },
  tags: ["燕尾模型", "等积变形"],
} satisfies ProblemData;
