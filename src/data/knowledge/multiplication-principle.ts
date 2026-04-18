import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "multiplication-principle",
  name: "乘法原理",
  tag: "乘法原理",
  category: "counting",
  summary:
    "一件事必须按顺序完成若干“步”且各步独立时，各步方案数相乘就是总方案。",
  intuition:
    "穿衣服：先挑上衣 3 种，再挑裤子 4 种，两步都要完成才算“穿好”。每一件上衣都能搭配每一条裤子，组合数是 3 × 4 = 12。",
  derivation: [
    "完成一件事需要按顺序分 n 步。",
    "每步的选择互相独立，分别有 b₁, b₂, …, bₙ 种。",
    "总方案数 = b₁ × b₂ × … × bₙ。",
  ],
  keyPoints: [
    "关键词：“且”“分步”“依次”。",
    "步与步必须独立，前一步的选择不影响后一步的方案数。",
  ],
  examples: [
    {
      title: "搭配",
      problem: "3 种上衣、4 种裤子、2 双鞋，一共能搭出多少套？",
      solution: ["3 × 4 × 2 = 24 套。"],
    },
    {
      title: "密码",
      problem: "4 位数字密码，每位 0–9 可重复，一共多少种？",
      solution: ["10 × 10 × 10 × 10 = 10 000。"],
      takeaway: "每一位独立选择，乘法原理直接乘。",
    },
  ],
  pitfalls: [
    "步不独立（例如不允许重复）时，后一步的方案数要相应减少。",
    "遇到“或”的情形不要乘，应改用加法。",
  ],
  relatedSlugs: ["addition-principle", "additive-multiplicative"],
};

export default entry;
