import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10119-1.svg?raw";

export default {
  id: "10119",
  title: "共角三角形·互补型（延长线上取点）",
  grade: "五年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，三角形 ABC 中，D 在 BC 上使 BD = 2·DC（即 BD : DC = 2 : 1）；E 在 AC 上使 CE = 2·EA（即 CE : EA = 2 : 1）。\n\n连接 DE，DE 与 AB 的延长线相交于点 F。\n\n已知 △ADE 的面积为 6，求 △BDF 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "三角形外延伸一点 D 与三角形内一点 E 构成的小三角形",
    },
  ],
  solutions: [
    {
      key: "supplementary",
      label: "鸟头定理·互补型",
      steps: [
        {
          text: "分析：∠DAE 与 ∠BAC 在同一顶点 A，但 D 在 BA 的延长线上，所以 AD 的方向和 AB 相反；AE 的方向则和 AC 相同。\n\n因此 ∠DAE 与 ∠BAC 互为补角（相加 = 180°）。互补角的正弦值相等，所以“鸟头定理”对互补型同样成立：△ADE 与 △ABC 的面积比 = 两对夹边乘积之比。",
        },
        {
          text: "读出比例。AB : AD = 5 : 2 ⇒ AD : AB = 2 : 5；AE : EC = 3 : 2 ⇒ AE : AC = 3 : 5。",
        },
        {
          text: "套公式 △ADE : △ABC = (AD · AE) : (AB · AC) = (2 · 3) : (5 · 5) = 6 : 25。",
        },
        {
          text: "△ABC = 12 × 25/6 = 50。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "AD : AB", rhs: "2 : 5" },
                { lhs: "AE : AC", rhs: "3 : 5" },
                { lhs: "△ADE : △ABC", rhs: "(AD·AE)/(AB·AC)" },
                { lhs: "", rhs: "6 : 25", status: "keep" },
                { lhs: "△ABC", rhs: "12 × 25/6" },
                { lhs: "", rhs: "50", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "two-step",
      label: "两次等积变换（避开鸟头定理）",
      steps: [
        {
          text: "分析：若尚未接触鸟头定理，也可以通过连 BE，用“等高三角形面积比 = 底之比”两次完成转化。",
        },
        {
          text: "△ABE 与 △ABC 同以 AB 为底、同高 ⇒ △ABE : △ABC = AE : AC = 3 : 5，即 △ABE = (3/5)·△ABC。",
        },
        {
          text: "△ADE 与 △ABE 同以 AE 为底、同高，而 AD : AB = 2 : 5 ⇒ △ADE = (2/5) · △ABE。",
        },
        {
          text: "综合：△ADE = (2/5) · (3/5) · △ABC = (6/25) · △ABC。",
        },
        {
          text: "由 △ADE = 12 得 △ABC = 12 × 25/6 = 50。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△ABE = △ABC × 3/5", rhs: "(3/5) · △ABC" },
                { lhs: "△ADE = △ABE × 2/5", rhs: "(6/25) · △ABC" },
                { lhs: "△ABC = 12 × 25/6", rhs: "50" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 ABC 中，D 在 BC 上使 BD = 3·DC；E 在 AC 上使 CE = 3·EA。\n\n连接 DE，DE 与 AB 延长线交于 F。已知 △ADE = 4，求 △BDF。",
    fields: [
      {
        key: "area",
        label: "△ABC 面积",
        type: "number",
      },
    ],
    answer: {
      area: 45,
    },
    hint: "互补型鸟头：△ADE / △ABC = (1/3)·(2/3) = 2/9。",
  },
  tags: ["鸟头模型", "面积法"],
} satisfies ProblemData;
