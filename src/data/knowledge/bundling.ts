import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "bundling",
  name: "捆绑法",
  tag: "捆绑法",
  category: "counting",
  summary: "必须相邻的对象先捆成一捆，再与其它人一起排，内部再做排列。",
  intuition:
    "题目要求“甲乙必须相邻”——那就用一根橡皮筋把他俩捆在一起，视为“一个人”，等排好之后再解开，让橡皮筋里的甲乙自己换位置。",
  derivation: [
    "把必须相邻的 k 个对象看作一个整体，与其余 n − k 个对象一起排列，共 (n − k + 1)! 种。",
    "这个整体内部还能相互换位置，贡献 k! 种。",
    "答案 = (n − k + 1)! × k!。",
  ],
  keyPoints: ["相邻 → 捆绑。", "别忘了内部还要乘 k!。"],
  examples: [
    {
      title: "必须相邻",
      problem: "5 个人排成一排，甲乙必须相邻。共有多少种排法？",
      solution: [
        "把甲乙捆为一个“合体”，与其余 3 人共 4 个对象排列：4! = 24。",
        "甲乙内部有 2! = 2 种顺序。",
        "共 24 × 2 = 48 种。",
      ],
    },
  ],
  pitfalls: ["多于两个人相邻时，捆内排列是 k! 不是 2。"],
  relatedSlugs: ["gap-insertion", "additive-multiplicative"],
};

export default entry;
