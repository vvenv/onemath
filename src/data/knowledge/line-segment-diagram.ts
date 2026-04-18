import type { KnowledgeEntry } from "@/types/knowledge";
import svg2 from "./figures/word-2.svg?raw";

const entry: KnowledgeEntry = {
  slug: "line-segment-diagram",
  name: "线段图法",
  tag: "线段图法",
  category: "word",
  summary:
    "用线段的长短表示数量，把“和/差/倍”翻译成一张可测量的图，复杂条件一眼可读。",
  intuition:
    "把每个未知量画成一条线段，长短正比于它代表的量。和、差、倍立刻变成“总长”“超出段”“多出的格”，避免在文字里绕。",
  derivation: [
    "对每个主要对象画一条线段，长度正比于数量。",
    "用“一段 / 多出 / 总长”等标注刻画题目条件。",
    "用分段的概念找到“一份” = 多少，再整体还原。",
  ],
  keyPoints: [
    "和差问题：两段总长 & 多出段。",
    "倍数问题：大量若干格，小量 1 格。",
    "差倍结合：先切掉“多出”凑齐倍数，再均分。",
  ],
  examples: [
    {
      title: "差倍",
      problem: "甲是乙的 3 倍，甲比乙多 16。各是多少？",
      solution: [
        "乙画 1 格，甲画 3 格，多出 2 格对应 16。",
        "1 格 = 8。乙 = 8，甲 = 24。",
      ],
    },
    {
      title: "和倍",
      problem: "甲乙两筐共 42 个苹果，甲是乙的 2 倍。各多少？",
      solution: [
        "乙 1 格，甲 2 格，共 3 格对应 42。",
        "1 格 = 14。乙 = 14，甲 = 28。",
      ],
    },
  ],
  pitfalls: ["画图时长度比例要近似真实，否则误导判断。"],
  relatedSlugs: ["drawing-method", "hypothesis-method"],
  figures: [
    {
      svg: svg2,
      alt: "差倍问题的线段图",

    },
  ],
};

export default entry;
