import type { KnowledgeEntry } from "@/types/knowledge";
import svg2 from "./figures/counting-2.svg?raw";

const entry: KnowledgeEntry = {
  slug: "stars-and-bars",
  name: "隔板法",
  tag: "隔板法",
  category: "counting",
  summary:
    "把 n 个相同的物品分给 k 个人，每人至少 1 个 → C(n−1, k−1)；可以为 0 → C(n+k−1, k−1)。",
  intuition:
    "n 个相同的球排一排，它们之间有 n − 1 个缝隙。要分给 k 个人，就相当于在这些缝隙里选 k − 1 个位置插“隔板”——隔板把球切成 k 堆，每堆分给一个人。",
  derivation: [
    "n 个球排成一排，共 n − 1 个空隙。",
    "选 k − 1 个空隙插板：C(n − 1, k − 1) 种。",
    "允许有 0：先给每人“借 1 个”，转为“每人至少 1”，规模变成 n + k 个球分 k 人每人至少 1。",
    "结果：C(n + k − 1, k − 1)。",
  ],
  keyPoints: [
    "n 相同球分 k 人，每人 ≥ 1：C(n − 1, k − 1)。",
    "每人 ≥ 0：C(n + k − 1, k − 1)。",
  ],
  examples: [
    {
      title: "每人至少 1",
      problem: "10 个相同苹果分给 3 个小朋友，每人至少 1 个。多少种分法？",
      solution: ["C(10 − 1, 3 − 1) = C(9, 2) = 36。"],
    },
    {
      title: "允许为 0",
      problem: "10 个相同苹果分给 3 个小朋友，可以有人一个都不拿。多少种？",
      solution: ["C(10 + 3 − 1, 3 − 1) = C(12, 2) = 66。"],
    },
  ],
  pitfalls: [
    "球必须“相同”才能用；不同物品不能用此公式。",
    "“每人至少 m 个”也可以先借 m 再用。",
  ],
  relatedSlugs: ["bundling", "gap-insertion"],
  figures: [
    {
      svg: svg2,
      alt: "10 球与 2 隔板分成三堆",
      caption:
        "10 个相同球 + 2 块隔板 → 分成 3 堆，一种分法对应一种选板方案。",
    },
  ],
};

export default entry;
