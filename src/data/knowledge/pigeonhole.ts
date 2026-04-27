import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "pigeonhole",
  name: "抽屉原理",
  tag: "抽屉原理",
  category: "counting",
  summary:
    "把 n + 1 只鸽子塞进 n 个抽屉，一定有一个抽屉里有 ≥ 2 只；推广后用来证“至少有 k 个相同”。",
  intuition:
    "抽屉不够用就一定得挤。关键不是“算出数量”，而是把题目里的对象匹配成“鸽子 / 抽屉”，让挤压不可避免。",
  derivation: [
    "简单形式：把 n + 1 个物体放入 n 个抽屉，至少一个抽屉有 ≥ 2 个物体。",
    "推广形式：n × k + 1 个物体放入 n 个抽屉，至少一个抽屉有 ≥ k + 1 个。",
    "解题模板:构造“抽屉”（按余数、颜色、区间等等价类）；数清“鸽子”数量；套公式得结论。",
  ],
  keyPoints: [
    "至少有一个抽屉多于 ⌈总数 / 抽屉数⌉ 个。",
    "常见抽屉：按余数分类、按区间分段、按颜色分组。",
  ],
  examples: [
    {
      title: "同月生日",
      problem: "13 个人中，至少有两个人同一个月出生。为什么？",
      solution: [
        "把 12 个月看作 12 个抽屉，13 个人看作鸽子。",
        "13 > 12，由抽屉原理至少一个月有 ≥ 2 人。",
      ],
    },
    {
      title: "颜色袜子",
      problem:
        "抽屉里有红、蓝、黑三种颜色袜子各若干。闭着眼至少拿几只，才能保证有两只同色？",
      solution: [
        "3 种颜色即 3 个抽屉。",
        "拿 4 只 = 3 × 1 + 1，由推广形式，一定有一个颜色 ≥ 2 只。",
        "所以至少拿 4 只。",
      ],
      takeaway: "“至少拿几只”这类题，鸽子数取“抽屉数 × (需要数 − 1) + 1”。",
    },
  ],
  pitfalls: [
    "抽屉构造要“互不重叠且覆盖全部”，否则结论不成立。",
    "问“至少”时别多算一个：公式是 n·k + 1，不是 n·k。",
  ],
  relatedSlugs: ["case-analysis", "worst-case-principle"],
};

export default entry;
