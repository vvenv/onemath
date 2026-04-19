import type { ProblemData } from "@/types/problem";

export default {
  "id": "10043",
  "title": "最大公约数·短除模型",
  "grade": "五年级",
  "module": "numberTheory",
  "difficulty": "进阶",
  "question": "甲、乙两个数的最大公约数是 6，最小公倍数是 72。已知甲数是 24，求乙数。",
  "solutions": [
    {
      "key": "formula",
      "label": "公式法",
      "steps": [
        "两个数的乘积等于它们的最大公约数与最小公倍数的乘积。",
        "即：甲 × 乙 = 最大公约数 × 最小公倍数。",
        "代入已知条件：24 × 乙 = 6 × 72。",
        "计算右边：6 × 72 = 432。",
        "所以 24 × 乙 = 432，乙 = 432 ÷ 24 = 18。",
        "验证：24 和 18 的最大公约数是 6，最小公倍数是 72，正确。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "甲 × 乙",
              "rhs": "(甲,乙) × [甲,乙]",
              "status": "keep",
              "badge": "公式"
            },
            {
              "lhs": "24 × 乙",
              "rhs": "6 × 72",
              "status": "keep"
            },
            {
              "lhs": "24 × 乙",
              "rhs": "432",
              "status": "keep"
            },
            {
              "lhs": "乙",
              "rhs": "432 ÷ 24 = 18",
              "status": "keep",
              "badge": "答案"
            }
          ],
          "caption": "利用公式：两数之积 = 最大公约数 × 最小公倍数"
        },
        {
          "kind": "svg",
          "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200' width='400' height='200'><text x='200' y='30' font-size='14' fill='#333' text-anchor='middle' font-weight='bold'>验证：24 和 18 的短除法</text><!-- 短除式 --><text x='100' y='60' font-size='16' fill='#333'>2 | 24  18</text><text x='100' y='85' font-size='16' fill='#333'>3 | 12   9</text><text x='100' y='110' font-size='16' fill='#333'>    4   3</text><text x='250' y='70' font-size='12' fill='#666'>最大公约数 = 2 × 3 = 6 ✓</text><text x='250' y='95' font-size='12' fill='#666'>最小公倍数 = 2 × 3 × 4 × 3 = 72 ✓</text><text x='200' y='160' font-size='14' fill='#27ae60' text-anchor='middle' font-weight='bold'>✅ 乙数 = 18</text></svg>",
          "caption": "验证：24 和 18 的最大公约数为 6，最小公倍数为 72"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 18,
              "label": "乙数"
            }
          ],
          "caption": "乙 = 18"
        }
      ]
    }
  ],
  "variant": {
    "question": "两个数的最大公约数是 8，最小公倍数是 48。已知一个数是 16，求另一个数。",
    "fields": [
      {
        "key": "other",
        "label": "另一个数"
      }
    ],
    "answer": {
      "other": 24
    },
    "hint": "两数之积 = 最大公约数 × 最小公倍数"
  },
  "tags": []
} satisfies ProblemData;
