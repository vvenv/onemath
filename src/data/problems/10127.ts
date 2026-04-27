import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10127-1.svg?raw";

export default {
  "id": "10127",
  "title": "蝴蝶模型·一般四边形对角线四块",
  "grade": "六年级",
  "module": "几何",
  "difficulty": "挑战",
  "question": "如图，四边形 ABCD 的两条对角线 AC、BD 相交于点 O，把四边形分成四个三角形。已知三角形 AOB、BOC、COD 的面积依次是 4、6、9。求三角形 AOD 的面积以及四边形 ABCD 的总面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "一般四边形 ABCD，两条对角线交于 O",
      "alt": "四边形对角线分出的四个三角形"
    }
  ],
  "solutions": [
    {
      "key": "butterfly",
      "label": "蝴蝶模型（任意四边形都成立）",
      "steps": [
        "分析：对于任意两条相交线段 AC、BD 交于 O，在两端连成四边形 ABCD 后，四个小三角形的面积有一个很美的结构。设 OA = a₁, OC = a₂, OB = b₁, OD = b₂，设两对角线的夹角为 θ，则：△AOB = (1/2)·a₁·b₁·sinθ, △BOC = (1/2)·a₂·b₁·sinθ, △COD = (1/2)·a₂·b₂·sinθ, △AOD = (1/2)·a₁·b₂·sinθ。因此 △AOB · △COD = △BOC · △AOD，这就是蝴蝶模型——它对任意四边形都成立，不必是梯形。",
        "第一步：套公式。△AOB · △COD = △BOC · △AOD ⇒ 4 × 9 = 6 × △AOD ⇒ △AOD = 36 ÷ 6 = 6。",
        "第二步：总面积 = 4 + 6 + 9 + 6 = 25。",
        "附注：另一种看法——由 △AOB : △BOC = OA : OC = 4 : 6 = 2 : 3；再由 △AOD : △COD = OA : OC = 2 : 3 ⇒ △AOD = 9 × 2/3 = 6，与上一解法一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "△AOB · △COD",
              "rhs": "4 × 9 = 36",
              "badge": "蝴蝶"
            },
            {
              "lhs": "△BOC · △AOD",
              "rhs": "6 × △AOD"
            },
            {
              "lhs": "△AOD",
              "rhs": "36 ÷ 6 = 6"
            },
            {
              "lhs": "ABCD = 4 + 6 + 9 + 6",
              "rhs": "25",
              "badge": "答案"
            }
          ],
          "caption": "一个公式直接给出 △AOD，再加和即得总面积"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "△AOB",
              "value": 4,
              "max": 10,
              "tone": "muted"
            },
            {
              "label": "△BOC",
              "value": 6,
              "max": 10,
              "tone": "muted"
            },
            {
              "label": "△COD",
              "value": 9,
              "max": 10,
              "tone": "primary"
            },
            {
              "label": "△AOD",
              "value": 6,
              "max": 10,
              "tone": "primary"
            }
          ],
          "caption": "四块面积（总和 25）"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔺",
              "count": 6,
              "label": "△AOD"
            },
            {
              "icon": "🔷",
              "count": 25,
              "label": "ABCD 总面积"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "四边形 ABCD 两条对角线交于 O。已知 △AOB = 9，△BOC = 12，△COD = 16。求 △AOD 的面积与四边形总面积。",
    "fields": [
      {
        "key": "aod",
        "label": "△AOD",
        "type": "number"
      },
      {
        "key": "total",
        "label": "总面积",
        "type": "number"
      }
    ],
    "answer": {
      "aod": 12,
      "total": 49
    },
    "hint": "△AOD = (9 × 16) ÷ 12 = 12；总 = 9 + 12 + 16 + 12 = 49。"
  },
  "knowledgePoints": [
    {
      "slug": "butterfly-model",
      "name": "蝴蝶模型",
      "summary": "四边形两条对角线分出的四块，对角相乘相等；梯形里的面积比等于上下底平方比。",
    },
  ],
  "tags": [
    "蝴蝶模型"
  ]
} satisfies ProblemData;
