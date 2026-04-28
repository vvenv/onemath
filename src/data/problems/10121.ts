import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10121-1.svg?raw";

export default {
  id: "10121",
  title: "共角三角形·两条边比例点",
  grade: "五年级",
  module: "几何",
  difficulty: "基础",
  question:
    "如图，在三角形 ABC 中，D 是 AB 的中点；E 在 AC 上，AE : EC = 2 : 1。已知三角形 ADE 的面积为 12，求三角形 ABC 的面积。",
  figures: [
    {
      svg: svg1,
      caption: "D 是 AB 的中点；E 在 AC 上，AE : EC = 2 : 1",
      alt: "三角形 ABC 中共顶点 A 的小三角形 ADE",
    },
  ],
  solutions: [
    {
      key: "bird-head",
      label: "鸟头（共角）定理",
      steps: [
        "分析：△ADE 与 △ABC 共顶点 A 及夹角 ∠A，D、E 分别在夹 ∠A 的两条边上，是典型的共角三角形。",
        "第一步：算比例。D 是 AB 中点 ⇒ AD : AB = 1 : 2；AE : EC = 2 : 1 ⇒ AE : AC = 2 : 3。",
        "第二步：△ADE : △ABC = (AD · AE) : (AB · AC) = (1 · 2) : (2 · 3) = 1 : 3。",
        "第三步：△ABC = 12 × 3 = 36。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "AD / AB",
              rhs: "1/2",
            },
            {
              lhs: "AE / AC",
              rhs: "2/3",
            },
            {
              lhs: "△ADE / △ABC",
              rhs: "(1/2)·(2/3) = 1/3",
            },
            {
              lhs: "△ABC = 12 × 3",
              rhs: "36",
              badge: "答案",
            },
          ],
          caption: "共角公式一步到位",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔺",
              count: 36,
              label: "△ABC 面积",
            },
          ],
        },
      ],
    },
    {
      key: "two-step",
      label: "等积变换两步走",
      steps: [
        "分析：按「等高三角形面积比 = 底之比」两次连用，也能得到同样结论。",
        "第一步：连 DE。△ADE 与 △ABE 同以 AE 为公共底，顶点 D、B 在同一直线 AB 上 ⇒ △ADE : △ABE = AD : AB = 1 : 2。",
        "第二步：△ABE 与 △ABC 同以 AB 为底 ⇒ △ABE : △ABC = AE : AC = 2 : 3 ⇒ △ABE = (2/3) · △ABC。",
        "第三步：所以 △ADE = (1/2)·(2/3)·△ABC = △ABC / 3 ⇒ △ABC = 36。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "△ABE = △ABC × 2/3",
              rhs: "(2/3) △ABC",
            },
            {
              lhs: "△ADE = △ABE × 1/2",
              rhs: "(1/3) △ABC",
            },
            {
              lhs: "△ABC",
              rhs: "36",
              badge: "答案",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三角形 ABC 中，D 在 AB 上，AD : DB = 3 : 2；E 在 AC 上，AE : EC = 1 : 3。若三角形 ADE 的面积为 6，求三角形 ABC 的面积。",
    fields: [
      {
        key: "area",
        label: "△ABC 面积",
        type: "number",
      },
    ],
    answer: {
      area: 40,
    },
    hint: "△ADE / △ABC = (AD/AB)·(AE/AC) = (3/5)·(1/4) = 3/20。",
  },
  tags: ["鸟头模型", "面积法"],
} satisfies ProblemData;
