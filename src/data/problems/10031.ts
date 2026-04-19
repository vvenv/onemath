import type { ProblemData } from "@/types/problem";

export default {
  "id": "10031",
  "title": "梯形面积·蝴蝶模型",
  "grade": "四年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，四边形 ABCD 是一个梯形，上底 AD 长 4，下底 BC 长 8。对角线 AC 和 BD 相交于点 O。已知三角形 AOD 的面积是 10 平方厘米，那么梯形 ABCD 的总面积是多少平方厘米？",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 280' width='400' height='280'><polygon points='60,60 340,60 370,220 30,220' fill='none' stroke='currentColor'/><line x1='60' y1='60' x2='370' y2='220' stroke='currentColor' stroke-dasharray='6,3'/><line x1='340' y1='60' x2='30' y2='220' stroke='currentColor' stroke-dasharray='6,3'/><polygon points='60,60 340,60 200,132' fill='#f59e0b' fill-opacity='0.22' stroke='none'/><circle cx='200' cy='132' r='4' fill='currentColor'/><text x='45' y='50' font-size='16' fill='currentColor'>A</text><text x='348' y='50' font-size='16' fill='currentColor'>D</text><text x='378' y='235' font-size='16' fill='currentColor'>C</text><text x='8' y='235' font-size='16' fill='currentColor'>B</text><text x='210' y='138' font-size='14' fill='currentColor'>O</text><text x='200' y='50' font-size='13' fill='currentColor' text-anchor='middle'>4</text><text x='200' y='238' font-size='13' fill='currentColor' text-anchor='middle'>8</text><text x='200' y='95' font-size='13' fill='#b45309' text-anchor='middle' font-weight='bold'>S△AOD = 10</text></svg>",
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
          "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 280' width='400' height='280'><polygon points='60,60 340,60 370,220 30,220' fill='none' stroke='currentColor' stroke-opacity='0.35' stroke-dasharray='4,4'/><polygon points='60,60 30,220 200,132' fill='#f59e0b' fill-opacity='0.25' stroke='#fbbf24'/><polygon points='340,60 370,220 200,132' fill='#22c55e' fill-opacity='0.25' stroke='#4ade80'/><line x1='60' y1='60' x2='370' y2='220' stroke='currentColor' stroke-opacity='0.5' stroke-dasharray='6,3'/><line x1='340' y1='60' x2='30' y2='220' stroke='currentColor' stroke-opacity='0.5' stroke-dasharray='6,3'/><circle cx='200' cy='132' r='4' fill='currentColor'/><text x='45' y='50' font-size='16' fill='currentColor' fill-opacity='0.65'>A</text><text x='348' y='50' font-size='16' fill='currentColor' fill-opacity='0.65'>D</text><text x='378' y='235' font-size='16' fill='currentColor' fill-opacity='0.65'>C</text><text x='8' y='235' font-size='16' fill='currentColor' fill-opacity='0.65'>B</text><text x='210' y='138' font-size='14' fill='currentColor'>O</text><text x='200' y='35' font-size='12' fill='#fbbf24' text-anchor='middle' font-weight='bold'>△AOD (上) AD = 4</text><text x='200' y='250' font-size='12' fill='#4ade80' text-anchor='middle' font-weight='bold'>△COB (下) BC = 8</text><text x='130' y='140' font-size='14' fill='#fbbf24' text-anchor='middle' font-weight='bold'>S₁ = 10</text><text x='270' y='200' font-size='14' fill='#4ade80' text-anchor='middle' font-weight='bold'>S₄ = ?</text><text x='200' y='80' font-size='11' fill='currentColor' fill-opacity='0.7' text-anchor='middle'>AD ∥ BC → △AOD ∽ △COB</text><text x='200' y='98' font-size='11' fill='currentColor' fill-opacity='0.7' text-anchor='middle'>边长比 1 : 2 → 面积比 1 : 4</text></svg>",
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
          "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 280' width='400' height='280'><polygon points='60,60 340,60 370,220 30,220' fill='none' stroke='currentColor' stroke-opacity='0.35' stroke-dasharray='4,4'/><polygon points='60,60 340,60 200,132' fill='#3b82f6' fill-opacity='0.25' stroke='#60a5fa'/><polygon points='30,220 370,220 200,132' fill='#ef4444' fill-opacity='0.25' stroke='#f87171'/><line x1='60' y1='60' x2='370' y2='220' stroke='currentColor' stroke-opacity='0.5' stroke-dasharray='6,3'/><line x1='340' y1='60' x2='30' y2='220' stroke='currentColor' stroke-opacity='0.5' stroke-dasharray='6,3'/><circle cx='200' cy='132' r='4' fill='currentColor'/><text x='45' y='50' font-size='16' fill='currentColor' fill-opacity='0.65'>A</text><text x='348' y='50' font-size='16' fill='currentColor' fill-opacity='0.65'>D</text><text x='378' y='235' font-size='16' fill='currentColor' fill-opacity='0.65'>C</text><text x='8' y='235' font-size='16' fill='currentColor' fill-opacity='0.65'>B</text><text x='210' y='138' font-size='14' fill='currentColor'>O</text><text x='195' y='110' font-size='14' fill='#60a5fa' text-anchor='middle' font-weight='bold'>S₂ = ?</text><text x='200' y='195' font-size='14' fill='#f87171' text-anchor='middle' font-weight='bold'>S₃ = ?</text><text x='200' y='75' font-size='11' fill='currentColor' fill-opacity='0.7' text-anchor='middle'>蝴蝶模型：S₂ = S₃</text><text x='200' y='93' font-size='11' fill='currentColor' fill-opacity='0.7' text-anchor='middle'>S₂ = S₃ = √(S₁ × S₄) = √(10 × 40) = √400 = 20</text></svg>",
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
