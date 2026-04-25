import type { ProblemData } from "@/types/problem";

export default {
  id: "10152",
  title: "年龄问题·倍数变化",
  grade: "四年级",
  module: "应用题",
  difficulty: "基础",
  question: "今年父亲的年龄是儿子的4倍。20年后，父亲的年龄将是儿子的2倍。问今年父亲和儿子各多少岁？",
  solutions: [
    {
      key: "difference_constant",
      label: "年龄差不变法",
      steps: [
        "分析：年龄问题的核心是「年龄差永远不变」。设今年儿子x岁，则父亲4x岁，年龄差为3x岁。",
        "20年后，儿子x+20岁，父亲4x+20岁。此时父亲是儿子的2倍：4x+20 = 2(x+20)。",
        "解方程：4x+20 = 2x+40，得2x = 20，x = 10。",
        "今年儿子10岁，父亲40岁。"
      ],
      scenes: [
        {
          kind: "compare-bars",
          rows: [
            {
              label: "今年父亲",
              value: 4,
              max: 4,
              tone: "primary"
            },
            {
              label: "今年儿子",
              value: 1,
              max: 4,
              tone: "muted",
              marker: true
            }
          ],
          caption: "今年父亲年龄是儿子的4倍"
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "20年后父亲",
              value: 2,
              max: 2,
              tone: "primary"
            },
            {
              label: "20年后儿子",
              value: 1,
              max: 2,
              tone: "muted",
              marker: true
            }
          ],
          caption: "20年后父亲年龄是儿子的2倍"
        },
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "设儿子今年",
              rhs: "x 岁",
              badge: "设"
            },
            {
              lhs: "父亲今年",
              rhs: "4x 岁",
              badge: "倍"
            },
            {
              lhs: "20年后儿子",
              rhs: "x + 20 岁"
            },
            {
              lhs: "20年后父亲",
              rhs: "4x + 20 岁"
            },
            {
              lhs: "4x + 20",
              rhs: "2(x + 20)",
              note: "20年后倍数关系",
              status: "keep"
            },
            {
              lhs: "解得",
              rhs: "x = 10",
              badge: "结论",
              status: "keep"
            }
          ],
          caption: "列方程求解"
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "👨",
              count: 40,
              label: "父亲年龄"
            },
            {
              icon: "👦",
              count: 10,
              label: "儿子年龄"
            }
          ],
          caption: "今年父亲40岁，儿子10岁"
        }
      ]
    },
    {
      key: "ratio_method",
      label: "比例变化法",
      steps: [
        "分析：今年父子年龄比4:1，20年后变成2:1。年龄差不变，用年龄差作为桥梁。",
        "今年年龄差占儿子的3份（4-1），20年后年龄差占儿子的1份（2-1）。",
        "年龄差不变，说明20年后儿子的年龄是今年的3倍（因为1份对应3份）。",
        "20年间儿子从x岁长到3x岁，增长了2x岁 = 20年，所以x = 10，儿子今年10岁，父亲40岁。"
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "今年年龄比",
              rhs: "4 : 1",
              note: "父亲 : 儿子"
            },
            {
              lhs: "年龄差占比",
              rhs: "3 份",
              note: "占儿子的3倍"
            },
            {
              lhs: "20年后年龄比",
              rhs: "2 : 1",
              note: "父亲 : 儿子"
            },
            {
              lhs: "年龄差占比",
              rhs: "1 份",
              note: "占儿子的1倍"
            },
            {
              lhs: "年龄差不变",
              rhs: "3份 = 1份 × 3",
              note: "20年后儿子是今年的3倍"
            },
            {
              lhs: "3x − x",
              rhs: "20",
              note: "20年增长",
              status: "keep"
            },
            {
              lhs: "解得",
              rhs: "x = 10",
              badge: "结论",
              status: "keep"
            }
          ],
          caption: "用年龄差不变分析比例变化"
        }
      ]
    }
  ],
  variant: {
    question: "今年妈妈的年龄是女儿的5倍。16年后，妈妈的年龄将是女儿的3倍。问今年妈妈和女儿各多少岁？",
    fields: [
      {
        key: "mother_age",
        label: "妈妈年龄"
      },
      {
        key: "daughter_age",
        label: "女儿年龄"
      }
    ],
    answer: {
      mother_age: 40,
      daughter_age: 8
    },
    hint: "年龄差永远不变，设女儿x岁，列方程求解。"
  },
  tags: [
    "年龄差不变",
    "方程法"
  ]
} satisfies ProblemData;
