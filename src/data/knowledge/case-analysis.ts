import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "case-analysis",
  name: "分类讨论",
  tag: "分类讨论",
  category: "counting",
  summary:
    "按关键特征把所有情况拆成互不重叠且覆盖全体的几类，逐类计算后相加。",
  intuition:
    "遇到“看情况”的题，与其正面硬算，不如把“情况”明确切开：每类内部规则统一，整体加起来就是答案。关键是分类要做到“互斥 + 穷举”。",
  derivation: [
    "识别决定答案形式的“关键属性”（如奇偶、大小、位置）。",
    "按这个属性把所有情况拆成若干类，确保两两不重、合起来不漏。",
    "每类单独算数量或结果。",
    "汇总：通常是求和。",
  ],
  keyPoints: [
    "互斥（不重）+ 穷举（不漏）是分类的两条红线。",
    "好分类 = 每类内部结构一致，便于统一计算。",
  ],
  examples: [
    {
      title: "数字问题",
      problem: "100 以内有多少个数含数字 3？",
      solution: [
        "按“3 出现在哪一位”分类（互斥地计数，最后去重）：",
        "个位是 3：3, 13, 23, …, 93，共 10 个。",
        "十位是 3：30, 31, …, 39，共 10 个。",
        "同时两位都是 3 的：33，被算了 2 次。",
        "合计 10 + 10 − 1 = 19 个。",
      ],
      takeaway: "分类后发现“交集”再用容斥修正，是常见组合。",
    },
  ],
  pitfalls: ["分类标准不清晰会导致漏/重；交集一定要检查。"],
  relatedSlugs: ["enumeration", "inclusion-exclusion"],
};

export default entry;
