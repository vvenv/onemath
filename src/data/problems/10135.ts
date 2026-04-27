import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10135-1.svg?raw";

export default {
  id: "10135",
  title: "燕尾模型·两条塞瓦线围出的四边形",
  grade: "六年级",
  module: "几何",
  difficulty: "进阶",
  question:
    "如图，三角形 ABC 中，D 在 BC 上，BD : DC = 1 : 2；E 在 AC 上，AE : EC = 2 : 3。AD 与 BE 相交于点 F。已知四边形 DFEC 的面积为 22，求三角形 ABC 的面积。",
  figures: [
    {
      svg: svg1,
      caption: "两条塞瓦线 AD、BE 交于 F；四边形 DFEC（黄色）已知为 22",
      alt: "三角形内两条塞瓦线与外围四边形",
    },
  ],
  solutions: [
    {
      key: "swallowtail",
      label: "燕尾定理 + 底比分割",
      steps: [
        "分析：F 是 AD、BE 的交点。用燕尾定理得 △ABF : △ACF = BD : DC = 1 : 2，△ABF : △BCF = AE : EC = 2 : 3；设 △ABF = 2k，则 △ACF = 4k、△BCF = 3k，总 △ABC = 9k。",
        "把 △BCF 按 D 点拆成 △BDF = k、△CDF = 2k；把 △ACF 按 E 点拆成 △AEF = 8k/5、△CEF = 12k/5。",
        "DFEC = △CDF + △CEF = 2k + 12k/5 = 22k/5 = 22 ⇒ k = 5，△ABC = 9k = 45。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "△ABF : △ACF : △BCF",
              rhs: "2 : 4 : 3",
              note: "燕尾",
            },
            {
              lhs: "△BDF : △CDF",
              rhs: "1 : 2",
              note: "BD : DC",
            },
            {
              lhs: "△AEF : △CEF",
              rhs: "2 : 3",
              note: "AE : EC",
            },
            {
              lhs: "DFEC = △CDF + △CEF",
              rhs: "2k + 12k/5 = 22k/5",
            },
            {
              lhs: "22k/5 = 22",
              rhs: "k = 5",
            },
            {
              lhs: "△ABC = 9k",
              rhs: "45",
              badge: "答案",
            },
          ],
          caption: "燕尾三块 + 两条塞瓦线各自的底比，即可写出 DFEC 的比例",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "△ABF",
              value: 10,
              max: 45,
              tone: "muted",
            },
            {
              label: "△BDF",
              value: 5,
              max: 45,
              tone: "muted",
            },
            {
              label: "△AEF",
              value: 8,
              max: 45,
              tone: "muted",
            },
            {
              label: "DFEC",
              value: 22,
              max: 45,
              tone: "primary",
            },
            {
              label: "△ABC",
              value: 45,
              max: 45,
              tone: "muted",
            },
          ],
          caption: "四块面积之和 = 45",
        },
        {
          kind: "result-badges",
          layout: "label-first",
          items: [
            {
              icon: "🔺",
              count: 45,
              label: "△ABC 面积",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 ABC 中 D 在 BC 上，BD : DC = 1 : 1（D 为 BC 中点）；E 在 AC 上 AE : EC = 1 : 2。AD 与 BE 交于 F。若 △ABC 面积为 30，求四边形 DFEC 的面积。",
    fields: [
      {
        key: "area",
        label: "DFEC 面积",
        type: "number",
      },
    ],
    answer: {
      area: 12.5,
    },
    hint: "燕尾：△ABF : △ACF : △BCF = 1 : 1 : 2，所以 △BCF = 30/2 = 15，△ACF = 15/2 = 7.5。DFEC = △CDF + △CEF = △BCF × 1/2 + △ACF × 2/3 = 7.5 + 5 = 12.5。",
  },
  tags: ["燕尾模型", "等积变形"],
} satisfies ProblemData;
