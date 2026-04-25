import type { ProblemData } from "@/types/problem";

export default {
  id: "10148",
  title: "摸球不放回·概率变化",
  grade: "六年级",
  module: "计数",
  difficulty: "进阶",
  question: "一个袋子里有 4 个红球和 3 个白球。从中摸出 1 个球后不放回，再摸出 1 个球。求两次都摸到红球的概率。",
  solutions: [
    {
      key: "stepwise",
      label: "分步计算法",
      steps: [
        "分析：第一次摸球后不放回，袋中球数减少，第二次概率会变化。",
        "第一次摸到红球的概率 = 红球数 ÷ 总球数。",
        "第一次摸出红球后，袋中剩下 3 个红球和 3 个白球。",
        "第二次摸到红球的概率 = 剩余红球数 ÷ 剩余总球数。",
        "两次都红球的概率 = 第一次概率 × 第二次概率。",
      ],
      scenes: [
        {
          kind: "result-badges",
          items: [
            { icon: "🔴", count: 4 },
            { icon: "⚪", count: 3 },
          ],
          caption: "初始：4 个红球，3 个白球",
        },
        {
          kind: "equation-list",
          rows: [
            { lhs: "第一次红球概率", rhs: "4/7", badge: "P₁" },
            { lhs: "第二次红球概率", rhs: "3/6 = 1/2", badge: "P₂" },
            { lhs: "两次都红球", rhs: "4/7 × 1/2 = 2/7", status: "keep" },
          ],
          caption: "分步计算：注意第二次概率因不放回而变化",
        },
        {
          kind: "result-badges",
          items: [{ icon: "🔴🔴", count: "2/7", label: "概率" }],
          caption: "两次都摸到红球的概率是 2/7",
        },
      ],
    },
    {
      key: "combination",
      label: "组合数法",
      steps: [
        "分析：从 7 个球中选 2 个球的所有组合数。",
        "有利结果是选出的 2 个球都是红球。",
        "用组合数计算概率。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "总组合数", rhs: "C(7,2) = 21", badge: "总数" },
            { lhs: "有利组合数", rhs: "C(4,2) = 6", badge: "红红" },
            { lhs: "概率", rhs: "6/21 = 2/7", status: "keep" },
          ],
          caption: "组合数法：C(4,2) ÷ C(7,2)",
        },
      ],
    },
  ],
  variant: {
    question: "一个盒子里有 5 个蓝球和 2 个黄球。不放回地摸两次球，求两次摸到同色球的概率。",
    fields: [
      {
        key: "probability",
        label: "同色球的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "11/21",
    },
    hint: "同色球有两种情况：两次都蓝，或两次都黄。分别计算后相加。",
  },
  knowledgePoints: [
    {
      slug: "without-replacement",
      name: "不放回抽样",
    },
  ],
  tags: ["条件概率"],
} satisfies ProblemData;
