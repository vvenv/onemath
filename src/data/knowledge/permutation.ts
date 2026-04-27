import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "permutation",
  name: "排列",
  tag: "排列",
  category: "counting",
  summary:
    "从 n 个不同元素中按顺序取 k 个的方法数：A(n, k) = n × (n − 1) × … × (n − k + 1) = n! ÷ (n − k)!。",
  intuition:
    "排队照相每个位置都有谁，会被算成不同的方案——这就是“顺序敏感”的计数。第 1 位有 n 个选择，第 2 位有 n − 1 个，依次相乘。",
  derivation: [
    "选第 1 个位置的元素：n 种选择。",
    "选第 2 个位置：剩下 n − 1 种；……第 k 个位置：剩下 n − k + 1 种。",
    "由乘法原理，A(n, k) = n × (n − 1) × … × (n − k + 1)。",
    "全排列：A(n, n) = n!（n 阶乘，n × (n − 1) × … × 2 × 1）。",
  ],
  keyPoints: [
    "排列 vs 组合：排列计较顺序，组合不计较顺序。",
    "全排列 n! 增长极快：5! = 120，10! ≈ 3.6 × 10⁶。",
  ],
  examples: [
    {
      title: "选三人排队",
      problem: "从 5 名同学中选 3 名排成一排，共有多少种排法？",
      solution: [
        "第 1 位 5 种、第 2 位 4 种、第 3 位 3 种。",
        "A(5, 3) = 5 × 4 × 3 = 60 种。",
      ],
    },
    {
      title: "相邻问题（捆绑法）",
      problem: "4 名同学 A、B、C、D 排成一排。要求 A 和 B 相邻，共有多少种排法？",
      solution: [
        "把 A、B 视作一个整体（“捆绑”）：相当于 3 个对象排队，3! = 6 种。",
        "A、B 内部还能交换：2 种。",
        "合计 6 × 2 = 12 种。",
      ],
      takeaway: "“相邻”用捆绑法，“不相邻”用插空法。",
    },
  ],
  pitfalls: [
    "审清“是否计较顺序”：同样的题面，按排列和按组合算，答案差 k! 倍。",
    "n! 的乘积要按 n、n − 1、… 依次写出，避免漏乘或多乘。",
  ],
  relatedSlugs: ["combination", "bundling", "insert-method"],
};

export default entry;
