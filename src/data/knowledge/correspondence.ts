import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "correspondence",
  name: "对应思想",
  tag: "对应思想",
  category: "word",
  summary:
    "盈亏 / 归一 / 分配等题里，把“每份多少”与“份数”一对一挂钩，让两组条件作差或作比。",
  intuition:
    "同一批苹果，按“每人 3 个”分和按“每人 5 个”分，中间差的是 “人数 × (5 − 3)”。把两次分配拿来对应相减，人数就显形——这就是对应思想。",
  derivation: [
    "给出的两组条件都形如 “每份量 × 份数 ± 多余 = 总量”。",
    "写出两条等式：m₁ · x ± a = 总量，m₂ · x ± b = 总量。",
    "两式相减，总量被消掉，只剩下 “份数” 与 “每份量差” 的关系。",
    "解出份数，再回代得到总量。",
  ],
  keyPoints: [
    "本质 = “两次分配” 的差分；分配量不同但份数不变是关键。",
    "差额 ÷ 单位差 = 份数。",
  ],
  examples: [
    {
      title: "典型盈亏",
      problem:
        "把一批书分给学生，每人 6 本多 8 本，每人 7 本差 4 本。学生多少？书多少？",
      solution: [
        "设人数为 n。",
        "书 = 6n + 8 = 7n − 4，对应相减：n = 12。",
        "书 = 6 × 12 + 8 = 80 本。",
      ],
    },
    {
      title: "归一",
      problem:
        "3 台机器 4 小时加工零件 96 个。5 台同样机器 6 小时加工多少个？",
      solution: [
        "“1 台 1 小时”对应产量 = 96 / (3 × 4) = 8 个。",
        "5 × 6 × 8 = 240 个。",
      ],
      takeaway: "先归到“1 台 1 小时”，再乘回新规模——对应关系是桥。",
    },
  ],
  pitfalls: [
    "两次分配的“份数”必须相同，否则不能直接对应相减。",
    "单位换算要对齐（元 vs. 角、时 vs. 分）。",
  ],
  relatedSlugs: ["hypothesis-method", "ratio-method", "shares-method"],
};

export default entry;
