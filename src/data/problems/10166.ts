import type { ProblemData } from "@/types/problem";

export default {
  "id": "10166",
  "title": "巧算·乘法分配律",
  "grade": "四年级",
  "module": "计算",
  "difficulty": "进阶",
  "question": "计算：99 × 101",
  "figures": [],
  "solutions": [
    {
      "key": "difference-of-squares",
      "label": "平方差公式",
      "steps": [
        "将 101 改写为 100 + 1，99 改写为 100 − 1。",
        "利用平方差公式：(100 − 1)(100 + 1) = 100² − 1²。",
        "计算：10000 − 1 = 9999。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "原式",
              "rhs": "99 × 101"
            },
            {
              "lhs": "变形",
              "rhs": "(100 − 1)(100 + 1)"
            },
            {
              "lhs": "平方差",
              "rhs": "100² − 1²"
            },
            {
              "lhs": "结果",
              "rhs": "10000 − 1 = 9999",
              "status": "keep"
            }
          ],
          "caption": "利用平方差公式计算"
        }
      ]
    },
    {
      "key": "distribution",
      "label": "乘法分配律",
      "steps": [
        "将 99 改写为 100 − 1。",
        "利用乘法分配律：99 × 101 = (100 − 1) × 101 = 100 × 101 − 1 × 101。",
        "计算：10100 − 101 = 9999。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "原式",
              "rhs": "99 × 101"
            },
            {
              "lhs": "变形",
              "rhs": "(100 − 1) × 101"
            },
            {
              "lhs": "分配律",
              "rhs": "100 × 101 − 1 × 101"
            },
            {
              "lhs": "计算",
              "rhs": "10100 − 101 = 9999",
              "status": "keep"
            }
          ],
          "caption": "利用乘法分配律计算"
        }
      ]
    }
  ],
  "variant": {
    "question": "计算：98 × 102",
    "fields": [
      {
        "key": "result",
        "label": "结果"
      }
    ],
    "answer": {
      "result": 9996
    },
    "hint": "将 98 改写为 100 − 2，102 改写为 100 + 2，利用平方差公式。"
  },
  "knowledgePoints": [
    {
      "slug": "distributive-law",
      "name": "乘法分配律",
      "summary": "(a + b) × c = a × c + b × c；正反两用，是速算与巧算的主力工具。",
    },
    {
      "slug": "difference-of-squares",
      "name": "平方差",
      "summary": "a² − b² = (a + b)(a − b)：把平方之差立刻改写为一次乘积。",
    },
  ],
  "tags": [
    "巧算",
    "乘法分配律",
    "平方差"
  ]
} satisfies ProblemData;
