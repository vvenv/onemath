import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10104-1.svg?raw";

export default {
  "id": "10104",
  "title": "五圆连环阵·1 到 9",
  "grade": "五年级",
  "module": "杂题",
  "difficulty": "进阶",
  "question": "如图，5 个圆连成一串：相邻两圆各共享 1 个位置（共 4 个『共享格』），其余每圆各有 1 个独占格（共 5 个『独占格』）。总位置数 = 5 + 4 = 9。把 1, 2, 3, …, 9 各用一次填入这 9 格，使每个圆内 2 个或 3 个位置上的数字之和都相等（最左、最右圆有 2 格：1 独占 + 1 共享；中间 3 个圆有 3 格：1 独占 + 2 共享）。请求出这个相等的圆和 S 的最小可能值与最大可能值。",
  "figures": [
    {
      "svg": svg1,
      "caption": "5 个圆串联，相邻 2 圆共享 1 格",
      "alt": "五圆连环示意"
    }
  ],
  "solutions": [
    {
      "key": "overlap",
      "label": "累加法",
      "steps": [
        "分析：5 个圆的和相加时，4 个共享格各算 2 次、5 个独占格各算 1 次，故 5S = 2T + (45 − T) = T + 45（T 为共享格总和，{1..9} 选 4 个，T ∈ [10, 30]）。",
        "S 为整数要 T 是 5 的倍数，故 T ∈ {10, 15, 20, 25, 30}，对应 S = 11, 12, 13, 14, 15；最小 11、最大 15。",
        "例 T = 10（共享 {1, 2, 3, 4}，独占 {5…9}）对应 S = 11；各 s_i 可用 s₁ + s₂ = 11 − a₂ 等链式关系反解。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "5S",
              "rhs": "T + 45"
            },
            {
              "lhs": "T 为 5 的倍数",
              "rhs": "T ∈ {10,15,20,25,30}"
            },
            {
              "lhs": "S ∈",
              "rhs": "{11,12,13,14,15}",
              "status": "keep"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "在五圆连环阵 (9 格) 中填 1–9 每数一次，所有圆和相等。最大 S 是多少？此时 4 个共享格上数字之和为多少？",
    "fields": [
      {
        "key": "max",
        "label": "最大 S",
        "type": "number"
      },
      {
        "key": "t",
        "label": "T",
        "type": "number"
      }
    ],
    "answer": {
      "max": 15,
      "t": 30
    },
    "hint": "5S = T + 45，T 最大为 6+7+8+9 = 30，S = 75/5 = 15。"
  },
  "tags": [
    "累加法",
    "比较法"
  ]
} satisfies ProblemData;
