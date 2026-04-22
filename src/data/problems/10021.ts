import type { ProblemData } from "@/types/problem";
import svgV from "./figures/10021-v.svg?raw";

export default {
  "id": "10021",
  "title": "立体图形·挖洞后的表面积",
  "grade": "五年级",
  "module": "几何",
  "difficulty": "进阶",
  "question": "一个棱长为 4 厘米的正方体，在它的上下、前后、左右的正中位置各挖去一个棱长为 1 厘米的小正方体。挖洞后物体的表面积是多少平方厘米？",
  "solutions": [
    {
      "key": "surface",
      "label": "平移法",
      "steps": [
        "分析：原大正方体表面积 6 × 4² = 96 cm²。每个面中心挖一个棱长 1 的凹坑（未挖穿）时，外表面少了 1 × 1 = 1 cm²，却多出凹坑内部的 5 个 1 × 1 面，净增 5 − 1 = 4 cm²。",
        "6 个面各挖一坑共净增 6 × 4 = 24 cm²，总表面积 96 + 24 = 120 cm²。"
      ],
      "scenes": [
        {
          "kind": "cube-net",
          "face": {
            "rows": 4,
            "cols": 4,
            "holes": [
              {
                "row": 1,
                "col": 1
              }
            ]
          },
          "caption": "正方体展开图：6 个面中心各挖 1×1 的小坑（虚线方格）"
        },
        {
          "kind": "pit-diagram",
          "removed": [
            "top"
          ],
          "added": [
            "bottom",
            "front",
            "back",
            "left",
            "right"
          ],
          "caption": "每个凹坑：移除 1 个外表面（红），新增 5 个内表面（绿）→ 净增 4"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "原表面积",
              "value": 96,
              "max": 120,
              "tone": "muted"
            },
            {
              "label": "挖洞后表面积",
              "value": 120,
              "max": 120,
              "tone": "primary"
            }
          ],
          "caption": "挖洞后表面积从 96 增加到 120 平方厘米"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "⬜",
              "count": 6,
              "label": "挖坑数量"
            },
            {
              "icon": "➕",
              "count": 4,
              "label": "每个坑净增面积"
            },
            {
              "icon": "📐",
              "count": 120,
              "label": "最终表面积(cm²)"
            }
          ],
          "separator": "→",
          "caption": "6 个面各挖一坑，净增 6 × 4 = 24 cm²"
        }
      ]
    }
  ],
  "variant": {
    "question": "一个棱长 5 厘米的正方体，在它的前后、左右、上下分别打穿一个边长 1 厘米的正方形孔洞（对穿）。求剩下立体图形的表面积。",
    "figures": [
      {
        "svg": svgV,
        "caption": "棱长 5 的正方体，沿三条方向各打穿一条 1×1 的方形通道（三条通道在中心相交）",
        "alt": "正方体三方向对穿孔洞示意图"
      }
    ],
    "fields": [
      {
        "key": "area",
        "label": "表面积"
      }
    ],
    "answer": {
      "area": 174
    },
    "hint": "打通的情况下，减少的面积是 2 个面，但增加了内部的侧面积。"
  },
  "tags": ["平移法"]
} satisfies ProblemData;
