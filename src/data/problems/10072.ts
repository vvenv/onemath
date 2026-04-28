import type { ProblemData } from "@/types/problem";

export default {
  id: "10072",
  title: "过桥问题·四人夜渡",
  grade: "五年级",
  module: "杂题",
  difficulty: "进阶",
  question:
    "夜里，甲、乙、丙、丁 4 人要过一座独木桥。他们只有一只手电筒，过桥必须有手电筒照明；桥最多同时承受 2 人。两人同行时，速度要按较慢的那人算。甲、乙、丙、丁单独过桥各需 1、2、5、10 分钟。全部 4 人都过到对岸，至少需要多少分钟？",
  solutions: [
    {
      key: "pairSlow",
      label: "快人回灯·慢人结伴",
      steps: [
        "慢人结伴：甲乙过(2)→甲回(1)→丙丁过(10)→乙回(2)→甲乙过(2)，合计 2+1+10+2+2=17 分钟。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "甲乙过桥",
              rhs: "2",
            },
            {
              lhs: "甲回",
              rhs: "1",
            },
            {
              lhs: "丙丁过桥",
              rhs: "10",
            },
            {
              lhs: "乙回",
              rhs: "2",
            },
            {
              lhs: "甲乙过桥",
              rhs: "2",
            },
            {
              lhs: "合计 (最短)",
              rhs: "2 + 1 + 10 + 2 + 2 = 17",
              status: "keep",
            },
          ],
          caption: "慢的两人结伴，快的两人送灯",
        },
      ],
    },
    {
      key: "compare",
      label: "对比：快人带慢人方案",
      steps: [
        "快人带慢人：10+1+5+1+2=19 分钟；慢人结伴：17 分钟（更优，省下丙的单独5分钟）。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "快人带慢人方案",
              rhs: "10 + 1 + 5 + 1 + 2 = 19",
              status: "cancel",
            },
            {
              lhs: "慢人结伴方案 (更优)",
              rhs: "2 + 1 + 10 + 2 + 2 = 17",
              status: "keep",
            },
          ],
          caption: "对比两种策略",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🌉",
              count: 17,
              label: "分钟",
            },
          ],
          caption: "最短过桥总时间",
        },
      ],
    },
  ],
  variant: {
    question:
      "同样的规则，4 人单独过桥分别需 1、2、6、8 分钟。全部过到对岸最少用多少分钟？",
    fields: [
      {
        key: "answer",
        label: "最少分钟数",
        type: "number",
      },
    ],
    answer: {
      answer: 15,
    },
    hint: "仍用“慢人结伴”：1+2 过→1 回→6+8 过→2 回→1+2 过 = 2+1+8+2+2 = 15。",
  },
  tags: ["时间统筹"],
} satisfies ProblemData;
