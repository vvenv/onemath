import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "combination",
  name: "组合",
  tag: "组合",
  category: "counting",
  summary:
    "从 n 个不同元素中无序地取 k 个的方法数：C(n, k) = n! ÷ (k! × (n − k)!) = A(n, k) ÷ k!。",
  intuition:
    "从一堆糖果里抓 3 颗，谁先谁后无所谓，只看最后哪 3 颗在手——这就是组合。先按排列数 A(n, k) 算出“有序方案”，再除以 k!（消掉内部顺序），就是组合数。",
  derivation: [
    "先算排列数 A(n, k) = n × (n − 1) × … × (n − k + 1)。",
    "在每个组合里，k 个元素可以有 k! 种排列；这些都对应同一个组合，需要除掉。",
    "故 C(n, k) = A(n, k) ÷ k! = n! ÷ (k! × (n − k)!)。",
    "对称性：C(n, k) = C(n, n − k)；递推：C(n, k) = C(n − 1, k − 1) + C(n − 1, k)（杨辉三角）。",
  ],
  keyPoints: [
    "组合数 = 排列数 ÷ k!，本质是“消序”。",
    "C(n, 0) = C(n, n) = 1，C(n, 1) = n。",
  ],
  examples: [
    {
      title: "握手问题",
      problem: "10 个人见面，两两握一次手，共握了多少次手？",
      solution: [
        "每两人握一次，与顺序无关。",
        "C(10, 2) = (10 × 9) ÷ 2 = 45 次。",
      ],
    },
    {
      title: "选小组",
      problem: "从 8 名同学中选 5 名组成志愿者小组，共有多少种选法？",
      solution: [
        "无顺序问题。利用对称性 C(8, 5) = C(8, 3)。",
        "C(8, 3) = (8 × 7 × 6) ÷ (3 × 2 × 1) = 56 种。",
      ],
      takeaway: "k 较大时用 C(n, k) = C(n, n − k) 反向算，分子分母都更小。",
    },
  ],
  pitfalls: [
    "混淆排列与组合：题面有“排成一排 / 顺序 / 名次”等关键词时是排列，否则多半是组合。",
    "C(n, k) 的分母是 k!，不是 n!；先约分再相乘可避免大数。",
  ],
  relatedSlugs: ["permutation", "addition-principle", "additive-multiplicative"],
};

export default entry;
