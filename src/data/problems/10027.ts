import type { ProblemData } from "@/types/problem";

export default {
  "id": "10027",
  "title": "计算·等差数列",
  "grade": "四年级",
  "module": "calc",
  "difficulty": "进阶",
  "question": "计算：1 + 3 + 5 + 7 + ... + 19",
  "solutions": [
    {
      "key": "pairing",
      "label": "首尾配对法",
      "steps": [
        "这是一个公差为2的等差数列。首项是1，末项是19。",
        "将数列首尾配对相加：1+19， 3+17， 5+15...",
        "观察发现，每一对的和都是20。",
        "接下来计算总共有多少项。项数 = (末项 − 首项) ÷ 公差 + 1 = (19 − 1) ÷ 2 + 1 = 10项。",
        "10项可以配成 10 ÷ 2 = 5 对。",
        "数列总和 = 每对的和 × 对数 = 20 × 5 = 100。"
      ],
      "scenes": [
        {
          "kind": "number-line",
          "min": 0,
          "max": 20,
          "points": [
            {
              "value": 1,
              "label": "①"
            },
            {
              "value": 3,
              "label": "②"
            },
            {
              "value": 5,
              "label": "③"
            },
            {
              "value": 15,
              "label": "⑧"
            },
            {
              "value": 17,
              "label": "⑨"
            },
            {
              "value": 19,
              "label": "⑩"
            }
          ],
          "caption": "数轴上的数列：1 到 19 的奇数"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "第1对: 1+19",
              "value": 20,
              "max": 20,
              "tone": "primary"
            },
            {
              "label": "第2对: 3+17",
              "value": 20,
              "max": 20,
              "tone": "primary"
            },
            {
              "label": "第3对: 5+15",
              "value": 20,
              "max": 20,
              "tone": "primary"
            },
            {
              "label": "第4对: 7+13",
              "value": 20,
              "max": 20,
              "tone": "primary"
            },
            {
              "label": "第5对: 9+11",
              "value": 20,
              "max": 20,
              "tone": "primary"
            }
          ],
          "caption": "首尾配对法：每对的和都是 20，共有 5 对"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "项数",
              "rhs": "(19 − 1) ÷ 2 + 1 = 10"
            },
            {
              "lhs": "对数",
              "rhs": "10 ÷ 2 = 5"
            },
            {
              "lhs": "每对和",
              "rhs": "1 + 19 = 20",
              "status": "keep"
            },
            {
              "lhs": "总和",
              "rhs": "20 × 5 = 100",
              "status": "keep"
            }
          ],
          "note": "通用公式：总和 = (首项 + 末项) × 项数 ÷ 2",
          "caption": "等差求和的标准推导"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 10,
              "label": "项数"
            },
            {
              "icon": "🤝",
              "count": 5,
              "label": "对数"
            },
            {
              "icon": "💯",
              "count": 100,
              "label": "总和"
            }
          ],
          "separator": "→",
          "caption": "总和 = 20 × 5 = 100"
        }
      ]
    }
  ],
  "variant": {
    "question": "计算：2 + 5 + 8 + 11 + ... + 29",
    "fields": [
      {
        "key": "sum",
        "label": "计算结果"
      }
    ],
    "answer": {
      "sum": 155
    },
    "hint": "先计算项数，再使用首尾配对法。"
  },
  "tags": [
    "首尾配对"
  ]
} satisfies ProblemData;
