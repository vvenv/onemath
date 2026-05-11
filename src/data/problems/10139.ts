import svg1 from "./figures/10139-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10139",
  title: "燕尾模型·由一块面积反求整体",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，三角形 ABC 中，D 在 BC 上使 BD : DC = 1 : 2；E 在 AC 上使 AE : EC = 2 : 3。AD 与 BE 相交于点 F。\n\n已知三角形 BDF 的面积为 4，求三角形 ABC 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "三角形内两条 塞瓦线 围出的一个小三角形",
    },
  ],
  solutions: [
    {
      key: "swallowtail",
      label: "燕尾三块 + F 在 AD 上的底比",
      steps: [
        {
          text: "分析：想由 △BDF 反推 △ABC，可以先用燕尾定理给出 △ABF : △ACF : △BCF 的比例，把 △BDF 写成 △BCF 的一部分，再反求整体面积。",
        },
        {
          text: "燕尾。· 塞瓦线 AD（D 在 BC 上）：△ABF : △ACF = BD : DC = 1 : 2。· 塞瓦线 BE（E 在 AC 上）：△ABF : △BCF = AE : EC = 2 : 3。",
        },
        {
          text: "设 △ABF = 2k。则 △ACF = 4k（由 1:2）、△BCF = 3k（由 2:3）。整体 △ABC = 2k + 3k + 4k = 9k。",
        },
        {
          text: "把 △BCF 按 D 在 BC 上的位置拆成 △BDF 和 △CDF：△BDF : △CDF = BD : DC = 1 : 2 ⇒ △BDF = △BCF / 3 = 3k / 3 = k。",
        },
        {
          text: "第四步：代入 △BDF = k = 4 ⇒ △ABC = 9k = 36。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△ABF : △ACF : △BCF (燕尾)", rhs: "2 : 4 : 3" },
                { lhs: "△BDF = △BCF × 1/3", rhs: "k" },
                { lhs: "k (由已知 △BDF = 4)", rhs: "4" },
                { lhs: "△ABC = 9k", rhs: "36" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "△BDF", value: 4, max: 36, tone: "primary" },
                { label: "△BCF = 3·△BDF", value: 12, max: 36, tone: "muted" },
                { label: "△ABF", value: 8, max: 36, tone: "muted" },
                { label: "△ACF", value: 16, max: 36, tone: "muted" },
                { label: "△ABC", value: 36, max: 36, tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "ratio-along-ad",
      label: "换一种拆法：沿 AD 看 F",
      steps: [
        {
          text: "分析：F 在 塞瓦线 AD 上；如果先算出 AF : FD，也能把 △BDF 跟 △ABC 直接联系起来。",
        },
        {
          text: "由 △ABF = 2k、△BDF = k，两三角形同以 BF 为公共边、顶点 A、D 在直线 AD 上 ⇒ AF : FD = △ABF : △BDF = 2 : 1。",
        },
        {
          text: "△ABD 是 △ABC 的 (BD/BC) = 1/3 ⇒ △ABD = △ABC / 3。",
        },
        {
          text: "F 在 AD 上且 FD : AD = 1 : 3（由 AF:FD = 2:1）。△BDF 与 △ABD 同以 BD 为公共底 ⇒ △BDF = △ABD × FD/AD = △ABC × 1/3 × 1/3 = △ABC / 9。",
        },
        {
          text: "第四步：代入 △BDF = 4 ⇒ △ABC = 36。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "AF : FD", rhs: "2 : 1" },
                { lhs: "△BDF / △ABC = (1/3)·(1/3)", rhs: "1/9" },
                { lhs: "△ABC = 4 × 9", rhs: "36" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 ABC 中 D 在 BC 上 BD : DC = 1 : 3；E 在 AC 上 AE : EC = 1 : 1（E 是 AC 中点）。AD 与 BE 交于 F。若 △BDF = 3，求 △ABC 的面积。",
    fields: [
      {
        key: "area",
        label: "△ABC 面积",
        type: "number",
      },
    ],
    answer: {
      area: 60,
    },
    hint: "燕尾：△ABF : △ACF : △BCF = 1 : 3 : 1，所以 △ABC = 5·△ABF。△BDF = △BCF × (BD/BC) = △BCF × 1/4 = k/4 = 3 ⇒ k = 12 ⇒ △ABC = 5k = 60。",
  },
  tags: ["燕尾模型", "等积变形"],
} satisfies ProblemData;
