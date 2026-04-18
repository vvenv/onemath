import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "without-replacement",
  name: "不放回抽样",
  tag: "不放回抽样",
  category: "general",
  summary:
    "抽出后不放回，下一次抽时总数和好结果数都会变。多次连抽用条件概率连乘：P(连续) = P(第一次) × P(第二次 | 第一次) × …",
  intuition:
    "袋里 4 红 3 白，抽出第一个红球后袋里只剩 3 红 3 白——下一次抽到红的概率与第一次不同。每抽一次，舞台都会缩小一格。",
  derivation: [
    "第一次：P₁ = 想要的数量 ÷ 总数量。",
    "第二次（已知第一次结果）：P₂ = 在更新后的袋里再算一次比例。",
    "“两次都成功”的概率 = P₁ × P₂（这是条件概率的乘法公式）。",
    "等价做法：用组合数 C(好, k) ÷ C(总, k) 一气算出 k 次都中的概率。",
  ],
  keyPoints: [
    "不放回的两次事件不独立，不能直接 P × P。",
    "“有放回”才适用独立事件乘法；不放回必须更新分母与分子。",
  ],
  examples: [
    {
      title: "两次都摸到红球",
      problem:
        "袋中有 4 个红球和 3 个白球。摸出 1 个球不放回，再摸 1 个球。求两次都摸到红球的概率。",
      solution: [
        "第一次摸到红：4 ÷ 7。",
        "第一次摸红后袋中剩 3 红 3 白，第二次摸到红：3 ÷ 6 = 1/2。",
        "两次都红 = (4/7) × (1/2) = 2/7。",
      ],
    },
    {
      title: "用组合一步算",
      problem: "袋中有 5 个红球、3 个白球。一次性取 2 球，求都是红球的概率。",
      solution: [
        "好的取法 = C(5, 2) = 10；所有取法 = C(8, 2) = 28。",
        "P = 10 ÷ 28 = 5/14。",
      ],
      takeaway:
        "“一次性取 k 个 = 不放回连抽 k 次（不计顺序）”，组合公式直接到位。",
    },
  ],
  pitfalls: [
    "把不放回当成有放回，错用独立事件乘法是最常见的错误。",
    "当 k 较大时记得相应更新每一步的分母与分子，不能只更新一次。",
  ],
  relatedSlugs: [
    "conditional-probability",
    "classical-probability",
    "combination",
  ],
};

export default entry;
