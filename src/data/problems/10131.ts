import type { ProblemData } from "@/types/problem";

export default {
  "id": "10131",
  "title": "相似模型·正方形中的沙漏与对角线",
  "grade": "六年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，正方形 ABCD 的边长为 6。E 是边 BC 的中点。连接 DE 与对角线 AC 相交于点 F。求三角形 DFC 的面积。",
  "figures": [
    {
      "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 260 260' font-size='12'><g fill='rgb(46 134 193 / 0.06)' stroke='#1B4F72'><rect x='30' y='30' width='180' height='180'/></g><g stroke='#5D6D7E' fill='none'><line x1='30' y1='30' x2='210' y2='210'/><line x1='30' y1='210' x2='210' y2='120'/></g><g fill='rgb(169 50 38 / 0.25)' stroke='#A93226'><polygon points='30,210 150,150 210,210'/></g><g fill='#2E86C1'><circle cx='30' cy='30' r='3'/><circle cx='210' cy='30' r='3'/><circle cx='210' cy='210' r='3'/><circle cx='30' cy='210' r='3'/><circle cx='210' cy='120' r='3'/><circle cx='150' cy='150' r='3'/></g><g fill='#1B4F72' text-anchor='middle'><text x='22' y='26'>A</text><text x='220' y='26'>B</text><text x='220' y='226'>C</text><text x='22' y='226'>D</text><text x='222' y='124'>E</text><text x='160' y='148'>F</text></g></svg>",
      "caption": "正方形 ABCD 边长 6；E 为 BC 中点；F = DE ∩ AC",
      "alt": "正方形内的中点连线与对角线交点"
    }
  ],
  "solutions": [
    {
      "key": "hourglass",
      "label": "沙漏相似定位 F",
      "steps": [
        "分析：AD ∥ BC（正方形的对边），所以在 F 点处，直线 AC 与直线 DE 形成「沙漏」的两组平行线之一：考察 △AFD 与 △CFE，它们通过对顶角 + 平行内错角形成相似。",
        "第一步：∠AFD = ∠CFE（对顶角）；AD ∥ CE（都在正方形的对边上） ⇒ ∠DAF = ∠ECF。故 △AFD ∼ △CFE。",
        "第二步：对应边 AD : CE = 6 : 3 = 2 : 1。所以 AF : FC = DF : FE = 2 : 1。",
        "第三步：用 AF : FC = 2 : 1 求 △DFC。△DAC 是正方形一半，面积 = 36 ÷ 2 = 18。F 在对角线 AC 上且 FC : AC = 1 : 3；△DFC 与 △DAC 同以 D 为顶点、底分别在 AC 上 ⇒ △DFC = 18 × 1/3 = 6。",
        "结论：三角形 DFC 的面积为 6。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "AD : CE",
              "rhs": "2 : 1",
              "note": "沙漏相似"
            },
            {
              "lhs": "AF : FC",
              "rhs": "2 : 1"
            },
            {
              "lhs": "△DAC = 正方形 / 2",
              "rhs": "18"
            },
            {
              "lhs": "△DFC = 18 × 1/3",
              "rhs": "6",
              "badge": "答案"
            }
          ],
          "caption": "用沙漏求得 F 在 AC 上的位置，再等高三角形按底比缩放"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔺",
              "count": 6,
              "label": "△DFC 面积"
            }
          ]
        }
      ]
    },
    {
      "key": "coord",
      "label": "坐标法校核",
      "steps": [
        "建系：A(0,6), B(6,6), C(6,0), D(0,0), E(6,3)。",
        "直线 DE：y = x/2；直线 AC：y = 6 − x。",
        "联立 x/2 = 6 − x ⇒ x = 4, y = 2；F = (4, 2)。",
        "△DFC 面积 = (1/2)|0·(2 − 0) + 4·(0 − 0) + 6·(0 − 2)| = 6。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "F",
              "rhs": "(4, 2)"
            },
            {
              "lhs": "△DFC",
              "rhs": "6",
              "badge": "验证"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "正方形 ABCD 边长为 12。E 是 BC 上一点，BE : EC = 2 : 1。DE 与对角线 AC 交于 F。求 △DFC 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△DFC 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 18
    },
    "hint": "AD : CE = 12 : 4 = 3 : 1 ⇒ AF : FC = 3 : 1 ⇒ FC = AC/4；△DFC = △DAC × 1/4 = 72 × 1/4 = 18。"
  },
  "tags": [
    "相似模型",
    "面积法"
  ]
} satisfies ProblemData;
