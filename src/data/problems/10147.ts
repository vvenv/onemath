import type { ProblemData } from "@/types/problem";

export default {
  id: "10147",
  title: "摸球放回·条件概率",
  grade: "六年级",
  module: "计数",
  difficulty: "挑战",
  question: "一个袋子里有 3 个红球和 2 个白球。先从中摸出 1 个球，记下颜色后放回袋中，再摸出 1 个球。求两次摸球颜色不同的概率。",
  solutions: [
    {
      key: "classification",
      label: "分类讨论法",
      steps: [
        "分析：两次颜色不同有两种情况，先红后白，或先白后红。",
        "先红后白的概率 = 第一次红球概率 × 第二次白球概率。",
        "先白后红的概率 = 第一次白球概率 × 第二次红球概率。",
        "两次颜色不同的概率 = 两种情况概率之和。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "第一次红球概率", rhs: "3/5", badge: "P₁(红)" },
            { lhs: "第二次白球概率", rhs: "2/5", badge: "P₂(白)" },
            { lhs: "先红后白", rhs: "3/5 × 2/5 = 6/25", badge: "情况1" },
            { lhs: "第一次白球概率", rhs: "2/5", badge: "P₁(白)" },
            { lhs: "第二次红球概率", rhs: "3/5", badge: "P₂(红)" },
            { lhs: "先白后红", rhs: "2/5 × 3/5 = 6/25", badge: "情况2" },
            { lhs: "颜色不同", rhs: "6/25 + 6/25 = 12/25", status: "keep" },
          ],
          caption: "分类讨论：先红后白 + 先白后红",
        },
        {
          kind: "result-badges",
          items: [{ icon: "🔴⚪", count: "12/25", label: "概率" }],
          caption: "两次摸球颜色不同的概率是 12/25",
        },
      ],
    },
    {
      key: "complement",
      label: "对立事件法",
      steps: [
        "分析：颜色不同的对立事件是颜色相同。",
        "颜色相同有两种情况，两次都是红球，或两次都是白球。",
        "先计算颜色相同的概率，再用 1 减去它。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            { lhs: "两次都红", rhs: "3/5 × 3/5 = 9/25", badge: "红红" },
            { lhs: "两次都白", rhs: "2/5 × 2/5 = 4/25", badge: "白白" },
            { lhs: "颜色相同", rhs: "9/25 + 4/25 = 13/25", badge: "对立事件" },
            { lhs: "颜色不同", rhs: "1 − 13/25 = 12/25", status: "keep" },
          ],
          caption: "对立事件法：P(不同) = 1 − P(相同)",
        },
      ],
    },
  ],
  variant: {
    question: "一个盒子里有 4 个蓝球和 1 个黄球。有放回地摸两次球，求两次摸到同色球的概率。",
    fields: [
      {
        key: "probability",
        label: "同色球的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "17/25",
    },
    hint: "同色球有两种情况：两次都蓝，或两次都黄。分别计算后相加。",
  },
  knowledgePoints: [
    {
      slug: "conditional-probability",
      name: "条件概率",
    },
  ],
  tags: ["条件概率", "对立事件"],
} satisfies ProblemData;
