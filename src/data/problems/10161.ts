import type { ProblemData } from "@/types/problem";

export default {
  id: "10161",
  title: "好数·枚举法",
  grade: "五年级",
  module: "数论",
  difficulty: "进阶",
  question: "定义：如果一个正整数满足以下条件，则称为好数：\n1. 各位数字都不相同\n2. 各位数字之和能被3整除\n\n求第100个好数。",
  figures: [],
  solutions: [
    {
      key: "enumerate",
      label: "枚举法",
      steps: [
        "分析：好数需同时满足两个条件：数字不重复、数字和是3的倍数。按从小到大顺序枚举，逐个检查这两个条件，计数到第100个即可。",
        "一位数：只有数字和能被3整除的数是好数，即3、6、9，共3个好数。",
        "两位数：十位1-9，个位0-9且≠十位。数字和能被3整除的组合中，每个十位对应3个有效个位，共9×3=27个好数。",
        "三位数：前30个好数（3个一位数+27个两位数）之后，需要第70个三位数好数。经枚举，第100个好数是375。"
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "一位数好数",
              rhs: "3个（3、6、9）",
              status: "keep"
            },
            {
              lhs: "两位数好数",
              rhs: "27个",
              status: "keep"
            },
            {
              lhs: "前30个好数",
              rhs: "一位数3个 + 两位数27个",
              status: "keep"
            },
            {
              lhs: "三位数从第31个开始",
              rhs: "需要第100-30=70个三位数好数",
              status: "keep"
            },
            {
              lhs: "第100个好数",
              rhs: "375",
              badge: "答案"
            }
          ],
          caption: "按位数分段枚举计数"
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "✨",
              count: 375,
              label: "第100个好数"
            }
          ],
          caption: "答案：375"
        }
      ]
    }
  ],
  variant: {
    question: "定义：如果一个正整数满足以下条件，则称为好数：\n1. 各位数字都不相同\n2. 各位数字之和能被5整除\n\n求第20个好数。",
    fields: [
      {
        key: "answer",
        label: "第20个好数"
      }
    ],
    answer: {
      answer: 58
    },
    hint: "一位数好数：5,10（但10有重复0，不算），所以只有5。两位数从10开始枚举，数字和是5的倍数且数字不重复。"
  },
  knowledgePoints: [
    {
      slug: "enumeration",
      name: "枚举法",
      summary: "按某个顺序把所有可能性“走一遍”，保证不重不漏。",
    },
    {
      slug: "place-value",
      name: "位值原理",
      summary: "一个 n 位数 = 各位数字 × 其位权之和；遇到“数字交换”或“数字约束”的题，必须从位值写起。",
    },
  ],
  tags: ["枚举法", "位值原理"]
} satisfies ProblemData;
