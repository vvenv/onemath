import type { ProblemData } from "@/types/problem";
import svg2 from "./figures/10059-2.svg?raw";

export default {
  id: "10059",
  title: "算式比较大小·拆项法",
  grade: "四年级",
  module: "计算",
  difficulty: "基础",
  question:
    "不通过计算（不直接算出具体乘积），比较 31 × 29 和 30 × 30 的大小，并说明理由。",
  solutions: [
    {
      key: "split",
      label: "拆项法（平方差思想）",
      steps: [
        "分析：31 与 29 关于 30 对称，可写成 (30 + 1) 与 (30 − 1)，套用平方差 (a + b)(a − b) = a² − b²，把乘积转成 30² 减一个小数。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "31 × 29",
              rhs: "(30 + 1) × (30 − 1)",
              status: "keep",
            },
            {
              lhs: "(30 + 1) × (30 − 1)",
              rhs: "30 × 30 − 1 × 1",
              note: "平方差：(a+b)(a−b) = a² − b²",
              badge: "关键",
            },
            {
              lhs: "31 × 29",
              rhs: "30 × 30 − 1",
              status: "keep",
            },
          ],
          caption: "把 31 × 29 拆成 (30+1)(30−1)",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "31 × 29",
              value: 899,
              max: 900,
              tone: "muted",
            },
            {
              label: "30 × 30",
              value: 900,
              max: 900,
              tone: "primary",
              marker: true,
            },
          ],
          caption: "30 × 30 比 31 × 29 多 1",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🟦",
              count: "31 × 29",
              label: "< 30 × 30",
            },
          ],
          caption: "结论：31 × 29 < 30 × 30（恰好少 1）",
        },
      ],
    },
    {
      key: "area",
      label: "面积法（图示）",
      steps: [
        "分析：把 30 × 30 看作边长 30 的正方形面积，把 31 × 29 看作在它右边加一列（1 × 30）、再从上边去掉一行（31 × 1）后的长方形面积，比较两块面积的增减即可。",
        "增加 1 × 30 = 30，减少 31 × 1 = 31，净变化 −1，所以 31 × 29 比 30 × 30 少 1。",
      ],
      scenes: [
        {
          kind: "svg",
          svg: svg2,
          caption: "右边加一列 30，上方去掉一行 31，净减少 1 → 面积少 1",
        },
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "增加面积",
              rhs: "1 × 30 = 30",
              status: "keep",
            },
            {
              lhs: "减少面积",
              rhs: "31 × 1 = 31",
              status: "keep",
            },
            {
              lhs: "净变化",
              rhs: "30 − 31 = −1",
              badge: "结论",
            },
          ],
          caption: "用面积变化解释 31 × 29 比 30 × 30 少 1",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "📐",
              count: "31 × 29",
              label: "< 30 × 30",
            },
          ],
          caption: "几何直观印证：长方形面积小于正方形面积",
        },
      ],
    },
  ],
  variant: {
    question: "不通过计算，比较 25 × 25 和 24 × 26 的大小。",
    fields: [
      {
        key: "relation",
        type: "text",
        label: "大小关系（在 25 × 25 ○ 24 × 26 中填 >、< 或 =）",
        enum: [">", "<", "="],
      },
    ],
    answer: {
      relation: ">",
    },
    hint: "把 24 × 26 写成 (25 − 1)(25 + 1) = 25 × 25 − 1，所以 25 × 25 比 24 × 26 多 1。",
  },
  knowledgePoints: [
    {
      slug: "difference-of-squares",
      name: "平方差",
      summary: "a² − b² = (a + b)(a − b)：把平方之差立刻改写为一次乘积。",
    },
    {
      slug: "area-method",
      name: "面积法",
      summary: "以面积为“中转货币”：把要求的长度 / 比例问题转化为面积等式。",
    },
  ],
  tags: ["平方差", "面积法"],
} satisfies ProblemData;
