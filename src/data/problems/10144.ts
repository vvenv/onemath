import type { ProblemData } from "@/types/problem";

export default {
  id: "10144",
  title: "摸球概率·古典概型",
  grade: "六年级",
  difficulty: "基础",
  module: "计数",
  question:
    "一个不透明的袋子里装有 5 个红球和 3 个白球，这些球除颜色外完全相同。从袋子里任意摸出 1 个球，\n\n求摸到红球的概率是多少？",
  solutions: [
    {
      key: "classical",
      label: "古典概型",
      steps: [
        {
          text: "分析：所有可能的摸球结果数 = 红球数 + 白球数。",
        },
        {
          text: "有利结果数（摸到红球）= 红球数。",
        },
        {
          text: "概率 = 有利结果数 ÷ 所有可能结果数。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "总结果数 (总数)", rhs: "5 + 3 = 8" },
                { lhs: "有利结果数 (红球)", rhs: "5" },
                { lhs: "概率", rhs: "5 ÷ 8 = 5/8", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一个盒子里有 4 个蓝球和 6 个黄球，从中任意摸出 1 个球，求摸到蓝球的概率。",
    fields: [
      {
        key: "probability",
        label: "摸到蓝球的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "2/5",
    },
    hint: "用蓝球数量除以总球数。",
  },
  tags: ["古典概型"],
} satisfies ProblemData;
