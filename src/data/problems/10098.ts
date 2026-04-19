import type { ProblemData } from "@/types/problem";

export default {
  "id": "10098",
  "title": "十字阵·双和值约束",
  "grade": "五年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "把 1, 2, 3, …, 10 这 10 个数字各用一次填入一个『十』字形的 10 个格子中：横排 5 个格子、竖排 6 个格子，中间 1 格被横与竖共用。要求横排 5 数之和等于 26，竖排 6 数之和等于 30。请问：中间那一格（横竖共用）必须填几？",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 280' font-size='14'><g fill='#fdfefe' stroke='#2E86C1'><rect x='20' y='120' width='220' height='40'/><rect x='110' y='20' width='40' height='240'/></g></svg>",
      "caption": "十字形 10 格（横 5 + 竖 6 − 共用 1 = 10）",
      "alt": "十字形 10 格"
    }
  ],
  "solutions": [
    {
      "key": "sum",
      "label": "整体累加法",
      "steps": [
        "分析：设共用中心格填 c。把横排和竖排的数字加起来，中心格被算了 2 次，其他 9 个数各 1 次。",
        "横和 + 竖和 = 26 + 30 = 56 = 2c + (所有 10 数之和 − c) = c + (1+2+…+10) = c + 55。",
        "所以 c = 56 − 55 = 1。",
        "结论：中心必须填 1。余下横 4 格和 = 26 − 1 = 25、竖 5 格和 = 30 − 1 = 29，从 {2,3,…,10} 中挑选验证存在。例如 横余 {2,5,8,10}（和 25），竖余 {3,4,6,7,9}（和 29）。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "横和 + 竖和",
              "rhs": "26 + 30 = 56"
            },
            {
              "lhs": "= c + 55",
              "rhs": ""
            },
            {
              "lhs": "c",
              "rhs": "1",
              "status": "keep",
              "badge": "中心"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "在同样的十字形 10 格中填 1–10，使横 5 数和 S₁ 与竖 6 数和 S₂ 相同。问 S₁ 与中心 c 的关系是什么？若要求 c = 5，S₁ = S₂ = ?",
    "fields": [
      {
        "key": "sum",
        "label": "S₁ = S₂",
        "type": "number"
      }
    ],
    "answer": {
      "sum": 30
    },
    "hint": "S₁ + S₂ = c + 55。若 S₁ = S₂ = S，则 2S = c + 55，c = 5 → S = 30。"
  },
  "tags": [
    "累加法",
    "整体代换"
  ]
} satisfies ProblemData;
