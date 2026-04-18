import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "congruence",
  name: "同余",
  tag: "同余",
  category: "numberCalc",
  summary:
    "两个数除以 m 余数相同，记作 a ≡ b (mod m)。余数守加、守减、守乘——整除问题的万能语言。",
  intuition:
    "“钟表上的 14 点和 2 点指针指向同一位置”，这就是 14 ≡ 2 (mod 12)。同余让我们忽略具体数值，只关心“余数”这一特征。",
  derivation: [
    "定义：a ≡ b (mod m) ⇔ m | (a − b)。",
    "运算性质：若 a ≡ b, c ≡ d (mod m)，则 a + c ≡ b + d，a − c ≡ b − d，a · c ≡ b · d (mod m)。",
    "幂：a^k ≡ b^k (mod m)。",
    "常用技巧：把大数对 m 取余后再运算，保持结果正确。",
  ],
  keyPoints: [
    "同加减乘：余数守恒（但除法不一定）。",
    "求余 = 先对每一部分求余，再合并。",
  ],
  examples: [
    {
      title: "大数求余",
      problem: "求 7^100 除以 5 的余数。",
      solution: [
        "7 ≡ 2 (mod 5)，所以 7^100 ≡ 2^100 (mod 5)。",
        "2^4 = 16 ≡ 1 (mod 5)，所以 2^100 = (2^4)^25 ≡ 1 (mod 5)。",
        "余数 = 1。",
      ],
    },
    {
      title: "星期几",
      problem: "今天是星期三，100 天后是星期几？",
      solution: ["100 ≡ 2 (mod 7)。", "星期三 + 2 天 = 星期五。"],
    },
  ],
  pitfalls: [
    "除法不满足同余，不能直接“两边除”。",
    "取余时保持 0 ≤ 余数 < m。",
  ],
  relatedSlugs: ["place-value"],
};

export default entry;
