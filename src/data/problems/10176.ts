import type { ProblemData } from "@/types/problem";

export default {
  "id": "10176",
  "title": "约数与倍数·短除模型",
  "grade": "五年级",
  "module": "数论",
  "difficulty": "进阶",
  "question": "求 60 和 84 的最大公约数和最小公倍数。",
  "solutions": [
    {
      "key": "short",
      "label": "短除法",
      "steps": [
        "60 和 84 连续除以 2、2、3，得最大公约数 12，最小公倍数 420。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "60, 84",
              "rhs": "÷ 2 → 30, 42"
            },
            {
              "lhs": "30, 42",
              "rhs": "÷ 2 → 15, 21"
            },
            {
              "lhs": "15, 21",
              "rhs": "÷ 3 → 5, 7"
            },
            {
              "lhs": "最大公约数",
              "rhs": "2 × 2 × 3 = 12",
              "status": "keep"
            },
            {
              "lhs": "最小公倍数",
              "rhs": "2 × 2 × 3 × 5 × 7 = 420",
              "status": "keep"
            }
          ],
          "caption": "短除法过程"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔢",
              "count": 12,
              "label": "最大公约数"
            },
            {
              "icon": "🔢",
              "count": 420,
              "label": "最小公倍数"
            }
          ],
          "separator": "，",
          "caption": "最大公约数 12，最小公倍数 420"
        }
      ]
    },
    {
      "key": "prime",
      "label": "质因数分解法",
      "steps": [
        "分析：将两个数分解质因数。",
        "60 = 2 × 2 × 3 × 5。",
        "84 = 2 × 2 × 3 × 7。",
        "最大公约数 = 公共质因数的乘积 = 2 × 2 × 3 = 12。",
        "最小公倍数 = 所有质因数的乘积（公共的只算一次）= 2 × 2 × 3 × 5 × 7 = 420。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "60",
              "rhs": "2² × 3 × 5"
            },
            {
              "lhs": "84",
              "rhs": "2² × 3 × 7"
            },
            {
              "lhs": "最大公约数",
              "rhs": "2² × 3 = 12",
              "status": "keep"
            },
            {
              "lhs": "最小公倍数",
              "rhs": "2² × 3 × 5 × 7 = 420",
              "status": "keep"
            }
          ],
          "caption": "质因数分解法"
        }
      ]
    }
  ],
  "variant": {
    "question": "求 72 和 96 的最大公约数和最小公倍数。",
    "fields": [
      {
        "key": "gcd",
        "label": "最大公约数"
      },
      {
        "key": "lcm",
        "label": "最小公倍数"
      }
    ],
    "answer": {
      "gcd": 24,
      "lcm": 288
    },
    "hint": "用短除法：72, 96 ÷ 2 → 36, 48 ÷ 2 → 18, 24 ÷ 2 → 9, 12 ÷ 3 → 3, 4。"
  },
  "knowledgePoints": [
    {
      "slug": "short-division",
      "name": "短除法",
      "summary": "用一个共同的质因数依次去除所给的数，直到商两两互质；左侧所有除数之积即 gcd，左侧除数与底部商之积即 lcm。",
    },
  ],
  "tags": [
    "约数与倍数",
    "短除法"
  ]
} satisfies ProblemData;
