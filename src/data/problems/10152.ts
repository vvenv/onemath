import type { ProblemData } from "@/types/problem";

export default {
  id: "10152",
  title: "年龄问题·倍数变化",
  grade: "四年级",
  module: "应用题",
  difficulty: "基础",
  question:
    "今年父亲的年龄是儿子的4倍。20年后，父亲的年龄将是儿子的2倍。\n问今年父亲和儿子各多少岁？",
  solutions: [
    {
      key: "difference_constant",
      label: "年龄差不变法",
      steps: [
        {
          text: "分析：年龄问题的核心是「年龄差永远不变」。设今年儿子 x 岁，则父亲 4x 岁，年龄差为 3x 岁。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "今年父亲",
                  value: 4,
                  max: 4,
                  tone: "primary",
                },
                {
                  label: "今年儿子",
                  value: 1,
                  max: 4,
                  tone: "muted",
                  marker: true,
                },
              ],

            },
          ],
        },
        {
          text: "20 年后，儿子 x+20 岁，父亲 4x+20 岁。此时父亲是儿子的 2 倍：4x+20 = 2(x+20)。",
          scenes: [
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "20年后父亲",
                  value: 2,
                  max: 2,
                  tone: "primary",
                },
                {
                  label: "20年后儿子",
                  value: 1,
                  max: 2,
                  tone: "muted",
                  marker: true,
                },
              ],

            },
          ],
        },
        {
          text: "列方程求解：设儿子今年 x 岁，建立倍数关系方程并求解。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "设儿子今年 (设)",
                  rhs: "x 岁",
                },
                {
                  lhs: "父亲今年 (倍)",
                  rhs: "4x 岁",
                },
                {
                  lhs: "20年后儿子",
                  rhs: "x + 20 岁",
                },
                {
                  lhs: "20年后父亲",
                  rhs: "4x + 20 岁",
                },
                {
                  lhs: "4x + 20 (20年后倍数关系)",
                  rhs: "2(x + 20)",
                  status: "keep",
                },
                {
                  lhs: "解得 (结论)",
                  rhs: "x = 10",
                  status: "keep",
                },
              ],

            },
          ],
        },
        {
          text: "今年儿子10岁，父亲40岁。",
          scenes: [],
        },
      ],
    },
    {
      key: "ratio_method",
      label: "比例变化法",
      steps: [
        {
          text: "分析：今年父子年龄比4:1，20年后变成2:1。年龄差不变，用年龄差作为桥梁。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "今年年龄比 (父亲 : 儿子)",
                  rhs: "4 : 1",
                },
                {
                  lhs: "年龄差占比 (占儿子的3倍)",
                  rhs: "3 份",
                },
                {
                  lhs: "20年后年龄比 (父亲 : 儿子)",
                  rhs: "2 : 1",
                },
                {
                  lhs: "年龄差占比 (占儿子的1倍)",
                  rhs: "1 份",
                },
                {
                  lhs: "年龄差不变 (20年后儿子是今年的3倍)",
                  rhs: "3份 = 1份 × 3",
                },
                {
                  lhs: "3x − x (20年增长)",
                  rhs: "20",
                  status: "keep",
                },
                {
                  lhs: "解得 (结论)",
                  rhs: "x = 10",
                  status: "keep",
                },
              ],

            },
          ],
        },
        {
          text: "今年年龄差占儿子的3份（4-1），20年后年龄差占儿子的1份（2-1）。",
        },
        {
          text: "年龄差不变，说明20年后儿子的年龄是今年的3倍（因为1份对应3份）。",
        },
        {
          text: "20 年间儿子从 x 岁长到 3x 岁，增长了 2x 岁 = 20 年，所以 x = 10，儿子今年 10 岁，父亲 40 岁。",
        },
      ],
    },
  ],
  variant: {
    question:
      "今年妈妈的年龄是女儿的5倍。16年后，妈妈的年龄将是女儿的3倍。问今年妈妈和女儿各多少岁？",
    fields: [
      {
        key: "mother_age",
        label: "妈妈年龄",
      },
      {
        key: "daughter_age",
        label: "女儿年龄",
      },
    ],
    answer: {
      mother_age: 40,
      daughter_age: 8,
    },
    hint: "年龄差永远不变，设女儿 x 岁，列方程求解。",
  },
  tags: ["不变量", "方程法"],
} satisfies ProblemData;
