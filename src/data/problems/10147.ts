import type { ProblemData } from "@/types/problem";

export default {
  id: "10147",
  title: "摸球放回·条件概率",
  grade: "六年级",
  difficulty: "挑战",
  module: "计数",
  question:
    "一个袋子里有 3 个红球和 2 个白球。先从中摸出 1 个球，记下颜色后放回袋中，再摸出 1 个球。\n求两次摸球颜色不同的概率。",
  solutions: [
    {
      key: "classification",
      label: "分类讨论法",
      steps: [
        {
          text: "分析：两次颜色不同有两种情况，先红后白，或先白后红。",
        },
        {
          text: "先红后白的概率 = 第一次红球概率 × 第二次白球概率。",
        },
        {
          text: "先白后红的概率 = 第一次白球概率 × 第二次红球概率。",
        },
        {
          text: "两次颜色不同的概率 = 两种情况概率之和。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "第一次红球概率 (P₁(红))", rhs: "3/5" },
                { lhs: "第二次白球概率 (P₂(白))", rhs: "2/5" },
                { lhs: "先红后白 (情况1)", rhs: "3/5 × 2/5 = 6/25" },
                { lhs: "第一次白球概率 (P₁(白))", rhs: "2/5" },
                { lhs: "第二次红球概率 (P₂(红))", rhs: "3/5" },
                { lhs: "先白后红 (情况2)", rhs: "2/5 × 3/5 = 6/25" },
                { lhs: "颜色不同", rhs: "6/25 + 6/25 = 12/25", status: "keep" },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "🔴⚪", count: "12/25", label: "概率" }],

            },
          ],
        },
      ],
    },
    {
      key: "complement",
      label: "对立事件法",
      steps: [
        {
          text: "分析：颜色不同的对立事件是颜色相同。",
        },
        {
          text: "颜色相同有两种情况，两次都是红球，或两次都是白球。",
        },
        {
          text: "先计算颜色相同的概率，再用 1 减去它。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "两次都红 (红红)", rhs: "3/5 × 3/5 = 9/25" },
                { lhs: "两次都白 (白白)", rhs: "2/5 × 2/5 = 4/25" },
                { lhs: "颜色相同 (对立事件)", rhs: "9/25 + 4/25 = 13/25" },
                { lhs: "颜色不同", rhs: "1 − 13/25 = 12/25", status: "keep" },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个盒子里有 4 个蓝球和 1 个黄球。有放回地摸两次球，求两次摸到同色球的概率。",
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
  tags: ["条件概率", "对立事件"],
} satisfies ProblemData;
