import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10119-1.svg?raw";
import svg2 from "./figures/10119-2.svg?raw";

export default {
  id: "10119",
  title: "共角三角形·互补型（延长线上取点）",
  grade: "五年级",
  module: "几何",
  difficulty: "进阶",
  question:
    "如图，在三角形 ABC 中，D 在 BA 的延长线上（即 A 在 B、D 之间），AB : AD = 5 : 2；E 在边 AC 上，AE : EC = 3 : 2。已知三角形 ADE 的面积为 12，求三角形 ABC 的面积。",
  figures: [
    {
      svg: svg1,
      caption:
        "D 在 BA 延长线（A 外侧），AB : AD = 5 : 2；E 在 AC 上，AE : EC = 3 : 2",
      alt: "三角形外延伸一点 D 与三角形内一点 E 构成的小三角形",
    },
  ],
  solutions: [
    {
      key: "supplementary",
      label: "鸟头定理·互补型",
      steps: [
        "分析：∠DAE 与 ∠BAC 在同一顶点 A，但 D 在 BA 的延长线上，所以 AD 的方向和 AB 相反；AE 的方向则和 AC 相同。因此 ∠DAE 与 ∠BAC 互为补角（相加 = 180°）。互补角的正弦值相等，所以「鸟头定理」对互补型同样成立：△ADE 与 △ABC 的面积比 = 两对夹边乘积之比。",
        "第一步：读出比例。AB : AD = 5 : 2 ⇒ AD : AB = 2 : 5；AE : EC = 3 : 2 ⇒ AE : AC = 3 : 5。",
        "第二步：套公式 △ADE : △ABC = (AD · AE) : (AB · AC) = (2 · 3) : (5 · 5) = 6 : 25。",
        "第三步：△ABC = 12 × 25/6 = 50。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "AD : AB",
              rhs: "2 : 5",
            },
            {
              lhs: "AE : AC",
              rhs: "3 : 5",
            },
            {
              lhs: "△ADE : △ABC = (AD·AE)/(AB·AC)",
              rhs: "6 : 25",
            },
            {
              lhs: "△ABC = 12 × 25/6",
              rhs: "50",
              badge: "答案",
            },
          ],
          caption: "互补角的共角三角形面积比公式仍适用",
        },
        {
          kind: "svg",
          svg: svg2,
          caption: "△ADE 占 △ABC 的 6/25",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔺",
              count: 50,
              label: "△ABC 面积",
            },
          ],
        },
      ],
    },
    {
      key: "two-step",
      label: "两次等积变换（避开鸟头定理）",
      steps: [
        "分析：若尚未接触鸟头定理，也可以通过连 BE，用「等高三角形面积比 = 底之比」两次完成转化。",
        "第一步：△ABE 与 △ABC 同以 AB 为底、同高 ⇒ △ABE : △ABC = AE : AC = 3 : 5，即 △ABE = (3/5)·△ABC。",
        "第二步：△ADE 与 △ABE 同以 AE 为底、同高，而 AD : AB = 2 : 5 ⇒ △ADE = (2/5) · △ABE。",
        "综合：△ADE = (2/5) · (3/5) · △ABC = (6/25) · △ABC。",
        "由 △ADE = 12 得 △ABC = 12 × 25/6 = 50，与公式法一致。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "△ABE = △ABC × 3/5",
              rhs: "(3/5) · △ABC",
            },
            {
              lhs: "△ADE = △ABE × 2/5",
              rhs: "(6/25) · △ABC",
            },
            {
              lhs: "△ABC = 12 × 25/6",
              rhs: "50",
              badge: "验证",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三角形 ABC 中，D 在 BA 的延长线上，AB : AD = 3 : 1；E 在 AC 上，AE : EC = 2 : 1。若三角形 ADE 的面积为 10，求三角形 ABC 的面积。",
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
