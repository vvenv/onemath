import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10118-1.svg?raw";
import svg2 from "./figures/10118-2.svg?raw";

export default {
  id: "10118",
  title: "共角三角形·A 字型面积比",
  grade: "五年级",
  module: "几何",
  difficulty: "基础",
  question:
    "如图，在三角形 ABC 中，E 在边 AB 上且 AB = 3AE；D 在边 AC 上且 AC = 2AD。已知三角形 ABC 的面积为 36，求三角形 AED 的面积。",
  figures: [
    {
      svg: svg1,
      caption: "共角于 A：E 在 AB 上且 AB = 3AE；D 在 AC 上且 AC = 2AD",
      alt: "三角形 ABC 中共顶点 A 的小三角形 AED",
    },
  ],
  solutions: [
    {
      key: "bird-head",
      label: "鸟头（共角）定理",
      steps: [
        "分析：△AED 与 △ABC 共用顶点 A 及 ∠A，且 E、D 分别在 AB、AC 这两条夹 ∠A 的边上。这是典型的「A 字型共角三角形」——两三角形面积之比 = 两对夹边乘积之比。",
        "第一步：读出比例。AB = 3AE ⇒ AE : AB = 1 : 3；AC = 2AD ⇒ AD : AC = 1 : 2。",
        "第二步：套共角公式 △AED : △ABC = (AE · AD) : (AB · AC) = (1 · 1) : (3 · 2) = 1 : 6。",
        "第三步：△AED = 36 × 1/6 = 6。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "AE / AB",
              rhs: "1/3",
            },
            {
              lhs: "AD / AC",
              rhs: "1/2",
            },
            {
              lhs: "△AED / △ABC = (AE·AD)/(AB·AC)",
              rhs: "1/6",
            },
            {
              lhs: "△AED = 36 × 1/6 (答案)",
              rhs: "6",
            },
          ],
          caption: "共角三角形的面积比 = 夹边乘积比",
        },
        {
          kind: "svg",
          svg: svg2,
          caption: "△AED 占 △ABC 的 1/6",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "📐",
              count: 6,
              label: "△AED 面积",
            },
          ],
        },
      ],
    },
    {
      key: "two-step",
      label: "等积变换两步走",
      steps: [
        "分析：也可以不记公式，用两次「等高三角形面积比 = 底之比」逐步得到答案。",
        "第一步：连 ED。△AED 与 △ABD 同以 AD 为公共底，顶点 E、B 在同一直线上 ⇒ 面积比 = AE : AB = 1 : 3。",
        "第二步：△ABD 与 △ABC 同以 AB 为公共底 ⇒ 面积比 = AD : AC = 1 : 2 ⇒ △ABD = 36 × 1/2 = 18。",
        "第三步：△AED = △ABD × 1/3 = 18 × 1/3 = 6。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "△ABD = 36 × (AD/AC)",
              rhs: "18",
            },
            {
              lhs: "△AED = 18 × (AE/AB) (答案)",
              rhs: "6",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三角形 ABC 中，D 在 AB 上，AD : DB = 2 : 3；E 在 AC 上，AE : EC = 3 : 1。若三角形 ABC 的面积为 40，求三角形 ADE 的面积。",
    fields: [
      {
        key: "area",
        label: "△ADE 面积",
        type: "number",
      },
    ],
    answer: {
      area: 12,
    },
    hint: "共角三角形：△ADE / △ABC = (AD/AB) · (AE/AC) = (2/5) · (3/4) = 3/10。",
  },
  tags: ["鸟头模型", "面积法"],
} satisfies ProblemData;
