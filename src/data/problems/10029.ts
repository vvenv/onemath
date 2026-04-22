import type { ProblemData } from "@/types/problem";

export default {
  "id": "10029",
  "title": "计算·定义新运算",
  "grade": "四年级",
  "module": "计算",
  "difficulty": "进阶",
  "question": "定义一种新运算“⊙”：a ⊙ b = 2 × a + b。求 (3 ⊙ 4) ⊙ 5 的值。",
  "solutions": [
    {
      "key": "stepwise",
      "label": "分步代入法",
      "steps": [
        "分析：新运算 a ⊙ b = 2a + b，遇到带括号的式子要先算括号内部，再把结果当新的 a 代入。",
        "先算 3 ⊙ 4 = 2 × 3 + 4 = 10；再算 10 ⊙ 5 = 2 × 10 + 5 = 25。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "a ⊙ b",
              "rhs": "2a + b",
              "note": "运算定义",
              "badge": "📘"
            }
          ],
          "caption": "先把新运算的规则记下来"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "3 ⊙ 4",
              "rhs": "2×3 + 4",
              "note": "a=3, b=4"
            },
            {
              "lhs": "= 6 + 4",
              "rhs": "10",
              "status": "keep"
            }
          ],
          "caption": "第一步：计算括号 3 ⊙ 4"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "3️⃣",
              "count": "3",
              "label": "a"
            },
            {
              "icon": "4️⃣",
              "count": "4",
              "label": "b"
            },
            {
              "icon": "🔟",
              "count": "10",
              "label": "= 3 ⊙ 4"
            }
          ],
          "separator": "→",
          "caption": "3 ⊙ 4 = 10，原式化为 10 ⊙ 5"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "10 ⊙ 5",
              "rhs": "2×10 + 5",
              "note": "a=10, b=5"
            },
            {
              "lhs": "= 20 + 5",
              "rhs": "25",
              "status": "keep"
            }
          ],
          "caption": "第二步：再用一次规则"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "✅",
              "count": "25",
              "label": "(3 ⊙ 4) ⊙ 5"
            }
          ],
          "caption": "最终结果 = 25"
        }
      ]
    }
  ],
  "variant": {
    "question": "定义新运算“※”：x ※ y = (x + y) ÷ 2。求 12 ※ (8 ※ 20) 的值。",
    "fields": [
      {
        "key": "value",
        "label": "计算结果"
      }
    ],
    "answer": {
      "value": 13
    },
    "hint": "先算 8 ※ 20 = (8 + 20)/2 = 14，再算 12 ※ 14 = (12 + 14)/2 = 13。"
  },
  "tags": [
    "乘法原理"
  ]
} satisfies ProblemData;
