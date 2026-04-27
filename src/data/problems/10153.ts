import type { ProblemData } from "@/types/problem";

export default {
  id: "10153",
  title: "工程问题·合作效率",
  grade: "五年级",
  module: "应用题",
  difficulty: "进阶",
  question:
    "一项工程，甲单独做需要12天完成，乙单独做需要6天完成。如果两人合作，多少天可以完成这项工程？",
  solutions: [
    {
      key: "unit_rate",
      label: "归一法（工作效率）",
      steps: [
        "分析：把工程总量看作单位1，甲每天完成1/12，乙每天完成1/6。",
        "两人合作每天完成1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4。",
        "合作需要的天数 = 1 ÷ (1/4) = 4天。",
      ],
      scenes: [
        {
          kind: "result-badges",
          items: [
            {
              icon: "👷",
              count: "1/12",
              label: "甲每天效率",
            },
            {
              icon: "👷‍♀️",
              count: "1/6",
              label: "乙每天效率",
            },
          ],
          caption: "甲每天完成工程的1/12，乙每天完成1/6",
        },
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "甲效率",
              rhs: "1/12",
            },
            {
              lhs: "乙效率",
              rhs: "1/6",
            },
            {
              lhs: "合作效率",
              rhs: "1/12 + 1/6 = 1/4",
              status: "keep",
            },
            {
              lhs: "合作天数",
              rhs: "1 ÷ (1/4) = 4",
              badge: "结论",
              status: "keep",
            },
          ],
          caption: "用工作效率计算",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "📅",
              count: 4,
              label: "合作天数",
            },
          ],
          caption: "4天完成",
        },
      ],
    },
    {
      key: "total_work",
      label: "总量法（设具体数值）",
      steps: [
        "分析：设工程总量为12和6的公倍数，便于计算。最小公倍数是12。",
        "甲每天完成12 ÷ 12 = 1份，乙每天完成12 ÷ 6 = 2份。",
        "两人合作每天完成1 + 2 = 3份，需要12 ÷ 3 = 4天。",
      ],
      scenes: [
        {
          kind: "result-badges",
          items: [
            {
              icon: "🏗️",
              count: 12,
              label: "工程总量（份）",
            },
          ],
          caption: "设工程总量为12（12和6的最小公倍数）",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "甲每天",
              value: 1,
              max: 3,
              tone: "primary",
            },
            {
              label: "乙每天",
              value: 2,
              max: 3,
              tone: "muted",
            },
            {
              label: "合作每天",
              value: 3,
              max: 3,
              tone: "primary",
              marker: true,
            },
          ],
          caption: "甲每天1份，乙每天2份，合作每天3份",
        },
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "甲效率",
              rhs: "12 ÷ 12 = 1（份/天）",
            },
            {
              lhs: "乙效率",
              rhs: "12 ÷ 6 = 2（份/天）",
            },
            {
              lhs: "合作效率",
              rhs: "1 + 2 = 3（份/天）",
              status: "keep",
            },
            {
              lhs: "合作天数",
              rhs: "12 ÷ 3 = 4（天）",
              badge: "结论",
              status: "keep",
            },
          ],
          caption: "用具体份数计算",
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
  knowledgePoints: [
    {
      slug: "reciprocal-method",
      name: "倒数法",
      summary: "比较真分数大小或处理“工作效率/速度”问题时，把分数倒过来：a < b ⇔ 1/a > 1/b（同号）。",
    },
  ],
  tags: ["倒数法"],
} satisfies ProblemData;
