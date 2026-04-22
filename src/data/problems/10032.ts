import type { ProblemData } from "@/types/problem";
import coverSvg from "./figures/10032-cover.svg?raw";
import step1Svg from "./figures/10032-step-1.svg?raw";
import step2Svg from "./figures/10032-step-2.svg?raw";
import step3Svg from "./figures/10032-step-3.svg?raw";

export default {
  "id": "10032",
  "title": "长方体切割·染色问题",
  "grade": "五年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "一个 5×4×3 的长方体木块，由 60 个棱长为 1 的小正方体组成。在其六个面上都涂上红色油漆，然后沿着小正方体的接缝将它全部切开。请问：恰好有两个面被涂成红色的小正方体有多少个？",
  "figures": [
    {
      "svg": coverSvg,
      "caption": "5×4×3 的长方体，由 60 个棱长为 1 的小正方体组成",
      "alt": "一个5乘4乘3的长方体三维示意图，表面被分割成小正方体"
    }
  ],
  "solutions": [
    {
      "key": "edges",
      "label": "棱块计数法",
      "steps": [
        "分析：两面涂色的小正方体都在棱上但不含两端顶点（顶点处是三面涂色）。长方体 12 条棱分 3 组，每组 4 条，长度分别为 5、4、3；每条棱上两面涂色的数量 = 棱长 − 2。",
        "各组相加：4 · (5−2) + 4 · (4−2) + 4 · (3−2) = 12 + 8 + 4 = 24 个。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": step1Svg,
          "caption": "步骤1：识别长棱。每条长棱有 5 个小方块，去掉两端的三面涂色方块（黄点），剩下 3 个两面涂色方块。4条长棱共 4 × 3 = 12 个。"
        },
        {
          "kind": "svg",
          "svg": step2Svg,
          "caption": "步骤2：中棱（宽方向的棱）。每条有 4 个小方块，去掉两端剩 2 个。4条中棱共 8 个。"
        },
        {
          "kind": "svg",
          "svg": step3Svg,
          "caption": "步骤3：高棱。每条有 3 个小方块，去掉两端剩 1 个。4条高棱共 4 个。"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🧊",
              "count": 12,
              "label": "长棱块"
            },
            {
              "icon": "🧊",
              "count": 8,
              "label": "中棱块"
            },
            {
              "icon": "🧊",
              "count": 4,
              "label": "高棱块"
            },
            {
              "icon": "✅",
              "count": 24,
              "label": "总计"
            }
          ],
          "caption": "两面涂色的小正方体总数 = 12 + 8 + 4 = 24 个"
        }
      ]
    }
  ],
  "variant": {
    "question": "将一个 6×6×6 的正方体表面涂色后切成小方块。一面涂色、两面涂色、三面涂色的各有多少个？",
    "fields": [
      {
        "key": "one_side",
        "label": "一面涂色"
      },
      {
        "key": "two_side",
        "label": "两面涂色"
      },
      {
        "key": "three_side",
        "label": "三面涂色"
      }
    ],
    "answer": {
      "one_side": 96,
      "two_side": 48,
      "three_side": 8
    },
    "hint": "一面涂色在面中心，两面涂色在棱中，三面涂色在顶点。"
  },
  "tags": []
} satisfies ProblemData;
