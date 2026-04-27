import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "classical-probability",
  name: "古典概型",
  tag: "古典概型",
  category: "general",
  summary:
    "所有基本结果机会均等且数量有限时，事件 A 的概率 = A 包含的结果数 ÷ 总结果数。",
  intuition:
    "投一枚均匀骰子有 6 种等可能结果——这就是“古典”的标志：结果有限 + 等可能。把概率当成“好结果占所有结果的比例”，再不会比这更直观。",
  derivation: [
    "样本空间 Ω：所有可能的、等概率的基本结果集合。设 |Ω| 为基本结果总数。",
    "事件 A 是 Ω 的子集；P(A) = |A| ÷ |Ω|。",
    "求概率 = 用计数法分别数出 |A| 与 |Ω|。",
  ],
  keyPoints: [
    "古典概型必须满足两条：① 基本结果有限；② 等可能。缺一不可。",
    "对“等可能”的判断要小心：连续抽取/带顺序与不带顺序时，|Ω| 截然不同。",
  ],
  examples: [
    {
      title: "掷骰子",
      problem: "掷一枚均匀的骰子，求掷出点数大于 4 的概率。",
      solution: [
        "|Ω| = 6（点数 1, 2, 3, 4, 5, 6）。",
        "大于 4 的结果：5、6，共 2 种。",
        "P = 2 ÷ 6 = 1/3。",
      ],
    },
    {
      title: "抽扑克牌",
      problem: "从一副去掉大小王的扑克牌中随机抽一张，求抽到红桃的概率。",
      solution: [
        "|Ω| = 52（去王后 4 花色 × 13 点数）。",
        "红桃共 13 张。",
        "P = 13 ÷ 52 = 1/4。",
      ],
      takeaway: "数总数与好结果数，是古典概型的核心动作。",
    },
  ],
  pitfalls: [
    "“等可能”不能凭直觉断定——例如硬币不均匀、骰子有偏差时，要先核对题目设定。",
    "总数和分子要在同一计数口径下数：要么都按“有序”，要么都按“无序”。",
  ],
  relatedSlugs: [
    "independent-events",
    "complementary-events",
    "conditional-probability",
  ],
};

export default entry;
