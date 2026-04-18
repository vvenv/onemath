import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "comparison-method",
  name: "比较法",
  tag: "比较法",
  category: "magicSquare",
  summary:
    "拿两条“和相等”的线作差，公共格子消掉，剩下的格子之间立刻出现一个等式。",
  intuition:
    "幻方里每行、每列、每对角线的和都相等。两条线有公共格子时，把它们相减，公共部分抵消，只留下两端“非公共格”的差值关系——复杂题被切成两两比较的小块。",
  derivation: [
    "选两条“和相等”的线 L₁ 与 L₂（两行、两列、或一行一对角等）。",
    "两条线相减：L₁ − L₂ = 0，公共格子项抵消。",
    "只剩下“L₁ 独有格之和 = L₂ 独有格之和”这一个更短的等式。",
    "把该等式与已知数字结合，逐个解出未知格。",
  ],
  keyPoints: [
    "核心口诀：“两线相减，抵消公共”。",
    "经常用来处理“行列对角线交错给出部分格”的问题。",
  ],
  examples: [
    {
      title: "行列比较",
      problem:
        "3×3 幻方某行已填 a, ?, 5，某列已填 a, ?, 9。两个 “?” 的和比这一行的两端之和少多少？",
      solution: [
        "行和 = 列和 = 幻和。",
        "行：a + ?₁ + 5 = 幻和；列：a + ?₂ + 9 = 幻和。",
        "两式相减：?₁ − ?₂ = 9 − 5 = 4。",
        "即 ?₁ = ?₂ + 4。",
      ],
      takeaway: "公共格（此处是 a）消掉，两“?”立即出现差值关系。",
    },
    {
      title: "数阵图",
      problem:
        "三角数阵图：三条边的和相等。若已知一条边的两端之和比另一条多 6，两条共享的顶点如何贡献？",
      solution: [
        "两条边相减，共享顶点抵消。",
        "非共享部分之差 = 6，得到一个直接可用的等式。",
      ],
    },
  ],
  pitfalls: [
    "必须确认两条线真的“和相等”；只在幻方 / 等和数阵图中成立。",
    "相减时注意每个格子出现的次数，避免重复扣除。",
  ],
  relatedSlugs: ["accumulation-method", "center-number-method", "trial-fill"],
};

export default entry;
