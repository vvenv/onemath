import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10128-1.svg?raw";

export default {
  "id": "10128",
  "title": "蝴蝶模型·正方形中点三连跳",
  "grade": "六年级",
  "module": "几何",
  "difficulty": "进阶",
  "question": "如图，正方形 ABCD 的边长为 10。E 是 AD 的中点；F 是线段 CE 的中点；G 是线段 BF 的中点。求三角形 BDG 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "正方形 ABCD 边长 10；E、F、G 依次为 AD、CE、BF 的中点",
      "alt": "正方形中三次取中点构成的三角形 BDG"
    }
  ],
  "solutions": [
    {
      "key": "coord",
      "label": "坐标法：把每个中点写出来",
      "steps": [
        "分析：建系 A(0, 10), B(10, 10), C(10, 0), D(0, 0)（正方形面积 100）。三次取中点用中点公式逐层求：E = (0, 5)，F = (CE 中点) = (5, 2.5)，G = (BF 中点) = (7.5, 6.25)。",
        "代入三角形面积公式 △BDG = (1/2)·|10·(0 − 6.25) + 0·(6.25 − 10) + 7.5·(10 − 0)| = (1/2)·|−62.5 + 75| = 6.25。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "E（AD 中点）",
              "rhs": "(0, 5)"
            },
            {
              "lhs": "F（CE 中点）",
              "rhs": "(5, 2.5)"
            },
            {
              "lhs": "G（BF 中点）",
              "rhs": "(7.5, 6.25)"
            },
            {
              "lhs": "△BDG",
              "rhs": "6.25",
              "badge": "答案"
            }
          ],
          "caption": "三次取中点，坐标一路平均即可"
        },
        {
          "kind": "result-badges",
          "layout": "label-first",
          "items": [
            {
              "icon": "📐",
              "count": 6.25,
              "label": "△BDG 面积"
            }
          ]
        }
      ]
    },
    {
      "key": "ratio",
      "label": "用「G 到 BD 的距离」几何求解",
      "steps": [
        "分析：△BDG 的底 BD 是正方形的对角线，长度固定；关键是找 G 到直线 BD 的距离。每一次取中点都会把「到 BD 的有向距离」按「两端的平均值」更新。",
        "第一步：把正方形放到坐标系，让 BD 为一条参考线——比如 B(10,10), D(0,0)，直线 BD 方程为 y = x。一点 (x, y) 到 BD 的垂直距离 = |y − x| / √2，但我们只用「y − x」来代表带正负号的距离（正值在 D 一侧，负值在 B 一侧无差）。",
        "第二步：记每个点的 (y − x) 值：A(0,10) → 10；B(10,10) → 0；C(10,0) → −10；D(0,0) → 0；E(0,5) → 5；F(5,2.5) → −2.5；G(7.5,6.25) → −1.25。",
        "第三步：G 到 BD 的带号距离对应 (y − x) = −1.25，绝对值 1.25；换成真实垂直距离 = 1.25 / √2。",
        "第四步：BD 长度 = 10√2；△BDG = (1/2) · 10√2 · (1.25/√2) = (1/2) · 10 · 1.25 = 6.25。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "|y_G − x_G|",
              "rhs": "1.25"
            },
            {
              "lhs": "BD = 10√2",
              "rhs": ""
            },
            {
              "lhs": "△BDG = 1/2 · 10 · 1.25",
              "rhs": "6.25",
              "badge": "验证"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "正方形 ABCD 边长 8，E 为 AD 中点，F 为 CE 中点，G 为 BF 中点。求三角形 BDG 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△BDG 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 4
    },
    "hint": "与本题同样方法：在边长 a 的正方形里 △BDG = a² / 16。代入 a = 8 得 4。"
  },
  "tags": [
    "蝴蝶模型",
    "面积法"
  ]
} satisfies ProblemData;
