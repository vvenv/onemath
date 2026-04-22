import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10124-1.svg?raw";

export default {
  "id": "10124",
  "title": "蝴蝶模型·梯形对角线四块面积",
  "grade": "五年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，梯形 ABCD 中 AB ∥ CD，两条对角线 AC 与 BD 相交于点 O。已知三角形 AOB 的面积为 25，三角形 BOC 的面积为 35。求梯形 ABCD 的总面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "梯形 ABCD，AB ∥ CD，两条对角线交于 O；△AOB = 25，△BOC = 35",
      "alt": "梯形两条对角线交点及四个小三角形"
    }
  ],
  "solutions": [
    {
      "key": "butterfly",
      "label": "梯形蝴蝶模型",
      "steps": [
        "分析：两条对角线把梯形分成四块 △AOB、△BOC、△AOD、△COD。由 AB ∥ CD 得 △ABD = △ABC（等底同高），同减 △AOB 即 △AOD = △BOC；再由蝴蝶模型，△AOB · △COD = △BOC · △AOD。已知两块，用这两条结论就能补出另外两块。",
        "四块面积依次为 25、35、35、49，其中 △COD 这一块最大。",
        "答：梯形 ABCD 的面积为 144。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "△AOD",
              "rhs": "35",
              "note": "= △BOC（AB ∥ CD 的推论）"
            },
            {
              "lhs": "△AOB · △COD",
              "rhs": "35 × 35 = 1225",
              "note": "蝴蝶定理"
            },
            {
              "lhs": "△COD",
              "rhs": "1225 ÷ 25 = 49"
            },
            {
              "lhs": "梯形 = 25 + 35 + 35 + 49",
              "rhs": "144",
              "badge": "答案"
            }
          ],
          "caption": "两个结论联手即可求完四块面积"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "△AOB",
              "value": 25,
              "max": 50,
              "tone": "primary"
            },
            {
              "label": "△BOC",
              "value": 35,
              "max": 50,
              "tone": "muted"
            },
            {
              "label": "△AOD",
              "value": 35,
              "max": 50,
              "tone": "muted"
            },
            {
              "label": "△COD",
              "value": 49,
              "max": 50,
              "tone": "primary"
            }
          ],
          "caption": "梯形四块面积（合计 144）"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "🔷",
              "count": 144,
              "label": "梯形总面积"
            }
          ]
        }
      ]
    },
    {
      "key": "ratio",
      "label": "相似比直接得到",
      "steps": [
        "分析：△AOB 与 △BOC 共用边 OB（底在同一条直线 AC 上），面积比等于 AO : OC；而 AB ∥ CD 使 △AOB ∽ △COD，相似比也是 AO : OC = AB : CD。所以从 △AOB : △BOC = 25 : 35 就能读出上下底之比，再用面积比 = 相似比² 求出 △COD。",
        "答：梯形 ABCD 的面积为 144。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "AB : CD",
              "rhs": "25 : 35 = 5 : 7",
              "note": "= △AOB : △BOC"
            },
            {
              "lhs": "△COD",
              "rhs": "25 × (7/5)² = 49",
              "note": "面积比 = 相似比²"
            },
            {
              "lhs": "△AOD",
              "rhs": "= △BOC = 35"
            },
            {
              "lhs": "梯形 = 25 + 35 + 35 + 49",
              "rhs": "144",
              "badge": "答案"
            }
          ],
          "caption": "抓住 AB : CD = 5 : 7，四块面积一步到位"
        }
      ]
    }
  ],
  "variant": {
    "question": "梯形 ABCD 中 AB ∥ CD，对角线交于 O。已知三角形 AOB 的面积为 4，三角形 BOC 的面积为 6。求梯形的总面积。",
    "fields": [
      {
        "key": "area",
        "label": "梯形面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 25
    },
    "hint": "△AOD = △BOC = 6；△AOB · △COD = 6 × 6 ⇒ △COD = 9；总和 = 4+6+6+9 = 25。"
  },
  "tags": [
    "蝴蝶模型",
    "相似模型",
    "比例法"
  ]
} satisfies ProblemData;
