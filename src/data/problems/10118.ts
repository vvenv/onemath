import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10118-1.svg?raw";

export default {
  id: "10118",
  title: "共角三角形·A 字型面积比",
  grade: "五年级",
  difficulty: "基础",
  module: "几何",
  question:
    "如图，三角形 ABC 中，D 是 BC 的中点，E 是 AC 的中点。\n\n连接 DE。已知 △ADE 的面积为 8，求 △ABC 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "三角形 ABC 中共顶点 A 的小三角形 AED",
    },
  ],
  solutions: [
    {
      key: "bird-head",
      label: "鸟头（共角）定理",
      steps: [
        {
          text: "分析：△AED 与 △ABC 共用顶点 A 及 ∠A，且 E、D 分别在 AB、AC 这两条夹 ∠A 的边上。\n\n这是典型的“A 字型共角三角形”——两三角形面积之比 = 两对夹边乘积之比。",
        },
        {
          text: "读出比例。AB = 3AE ⇒ AE : AB = 1 : 3；AC = 2AD ⇒ AD : AC = 1 : 2。",
        },
        {
          text: "套共角公式 △AED : △ABC = (AE · AD) : (AB · AC) = (1 · 1) : (3 · 2) = 1 : 6。",
        },
        {
          text: "△AED = 36 × 1/6 = 6。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "AE / AB", rhs: "1/3" },
                { lhs: "AD / AC", rhs: "1/2" },
                { lhs: "△AED / △ABC = (AE·AD)/(AB·AC)", rhs: "1/6" },
                { lhs: "△AED = 36 × 1/6", rhs: "6", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "two-step",
      label: "等积变换两步走",
      steps: [
        {
          text: "分析：也可以不记公式，用两次“等高三角形面积比 = 底之比”逐步得到答案。",
        },
        {
          text: "连 ED。△AED 与 △ABD 同以 AD 为公共底，顶点 E、B 在同一直线上 ⇒ 面积比 = AE : AB = 1 : 3。",
        },
        {
          text: "△ABD 与 △ABC 同以 AB 为公共底 ⇒ 面积比 = AD : AC = 1 : 2 ⇒ △ABD = 36 × 1/2 = 18。",
        },
        {
          text: "△AED = △ABD × 1/3 = 18 × 1/3 = 6。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△ABD = 36 × (AD/AC)", rhs: "18" },
                { lhs: "△AED = 18 × (AE/AB)", rhs: "6", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三角形 ABC 中，D 在 AB 上，AD : DB = 2 : 3；E 在 AC 上，AE : EC = 3 : 1。\n\n若三角形 ABC 的面积为 40，求三角形 ADE 的面积。",
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
