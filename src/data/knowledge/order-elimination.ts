import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "order-elimination",
  name: "消序法",
  tag: "消序法",
  category: "counting",
  summary: "把“有顺序”的排列数除以“内部顺序数”，得到“无顺序”的组合数。",
  intuition:
    "先按排列（有先后）数一遍，发现同一组人被算了多次——比如 3 个人有 3! = 6 种出场顺序都算了一次。只要把排列数除以“内部可调换的顺序数”，就得到无顺序的组合。",
  derivation: [
    "设从 n 个对象中选 k 个，排成一列有 A(n, k) = n!/(n − k)! 种。",
    "这 k 个对象内部可以重新排 k! 种顺序，但题目不关心顺序。",
    "组合数 C(n, k) = A(n, k) / k! = n! / [k!(n − k)!]。",
  ],
  keyPoints: [
    "关键词：“选而不排”“挑出一组”。",
    "相同元素重复出现时也用消序：总排列 ÷ 各相同组的阶乘。",
  ],
  examples: [
    {
      title: "选代表",
      problem: "从 10 人中选 3 人参加比赛（不分先后），多少种选法？",
      solution: ["C(10, 3) = 10 × 9 × 8 / (3 × 2 × 1) = 120。"],
    },
    {
      title: "含相同字母",
      problem: "字母 A, A, B, C 的不同排列数？",
      solution: [
        "总排列 4! = 24。",
        "两个 A 交换算同一种，消序除以 2! = 2。",
        "答案 24 / 2 = 12。",
      ],
      takeaway: "遇到相同元素，分母上相应阶乘要写全。",
    },
  ],
  pitfalls: [
    "先确认“是否真的不分顺序”，否则多除 k! 就漏算了。",
    "相同元素组要独立除，每组各自 k!。",
  ],
  relatedSlugs: ["additive-multiplicative", "bundling"],
};

export default entry;
