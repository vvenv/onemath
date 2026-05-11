import svg1 from "./figures/10159-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10159",
  title: "中线垂直·阿波罗尼斯定理",
  grade: "六年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，在三角形 ABC 中，D 是 BC 的中点，E 是 CA 的中点。\n\nAD 与 BE 相交于点 G（重心）。\n\n已知 AD 垂直于 BE，且满足 AG = 2DG，BG = 2EG。求（BC² + AC²）÷ AB² 的值。",
  figures: [
    {
      svg: svg1,
      alt: "三角形 ABC 及其两条中线交于重心 G",
    },
  ],
  solutions: [
    {
      key: "apollonius",
      label: "阿波罗尼斯定理",
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
      "在三角形 ABC 中，D 是 BC 的中点，E 是 CA 的中点。\n\nAD 与 BE 相交于点 G。已知 AD 垂直于 BE，且 AG = 3DG，BG = 3EG。求（BC² + AC²）÷ AB² 的值。",
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
