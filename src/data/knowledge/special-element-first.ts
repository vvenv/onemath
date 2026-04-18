import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "special-element-first",
  name: "特殊元素优先法",
  tag: "特殊元素优先法",
  category: "counting",
  summary:
    "题目里带特殊条件的元素（有位置限制的人、有特殊要求的数字）先安排，剩下的再按普通方式排列。",
  intuition:
    "排队时如果“老师必须站中间”，不如先把老师放好，其他同学随意排。先处理约束最强的对象，剩下的自由度就不会再被牵扯。",
  derivation: [
    "识别题目里受约束最强的元素（位置固定、只能在某几位、必须与谁相邻等）。",
    "先把这些元素放到允许的位置上，数它们的方案数。",
    "剩下位置和剩下元素之间按普通乘法 / 排列组合处理。",
    "总方案 = 特殊部分 × 剩余部分。",
  ],
  keyPoints: [
    "“先难后易”——约束多的先安排。",
    "常与捆绑法 / 插空法串联使用。",
  ],
  examples: [
    {
      title: "限定位置",
      problem: "5 个人排成一排，甲必须站在正中间。多少种排法？",
      solution: [
        "甲先放：中间 1 种。",
        "其余 4 人任意排 4 位置：4! = 24。",
        "总 1 × 24 = 24。",
      ],
    },
    {
      title: "首位限制",
      problem: "用 0, 1, 2, 3, 4 组成不同的三位数，首位不能是 0，多少个？",
      solution: [
        "首位先选：0 除外共 4 种。",
        "剩下两位从剩 4 个数字中排：A(4, 2) = 12。",
        "4 × 12 = 48。",
      ],
      takeaway: "首位 = 最特殊元素，必须最先定。",
    },
  ],
  pitfalls: ["特殊元素之间还可能互相影响，先放时要一并讨论互斥情形。"],
  relatedSlugs: ["additive-multiplicative", "bundling", "gap-insertion"],
};

export default entry;
