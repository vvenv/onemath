import type { ProblemData } from "@/types/problem";

export default {
  "id": "10004",
  "title": "探险队分帐篷·盈亏转化",
  "grade": "三年级",
  "module": "应用题",
  "difficulty": "进阶",
  "question": "一支探险队准备在野外露营。如果每顶帐篷住 5 人，则有 14 人没有地方住；如果每顶帐篷住 7 人，则刚好空出 4 顶帐篷。问探险队共有多少人？帐篷共有多少顶？",
  "solutions": [
    {
      "key": "comparison",
      "label": "比较法",
      "steps": [
        "分析：总人数不变。方案一每顶 5 人还盈 14 人；方案二每顶 7 人要坐满还差 7 × 4 = 28 人（亏）。两次把同一批人装进相同数量的帐篷，盈亏总差额就是每顶多住 7 − 5 = 2 人累积出来的。",
        "帐篷数：(14 + 28) ÷ (7 − 5) = 42 ÷ 2 = 21 顶。",
        "总人数：5 × 21 + 14 = 119 人。"
      ],
      "scenes": [
        {
          "kind": "heads",
          "heads": {
            "count": 21
          },
          "caption": "共有 21 顶帐篷"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "方案二（满员）",
              "value": 147,
              "max": 147,
              "tone": "primary"
            },
            {
              "label": "方案一（满员）",
              "value": 105,
              "max": 147,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "21 顶帐篷满员相差：21 × 2 = 42 人"
        },
        {
          "kind": "heads-split",
          "left": {
            "count": 14,
            "ticks": [
              {
                "count": 1
              }
            ],
            "tone": "accent",
            "caption": "方案一盈余 14 人",
            "captionTone": "primary"
          },
          "right": {
            "count": 28,
            "ticks": [
              {
                "count": 1
              }
            ],
            "caption": "方案二缺少 28 人"
          },
          "caption": "总差额：14 + 28 = 42 人"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "⛺",
              "count": 21,
              "label": "帐篷"
            },
            {
              "icon": "🧑‍🚀",
              "count": 119,
              "label": "队员"
            }
          ],
          "caption": "人数：5 × 21 + 14 = 119 ｜ 7 × 21 − 28 = 119 ✓"
        }
      ]
    },
    {
      "key": "equation",
      "label": "方程法",
      "steps": [
        "分析：设帐篷 x 顶。按方案一人数为 5x + 14，按方案二人数为 7(x − 4)，两者相等即可列方程。",
        "解方程求得 x = 21，总人数 5 × 21 + 14 = 119 人。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "5x + 14",
              "rhs": "7(x − 4)",
              "note": "人数不变"
            },
            {
              "lhs": "5x + 14",
              "rhs": "7x − 28",
              "note": "展开右边",
              "status": "keep"
            },
            {
              "lhs": "14 + 28",
              "rhs": "7x − 5x",
              "note": "把 x 项、常数项移到同侧"
            },
            {
              "lhs": "42",
              "rhs": "2x",
              "status": "keep"
            },
            {
              "lhs": "x",
              "rhs": "21",
              "status": "keep"
            }
          ],
          "caption": "用方程求出帐篷数"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "⛺",
              "count": 21,
              "label": "帐篷"
            },
            {
              "icon": "🧑‍🚀",
              "count": 119,
              "label": "队员"
            }
          ],
          "caption": "5 × 21 + 14 = 119"
        }
      ]
    }
  ],
  "variant": {
    "question": "学校给新生安排宿舍。如果每间住 6 人，则 22 人没床位；如果每间住 8 人，则空出 3 间宿舍。问新生有多少人？",
    "fields": [
      {
        "key": "students",
        "label": "新生人数"
      }
    ],
    "answer": {
      "students": 160
    },
    "hint": "注意将“空出 3 间”转化为“缺少多少人”。"
  },
  "tags": [
    "比较法",
    "方程法"
  ]
} satisfies ProblemData;
