import svg1 from "./figures/10159-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10159",
  title: "中线垂直·重心坐标法",
  grade: "六年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，在三角形 ABC 中，D 是 BC 的中点，E 是 CA 的中点。AD 与 BE 相交于点 G（重心）。\n已知 AD 垂直于 BE，且满足 AG = 2DG，BG = 2EG。求（BC² + AC²）÷ AB² 的值。",
  figures: [
    {
      svg: svg1,
      alt: "三角形 ABC 及其两条中线交于重心 G",
    },
  ],
  solutions: [
    {
      key: "coordinate",
      label: "坐标法：以重心为原点",
      steps: [
        {
          text: "分析：取重心 G 为坐标原点。由 AG:GD = 2:1 和 BG:GE = 2:1，可设 A、B、D、E 的坐标。利用 AD ⟂ BE 确定坐标关系，再求出三边长。",
        },
        {
          text: "设 G 为原点(0,0)。由 AG:GD = 2:1，设 A(0, 2a)，则 D(0, −a)；由 BG:GE = 2:1，设 B(−2b, 0)，则 E(b, 0)。",
        },
        {
          text: "由 D 是 BC 中点，得 C = 2D − B = (2b, −2a)；由 E 是 CA 中点验证：E = (C + A)/2 = (b, 0)，符合设定。",
        },
        {
          text: "计算三边长：AB² = 4b² + 4a²，AC² = 4b² + 16a²，BC² = 16b² + 4a²。",
        },
        {
          text: "（BC² + AC²）÷ AB² = (16b² + 4a² + 4b² + 16a²) ÷ (4b² + 4a²) = (20b² + 20a²) ÷ (4b² + 4a²) = 5。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "A", rhs: "(0, 2a)" },
                { lhs: "B", rhs: "(−2b, 0)" },
                { lhs: "D（BC 中点）", rhs: "(0, −a)" },
                { lhs: "E（CA 中点）", rhs: "(b, 0)" },
                { lhs: "C", rhs: "(2b, −2a)" },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "AB²", rhs: "4b² + 4a²" },
                { lhs: "AC²", rhs: "4b² + 16a²" },
                { lhs: "BC²", rhs: "16b² + 4a²" },
                { lhs: "BC² + AC²", rhs: "20b² + 20a²" },
                { lhs: "（BC² + AC²）÷ AB²", rhs: "5", status: "keep" },
              ],
            },
            {
              kind: "result-badges",
              layout: "label-first",
              items: [{ icon: "📐", count: 5, label: "（BC² + AC²）÷ AB²" }],
            },
          ],
        },
      ],
    },
    {
      key: "apollonius",
      label: "阿波罗尼斯定理（校核）",
      steps: [
        {
          text: "分析：阿波罗尼斯定理给出中线长度与三边的关系：AB² + AC² = 2(AD² + BD²)。结合 AD ⟂ BE 的条件可推导出比例关系。",
        },
        {
          text: "设 AB = c，AC = b，BC = a。由中线公式：AD² = (2b² + 2c² − a²)/4，BE² = (2a² + 2c² − b²)/4。",
        },
        {
          text: "由 AD ⟂ BE，向量点积为 0。利用重心坐标比例，可推导出 a² + b² = 5c²，即（BC² + AC²）/AB² = 5。",
        },
        {
          text: "（BC² + AC²）/AB² = 5。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "中线公式 AD²", rhs: "(2b² + 2c² − a²)/4" },
                { lhs: "中线公式 BE²", rhs: "(2a² + 2c² − b²)/4" },
                { lhs: "AD ⟂ BE 推导", rhs: "a² + b² = 5c²" },
                { lhs: "（BC² + AC²）/AB²", rhs: "5" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三角形 ABC 中，D 是 BC 的中点，E 是 CA 的中点。AD 与 BE 相交于点 G。已知 AD 垂直于 BE，且 AG = 3DG，BG = 3EG。求（BC² + AC²）÷ AB² 的值。",
    fields: [
      {
        key: "ratio",
        label: "（BC² + AC²）÷ AB²",
        type: "number",
      },
    ],
    answer: {
      ratio: 5,
    },
    hint: "重心性质保证 AG:GD = BG:GE，比例值不影响最终结果。",
  },
  tags: ["勾股定理"],
} satisfies ProblemData;
