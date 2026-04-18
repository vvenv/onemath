import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "expected-value",
  name: "期望值",
  tag: "期望值",
  category: "general",
  summary:
    "把每个可能结果的“值”按概率加权求和，得到“长期平均收益”。E(X) = ∑ xᵢ × P(X = xᵢ)。",
  intuition:
    "玩一次抽奖中 100 元的概率是 1/10——长期来看，每玩一次平均能赚 100 × 1/10 = 10 元。把所有结果的金额按概率加权相加，就是“平均期望多少”。",
  derivation: [
    "列出随机变量 X 所有可能取值 x₁, x₂, …, xₙ 与对应概率 p₁, p₂, …, pₙ，且 ∑ pᵢ = 1。",
    "期望值 E(X) = x₁ × p₁ + x₂ × p₂ + … + xₙ × pₙ。",
    "线性性质：E(aX + b) = a × E(X) + b；E(X + Y) = E(X) + E(Y)（无需独立）。",
  ],
  keyPoints: [
    "期望值不是“一次一定能拿到”的金额，而是“长期平均”。",
    "公平博弈的标志：期望值 = 0；庄家盈利的游戏，玩家期望 < 0。",
  ],
  examples: [
    {
      title: "骰子奖金",
      problem:
        "掷一枚均匀骰子，掷出大于 4 的点数得 10 元，否则得 0 元。求一次的期望奖金。",
      solution: [
        "P(大于 4) = 2/6 = 1/3，P(否则) = 2/3。",
        "E = 10 × 1/3 + 0 × 2/3 = 10/3 ≈ 3.33 元。",
      ],
    },
    {
      title: "买彩票",
      problem:
        "彩票每张 2 元，中奖概率 1/100，奖金 100 元。买一张的期望收益是多少？",
      solution: [
        "奖金的期望 E(奖金) = 100 × 1/100 + 0 × 99/100 = 1 元。",
        "净收益 = 奖金 − 票价，期望为 1 − 2 = −1 元。",
        "买一张平均亏 1 元，长期来看不划算。",
      ],
      takeaway: "判断游戏“是否值得参加”就看期望收益的正负。",
    },
  ],
  pitfalls: [
    "期望值是“平均”，不是“最常见”——单次结果可能远离它。",
    "概率必须求和为 1；漏掉某种结果会让期望算错。",
  ],
  relatedSlugs: ["classical-probability", "independent-events"],
};

export default entry;
