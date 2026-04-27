import type { KnowledgeEntry } from "@/types/knowledge";
import svg1 from "./figures/magic-square-1.svg?raw";

const entry: KnowledgeEntry = {
  slug: "center-number-method",
  name: "中心数法",
  tag: "中心数法",
  category: "magicSquare",
  summary: "三阶幻方的中心数 = 幻和 ÷ 3 = 所有数字平均值。",
  intuition:
    "三阶幻方有 4 条线过中心（2 条对角线 + 中间行 + 中间列），每条线和 = 幻和。把这 4 条加起来，中心被数了 4 次，其它格子各数了 1 次。稍一整理，中心数就浮出来了。",
  derivation: [
    "4 条过中心的线：和 = 4 × 幻和。",
    "左边展开：中心 × 4 + 其余 8 个数字各一次。",
    "设数字总和为 S，中心数为 c：4 × 幻和 = 4c + (S − c) = S + 3c。",
    "由 3 × 幻和 = S，得 4 × 幻和 = S + 3c → c = 幻和 / 3。",
  ],
  keyPoints: [
    "3 阶幻方中心 = 所有 9 个数的平均数。",
    "用 1..9 填时中心必为 5。",
  ],
  examples: [
    {
      title: "经典",
      problem: "3×3 幻方填 1–9。中心是几？",
      solution: ["幻和 15，中心 = 15/3 = 5。"],
    },
    {
      title: "变形",
      problem: "3×3 幻方填 2, 4, 6, …, 18（9 个偶数）。求中心。",
      solution: [
        "总和 2 + 4 + … + 18 = 90，幻和 = 30。",
        "中心 = 30 / 3 = 10。",
      ],
    },
  ],
  pitfalls: ["中心数法只对“3 阶”幻方成立，更大阶需要其他工具。"],
  relatedSlugs: ["accumulation-method"],
  figures: [
    {
      svg: svg1,
      alt: "3×3 幻方过中心的四条线",
      caption: "四条过中心的线（中列、中行、两条对角线）各等于幻和。",
    },
  ],
};

export default entry;
