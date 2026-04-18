import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "conditional-probability",
  name: "条件概率",
  tag: "条件概率",
  category: "general",
  summary:
    "“在 B 已经发生的前提下，A 发生”的概率。记作 P(A | B) = P(A 且 B) ÷ P(B)。",
  intuition:
    "把样本空间“缩小”到 B 这一部分，再在新样本空间里数 A 的占比。原本一桌 36 种点数组合，知道“第一颗是 6”后只剩 6 种，再问 A 在这 6 种里的占比。",
  derivation: [
    "P(A | B) = P(A 且 B) ÷ P(B)，要求 P(B) > 0。",
    "等价：在样本空间 Ω 里只保留属于 B 的结果，重新计数。",
    "乘法公式：P(A 且 B) = P(A | B) × P(B)，常用来分解多步事件的联合概率。",
  ],
  keyPoints: [
    "条件概率 ≠ 联合概率：P(A | B) 通常 ≠ P(A 且 B)。",
    "若 A、B 独立，则 P(A | B) = P(A)，条件信息不改变概率。",
  ],
  examples: [
    {
      title: "不放回连抽两次",
      problem:
        "袋中有 3 个红球、2 个白球。不放回地连抽两次，求第二次抽到红球的概率（已知第一次抽到红球）。",
      solution: [
        "条件“第一次抽到红球”发生后，袋中变为 2 红、2 白共 4 球。",
        "P(第二次红 | 第一次红) = 2 ÷ 4 = 1/2。",
      ],
    },
    {
      title: "条件改变结果",
      problem:
        "掷两枚均匀骰子，已知至少有一枚是 6 点，求两枚都是 6 点的概率。",
      solution: [
        "样本空间限定为“至少一枚 6”的情形：(6,1)…(6,6) 与 (1,6)…(5,6)，共 11 种。",
        "其中两枚都是 6 仅 1 种 (6,6)。",
        "P = 1 ÷ 11。",
      ],
      takeaway: "在条件概率中先“缩小样本空间”，然后再像古典概型一样数。",
    },
  ],
  pitfalls: [
    "“P(A | B)”和“P(B | A)”不要混——前者已知 B 求 A，后者反之。",
    "无放回模型必须用条件概率，不要直接套独立事件的乘法。",
  ],
  relatedSlugs: ["independent-events", "classical-probability"],
};

export default entry;
