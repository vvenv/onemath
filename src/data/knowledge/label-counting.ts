import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "label-counting",
  name: "标数法",
  tag: "标数法",
  category: "counting",
  summary:
    "在网格 / 图的每个交点写上“从起点走到这里的路径数”，从起点逐格推到终点。",
  intuition:
    "数“从 A 到 B 有多少条最短路径”，不必枚举——在每个交点记下它自己的答案。一个交点的路径数 = 能直接走到它的那几个交点的路径数之和。像填表一样从起点推过去，终点格子上的数就是答案。",
  derivation: [
    "在起点标 1。",
    "对每个交点：能直接到达它的是“左边”与“下方”（只向右、向上走时）两个交点。",
    "该交点的路径数 = 左邻 + 下邻。",
    "按从近到远的顺序依次填格，直到终点。",
  ],
  keyPoints: [
    "标数 = 动态规划的小学版。",
    "遇到“禁行点”：把它标 0（或不填），不会向外扩散。",
  ],
  examples: [
    {
      title: "矩形网格",
      problem:
        "m × n 的方格网从左下角 A 到右上角 B，只能向上或向右走，共多少条最短路径？",
      solution: [
        "在每个交点填“左邻 + 下邻”。",
        "最底行与最左列全填 1；逐行往上推。",
        "右上角的数就是答案，等价于组合数 C(m + n, m)。",
      ],
    },
    {
      title: "带禁行点",
      problem: "3 × 3 网格从 A 到 B，中心交点被封禁不能走，多少条最短路径？",
      solution: [
        "中心标 0；其余按“左 + 下”推。",
        "手动推出 A→B 原有 C(6,3) = 20 条；经过中心的 C(4,2)·C(2,1) = 12 条。",
        "答案 20 − 12 = 8，与标数表格上直接读出的结果一致。",
      ],
      takeaway: "标数法与“总方案 − 禁区方案”结果一致，但网格上推起来更直观。",
    },
  ],
  pitfalls: [
    "方向要统一（只向上 / 向右），否则会重复计数。",
    "禁行点记得标 0，不要漏掉。",
  ],
  relatedSlugs: ["recurrence", "additive-multiplicative"],
};

export default entry;
