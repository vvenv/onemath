import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "arithmetic-sequence-method",
  name: "等差数列法",
  tag: "等差数列法",
  category: "magicSquare",
  summary:
    "幻方里的数字常形成等差（或多个等差段）；用“首尾配对 + 平均值”一次性算出幻和与中心。",
  intuition:
    "幻方的数字不是随便乱给的——它们几乎总能写成等差数列。一旦发现“数字等差”，总和、平均、幻和这些都是等差公式的直接产出。",
  derivation: [
    "设幻方里的数字是公差为 d 的等差数列。",
    "总和 = n² × (首 + 末) / 2（n 阶幻方用 n² 个数）。",
    "幻和 = 总和 / n = n × (首 + 末) / 2。",
    "3 阶幻方的中心 = 平均值 = (首 + 末) / 2。",
  ],
  keyPoints: ["等差数列求和公式是入口。", "幻和 = n × 平均值（n 阶）。"],
  examples: [
    {
      title: "非 1..9 的 3 阶",
      problem: "用 1, 3, 5, 7, 9, 11, 13, 15, 17 填 3 阶幻方。幻和与中心？",
      solution: [
        "等差数列：首 1，末 17，共 9 项。",
        "平均 = (1 + 17)/2 = 9，中心 = 9。",
        "幻和 = 3 × 9 = 27。",
      ],
    },
  ],
  pitfalls: ["不能确定数字真的构成等差时，先验证。"],
  relatedSlugs: [
    "center-number-method",
    "accumulation-method",
    "head-tail-pairing",
  ],
};

export default entry;
