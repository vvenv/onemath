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
        "分析：两条对角线把梯形分成 4 个三角形：△AOB（顶）、△BOC 与 △AOD（左右两侧）、△COD（底）。对于任意梯形，有两条关键结论：(1) △BOC = △AOD（由于 AB ∥ CD，△ABC = △ABD，同减去 △AOB 得 △BOC = △AOD）；(2) △AOB · △COD = △BOC · △AOD（蝴蝶定理）。",
        "第一步：由结论 (1)，△AOD = △BOC = 35。",
        "第二步：由结论 (2)，△AOB · △COD = △BOC · △AOD = 35 × 35 = 1225。",
        "第三步：△COD = 1225 ÷ 25 = 49。",
        "第四步：梯形总面积 = 25 + 35 + 35 + 49 = 144。"
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
      "label": "由比例直接得到",
      "steps": [
        "分析：梯形蝴蝶还有一个更直观的形式——△AOB : △BOC = AO : OC（两三角形同以 OB 为公共边），而 AO : OC = AB : CD。因此可以从相邻两块的比直接推出上下底之比。",
        "第一步：△AOB : △BOC = 25 : 35 = 5 : 7，所以 AB : CD = 5 : 7。",
        "第二步：△AOB : △COD = (AB)² : (CD)² = 25 : 49，所以 △COD = 25 × 49/25 = 49。",
        "第三步：△AOD = △BOC = 35。总面积 = 25 + 35 + 35 + 49 = 144。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "AB : CD = 25 : 35",
              "rhs": "5 : 7"
            },
            {
              "lhs": "△COD : △AOB = 49 : 25",
              "rhs": "△COD = 49"
            },
            {
              "lhs": "总面积",
              "rhs": "144",
              "badge": "验证"
            }
          ]
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
    "蝴蝶模型"
  ]
} satisfies ProblemData;
