import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10052-1.svg?raw";

export default {
  "id": "10052",
  "title": "浓度还原·逆向操作",
  "grade": "六年级",
  "module": "应用题",
  "difficulty": "挑战",
  "question": "一桶浓度为 80% 的酒精溶液。第一次倒出 20 升，再用水加满；第二次倒出 30 升，再用水加满。此时桶内酒精浓度降为 40%。桶的容量（原来酒精溶液的体积）是多少升？",
  "solutions": [
    {
      "key": "concentration-ratio",
      "label": "浓度保留比例法",
      "steps": [
        "分析：设桶容量 V 升。每次「倒 m 升再用水加满」本质上把桶内酒精按 (V−m)/V 的比例保留（总体积仍为 V）。两次后酒精保留总比例 = (V−20)(V−30) / V²。",
        "浓度由 80% 降到 40%，保留比 = 40/80 = 1/2，列方程 2(V−20)(V−30) = V²，化为 V² − 100V + 1200 = 0。",
        "求根 V = (100 ± √5200)/2 = 50 ± 10√13 ≈ 86.06 或 13.94。第二次要倒 30 升故 V > 30，取 V ≈ 86.06 升（精确值 50 + 10√13）。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "设原来体积",
              "rhs": "V 升，浓度 80%",
              "status": "keep"
            },
            {
              "lhs": "第一次保留",
              "rhs": "(V - 20) / V",
              "status": "keep"
            },
            {
              "lhs": "第二次保留",
              "rhs": "(V - 30) / V",
              "status": "keep"
            },
            {
              "lhs": "最终浓度",
              "rhs": "80% × (V-20)/V × (V-30)/V = 40%",
              "status": "keep"
            },
            {
              "lhs": "化简",
              "rhs": "(V-20)(V-30) / V² = 0.5",
              "status": "keep"
            }
          ],
          "caption": "根据操作过程列出方程"
        },
        {
          "kind": "svg",
          "svg": svg1,
          "caption": "根据操作顺序列出方程，解二次方程求 V"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🧪",
              "count": "86.06",
              "label": "原来体积（升）"
            }
          ],
          "caption": "原来约有 86.06 升，浓度为 80%"
        }
      ]
    }
  ],
  "variant": {
    "question": "一桶 80% 的酒精溶液共 40 升。第一次倒出 10 升再用水加满；第二次倒出 20 升再用水加满。最终浓度是多少？（填百分数，如 30）",
    "fields": [
      {
        "key": "percent",
        "label": "最终浓度（%）"
      }
    ],
    "answer": {
      "percent": 30
    },
    "hint": "酒精保留比例 = (40−10)(40−20) / 40² = 3/8，最终浓度 = 80% × 3/8 = 30%。"
  },
  "tags": [
    "逆向推理"
  ]
} satisfies ProblemData;
