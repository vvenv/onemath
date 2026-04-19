import type { ProblemData } from "@/types/problem";

export default {
  "id": "10018",
  "title": "牛吃草·匀速生长",
  "grade": "五年级",
  "module": "word",
  "difficulty": "进阶",
  "question": "一片匀速生长的草地，可供 27 头牛吃 6 周，或者供 23 头牛吃 9 周。那么这片草地可供 21 头牛吃几周？",
  "solutions": [
    {
      "key": "newton",
      "label": "核心公式法",
      "steps": [
        "设 1 头牛 1 周吃草量为 1 份。",
        "27 头牛 6 周吃草：27 × 6 = 162 份。",
        "23 头牛 9 周吃草：23 × 9 = 207 份。",
        "草每周生长量：(207 − 162) ÷ (9 − 6) = 15 份。",
        "原有草量：162 − 15 × 6 = 72 份。（或 207 − 15 × 9 = 72 份）",
        "安排 15 头牛专吃新草，剩下 21 − 15 = 6 头牛吃原有草。",
        "吃完原有草时间：72 ÷ 6 = 12 周。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "27头6周 (162)",
              "value": 162,
              "max": 207,
              "tone": "muted"
            },
            {
              "label": "23头9周 (207)",
              "value": 207,
              "max": 207,
              "tone": "primary"
            }
          ],
          "caption": "总量差 45 份，时间差 3 周 → 每周长 15 份"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "每周新草",
              "rhs": "(207 − 162) ÷ (9 − 6) = 15 份"
            },
            {
              "lhs": "原有草",
              "rhs": "162 − 15 × 6 = 72 份",
              "status": "keep"
            },
            {
              "lhs": "专吃新草的牛",
              "rhs": "15 头",
              "note": "把每周新草恰好吃掉"
            },
            {
              "lhs": "剩余吃老草的牛",
              "rhs": "21 − 15 = 6 头"
            },
            {
              "lhs": "总时间",
              "rhs": "72 ÷ 6 = 12 周",
              "status": "keep"
            }
          ],
          "caption": "牛吃草核心：分离「新草」与「原有草」"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🌿",
              "count": 15,
              "label": "每周新草(份)"
            },
            {
              "icon": "📦",
              "count": 72,
              "label": "原有草(份)"
            },
            {
              "icon": "⏱️",
              "count": 12,
              "label": "可吃周数"
            }
          ],
          "caption": "21 头牛可吃 12 周"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个水池底部有一个常开的排水管，上部有若干个同样粗细的进水管。打开 3 个进水管，5 小时注满；打开 4 个进水管，3 小时注满。如果打开 6 个进水管，几小时注满？",
    "fields": [
      {
        "key": "hours",
        "label": "注满时间"
      }
    ],
    "answer": {
      "hours": 1.5
    },
    "hint": "注意排水管相当于反向的“牛吃草”。"
  },
  "tags": [
    "假设法"
  ]
} satisfies ProblemData;
