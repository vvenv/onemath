import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10086-1.svg?raw";

export default {
  "id": "10086",
  "title": "等差数列幻方·连续奇数",
  "grade": "四年级",
  "module": "杂题",
  "difficulty": "基础",
  "question": "把 1, 3, 5, 7, 9, 11, 13, 15, 17 这 9 个连续奇数各用一次，填入一个 3 × 3 的方格中，使每一行、每一列、两条对角线上三个数之和都相等。问：这个公共和（幻和）是多少？",
  "figures": [
    {
      "svg": svg1,
      "caption": "9 个待填奇数",
      "alt": "待填数字列表"
    }
  ],
  "solutions": [
    {
      "key": "sum",
      "label": "累加法",
      "steps": [
        "分析：3 行正好覆盖所有 9 个数字各一次；所以 3 行之和等于这 9 个数字的总和。",
        "1+3+5+7+9+11+13+15+17 = 81（也可记为 9² = 81，这是前 9 个奇数之和的速算）。",
        "设幻和为 S，则 3S = 81，所以 S = 27。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "1+3+…+17",
              "rhs": "81"
            },
            {
              "lhs": "3S",
              "rhs": "81"
            },
            {
              "lhs": "S",
              "rhs": "27",
              "status": "keep",
              "badge": "幻和"
            }
          ]
        }
      ]
    },
    {
      "key": "middle",
      "label": "等差数列法（中位数 × 3）",
      "steps": [
        "分析：9 个数按大小排列是等差数列 1, 3, …, 17，公差 2。按照三阶幻方的性质，幻和恰等于中间项（第 5 大的数）的 3 倍——因为中间项就是中心格的数。",
        "这 9 个数的中位数是 9（第 5 大）。",
        "所以 S = 3 × 9 = 27。"
      ],
      "scenes": [
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🎯",
              "count": 27,
              "label": "幻和"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "把 2, 4, 6, 8, 10, 12, 14, 16, 18 这 9 个连续偶数各填一次，组成一个 3×3 幻方。幻和等于多少？中心格必须填几？",
    "fields": [
      {
        "key": "sum",
        "label": "幻和",
        "type": "number"
      },
      {
        "key": "center",
        "label": "中心",
        "type": "number"
      }
    ],
    "answer": {
      "sum": 30,
      "center": 10
    },
    "hint": "等差数列构三阶幻方时，中心 = 中位数，幻和 = 3 × 中位数。"
  },
  "tags": [
    "累加法",
    "等差数列法"
  ]
} satisfies ProblemData;
