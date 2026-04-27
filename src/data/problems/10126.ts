import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10126-1.svg?raw";
import svg2 from "./figures/10126-2.svg?raw";

export default {
  "id": "10126",
  "title": "蝴蝶模型·正六边形内对角线交点",
  "grade": "六年级",
  "module": "几何",
  "difficulty": "挑战",
  "question": "如图，正六边形 ABCDEF 的面积为 1。连接对角线 AC 与 BD，它们相交于点 P。求三角形 BCP 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "正六边形 ABCDEF；对角线 AC 与 BD 交于 P",
      "alt": "正六边形内两条对角线的交点"
    }
  ],
  "solutions": [
    {
      "key": "butterfly",
      "label": "四边形 ABCD 的蝴蝶模型",
      "steps": [
        "分析：P 是四边形 ABCD 的对角线交点。在正六边形里 ABCD 恰好是一个等腰梯形（AD ∥ BC，AD = 2·BC），且梯形面积 = 六边形的一半 = 1/2。对梯形套用蝴蝶模型即可。",
        "梯形蝴蝶分配：△BCP : △ADP : △ABP : △CDP = BC² : AD² : BC·AD : BC·AD = 1 : 4 : 2 : 2，四块之和 9·△BCP = 1/2。",
        "解得 △BCP = 1/18。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "梯形 ABCD 面积",
              "rhs": "1/2",
              "note": "六边形的一半"
            },
            {
              "lhs": "AD : BC",
              "rhs": "2 : 1",
              "note": "主对角线 : 边"
            },
            {
              "lhs": "△BCP : △ADP : △ABP : △CDP",
              "rhs": "1 : 4 : 2 : 2"
            },
            {
              "lhs": "9·△BCP = 1/2",
              "rhs": "△BCP = 1/18",
              "badge": "答案"
            }
          ],
          "caption": "梯形蝴蝶的 1 : 4 : 2 : 2 分配"
        },
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "黄色区域是梯形 ABCD，红色小三角是 △BCP"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "📐",
              "count": "1/18",
              "label": "△BCP 面积"
            }
          ]
        }
      ]
    },
    {
      "key": "coord",
      "label": "坐标法校核",
      "steps": [
        "分析：取边长 1 的正六边形，中心在原点，A(1, 0)、B(1/2, √3/2)、C(−1/2, √3/2)、D(−1, 0)。六边形面积 = 3√3/2。",
        "联立直线 AC 与 BD 得 P = (0, √3/3)；△BCP = (1/2)|1/2·(√3/2 − √3/3) + (−1/2)·(√3/3 − √3/2)| = √3/12。",
        "比例 △BCP : 六边形 = (√3/12) ÷ (3√3/2) = 1/18，与前解一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "P（AC ∩ BD）",
              "rhs": "(0, √3/3)"
            },
            {
              "lhs": "△BCP / 六边形",
              "rhs": "1/18",
              "badge": "验证"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "正六边形 ABCDEF 的面积为 36。连接 AC 与 BD，它们相交于 P。求三角形 ADP 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△ADP 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 8
    },
    "hint": "由 1 : 4 : 2 : 2 的分配，△ADP 占梯形 ABCD 的 4/9；梯形 = 六边形 ÷ 2 = 18；△ADP = 18 × 4/9 = 8。"
  },
  "tags": [
    "蝴蝶模型"
  ]
} satisfies ProblemData;
