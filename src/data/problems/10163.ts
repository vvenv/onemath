import type { ProblemData } from "@/types/problem";

export default {
  "id": "10163",
  "title": "因数个数·最小值",
  "grade": "六年级",
  "module": "数论",
  "difficulty": "进阶",
  "question": "一个自然数恰好有 12 个因数，求这个数的最小值。",
  "solutions": [
    {
      "key": "divisor-count",
      "label": "因数个数公式",
      "steps": [
        "分析：因数个数 12 可以分解为：12 = 12 × 1 = 6 × 2 = 4 × 3 = 3 × 2 × 2。",
        "对应质因数分解形式为：p¹¹、p⁵q¹、p³q²、p²q¹r¹，其中 p、q、r 为不同质数。",
        "取最小质数 2、3、5 计算各形式的最小值：2¹¹ = 2048、2⁵×3 = 96、2³×3² = 72、2²×3×5 = 60。",
        "比较得最小值为 60，验证 60 = 2² × 3 × 5，因数个数 = (2+1) × (1+1) × (1+1) = 12 ✓。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "12 的分解",
              "rhs": "12, 6×2, 4×3, 3×2×2",
              "status": "keep"
            },
            {
              "lhs": "对应形式",
              "rhs": "p¹¹, p⁵q¹, p³q², p²q¹r¹",
              "status": "keep"
            },
            {
              "lhs": "最小值",
              "rhs": "2048, 96, 72, 60",
              "status": "keep"
            },
            {
              "lhs": "最小值",
              "rhs": "60",
              "status": "keep",
              "badge": "答案"
            }
          ],
          "caption": "枚举因数个数的所有分解形式，取最小质数计算"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🔢",
              "count": 60,
              "label": "最小值"
            }
          ],
          "caption": "验证：60 = 2² × 3 × 5，因数个数 = 3 × 2 × 2 = 12"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个自然数恰好有 8 个因数，求这个数的最小值。",
    "fields": [
      {
        "key": "min",
        "label": "最小值"
      }
    ],
    "answer": {
      "min": 24
    },
    "hint": "8 = 8 = 4×2 = 2×2×2，对应形式 p⁷、p³q¹、p¹q¹r¹，最小值分别为 128、24、30"
  },
  "tags": []
} satisfies ProblemData;
