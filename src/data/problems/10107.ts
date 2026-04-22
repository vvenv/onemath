import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10107-1.svg?raw";

export default {
  "id": "10107",
  "title": "三角辐射-封闭结合阵",
  "grade": "四年级",
  "module": "misc",
  "difficulty": "进阶",
  "question": "如图，一个三角形由 3 个顶点 + 3 个边中点 + 1 个中心点（三条中线的公共点）构成，共 7 个位置。把 1 到 7 各用一次填入这 7 个位置，要求满足以下两类条件都成立：(A) 三角形每条边上 3 个数字（两个顶点 + 1 个中点）之和都相等；(B) 从每个顶点出发经过中心到对边中点的 3 个位置（顶点 + 中心 + 对边中点）之和也都相等。\n请求出这两个公共和分别等于多少？中心点必须填几？",
  "figures": [
    {
      "svg": svg1,
      "caption": "三角形 3 顶点 + 3 边中点 + 1 中心 = 7 位置",
      "alt": "含中心的三角数阵"
    }
  ],
  "solutions": [
    {
      "key": "both",
      "label": "累加法 + 中心数法",
      "steps": [
        "分析：总和 28。对 3 条边累加得 3S₁ = 2V + M = V + (28 − c)；对 3 条中线累加（中心 c 属于 3 条中线，其余各属 1 条）得 3S₂ = V + M + 3c = 28 + 2c。",
        "S₂ 为整数需 c ≡ 1 (mod 3)，c ∈ {1, 4, 7}。取 c = 4 得 S₂ = 12；再令 V 为 3 的倍数，取 V = 12（例如顶点 {1, 5, 6}），则 S₁ = (12 + 24)/3 = 12。",
        "一种填法：中心 4，顶点 (1, 5, 6)，对应边中点 (2, 7, 3)，每边、每中线和均为 12。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "3S₁",
              "rhs": "V + 28 − c"
            },
            {
              "lhs": "3S₂",
              "rhs": "28 + 2c"
            },
            {
              "lhs": "c ∈",
              "rhs": "{1, 4, 7}"
            },
            {
              "lhs": "取 c=4",
              "rhs": "S₂=12；S₁=12（V=12 时）",
              "status": "keep"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "在 7 格含中心的三角阵中填 1–7，使 3 边和 S₁ 相等，3 中线和 S₂ 相等，且 S₁ = S₂。问中心填几？此时 S₁ 和顶点和 V 分别是多少？",
    "fields": [
      {
        "key": "center",
        "label": "中心 c",
        "type": "number"
      },
      {
        "key": "s",
        "label": "S₁ = S₂",
        "type": "number"
      }
    ],
    "answer": {
      "center": 4,
      "s": 12
    },
    "hint": "令 (1)(2) 中 S₁ = S₂ = S：V + 28 − c = 28 + 2c ⇒ V = 3c；结合 c ∈ {1,4,7} 并使 V 在合理范围，取 c = 4, V = 12, S = 12。"
  },
  "tags": [
    "累加法",
    "中心数法"
  ]
} satisfies ProblemData;
