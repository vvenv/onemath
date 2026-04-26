import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10032-1.svg?raw";

export default {
  "id": "10032",
  "title": "长方体切割·染色问题",
  "grade": "五年级",
  "module": "几何",
  "difficulty": "进阶",
  "question": "一个 5×4×3 的长方体木块，由 60 个棱长为 1 的小正方体组成。在其六个面上都涂上红色油漆，然后沿着小正方体的接缝将它全部切开。请问：恰好有两个面被涂成红色的小正方体有多少个？",
  "figures": [
    {
      "svg": svg1,
      "caption": "5×4×3 的长方体，由 60 个棱长为 1 的小正方体组成",
      "alt": "5乘4乘3长方体的等轴测示意图，三面被分割为单位小正方体"
    }
  ],
  "solutions": [
    {
      "key": "edges",
      "label": "按棱分类计数",
      "steps": [
        "长 5 的棱：(5−2)×4 = 12；长 4 的棱：(4−2)×4 = 8；长 3 的棱：(3−2)×4 = 4；合计 12+8+4 = 24 个。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            { "lhs": "长 5 的棱（共 4 条）", "rhs": "(5 − 2) × 4 = 12" },
            { "lhs": "长 4 的棱（共 4 条）", "rhs": "(4 − 2) × 4 = 8" },
            { "lhs": "长 3 的棱（共 4 条）", "rhs": "(3 − 2) × 4 = 4" },
            { "lhs": "合计", "rhs": "12 + 8 + 4 = 24", "badge": "24 个" }
          ],
          "caption": "按三组棱长分别计数，再相加得到两面涂色的小正方体总数"
        }
      ]
    }
  ],
  "variant": {
    "question": "将一个 6×6×6 的正方体表面涂色后切成小方块。一面涂色、两面涂色、三面涂色的各有多少个？",
    "fields": [
      { "key": "one_side", "label": "一面涂色" },
      { "key": "two_side", "label": "两面涂色" },
      { "key": "three_side", "label": "三面涂色" }
    ],
    "answer": {
      "one_side": 96,
      "two_side": 48,
      "three_side": 8
    },
    "hint": "一面涂色在面中心，两面涂色在棱中，三面涂色在顶点。"
  },
  "tags": ["分类讨论"]
} satisfies ProblemData;
