import type { ProblemData } from "@/types/problem";

export default {
  "id": "10047",
  "title": "完全平方数·因数个数",
  "grade": "六年级",
  "module": "numberTheory",
  "difficulty": "挑战",
  "question": "一个自然数的因数个数是奇数，这个数在 100 到 200 之间。这样的数有哪些？",
  "solutions": [
    {
      "key": "perfect_square",
      "label": "完全平方数特征",
      "steps": [
        "一个数的因数个数是奇数的充要条件是：这个数是完全平方数。",
        "因为因数总是成对出现，只有完全平方数的平方根对应的因数与自己配对，导致因数个数为奇数。",
        "找出 100 到 200 之间的完全平方数。",
        "10² = 100，11² = 121，12² = 144，13² = 169，14² = 196，15² = 225（超出）。",
        "所以在 100 到 200 之间的完全平方数有：100、121、144、169、196。"
      ],
      "scenes": [
        {
          "kind": "statement-table",
          "headers": {
            "speaker": "数",
            "claim": "因数成对",
            "verdict": "因数个数"
          },
          "rows": [
            {
              "speaker": "36",
              "claim": "1×36,2×18,3×12,4×9,6×6",
              "verdict": "false",
              "badge": "9个(奇)"
            },
            {
              "speaker": "48",
              "claim": "1×48,2×24,3×16,4×12,6×8",
              "verdict": "true",
              "badge": "10个(偶)"
            }
          ],
          "caption": "只有完全平方数有奇数个因数，因为有一对因数相同"
        },
        {
          "kind": "number-line",
          "min": 90,
          "max": 210,
          "points": [
            {
              "value": 100,
              "label": "10²",
              "tone": "primary"
            },
            {
              "value": 121,
              "label": "11²",
              "tone": "primary"
            },
            {
              "value": 144,
              "label": "12²",
              "tone": "primary"
            },
            {
              "value": 169,
              "label": "13²",
              "tone": "primary"
            },
            {
              "value": 196,
              "label": "14²",
              "tone": "primary"
            }
          ],
          "caption": "100~200 之间的完全平方数"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": "100",
              "label": "10²"
            },
            {
              "icon": "🔢",
              "count": "121",
              "label": "11²"
            },
            {
              "icon": "🔢",
              "count": "144",
              "label": "12²"
            },
            {
              "icon": "🔢",
              "count": "169",
              "label": "13²"
            },
            {
              "icon": "🔢",
              "count": "196",
              "label": "14²"
            }
          ],
          "caption": "共 5 个数满足条件"
        }
      ]
    }
  ],
  "variant": {
    "question": "200 以内，因数个数为奇数的自然数有多少个？",
    "fields": [
      {
        "key": "count",
        "label": "个数"
      }
    ],
    "answer": {
      "count": 14
    },
    "hint": "即 200 以内的完全平方数个数。14² = 196，15² = 225。"
  },
  "tags": []
} satisfies ProblemData;
