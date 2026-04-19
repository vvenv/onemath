import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10031-1.svg?raw";
import svg2 from "./figures/10031-2.svg?raw";
import svg3 from "./figures/10031-3.svg?raw";

export default {
  "id": "10031",
  "title": "梯形面积·蝴蝶模型",
  "grade": "四年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，四边形 ABCD 是一个梯形，上底 AD 长 4，下底 BC 长 8。对角线 AC 和 BD 相交于点 O。已知三角形 AOD 的面积是 10 平方厘米，那么梯形 ABCD 的总面积是多少平方厘米？",
  "figures": [
    {
      "svg": svg1,
      "caption": "梯形ABCD，AD∥BC，对角线AC和BD相交于点O",
      "alt": "梯形ABCD中，AD平行于BC，对角线AC和BD相交于点O，形成四个以O为顶点的三角形"
    }
  ],
  "solutions": [
    {
      "key": "butterfly",
      "label": "蝴蝶模型与等高模型",
      "steps": [
        "在梯形ABCD中，AD 平行于 BC。三角形AOD和三角形COB是相似三角形，边长比为 AD : BC = 4 : 8 = 1 : 2。",
        "根据相似三角形的性质，面积比等于边长比的平方。所以 S△AOD : S△COB = 1² : 2² = 1 : 4。",
        "因为S△AOD = 10，所以S△COB = 10 × 4 = 40 平方厘米。",
        "根据蝴蝶模型，在梯形的两翼，三角形AOB和三角形DOC的面积相等。且每个三角形的面积等于上下两个三角形面积乘积的平方根，即 √(S△AOD × S△COB)。",
        "S△AOB = S△DOC = √(10 × 40) = √400 = 20 平方厘米。",
        "梯形总面积 = S△AOD + S△COB + S△AOB + S△DOC = 10 + 40 + 20 + 20 = 90 平方厘米。"
      ],
      "scenes": [
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "步骤1：AD∥BC，所以△AOD和△COB相似。边长比4:8=1:2，面积比1:4。已知S₁=10，所以S₄=40。"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔺",
              "count": 10,
              "label": "S△AOD"
            },
            {
              "icon": "🔻",
              "count": 40,
              "label": "S△COB"
            }
          ],
          "separator": "→",
          "caption": "S△AOD = 10，所以 S△COB = 10 × 4 = 40"
        },
        {
          "kind": "svg",
          "svg": svg3,
          "caption": "步骤2：蝴蝶模型——两翼面积相等，且等于上下两个三角形面积乘积的平方根。S₂ = S₃ = √(10×40) = 20。"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔷",
              "count": 90,
              "label": "梯形总面积 (平方厘米)"
            }
          ],
          "caption": "总面积 = S₁ + S₂ + S₃ + S₄ = 10 + 20 + 20 + 40 = 90"
        }
      ]
    }
  ],
  "variant": {
    "question": "梯形ABCD中，AD//BC，对角线交于O。已知S△AOD=4，S△BOC=9，求S△AOB。",
    "fields": [
      {
        "key": "area",
        "label": "三角形AOB面积"
      }
    ],
    "answer": {
      "area": 6
    },
    "hint": "蝴蝶两翼面积相等，且等于上下两三角形面积之积的平方根。"
  },
  "tags": [
    "蝴蝶模型",
    "等积变形"
  ]
} satisfies ProblemData;
