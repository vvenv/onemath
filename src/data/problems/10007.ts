import type { ProblemData } from "@/types/problem";

export default {
  "id": "10007",
  "title": "分糖·盈亏问题",
  "grade": "三年级",
  "module": "应用题",
  "difficulty": "基础",
  "question": "老师给小朋友们分糖果。如果每人分 6 颗，会多出 15 颗；如果每人分 8 颗，则还差 9 颗。请问一共有多少位小朋友？一共有多少颗糖果？",
  "solutions": [
    {
      "key": "comparison",
      "label": "比较法",
      "steps": [
        "比较两种分法，糖果的总差额为：盈 + 亏 = 15 + 9 = 24 颗。",
        "产生差额的原因是每个小朋友多分了：8 − 6 = 2 颗糖果。",
        "所以小朋友的人数为：24 ÷ 2 = 12 人。",
        "根据第一种分法求糖果总数：12 × 6 + 15 = 87 颗。",
        "或根据第二种分法验证：12 × 8 − 9 = 87 颗。"
      ],
      "scenes": [
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "第一种分法 (盈)",
              "value": 15,
              "max": 24,
              "tone": "muted"
            },
            {
              "label": "第二种分法 (亏)",
              "value": 9,
              "max": 24,
              "tone": "primary"
            }
          ],
          "caption": "总差额：盈 15 + 亏 9 = 24 颗"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "第一种 (6颗/人)",
              "value": 6,
              "max": 8,
              "tone": "muted"
            },
            {
              "label": "第二种 (8颗/人)",
              "value": 8,
              "max": 8,
              "tone": "primary"
            }
          ],
          "caption": "每人多分：8 − 6 = 2 颗"
        },
        {
          "kind": "heads",
          "heads": {
            "count": 12,
            "ticks": [
              {
                "count": 6
              },
              {
                "count": 2,
                "tone": "accent"
              }
            ]
          },
          "caption": "人数：24 ÷ 2 = 12 人"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "👧",
              "count": 12,
              "label": "小朋友"
            },
            {
              "icon": "🍬",
              "count": 87,
              "label": "糖果总数"
            }
          ],
          "caption": "糖果：12 × 6 + 15 = 87 颗"
        }
      ]
    },
    {
      "key": "equation",
      "label": "方程法",
      "steps": [
        "设有 x 位小朋友。",
        "糖果总数不变：6x + 15 = 8x − 9。",
        "移项：15 + 9 = 8x − 6x ⇒ 24 = 2x ⇒ x = 12。",
        "糖果总数：6 × 12 + 15 = 87。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "6x + 15",
              "rhs": "8x − 9",
              "note": "糖果数相同"
            },
            {
              "lhs": "15 + 9",
              "rhs": "8x − 6x",
              "note": "同类项移到同侧"
            },
            {
              "lhs": "24",
              "rhs": "2x",
              "status": "keep"
            },
            {
              "lhs": "x",
              "rhs": "12",
              "status": "keep"
            }
          ],
          "caption": "解方程求出人数"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "👧",
              "count": 12,
              "label": "人"
            },
            {
              "icon": "🍬",
              "count": 87,
              "label": "糖果"
            }
          ],
          "caption": "6 × 12 + 15 = 87"
        }
      ]
    }
  ],
  "variant": {
    "question": "学校安排宿舍。如果每间住 4 人，则有 10 人没床位；如果每间住 6 人，则空出 2 间宿舍。请问有多少间宿舍？多少名学生？",
    "fields": [
      {
        "key": "rooms",
        "label": "宿舍间数"
      },
      {
        "key": "students",
        "label": "学生人数"
      }
    ],
    "answer": {
      "rooms": 11,
      "students": 54
    },
    "hint": "第二种分法可以转化为“如果住满需要再增加多少人”，或者直接用方程试试。"
  },
  "tags": [
    "方程法",
    "对应思想"
  ]
} satisfies ProblemData;
