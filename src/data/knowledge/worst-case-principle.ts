import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "worst-case-principle",
  name: "最不利原则",
  tag: "最不利原则",
  category: "general",
  summary:
    "考虑“最差的情况”：要保证某事件发生，必须先跨过最差那道坎。常与抽屉原理联用。",
  intuition:
    "“至少拿几只才能保证有两只同色”——这类“保证”题就是在问“运气最差时还要多少”。先假装全是不巧，再加 1，就是答案。",
  derivation: [
    "要保证“至少发生 k 个 X”——先想“最多能连续不发生多少次”。",
    "答案 = 最多不发生次数 + 需要发生的次数。",
  ],
  keyPoints: ["“保证” = 最坏情况也成立。", "与抽屉原理组合使用最常见。"],
  examples: [
    {
      title: "袜子",
      problem:
        "抽屉里有红袜子 10 只、蓝袜子 8 只、黑袜子 6 只。闭眼至少拿几只，才能保证有 3 只同色？",
      solution: [
        "最坏情况：每种颜色拿 2 只都不成 3，共 2 × 3 = 6 只。",
        "再拿一只，必定凑出 3 只同色。",
        "答案 = 6 + 1 = 7 只。",
      ],
    },
    {
      title: "扑克抽牌",
      problem:
        "一副去掉大小王的扑克（52 张，4 种花色），至少抽几张能保证有 5 张同花色？",
      solution: [
        "最坏：每种花色先抽 4 张，共 16 张。",
        "再抽 1 张必凑出一种 5 张同花。",
        "答案 17 张。",
      ],
      takeaway: "“最差 + 1”是这个套路的公式。",
    },
  ],
  pitfalls: ["最坏情况要考虑全——别遗漏某种“更坏”的分配。"],
  relatedSlugs: ["pigeonhole"],
};

export default entry;
