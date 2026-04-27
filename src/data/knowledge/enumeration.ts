import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "enumeration",
  name: "枚举法",
  tag: "枚举法",
  category: "counting",
  summary: "按某个顺序把所有可能性“走一遍”，保证不重不漏。",
  intuition:
    "当问题的结构还看不清、公式不好套的时候，干脆一个一个列出来——只要建立清晰的“排列顺序”，答案就会从列表里浮出来。",
  derivation: [
    "先设计一个能保证“不重”的枚举顺序（按大小、按字典序、按层）。",
    "边枚举边检查是否满足题目条件。",
    "收集所有满足条件的情况，统计个数或读出答案。",
  ],
  keyPoints: [
    "分层枚举：先固定一个变量，再枚举另一个。",
    "对称性：有时可以只枚举一半再乘 2。",
  ],
  examples: [
    {
      title: "数对",
      problem: "方程 x + y = 10（x, y 均为正整数）有多少组解？",
      solution: [
        "固定 x 从 1 枚举到 9，y = 10 − x 自动确定。",
        "x = 1..9 共 9 组解。",
      ],
    },
    {
      title: "三位数",
      problem:
        "用 1、2、3、4 中的数字（可重复）组成三位数，其中各位之和为 6 的有多少个？",
      solution: [
        "按百位分类枚举：",
        "百位 1：十 + 个 = 5，组合有 (1,4)(2,3)(3,2)(4,1)，4 个。",
        "百位 2：十 + 个 = 4，有 (1,3)(2,2)(3,1)，3 个。",
        "百位 3：十 + 个 = 3，有 (1,2)(2,1)，2 个。",
        "百位 4：十 + 个 = 2，有 (1,1)，1 个。",
        "共 4 + 3 + 2 + 1 = 10 个。",
      ],
      takeaway: "“按百位分类 + 小范围枚举”是典型组合。",
    },
  ],
  pitfalls: ["没有排序就容易漏或重复，先定顺序再开枚举。"],
  relatedSlugs: ["case-analysis", "inclusion-exclusion"],
};

export default entry;
