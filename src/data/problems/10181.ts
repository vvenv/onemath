import type { ProblemData } from "@/types/problem";

export default {
  id: "10181",
  title: "概率初步·古典概型",
  grade: "六年级",
  module: "计数",
  difficulty: "基础",
  question: "掷一枚均匀的骰子，求掷出点数大于 4 的概率。",
  solutions: [
    {
      key: "classical",
      label: "古典概型法",
      steps: ["骰子有 6 个面，点数大于 4 的是 5 和 6，概率 = 2 ÷ 6 = 1/3。"],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "总事件数",
              rhs: "6",
              status: "keep",
            },
            {
              lhs: "有利事件数",
              rhs: "2（5、6）",
              status: "keep",
            },
            {
              lhs: "概率",
              rhs: "2 ÷ 6 = 1/3",
              status: "keep",
            },
          ],
          caption: "古典概型计算",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "总事件",
              value: 6,
              max: 6,
              tone: "muted",
            },
            {
              label: "有利事件",
              value: 2,
              max: 6,
              tone: "primary",
            },
          ],
          caption: "事件数比较",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🎲",
              count: "1/3",
              label: "概率",
            },
          ],
          caption: "掷出点数大于 4 的概率是 1/3",
        },
      ],
    },
    {
      key: "enumeration",
      label: "枚举法",
      steps: [
        "所有可能结果为 1、2、3、4、5、6，满足条件的结果为 5、6，概率 = 2 ÷ 6 = 1/3。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "所有结果",
              rhs: "1, 2, 3, 4, 5, 6",
            },
            {
              lhs: "满足条件",
              rhs: "5, 6",
            },
            {
              lhs: "概率",
              rhs: "2/6 = 1/3",
              status: "keep",
            },
          ],
          caption: "枚举所有结果",
        },
      ],
    },
  ],
  variant: {
    question: "从一副去掉大小王的扑克牌中随机抽取一张，求抽到红桃的概率。",
    fields: [
      {
        key: "probability",
        label: "概率（分数）",
        type: "text",
      },
    ],
    answer: {
      probability: "1/4",
    },
    hint: "一副扑克牌有 52 张，其中红桃有 13 张。",
  },
  knowledgePoints: [
    {
      slug: "classical-probability",
      name: "古典概型",
      summary: "所有基本结果机会均等且数量有限时，事件 A 的概率 = A 包含的结果数 ÷ 总结果数。",
    },
  ],
  tags: ["古典概型"],
} satisfies ProblemData;
