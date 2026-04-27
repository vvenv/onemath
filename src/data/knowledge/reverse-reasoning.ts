import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "reverse-reasoning",
  name: "逆向推理",
  tag: "逆向推理",
  category: "word",
  summary: "从结果倒着走回起点：每一步都反着做那一步的运算。",
  intuition:
    "想象一段录像倒放——加变减、乘变除、左变右。题目给出“最后是多少”，最容易的路径就是按时间倒带回到“最初是多少”。",
  derivation: [
    "把题目的操作按时间顺序列出来。",
    "从末尾的已知结果出发，按相反顺序逐步反操作。",
    "反操作对应：+ ↔ −，× ↔ ÷，“去掉一半” ↔ “乘 2”…",
    "回到最初，就是要求的原值。",
  ],
  keyPoints: ["顺着算是正向方程；倒着算是逆向推理，两者等价但后者更省脑。"],
  examples: [
    {
      title: "倒推还原",
      problem: "一个数先加 5，再乘 3，再减 7，得 26。原数是多少？",
      solution: [
        "倒推：26 + 7 = 33。",
        "33 ÷ 3 = 11。",
        "11 − 5 = 6。原数是 6。",
      ],
    },
    {
      title: "三次平分",
      problem:
        "甲先给乙自己钱的一半，又给丙剩下的一半，最后剩 6 元。甲原来多少钱？",
      solution: [
        "最后 6 元是“给丙一半”之后剩下的一半，所以“给丙前”有 6 × 2 = 12 元。",
        "12 元是“给乙一半”之后剩下的，所以甲原有 12 × 2 = 24 元。",
      ],
      takeaway: "带分数操作的题，倒推往往比列方程更干脆。",
    },
  ],
  pitfalls: ["要把操作顺序完整记清，缺一步就错。"],
  relatedSlugs: ["equation-method"],
};

export default entry;
