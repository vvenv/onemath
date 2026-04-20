import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10138-1.svg?raw";

export default {
  "id": "10138",
  "title": "燕尾模型·中点与三等分点组合",
  "grade": "六年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，三角形 ABC 中，D 是 AC 的中点，E、F 是 BC 的三等分点（BE = EF = FC，E 靠近 B）。连接 AE 与 BD 相交于点 M。已知 △ABC 的面积为 1，求四边形 CDMF 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "D 是 AC 中点；E、F 三等分 BC；M = AE ∩ BD（黄色为四边形 CDMF）",
      "alt": "三角形内中点 + 三等分点构造及围出的四边形"
    }
  ],
  "solutions": [
    {
      "key": "swallowtail",
      "label": "燕尾三块 + 两次底比",
      "steps": [
        "分析：M 是 AE 与 BD 这两条 塞瓦线 的交点。先用燕尾定理算出 M 把 △ABC 分成的三块比例，再把需要的 △ACM 按 D 的位置拆、把 △BCM 按 F 的位置拆即可得到 CDMF = △CDM + △CMF。",
        "第一步：燕尾。· 塞瓦线 AE（E 在 BC 上），BE : EC = 1 : 2 ⇒ △ABM : △ACM = 1 : 2。· 塞瓦线 BD（D 在 AC 上），AD : DC = 1 : 1 ⇒ △ABM : △BCM = 1 : 1。",
        "第二步：设 △ABM = 1k。则 △ACM = 2k、△BCM = 1k。总 △ABC = 4k = 1 ⇒ k = 1/4。",
        "第三步：把 △ACM 按 D 在 AC 上的位置拆。D 是 AC 中点 ⇒ △CDM : △ADM = DC : DA = 1 : 1 ⇒ △CDM = △ACM ÷ 2 = k = 1/4。",
        "第四步：把 △BCM 按 F 在 BC 上的位置拆。F 满足 CF : CB = 1 : 3 ⇒ △CFM : △BCM = CF : CB = 1 : 3 ⇒ △CFM = △BCM / 3 = k/3 = 1/12。",
        "第五步：CDMF = △CDM + △CMF = 1/4 + 1/12 = 3/12 + 1/12 = 4/12 = 1/3。",
        "结论：四边形 CDMF 的面积为 1/3。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "△ABM : △ACM : △BCM",
              "rhs": "1 : 2 : 1",
              "note": "燕尾"
            },
            {
              "lhs": "△CDM = △ACM × 1/2",
              "rhs": "1/4"
            },
            {
              "lhs": "△CFM = △BCM × 1/3",
              "rhs": "1/12"
            },
            {
              "lhs": "CDMF = 1/4 + 1/12",
              "rhs": "1/3",
              "badge": "答案"
            }
          ],
          "caption": "先用燕尾取块，再按底比两次缩放"
        },
        {
          "kind": "compare-bars",
          "rows": [
            {
              "label": "△ABM",
              "value": 1,
              "max": 4,
              "tone": "muted"
            },
            {
              "label": "△ACM",
              "value": 2,
              "max": 4,
              "tone": "muted"
            },
            {
              "label": "△BCM",
              "value": 1,
              "max": 4,
              "tone": "muted"
            },
            {
              "label": "CDMF",
              "value": 1.33,
              "max": 4,
              "tone": "primary"
            }
          ],
          "caption": "以 k = △ABC/4 为单位的分布"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🟨",
              "count": "1/3",
              "label": "CDMF 面积"
            }
          ]
        }
      ]
    },
    {
      "key": "coord",
      "label": "坐标法校核",
      "steps": [
        "建系：B(0, 0)、C(3, 0)、A(0, 3)（△ABC 面积 = 9/2）。",
        "D = (AC 中点) = (1.5, 1.5)；E = (1, 0)（BC 上距 B 的 1/3）；F = (2, 0)。",
        "直线 BD：y = x；直线 AE：y = 3 − 3x。联立 x = 3 − 3x ⇒ x = 3/4, y = 3/4 ⇒ M = (3/4, 3/4)。",
        "CDMF 面积（按 C → D → M → F 顺序 Shoelace）= (1/2)|3·1.5 − 1.5·0 + 1.5·0.75 − 0.75·1.5 + 0.75·0 − 2·0.75 + 2·0 − 3·0|= (1/2)|4.5 + 0 − 1.5 + 0| = 3/2。",
        "比 = (3/2) / (9/2) = 1/3。所以 △ABC = 1 时 CDMF = 1/3，与燕尾法一致。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "M",
              "rhs": "(3/4, 3/4)"
            },
            {
              "lhs": "CDMF / △ABC",
              "rhs": "1/3",
              "badge": "验证"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "三角形 ABC 面积为 60。D 是 AC 中点，E、F 三等分 BC（BE = EF = FC）。AE 与 BD 交于 M。求 △CFM 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△CFM 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 5
    },
    "hint": "燕尾比 △ABM:△ACM:△BCM = 1:2:1 ⇒ △BCM = 60/4 = 15；△CFM = △BCM × (CF/CB) = 15 × 1/3 = 5。"
  },
  "tags": [
    "燕尾模型",
    "等积变形"
  ]
} satisfies ProblemData;
