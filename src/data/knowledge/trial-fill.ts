import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "trial-fill",
  name: "试填法",
  tag: "试填法",
  category: "magicSquare",
  summary:
    "在候选集合很小、约束很紧时，按顺序试一个数、推一步，冲突就回退——幻方的兜底通法。",
  intuition:
    "当 “累加 / 中心数 / 比较” 都用完仍然剩下两三个格子时，候选数通常只剩三四个。直接按从小到大试一遍，把矛盾及早暴露，正确填法自然浮出来。",
  derivation: [
    "先用“累加法”定幻和、“中心数法”定中心，尽量缩小可填集合。",
    "挑“约束最多的格子”开始试（行、列、对角三线都经过它的格优先）。",
    "假设该格取某个候选值，按幻和往下推一步。",
    "出现矛盾就回退，换下一个候选；全部候选都不行说明前一步错。",
  ],
  keyPoints: [
    "先定幻和，再试值——顺序很重要。",
    "优先填“三线交汇”的格子，剪枝最狠。",
  ],
  examples: [
    {
      title: "角落试值",
      problem: "3×3 幻方用 1–9 填，已知中心为 5。左上角可以是哪几个？",
      solution: [
        "幻和 15。左上角在“行 + 列 + 对角”三条线上，约束最强。",
        "设左上 = a，则右下 = 10 − a（过中心的对角）。",
        "试 a = 1：右下 = 9，矛盾不出现；a = 9, 3, 7 同理可行。",
        "a = 2, 4, 6, 8 不能放角（可验证它们只能放边中）。",
        "所以角上只能是 1, 3, 7, 9。",
      ],
      takeaway: "试填时结合“对角互补”等已有规律，能极大减少分支。",
    },
  ],
  pitfalls: [
    "不做剪枝就硬试，分支爆炸；务必先用幻和缩小集合。",
    "回退时记得恢复之前填入的格子，避免状态串味。",
  ],
  relatedSlugs: [
    "accumulation-method",
    "center-number-method",
    "comparison-method",
  ],
};

export default entry;
