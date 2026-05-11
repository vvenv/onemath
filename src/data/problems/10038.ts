import type { ProblemData } from "@/types/problem";
export default {
  id: "10038",
  title: "几何计数·数线段",
  grade: "三年级",
  difficulty: "基础",
  module: "计数",
  question: "一条直线上有 A、B、C、D、E 共 5 个点。请问：图中共有多少条线段？",
  solutions: [
    {
      key: "combination-counting",
      label: "组合计数法",
      steps: [
        {
          text: "分析：线段由两个端点确定，从5个点中任选2个即可组成一条线段。",
        },
        {
          text: "用组合公式计算：C(5,2) = 5×4÷2 = 10。",
          scenes: [
            {
              kind: "number-grid",
              rows: 1,
              cols: 5,
              cells: [
                { row: 0, col: 0, value: "A", tone: "primary" },
                { row: 0, col: 1, value: "B", tone: "primary" },
                { row: 0, col: 2, value: "C", tone: "primary" },
                { row: 0, col: 3, value: "D", tone: "primary" },
                { row: 0, col: 4, value: "E", tone: "primary" },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "线段数", rhs: "C(5,2)", status: "keep" },
                { lhs: "", rhs: "5×4÷2", status: "keep" },
                { lhs: "", rhs: "10 条", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "classification-counting",
      label: "分类计数法",
      steps: [
        {
          text: "分析：按起点分类，从每个点向右数能连的线段数。",
        },
        {
          text: "共 4+3+2+1=10 条。",
          scenes: [
            {
              kind: "statement-table",
              headers: {
                speaker: "起点",
                claim: "可连点数",
                verdict: "线段数",
              },
              rows: [
                { speaker: "A", claim: "B,C,D,E", badge: "4" },
                { speaker: "B", claim: "C,D,E", badge: "3" },
                { speaker: "C", claim: "D,E", badge: "2" },
                { speaker: "D", claim: "E", badge: "1" },
              ],
            },
            {
              kind: "equation-list",
              rows: [
                { lhs: "线段总数", rhs: "4+3+2+1", status: "keep" },
                { lhs: "", rhs: "10 条", status: "keep" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "平面上有6个点，任意三点都不在同一直线上。过这些点最多可以画多少条直线？",
    fields: [
      {
        key: "lines",
        label: "直线数",
      },
    ],
    answer: {
      lines: 15,
    },
    hint: "每两个点确定一条直线，用组合数计算。",
  },
  tags: ["组合", "加法原理"],
} satisfies ProblemData;
