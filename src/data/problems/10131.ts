import svg1 from "./figures/10131-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10131",
  title: "相似模型·正方形中的沙漏与对角线",
  grade: "六年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，正方形 ABCD 的边长为 6。E 是边 BC 的中点。连接 DE 与对角线 AC 相交于点 F。\n求三角形 DFC 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "正方形内的中点连线与对角线交点",
    },
  ],
  solutions: [
    {
      key: "hourglass",
      label: "沙漏相似定位 F",
      steps: [
        {
          text: "分析：AD ∥ BC（正方形的对边），所以在 F 点处，直线 AC 与直线 DE 形成「沙漏」的两组平行线之一：考察 △AFD 与 △CFE，它们通过对顶角 + 平行内错角形成相似。",
        },
        {
          text: "∠AFD = ∠CFE（对顶角）；AD ∥ CE（都在正方形的对边上） ⇒ ∠DAF = ∠ECF。故 △AFD ∼ △CFE。",
        },
        {
          text: "对应边 AD : CE = 6 : 3 = 2 : 1。所以 AF : FC = DF : FE = 2 : 1。",
        },
        {
          text: "用 AF : FC = 2 : 1 求 △DFC。△DAC 是正方形一半，面积 = 36 ÷ 2 = 18。F 在对角线 AC 上且 FC : AC = 1 : 3；△DFC 与 △DAC 同以 D 为顶点、底分别在 AC 上 ⇒ △DFC = 18 × 1/3 = 6。",
        },
        {
          text: "结论：三角形 DFC 的面积为 6。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "AD : CE (沙漏相似)", rhs: "2 : 1" },
                { lhs: "AF : FC", rhs: "2 : 1" },
                { lhs: "△DAC = 正方形 / 2", rhs: "18" },
                { lhs: "△DFC = 18 × 1/3", rhs: "6", status: "keep" },
              ],
            },
            {
              kind: "result-badges",
              items: [{ icon: "🔺", count: 6, label: "△DFC 面积" }],
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
          text: "建系：A(0,6), B(6,6), C(6,0), D(0,0), E(6,3)。",
        },
        {
          text: "直线 DE：y = x/2；直线 AC：y = 6 − x。",
        },
        {
          text: "联立 x/2 = 6 − x ⇒ x = 4, y = 2；F = (4, 2)。",
        },
        {
          text: "△DFC 面积 = (1/2)|0·(2 − 0) + 4·(0 − 0) + 6·(0 − 2)| = 6。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "F", rhs: "(4, 2)" },
                { lhs: "△DFC", rhs: "6" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "正方形 ABCD 边长为 12。E 是 BC 上一点，BE : EC = 2 : 1。DE 与对角线 AC 交于 F。求 △DFC 的面积。",
    fields: [
      {
        key: "area",
        label: "△DFC 面积",
        type: "number",
      },
    ],
    answer: {
      area: 18,
    },
    hint: "AD : CE = 12 : 4 = 3 : 1 ⇒ AF : FC = 3 : 1 ⇒ FC = AC/4；△DFC = △DAC × 1/4 = 72 × 1/4 = 18。",
  },
  tags: ["相似模型", "面积法"],
} satisfies ProblemData;
