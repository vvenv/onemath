import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "independent-events",
  name: "独立事件",
  tag: "独立事件",
  category: "general",
  summary:
    "两事件互不影响时，称为独立。独立事件“同时发生”的概率等于各自概率之乘积：P(A 且 B) = P(A) × P(B)。",
  intuition:
    "掷两枚骰子，一枚的点数对另一枚没有任何影响——这就是“独立”。把两步动作的概率分别求好，再相乘，就是“两步都成功”的概率。",
  derivation: [
    "若 A 的发生不改变 B 的发生概率，则 A、B 独立，P(A | B) = P(A)。",
    "对独立事件，乘法原理直接迁移到概率：P(A 且 B) = P(A) × P(B)。",
    "扩展到 n 个独立事件：P(A₁ 且 A₂ 且 … 且 Aₙ) = P(A₁) × P(A₂) × … × P(Aₙ)。",
  ],
  keyPoints: [
    "“独立”不是“互斥”——独立事件可以同时发生；互斥事件不可能同时发生。",
    "重复掷一枚骰子、有放回地抽球——典型的独立场景；不放回抽球则不独立。",
  ],
  examples: [
    {
      title: "两枚骰子之和",
      problem: "掷两枚均匀的骰子，求两枚骰子点数之和为 8 的概率。",
      solution: [
        "总样本数 = 6 × 6 = 36（两枚独立各 6 种）。",
        "和为 8 的有：(2,6)、(3,5)、(4,4)、(5,3)、(6,2)，共 5 种。",
        "P = 5 ÷ 36。",
      ],
    },
    {
      title: "连掷正面",
      problem: "连续掷一枚均匀硬币 3 次，求 3 次都是正面的概率。",
      solution: [
        "每次正面的概率 = 1/2，三次独立。",
        "P = (1/2) × (1/2) × (1/2) = 1/8。",
      ],
      takeaway: "“连续多次都成功”是乘法的最常见场景。",
    },
  ],
  pitfalls: [
    "不放回抽样不独立，不能直接相乘——要改用条件概率。",
    "“独立”是题目对场景的设定，不能凭直觉断定，必须由题意保证。",
  ],
  relatedSlugs: [
    "classical-probability",
    "complementary-events",
    "conditional-probability",
  ],
};

export default entry;
