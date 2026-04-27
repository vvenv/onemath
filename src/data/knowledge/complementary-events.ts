import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "complementary-events",
  name: "对立事件",
  tag: "对立事件",
  category: "general",
  summary:
    "“A 发生”与“A 不发生”互为对立事件，概率之和恰好为 1：P(A) + P(非 A) = 1。正面难数时，常改数“反面”。",
  intuition:
    "考“至少有一次中奖”这种问题，正面数“恰一次 + 恰两次 + …”非常累；反面只有“一次都没中”一种情形，一减就好。",
  derivation: [
    "对任意事件 A，A 与“非 A”覆盖了样本空间且互不重叠：P(A) + P(非 A) = 1。",
    "因此 P(A) = 1 − P(非 A)。",
    "“至少 …”问题的对立常常是“一次都不 …”，后者用独立事件的乘法即可一气算完。",
  ],
  keyPoints: [
    "“对立”覆盖样本空间且互斥；“互斥”只是不重叠，未必对立。",
    "“至少一次发生”↔“一次都不发生”是对立事件最常见的转化模板。",
  ],
  examples: [
    {
      title: "至少有一次中奖",
      problem:
        "某抽奖每次中奖概率为 1/3，独立抽 3 次。求“至少中一次”的概率。",
      solution: [
        "对立事件“一次都没中”：每次不中 = 2/3，三次独立 = (2/3)³ = 8/27。",
        "P(至少一次) = 1 − 8/27 = 19/27。",
      ],
    },
    {
      title: "至少出现一次 6",
      problem: "掷 4 次均匀骰子，求至少出现一次 6 点的概率。",
      solution: [
        "对立事件“四次都不是 6”：每次概率 5/6，四次相乘 = (5/6)⁴ = 625/1296。",
        "P = 1 − 625/1296 = 671/1296。",
      ],
      takeaway: "“至少一次”与“一次都不”互为对立，几乎是固定套路。",
    },
  ],
  pitfalls: [
    "对立事件的反面只有一种情形；如果反面也是“多个并列情形”，往往不比正面省力。",
    "分清“对立”和“互斥”：互斥不一定加起来等于 1。",
  ],
  relatedSlugs: ["independent-events", "classical-probability"],
};

export default entry;
