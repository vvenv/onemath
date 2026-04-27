import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "additive-multiplicative",
  name: "加乘原理",
  tag: "加乘原理",
  category: "counting",
  summary: "分类相加，分步相乘。判断“分类”还是“分步”，是计数题的第一关。",
  intuition:
    "如果一件事可以分成几种情况独立完成 → 情况数相加；如果必须按顺序完成几步 → 每步的方案数相乘。一句话：OR 用加，AND 用乘。",
  derivation: [
    "加法原理：完成一件事有 n 类办法，每类分别有 a₁, a₂, …, aₙ 种，共 a₁ + a₂ + … + aₙ 种。",
    "乘法原理：完成一件事分 n 步，每步分别有 b₁, b₂, …, bₙ 种选择（步间独立），共 b₁ × b₂ × … × bₙ 种。",
  ],
  keyPoints: ["并列选择（或）→ 加。", "依次确定（且）→ 乘。"],
  examples: [
    {
      title: "纯加法",
      problem: "从甲地到乙地有 3 班汽车或 2 班火车可乘，共有多少种走法？",
      solution: ["“或”：两类方式并列。", "3 + 2 = 5 种。"],
    },
    {
      title: "纯乘法",
      problem: "早餐 3 种主食，4 种饮料，每种组合一次，共几种组合？",
      solution: ["“且”：两步依次选择。", "3 × 4 = 12 种。"],
    },
    {
      title: "混合",
      problem:
        "从 A 地到 B 地有 2 条路，从 B 地到 C 地有 3 条路；也可以从 A 直达 C 有 4 条。从 A 到 C 共几种走法？",
      solution: ["经 B：2 × 3 = 6。", "直达：4。", "总数 6 + 4 = 10。"],
      takeaway: "外层分类加，内层分步乘——典型两层结构。",
    },
  ],
  pitfalls: ["分类必须互斥、分步必须独立，否则会漏或重。"],
  relatedSlugs: ["enumeration", "inclusion-exclusion"],
};

export default entry;
