import type { ProblemData } from "@/types/problem";

export default {
  "id": "10178",
  "title": "同余问题·物不知数",
  "grade": "六年级",
  "module": "数论",
  "difficulty": "挑战",
  "question": "有一个数，除以 3 余 2，除以 5 余 3，除以 7 余 2。求满足条件的最小正整数。",
  "solutions": [
    {
      "key": "chinese",
      "label": "中国剩余定理",
      "steps": [
        "分析：用中国剩余定理逐步求解。从 N ≡ 2 (mod 7) 开始，N = 7k + 2。",
        "代入 N ≡ 3 (mod 5) 得 k ≡ 3 (mod 5)，N = 35m + 23。代入 N ≡ 2 (mod 3) 得 m ≡ 0 (mod 3)。",
        "N = 105n + 23，最小正整数解为 n = 0 时 N = 23。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "N ≡ 2 (mod 7)",
              "rhs": "N = 7k + 2"
            },
            {
              "lhs": "N ≡ 3 (mod 5)",
              "rhs": "7k + 2 ≡ 3 (mod 5)"
            },
            {
              "lhs": "",
              "rhs": "2k ≡ 1 (mod 5)"
            },
            {
              "lhs": "",
              "rhs": "k ≡ 3 (mod 5)",
              "status": "keep"
            },
            {
              "lhs": "N = 35m + 23",
              "rhs": ""
            },
            {
              "lhs": "N ≡ 2 (mod 3)",
              "rhs": "35m + 23 ≡ 2 (mod 3)"
            },
            {
              "lhs": "",
              "rhs": "2m ≡ 0 (mod 3)"
            },
            {
              "lhs": "",
              "rhs": "m ≡ 0 (mod 3)",
              "status": "keep"
            },
            {
              "lhs": "N = 105n + 23",
              "rhs": ""
            },
            {
              "lhs": "最小解",
              "rhs": "n = 0, N = 23",
              "status": "keep"
            }
          ],
          "caption": "逐步求解同余方程组"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 23,
              "label": "最小正整数"
            }
          ],
          "caption": "满足条件的最小正整数是 23"
        }
      ]
    },
    {
      "key": "enumeration",
      "label": "枚举法",
      "steps": [
        "从除以 7 余 2 的数开始枚举：2, 9, 16, 23, 30, 37, 44, 51, ...",
        "检查哪些数除以 5 余 3：2 ÷ 5 余 2（不满足），9 ÷ 5 余 4（不满足），16 ÷ 5 余 1（不满足），23 ÷ 5 余 3（满足）。",
        "继续检查 23 是否除以 3 余 2：23 ÷ 3 = 7 余 2（满足）。",
        "所以 23 是满足所有条件的最小正整数。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "2",
              "rhs": "÷5余2 ✗"
            },
            {
              "lhs": "9",
              "rhs": "÷5余4 ✗"
            },
            {
              "lhs": "16",
              "rhs": "÷5余1 ✗"
            },
            {
              "lhs": "23",
              "rhs": "÷5余3 ✓, ÷3余2 ✓",
              "status": "keep"
            }
          ],
          "caption": "枚举验证"
        }
      ]
    }
  ],
  "variant": {
    "question": "有一个数，除以 3 余 1，除以 5 余 2，除以 7 余 3。求满足条件的最小正整数。",
    "fields": [
      {
        "key": "number",
        "label": "最小正整数"
      }
    ],
    "answer": {
      "number": 52
    },
    "hint": "从 N ≡ 3 (mod 7) 开始，N = 7k + 3，逐步求解。"
  },
  "tags": [
    "同余问题",
    "中国剩余定理"
  ]
} satisfies ProblemData;
