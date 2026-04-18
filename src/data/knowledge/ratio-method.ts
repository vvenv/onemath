import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "ratio-method",
  name: "比例法",
  tag: "比例法",
  category: "word",
  summary:
    "把未知量写成比，再按比分配总量；遇到“倍”“占比”“比 a:b”都能直接用。",
  intuition:
    "把几个量拆成“统一的一份”的整数倍，题目里的关系就变成了一张“几份几份”的地图——每份多少算出来，其它全有了。",
  derivation: [
    "识别题目里的比例关系，用 k 份表示每个量。",
    "按“总量 = Σ 份数 × 1 份”解出“1 份 = 多少”。",
    "还原每个量。",
  ],
  keyPoints: [
    "“按比分配”：总量 ÷ 总份数 = 1 份。",
    "“三量连比”：化成公共份数再分。",
  ],
  examples: [
    {
      title: "按比分配",
      problem: "一笔 360 元的奖金按 3 : 4 : 5 分给甲乙丙。各多少？",
      solution: [
        "总份 = 3 + 4 + 5 = 12 份。",
        "1 份 = 360 ÷ 12 = 30。",
        "甲 90、乙 120、丙 150。",
      ],
    },
  ],
  pitfalls: ["三量连比要先“对齐”公共基准，再求份。"],
  relatedSlugs: ["shares-method", "line-segment-diagram"],
};

export default entry;
