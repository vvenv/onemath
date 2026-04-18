import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "fixed-reference",
  name: "固定参照物法",
  tag: "固定参照物法",
  category: "counting",
  summary:
    "环排 / 相对位置题里，固定其中一个对象消除“整体旋转”的重复计数，再把其余对象正常排列。",
  intuition:
    "n 个人围圆桌坐，谁坐在哪个椅子并不重要，关键是“谁在谁的左右”。把其中一人“钉”在固定位置，整圈的旋转重复自然消失，剩下 n − 1 人线性排即可。",
  derivation: [
    "n 个对象做环形排列，整体旋转视为同一种，共有 n! / n = (n − 1)! 种。",
    "做法：任选一人固定位置，其余 n − 1 人做直线排列 (n − 1)!。",
    "若圆桌“翻转后”也视为同一种（如项链），再除以 2。",
  ],
  keyPoints: [
    "环排方案 = (n − 1)!。",
    "项链 / 手链这类双面等价的环，再除 2。",
  ],
  examples: [
    {
      title: "圆桌",
      problem: "5 人围圆桌而坐，多少种不同坐法？",
      solution: ["固定一人，其余 4 人排：4! = 24。"],
    },
    {
      title: "环形相邻",
      problem: "5 人围圆桌，甲乙必须相邻，多少种？",
      solution: [
        "把甲乙先捆在一起视为一个“合体”，相当于 4 个对象做环排：(4 − 1)! = 6。",
        "甲乙内部 2! = 2。",
        "共 6 × 2 = 12。",
      ],
      takeaway: "“固定参照物”与“捆绑法”在环排里常常连用。",
    },
  ],
  pitfalls: [
    "区分“环形”和“直线”：环比直线少 n 倍的重复。",
    "别忘了项链类问题可能还要再除以 2。",
  ],
  relatedSlugs: ["bundling", "gap-insertion", "additive-multiplicative"],
};

export default entry;
