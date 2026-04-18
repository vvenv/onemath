import svg1 from "./figures/10136-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10136",
  title: "燕尾模型·正方形两中点连线交点",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，正方形 ABCD 的面积为 120。E 是 AB 的中点，F 是 BC 的中点。连接 AF 与 CE 相交于点 G。\n求三角形 BGF 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "正方形内两条中点连线的交点与外围小三角形",
    },
  ],
  solutions: [
    {
      key: "swallowtail",
      label: "燕尾定理定位 G",
      steps: [
        {
          text: "分析：G 在两条 塞瓦线 AF 与 CE 的交点上。在 △ABC 中（把正方形对角线 AC 看成一条辅助线），F 在 BC 上、E 在 AB 上，AF、CE 是两条 塞瓦线。\n用燕尾定理可以算出 G 把 △ABC 分成的三块比例，再和正方形面积挂钩。",
        },
        {
          text: "△ABC 是正方形的一半 = 120 ÷ 2 = 60。",
        },
        {
          text: "燕尾：· 塞瓦线 AF（F 在 BC 上），BF : FC = 1 : 1 ⇒ △ABG : △ACG = 1 : 1。· 塞瓦线 CE（E 在 AB 上），AE : EB = 1 : 1 ⇒ △ACG : △BCG = 1 : 1。\n所以 △ABG : △ACG : △BCG = 1 : 1 : 1，每块 = 60 ÷ 3 = 20。",
        },
        {
          text: "把 △BCG 按 F 在 BC 上的位置拆。△BFG 与 △CFG 同以 G 为顶点、底在 BC 上 ⇒ 比 = BF : FC = 1 : 1 ⇒ △BFG = △BCG ÷ 2 = 10。",
        },
        {
          text: "结论：△BGF 的面积为 10。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△ABC = 正方形 / 2", rhs: "60" },
                {
                  lhs: "△ABG : △ACG : △BCG (双中点 ⇒ 三等分)",
                  rhs: "1 : 1 : 1",
                },
                { lhs: "△BCG = 60 / 3", rhs: "20" },
                { lhs: "△BFG = △BCG × 1/2", rhs: "10" },
              ],
            },
            {
              kind: "result-badges",
              items: [{ icon: "🔺", count: 10, label: "△BGF 面积" }],
            },
          ],
        },
      ],
    },
    {
      key: "coord",
      label: "坐标法",
      steps: [
        {
          text: "建系：取正方形边长 s 满足 s² = 120。A(0,s), B(s,s), C(s,0), D(0,0), E(s/2, s), F(s, s/2)。",
        },
        {
          text: "直线 AF：y = s − x/2；直线 CE：y = −2x + 2s。",
        },
        {
          text: "联立得 x = 2s/3, y = 2s/3 ⇒ G = (2s/3, 2s/3)。",
        },
        {
          text: "△BGF 面积 = (1/2)|s·(s/2 − 2s/3) + s·(2s/3 − s) + (2s/3)·(s − s/2)|= (1/2)|−s²/6 − s²/3 + s²/3|= (1/2)·(s²/6) = s²/12。",
        },
        {
          text: "代入 s² = 120 得 △BGF = 10。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "G", rhs: "(2s/3, 2s/3)" },
                { lhs: "△BGF = s² / 12", rhs: "10" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "正方形 ABCD 面积为 72。E 是 AB 中点，F 是 BC 中点。AF 与 CE 交于 G。求 △BGF 的面积。",
    fields: [
      {
        key: "area",
        label: "△BGF 面积",
        type: "number",
      },
    ],
    answer: {
      area: 6,
    },
    hint: "一般结论 △BGF = 正方形面积 / 12 = 72 / 12 = 6。",
  },
  tags: ["燕尾模型", "等积变形"],
} satisfies ProblemData;
