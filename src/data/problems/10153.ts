import type { ProblemData } from "@/types/problem";

export default {
  id: "10153",
  title: "工程问题·合作效率",
  grade: "五年级",
  difficulty: "进阶",
  module: "应用题",
  question:
    "一项工程，甲单独做需要12天完成，乙单独做需要6天完成。\n如果两人合作，多少天可以完成这项工程？",
  solutions: [
    {
      key: "unit_rate",
      label: "归一法（工作效率）",
      steps: [
        {
          text: "分析：把工程总量看作单位1，甲每天完成1/12，乙每天完成1/6。",
        },
        {
          text: "两人合作每天完成1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4。",
        },
        {
          text: "合作需要的天数 = 1 ÷ (1/4) = 4天。",
          scenes: [
            {
              kind: "result-badges",
              items: [
                { icon: "👷", count: "1/12", label: "甲每天效率" },
                { icon: "👷‍♀️", count: "1/6", label: "乙每天效率" },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "甲效率", rhs: "1/12" },
                { lhs: "乙效率", rhs: "1/6" },
                { lhs: "合作效率", rhs: "1/12 + 1/6 = 1/4", status: "keep" },
                {
                  lhs: "合作天数 (结论)",
                  rhs: "1 ÷ (1/4) = 4",
                  status: "keep",
                },
              ],

            },
            {
              kind: "result-badges",
              items: [{ icon: "📅", count: 4, label: "合作天数" }],

            },
          ],
        },
      ],
    },
    {
      key: "total_work",
      label: "总量法（设具体数值）",
      steps: [
        {
          text: "分析：设工程总量为12和6的公倍数，便于计算。最小公倍数是12。",
        },
        {
          text: "甲每天完成12 ÷ 12 = 1份，乙每天完成12 ÷ 6 = 2份。",
        },
        {
          text: "两人合作每天完成1 + 2 = 3份，需要12 ÷ 3 = 4天。",
          scenes: [
            {
              kind: "result-badges",
              items: [{ icon: "🏗️", count: 12, label: "工程总量（份）" }],

            },
            {
              kind: "compare-bars",
              rows: [
                { label: "甲每天", value: 1, max: 3, tone: "primary" },
                { label: "乙每天", value: 2, max: 3, tone: "muted" },
                {
                  label: "合作每天",
                  value: 3,
                  max: 3,
                  tone: "primary",
                  marker: true,
                },
              ],

            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "甲效率", rhs: "12 ÷ 12 = 1（份/天）" },
                { lhs: "乙效率", rhs: "12 ÷ 6 = 2（份/天）" },
                { lhs: "合作效率", rhs: "1 + 2 = 3（份/天）", status: "keep" },
                {
                  lhs: "合作天数 (结论)",
                  rhs: "12 ÷ 3 = 4（天）",
                  status: "keep",
                },
              ],

            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "一项工程，甲队单独做需要15天完成，乙队单独做需要10天完成。如果两队合作，多少天可以完成这项工程？",
    fields: [
      {
        key: "days",
        label: "合作天数",
      },
    ],
    answer: {
      days: 6,
    },
    hint: "设工程总量为30（15和10的最小公倍数），甲每天2份，乙每天3份，合作每天5份，30÷5=6天。",
  },
  tags: ["倒数法"],
} satisfies ProblemData;
