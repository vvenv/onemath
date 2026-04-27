import type { ProblemData } from "@/types/problem";

export default {
  "id": "10001",
  "title": "鸡兔同笼·基础变式",
  "grade": "三年级",
  "module": "应用题",
  "difficulty": "基础",
  "question": "笼子里有🐔和🐰，共30个头，88只脚。问🐔和🐰各有多少只？",
  "solutions": [
    {
      "key": "drawing",
      "label": "画图法",
      "steps": [
        "画 30 个圆圈代表 30 个头。",
        "每个圆圈下画 2 条短线，先假设全是🐔，共 60 只脚。",
        "实际有 88 只脚，还差 28 只。",
        "每把一只🐔变成🐰，就多 2 只脚，因此🐰有 14 只。",
        "🐔有 16 只。"
      ],
      "scenes": [
        {
          "kind": "heads",
          "heads": {
            "count": 30
          },
          "caption": "30 个头（○ × 30）"
        },
        {
          "kind": "heads",
          "heads": {
            "count": 30,
            "ticks": [
              {
                "count": 2
              }
            ]
          },
          "caption": "假设全是🐔：30 × 2 = 60 只脚"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "目标",
              "value": 88,
              "max": 88,
              "tone": "primary"
            },
            {
              "label": "当前",
              "value": 60,
              "max": 88,
              "tone": "muted",
              "marker": true
            }
          ],
          "caption": "还差 88 − 60 = 28 只脚"
        },
        {
          "kind": "heads-split",
          "left": {
            "count": 14,
            "ticks": [
              {
                "count": 2
              },
              {
                "count": 2,
                "tone": "accent"
              }
            ],
            "tone": "accent",
            "caption": "补 2 只脚 → 🐰 × 14",
            "captionTone": "primary"
          },
          "right": {
            "count": 16,
            "ticks": [
              {
                "count": 2
              }
            ],
            "caption": "保持不变 → 🐔 × 16"
          },
          "caption": "28 ÷ 2 = 14 只需要变成🐰"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🐰",
              "count": 14
            },
            {
              "icon": "🐔",
              "count": 16
            }
          ],
          "caption": "头：14 + 16 = 30 ✓ ｜ 脚：4×14 + 2×16 = 88 ✓"
        }
      ]
    },
    {
      "key": "hypothesis",
      "label": "假设法",
      "steps": [
        "假设全为🐔应有脚 30×2=60，实际88多28脚。每🐰比🐔多2脚，故🐰=28÷2=14只，🐔=30-14=16只。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            { "lhs": "假设全🐔脚数", "rhs": "30 × 2 = 60", "badge": "假设" },
            { "lhs": "与实际差", "rhs": "88 − 60 = 28", "badge": "对比" },
            { "lhs": "每只🐰多出脚数", "rhs": "4 − 2 = 2", "badge": "单价" },
            { "lhs": "🐰", "rhs": "28 ÷ 2 = 14", "status": "keep" },
            { "lhs": "🐔", "rhs": "30 − 14 = 16", "status": "keep" }
          ],
          "caption": "把全🐔假设的差额按每只🐰多 2 脚摊回去"
        }
      ]
    },
    {
      "key": "equation",
      "label": "方程法",
      "steps": [
        "设🐔 x 只，🐰 y 只。",
        "列方程：x + y = 30。",
        "列方程：2x + 4y = 88。",
        "将第一式乘 2 得 2x + 2y = 60，与第二式相减：2y = 28。",
        "解得 y = 14，x = 30 − 14 = 16。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "x + y",
              "rhs": "30",
              "note": "头数",
              "badge": "①"
            },
            {
              "lhs": "2x + 4y",
              "rhs": "88",
              "note": "脚数",
              "badge": "②"
            }
          ],
          "caption": "列出两条方程"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "2x + 2y",
              "rhs": "60",
              "note": "①×2",
              "badge": "①'",
              "status": "neutral"
            },
            {
              "lhs": "2x + 4y",
              "rhs": "88",
              "note": "保留",
              "badge": "②",
              "status": "keep"
            },
            {
              "lhs": "2y",
              "rhs": "28",
              "note": "② − ①'",
              "badge": "消 x",
              "status": "keep"
            }
          ],
          "caption": "消元：把 x 同系数后相减"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🐰",
              "count": 14
            },
            {
              "icon": "🐔",
              "count": 16
            }
          ],
          "caption": "y = 14，x = 30 − 14 = 16"
        }
      ]
    }
  ],
  "variant": {
    "question": "停车场上共有汽车和摩托车 28 辆，轮子总数 86 个，求各有多少辆。",
    "fields": [
      {
        "key": "car",
        "label": "汽车数量"
      },
      {
        "key": "motorcycle",
        "label": "摩托车数量"
      }
    ],
    "answer": {
      "car": 15,
      "motorcycle": 13
    },
    "hint": "再试一次，检查总辆数和总轮子数。"
  },
  "tags": [
    "画图法",
    "假设法",
    "方程法"
  ]
} satisfies ProblemData;
