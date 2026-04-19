import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10133-1.svg?raw";

export default {
  "id": "10133",
  "title": "相似模型·长方形内沙漏切小三角形",
  "grade": "五年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，长方形 ABCD 的面积为 12。E 在边 CD 上，且 DE : EC = 1 : 2。连接 AE 与对角线 BD 相交于点 F。求三角形 DEF 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "长方形 ABCD（面积 12）；E 在 CD 上，DE : EC = 1 : 2；AE 与 BD 交于 F（阴影为 △DEF）",
      "alt": "长方形内 AE 与 BD 相交形成的小三角形 DEF"
    }
  ],
  "solutions": [
    {
      "key": "hourglass",
      "label": "沙漏相似 + 等高三角形",
      "steps": [
        "分析：AB ∥ DE（都在长方形的对边上），在 F 处形成沙漏：△ABF ∼ △EDF。由相似比可得 DF : FB，再与底比结合算出 △DEF。",
        "第一步：AB = CD = DE + EC = DE + 2DE = 3DE，所以 AB : DE = 3 : 1。",
        "第二步：由沙漏相似 △ABF ∼ △EDF，BF : FD = AB : DE = 3 : 1，即 DF : DB = 1 : 4。",
        "第三步：求 △BDE。△BDE 以 DE 为底，高 = 长方形的宽 BC（因 E 在 CD 上、B 在 AB 上对面）。所以 △BDE : △BDC = DE : DC = 1 : 3 ⇒ △BDE = △BDC × 1/3 = (长方形 / 2) × 1/3 = 6 × 1/3 = 2。",
        "第四步：△DEF 与 △DEB 同以 DE 为公共底，顶点 F、B 在直线 DB 上 ⇒ 面积比 = DF : DB = 1 : 4 ⇒ △DEF = 2 × 1/4 = 1/2。",
        "结论：三角形 DEF 的面积为 1/2。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "AB : DE",
              "rhs": "3 : 1"
            },
            {
              "lhs": "DF : DB",
              "rhs": "1 : 4",
              "note": "沙漏相似推论"
            },
            {
              "lhs": "△BDE = (长方形/2) × 1/3",
              "rhs": "2"
            },
            {
              "lhs": "△DEF = 2 × (DF/DB)",
              "rhs": "1/2",
              "badge": "答案"
            }
          ],
          "caption": "沙漏定位 F，再按底比缩放"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "📐",
              "count": "1/2",
              "label": "△DEF 面积"
            }
          ]
        }
      ]
    },
    {
      "key": "coord",
      "label": "坐标法校核",
      "steps": [
        "分析：取 A 为原点，建系验证。",
        "建系：取长方形宽 b、高 h 满足 bh = 12；具体取 b = 6, h = 2（不影响结论）。A(0,0), B(6,0), C(6,2), D(0,2), E = (2, 2)（因为 DE = DC/3 = 2）。",
        "直线 AE：y = x；直线 BD：y = 2 − x/3。",
        "联立 x = 2 − x/3 ⇒ 4x/3 = 2 ⇒ x = 3/2, y = 3/2。F = (3/2, 3/2)。",
        "△DEF 面积 = (1/2)|0·(2 − 3/2) + 2·(3/2 − 2) + 3/2·(2 − 2)| = (1/2)|−1| = 1/2。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "F",
              "rhs": "(3/2, 3/2)"
            },
            {
              "lhs": "△DEF",
              "rhs": "1/2",
              "badge": "验证"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "长方形 ABCD 的面积为 24。E 在 CD 上且 DE : EC = 1 : 3。AE 与对角线 BD 交于 F。求 △DEF 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△DEF 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 0.6
    },
    "hint": "AB : DE = 4 : 1（因为 DC = 4 DE），所以沙漏相似给 DF : DB = 1 : 5。△BDE = (24/2) × (DE/DC) = 12 × 1/4 = 3；△DEF = 3 × (DF/DB) = 3 × 1/5 = 3/5 = 0.6。"
  },
  "tags": [
    "相似模型",
    "面积法"
  ]
} satisfies ProblemData;
