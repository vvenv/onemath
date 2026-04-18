import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "distributive-law",
  name: "乘法分配律",
  tag: "乘法分配律",
  category: "numberCalc",
  summary: "(a + b) × c = a × c + b × c；正反两用，是速算与巧算的主力工具。",
  intuition:
    "分配律就像“批发共同因数”：几笔相似的乘积里如果有同一个因数，就把它提出来一次算；反过来，难算的乘积里也可以主动“凑”出共同因数。",
  derivation: [
    "基本形式：(a + b) · c = a · c + b · c。",
    "反向使用（提公因数）：a · c + b · c = (a + b) · c。",
    "速算：把一个复杂因数拆成 (整 + 尾) 或 (整 − 尾)，分别与另一因数相乘再合并。",
  ],
  keyPoints: ["正用：拆开；反用：合并。", "“凑整”是速算的核心动机。"],
  examples: [
    {
      title: "正用拆开",
      problem: "99 × 37 = ?",
      solution: ["99 × 37 = (100 − 1) × 37 = 3700 − 37 = 3663。"],
    },
    {
      title: "反用提取",
      problem: "125 × 7 + 125 × 3 = ?",
      solution: ["= 125 × (7 + 3) = 125 × 10 = 1250。"],
    },
    {
      title: "混合",
      problem: "37 × 24 + 37 × 76 = ?",
      solution: ["= 37 × (24 + 76) = 37 × 100 = 3700。"],
    },
  ],
  pitfalls: ["分配只对“乘 + 加/减”成立，不要对“加 × 加”乱用。"],
  relatedSlugs: ["rounding", "telescoping"],
};

export default entry;
