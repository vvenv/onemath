import type { ProblemData } from "@/types/problem";

export default {
  id: "10085",
  title: "三阶幻方·1 到 9 填九宫",
  grade: "三年级",
  module: "杂题",
  difficulty: "基础",
  question:
    "把 1, 2, 3, 4, 5, 6, 7, 8, 9 这 9 个数字各用一次，填入 3 × 3 方格中，使每一行、每一列以及两条对角线上的三个数之和都相等。\n\n问：每行（列、对角线）的三数之和是多少？并给出一种具体的填法。",
  solutions: [
    {
      key: "center",
      label: "中心数法",
      steps: [
        {
          text: "分析：过中心的 4 条线（中行、中列、两对角）共 4S。每条都含中心格，其余 8 格各算 1 次，所以 4S = 4·中 + (45 − 中) = 45 + 3·中。",
          scenes: [],
        },
        {
          text: "1+2+…+9 = 45，故 3S = 45，S = 15；代入 45 + 3·中 = 60 ⇒ 中 = 5。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "1+2+…+9",
                  rhs: "45",
                },
                {
                  lhs: "3S",
                  rhs: "45",
                },
                {
                  lhs: "S",
                  rhs: "15",
                  status: "keep",
                  badge: "幻和",
                },
                {
                  lhs: "45 + 3·中 = 4S",
                  rhs: "60",
                },
                {
                  lhs: "中",
                  rhs: "5",
                  status: "keep",
                  badge: "中心数",
                },
              ],
            },
          ],
        },
        {
          text: "以 5 为中心，关于其对称的一对角或一对边中之和必为 10。\n\n剩下的数配成 4 对：1+9=10, 2+8=10, 3+7=10, 4+6=10，每对填在关于中心对称的位置。",
          scenes: [],
        },
        {
          text: "进一步：四个角必须是偶数。若角是奇数，则其对边也是奇数（因为两数和为 10），会导致某条线上三个奇数之和为奇数≠15（矛盾）。\n\n故四角填 2, 4, 6, 8，边上填 1, 3, 7, 9。按配对原则可得填法 2 7 6 / 9 5 1 / 4 3 8。",
          scenes: [
            {
              kind: "number-grid",
              rows: 3,
              cols: 3,
              cells: [
                {
                  row: 0,
                  col: 0,
                  value: 2,
                },
                {
                  row: 0,
                  col: 1,
                  value: 7,
                },
                {
                  row: 0,
                  col: 2,
                  value: 6,
                },
                {
                  row: 1,
                  col: 0,
                  value: 9,
                },
                {
                  row: 1,
                  col: 1,
                  value: 5,
                  tone: "primary",
                },
                {
                  row: 1,
                  col: 2,
                  value: 1,
                },
                {
                  row: 2,
                  col: 0,
                  value: 4,
                },
                {
                  row: 2,
                  col: 1,
                  value: 3,
                },
                {
                  row: 2,
                  col: 2,
                  value: 8,
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
      "在 3×3 的九宫格中填入 1 到 9，每个数字恰用一次，使每行、每列、两条对角线上三个数之和都相等。这个公共和是多少？中心格必须填的数是多少？",
    fields: [
      {
        key: "sum",
        label: "幻和",
        type: "number",
      },
      {
        key: "center",
        label: "中心数",
        type: "number",
      },
    ],
    answer: {
      sum: 15,
      center: 5,
    },
    hint: "用 1+2+…+9 = 45 除以 3 行即得幻和；再用过中心 4 条直线总和 = 4S = 45+3·中心，反推中心。",
  },
  tags: ["中心数法"],
} satisfies ProblemData;
