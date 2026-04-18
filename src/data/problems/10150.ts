import type { ProblemData } from "@/types/problem";

export default {
  id: "10150",
  title: "排座位·排列概率",
  grade: "六年级",
  difficulty: "挑战",
  module: "计数",
  question: "4 名同学 A、B、C、D 随机排成一排照相。求 A 和 B 两人相邻的概率。",
  solutions: [
    {
      key: "bundle",
      label: "捆绑法",
      steps: [
        {
          text: "分析：先计算所有可能的排列数，再计算 A 和 B 相邻的排列数。",
        },
        {
          text: "总排列数 = 4 人全排列。",
        },
        {
          text: "A 和 B 相邻：把 A 和 B 捆在一起看作一个整体，与其他 2 人排列，再考虑 A、B 内部顺序。",
        },
        {
          text: "概率 = 相邻排列数 ÷ 总排列数。",
          scenes: [
            {"kind":"equation-list","rows":[{"lhs":"总排列数 (总数)","rhs":"A(4,4) = 4! = 24"},{"lhs":"捆绑后排列数 (相邻)","rhs":"3! × 2 = 12"},{"lhs":"A 和 B 相邻概率","rhs":"12/24 = 1/2","status":"keep"}]},
            {"kind":"result-badges","items":[{"icon":"👫","count":"1/2","label":"概率"}]},
          ],
        },
      ],
    },
    {
      key: "position",
      label: "位置分析法",
      steps: [
        {
          text: "分析：固定 A 的位置，考虑 B 可能的位置。",
        },
        {
          text: "A 可以在 4 个位置中的任意一个。",
        },
        {
          text: "对于每个 A 的位置，B 有 2 个相邻位置和 1 个不相邻位置。",
        },
        {
          text: "计算 B 在相邻位置的概率。",
          scenes: [
            {"kind":"equation-list","rows":[{"lhs":"A 在两端 (端点)","rhs":"2 种情况，B 有 1 个相邻位置"},{"lhs":"A 在中间 (中间)","rhs":"2 种情况，B 有 2 个相邻位置"},{"lhs":"B 相邻位置总数 (有利)","rhs":"2×1 + 2×2 = 6"},{"lhs":"B 可能位置总数 (总数)","rhs":"3（除去 A 的位置）"},{"lhs":"相邻概率","rhs":"6/12 = 1/2","status":"keep"}]},
          ],
        },
      ],
    },
  ],
  variant: {
    question: "5 名同学随机排成一排，求其中指定的 2 人相邻的概率。",
    fields: [
      {
        key: "probability",
        label: "两人相邻的概率",
        type: "text",
      },
    ],
    answer: {
      probability: "1/2",
    },
    hint: "总排列数是 5! = 120。把指定的 2 人捆在一起，看作 4 个整体排列，内部 2! 种顺序，相邻排列数是 4! × 2 = 48。概率是 48/120 = 2/5。",
  },
  tags: [
    "排列",
    "捆绑法",
    "排列概率",
  ],
} satisfies ProblemData;