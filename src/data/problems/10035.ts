import type { ProblemData } from "@/types/problem";

export default {
  "id": "10035",
  "title": "排列组合·选人组队",
  "grade": "五年级",
  "module": "计数",
  "difficulty": "进阶",
  "question": "从 5 名同学中选出 3 人参加比赛。请问：（1）有多少种不同的选法？（2）如果选出的 3 人还要分配不同的任务（队长、副队长、记录员），有多少种不同的安排方式？",
  "solutions": [
    {
      "key": "combination-permutation",
      "label": "组合与排列法",
      "steps": [
        "（1）从5人中选3人，不涉及顺序，是组合问题。",
        "组合数公式：C(5,3) = (5×4×3) / (3×2×1) = 60 / 6 = 10 种。",
        "（2）选出的3人分配3个不同的任务，涉及顺序，是排列问题。",
        "可以直接用排列公式：A(5,3) = 5×4×3 = 60 种。",
        "或者分步：先选3人（C(5,3)=10），再对3人排列（3!=6），10×6=60种。"
      ],
      "scenes": [
        {
          "kind": "heads",
          "heads": {
            "count": 5
          },
          "caption": "5 名同学，从中选出 3 人"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "C(5,3)",
              "rhs": "5×4×3",
              "note": "分子",
              "status": "keep"
            },
            {
              "lhs": "÷",
              "rhs": "3×2×1",
              "note": "分母",
              "status": "keep"
            },
            {
              "lhs": "=",
              "rhs": "10",
              "note": "结果",
              "badge": "组合数"
            }
          ],
          "caption": "第(1)问：组合数公式"
        },
        {
          "kind": "heads-split",
          "left": {
            "count": 10,
            "ticks": [
              {
                "count": 1
              }
            ],
            "caption": "10种选法",
            "captionTone": "primary"
          },
          "right": {
            "count": 6,
            "ticks": [
              {
                "count": 1
              }
            ],
            "caption": "每种6种排列"
          },
          "caption": "第(2)问：10 × 6 = 60 种"
        },
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "A(5,3)",
              "rhs": "5×4×3",
              "note": "排列数",
              "status": "keep"
            },
            {
              "lhs": "=",
              "rhs": "60",
              "badge": "结果"
            }
          ],
          "caption": "或直接用排列公式 A(5,3) = 60"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "👥",
              "count": 10,
              "label": "选法（组合）"
            },
            {
              "icon": "📋",
              "count": 60,
              "label": "安排方式（排列）"
            }
          ],
          "caption": "答案：(1) 10 种；(2) 60 种"
        }
      ]
    }
  ],
  "variant": {
    "question": "从6本不同的书中选出4本送给朋友。如果选出的书要按顺序排列在书架上，有多少种方式？",
    "fields": [
      {
        "key": "ways",
        "label": "排列方式"
      }
    ],
    "answer": {
      "ways": 360
    },
    "hint": "从6本中选4本排列：A(6,4) = 6×5×4×3 = 360。"
  },
  "tags": []
} satisfies ProblemData;
