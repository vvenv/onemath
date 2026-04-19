import type { ProblemData } from "@/types/problem";

export default {
  "id": "10117",
  "title": "等积变换·中线与比例交点",
  "grade": "五年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，三角形 ABC 中，D 是 BC 的中点，E 在线段 AD 上且 AE : ED = 2 : 1。直线 BE 延长后与边 AC 相交于点 F。已知三角形 ABC 的面积为 60，求三角形 AEF 的面积。",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 260' font-size='12'><g fill='none' stroke='#1B4F72'><polygon points='40,230 310,230 70,40'/></g><g stroke='#5D6D7E' fill='none'><line x1='70' y1='40' x2='175' y2='230'/><line x1='40' y1='230' x2='190' y2='135'/></g><g fill='#2E86C1'><circle cx='40' cy='230' r='3'/><circle cx='310' cy='230' r='3'/><circle cx='70' cy='40' r='3'/><circle cx='175' cy='230' r='3'/><circle cx='140' cy='166.7' r='3'/><circle cx='190' cy='135' r='3'/></g><g fill='#1B4F72' text-anchor='middle'><text x='32' y='245'>B</text><text x='318' y='245'>C</text><text x='70' y='32'>A</text><text x='175' y='246'>D</text><text x='128' y='162'>E</text><text x='200' y='132'>F</text></g><g fill='#566573' font-size='11' text-anchor='middle'><text x='110' y='245'>D 为 BC 中点</text><text x='190' y='180'>AE : ED = 2 : 1</text></g></svg>",
      "caption": "D 是 BC 的中点；E 在 AD 上使 AE : ED = 2 : 1；F 是 BE 与 AC 的交点",
      "alt": "三角形内的中线与比例点及交点 F"
    }
  ],
  "solutions": [
    {
      "key": "locate-F",
      "label": "先定位 F，再按比例缩放（等积变换）",
      "steps": [
        "分析：△AEF 的三个顶点里，A 是原顶点，E 在 AD 上（AE : AD = 2 : 3 已知），F 在 AC 上但位置未知——所以突破口是先求出 AF : FC。D 是 BC 中点会让 △ABE 与 △BCE 的面积相等，这是确定 F 位置的关键。",
        "第一步：D 是 BC 中点 ⇒ △ABD = △ACD = 60 ÷ 2 = 30。",
        "第二步：E 在 AD 上且 AE : AD = 2 : 3。以 AB 为公共边，△ABE 与 △ABD 的高之比 = AE : AD ⇒ △ABE = 30 × 2/3 = 20；同理 △ACE = 30 × 2/3 = 20。",
        "第三步：所以 △ABE = △ACE = 20，即点 E 到 AB、AC 两边的等价面积相同。延长 BE 到 AC 上的 F，考察 △ABF 与 △CBF：它们以 AF、FC 为底、同高（顶点都是 B），故 △ABF : △CBF = AF : FC。",
        "第四步：另一方面，△ABF 和 △CBF 共用高 BF 所在直线 = 高度不同；但都可以拆成 △ABE + △AEF 与 △CBE + △CEF。由 △ABE = △CBE = 20，且 △AEF : △CEF = AF : FC（E 为公共顶点、底共线），记 AF : FC = k，则 △ABF = 20 + k·t，△CBF = 20 + t（t = △CEF），且 △ABF : △CBF = k = (20 + kt)/(20 + t) ⇒ 20k + kt = 20 + kt ⇒ k = 1。故 AF : FC = 1 : 1，F 为 AC 的中点。",
        "第五步：逐层缩放得到 △AEF：△ADF = △ADC × (AF/AC) = 30 × 1/2 = 15；△AEF = △ADF × (AE/AD) = 15 × 2/3 = 10。",
        "所以 △AEF 的面积为 10。"
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
        "分析：把三角形放进坐标系能把所有交点、比例直接算出，是核算答案的稳妥办法。",
        "建系：取 A(0, 12)、B(0, 0)、C(10, 0)，则 △ABC = (1/2) × 10 × 12 = 60，与题意一致。",
        "D 是 BC 中点 ⇒ D = (5, 0)；E 在 AD 上且 AE : ED = 2 : 1 ⇒ E = (10/3, 4)。",
        "直线 BE：过 (0,0) 与 (10/3, 4)，方程 y = (6/5)x。",
        "直线 AC：过 (0, 12) 与 (10, 0)，方程 y = 12 − (6/5)x。",
        "联立：(6/5)x = 12 − (6/5)x ⇒ x = 5，y = 6 ⇒ F = (5, 6)。与 AC 两端距离相同，即 F 是 AC 的中点。",
        "△AEF 面积 = (1/2)|0·(4 − 6) + (10/3)·(6 − 12) + 5·(12 − 4)| = (1/2)|−20 + 40| = 10。"
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
