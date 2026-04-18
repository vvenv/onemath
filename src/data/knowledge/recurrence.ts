import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "recurrence",
  name: "递推法",
  tag: "递推法",
  category: "counting",
  summary:
    "用“上一步怎么办”写出公式，把未知规模的问题一层层推回已知的小规模。",
  intuition:
    "楼梯一步能迈 1 或 2 级，第 n 级的方法数 = 第 n−1 级（再跨 1）+ 第 n−2 级（再跨 2）。把“第 n 的答案”表达成“更小规模的答案”，就能像多米诺一样推过去。",
  derivation: [
    "设 a_n 为规模为 n 时的方案数。",
    "分析“最后一步”，把它拆成几种情形，每种情形剩下的规模分别是 n − k。",
    "于是 a_n = a_{n-1} + a_{n-2} + …（看实际情形）。",
    "结合初值 a_0, a_1 从小到大算出 a_n。",
  ],
  keyPoints: [
    "递推的灵魂是“分析最后一步”。",
    "常见初值：a_0, a_1，有时 a_2；必须独立计算以启动递推。",
  ],
  examples: [
    {
      title: "爬楼梯",
      problem: "楼梯有 10 级，每步上 1 级或 2 级。有多少种不同走法？",
      solution: [
        "a_1 = 1, a_2 = 2。",
        "a_n = a_{n-1} + a_{n-2}。",
        "依次算：3, 5, 8, 13, 21, 34, 55, 89。",
        "a_10 = 89。",
      ],
    },
  ],
  pitfalls: ["初值算错，整条链都错。", "“分析最后一步”时情形不要漏。"],
  relatedSlugs: ["enumeration"],
};

export default entry;
