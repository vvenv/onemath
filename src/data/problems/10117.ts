import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10117-1.svg?raw";

export default {
  "id": "10117",
  "title": "等积变换·中线与比例交点",
  "grade": "五年级",
  "module": "几何",
  "difficulty": "进阶",
  "question": "如图，三角形 ABC 中，D 是 BC 的中点，E 在线段 AD 上且 AE : ED = 2 : 1。直线 BE 延长后与边 AC 相交于点 F。已知三角形 ABC 的面积为 60，求三角形 AEF 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "D 是 BC 的中点；E 在 AD 上使 AE : ED = 2 : 1；F 是 BE 与 AC 的交点",
      "alt": "三角形内的中线与比例点及交点 F"
    }
  ],
  "solutions": [
    {
      "key": "locate-F",
      "label": "先定位 F，再按比例缩放（等积变换）",
      "steps": [
        "分析：△AEF 的三个顶点里只有 F 在 AC 上、位置未知，所以先定 AF : FC。D 是 BC 中点使 △ABD = △ACD，再由 E 在 AD 上（AE : AD = 2 : 3）得 △ABE = △ACE = 20，说明 E 到 AB 与 AC 的「面积贡献」对称，从而 BE 的延长线 F 必为 AC 的中点。",
        "确定 AF : FC = 1 : 1 后，对 △AEF 做两步缩放：△ADF = △ADC · (AF/AC) = 30 · 1/2 = 15；△AEF = △ADF · (AE/AD) = 15 · 2/3 = 10。",
        "所以 △AEF = 10。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "△ABD = △ACD",
              "rhs": "30",
              "note": "D 是 BC 中点"
            },
            {
              "lhs": "△ABE = △ABD × 2/3",
              "rhs": "20"
            },
            {
              "lhs": "△ACE = △ACD × 2/3",
              "rhs": "20"
            },
            {
              "lhs": "由 △ABE = △ACE ⇒ AF : FC",
              "rhs": "1 : 1",
              "note": "F 是 AC 的中点"
            },
            {
              "lhs": "△ADF = 30 × 1/2",
              "rhs": "15"
            },
            {
              "lhs": "△AEF = 15 × 2/3",
              "rhs": "10",
              "badge": "答案"
            }
          ],
          "caption": "中点 + 比例点两步缩放即可得到答案"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "△ABC",
              "value": 60,
              "max": 60,
              "tone": "muted"
            },
            {
              "label": "△ACD",
              "value": 30,
              "max": 60,
              "tone": "muted"
            },
            {
              "label": "△ADF",
              "value": 15,
              "max": 60,
              "tone": "muted"
            },
            {
              "label": "△AEF",
              "value": 10,
              "max": 60,
              "tone": "primary"
            }
          ],
          "caption": "由 △ABC 向 △AEF 的两步缩放：先 ×1/2（取 AF=AC/2），再 ×2/3（取 AE=2AD/3）"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "📐",
              "count": 10,
              "label": "△AEF 面积"
            }
          ]
        }
      ]
    },
    {
      "key": "coord",
      "label": "坐标法验证",
      "steps": [
        "分析：取 A(0, 12)、B(0, 0)、C(10, 0)，△ABC = 60 与题意一致。D = (5, 0)，E = (10/3, 4)。",
        "BE 方程 y = (6/5)x；AC 方程 y = 12 − (6/5)x。联立得 F = (5, 6)，恰是 AC 中点。",
        "△AEF = (1/2)·|0·(4 − 6) + (10/3)·(6 − 12) + 5·(12 − 4)| = 10，与前解一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "E",
              "rhs": "(10/3, 4)"
            },
            {
              "lhs": "F = BE ∩ AC",
              "rhs": "(5, 6)",
              "note": "= AC 的中点"
            },
            {
              "lhs": "△AEF",
              "rhs": "10",
              "badge": "验证通过"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "三角形 ABC 的面积为 45。D 是 BC 的中点，E 在 AD 上使 AE : ED = 1 : 2。直线 BE 与 AC 交于 F。求三角形 AEF 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△AEF 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 3.75
    },
    "hint": "只要 D 是 BC 中点，△ABE 就总等于 △ACE，故 F 仍是 AC 的中点。两步缩放：△ADF = 22.5 × 1/2 = 11.25；△AEF = 11.25 × 1/3 = 3.75。"
  },
  "tags": [
    "等积变形",
    "面积法"
  ]
} satisfies ProblemData;
