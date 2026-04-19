import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10114-1.svg?raw";
import svg2 from "./figures/10114-2.svg?raw";

export default {
  "id": "10114",
  "title": "等积变换·正方形三等分点三角形",
  "grade": "五年级",
  "module": "geometry",
  "difficulty": "进阶",
  "question": "如图，正方形 ABCD 的边长为 12。E、F、G 分别在 AB、BC、CD 上，且 AE = 8，BF = 8，CG = 8。连接 EF、FG、GE，求三角形 EFG 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "正方形 ABCD 边长 12；E、F、G 为三条边上的三等分点",
      "alt": "正方形内部由三等分点构成的三角形"
    }
  ],
  "solutions": [
    {
      "key": "cut",
      "label": "整体减去三角",
      "steps": [
        "分析：正方形面积为 12 × 12 = 144。把 △EFG 看作从正方形中「切掉」三块不属于它的区域剩下的。这三块恰好是两个直角三角形 △BEF、△CFG，以及一个四边形（梯形）AEGD。",
        "第一步：确定三个辅助图形的边长。AE = 8 ⇒ EB = 4；BF = 8 ⇒ FC = 4；CG = 8 ⇒ GD = 4。",
        "第二步：直角三角形 △BEF（直角顶点在 B）两直角边为 EB = 4，BF = 8；面积 = (1/2) × 4 × 8 = 16。",
        "第三步：直角三角形 △CFG（直角顶点在 C）两直角边为 FC = 4，CG = 8；面积 = (1/2) × 4 × 8 = 16。",
        "第四步：梯形 AEGD（平行边 AE = 8 与 DG = 4，高为 AD = 12）的面积 = (8 + 4) × 12 ÷ 2 = 72。",
        "第五步：△EFG = 144 − 16 − 16 − 72 = 40。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "正方形面积",
              "rhs": "12 × 12 = 144"
            },
            {
              "lhs": "△BEF",
              "rhs": "1/2 × 4 × 8 = 16"
            },
            {
              "lhs": "△CFG",
              "rhs": "1/2 × 4 × 8 = 16"
            },
            {
              "lhs": "梯形 AEGD",
              "rhs": "(8 + 4) × 12 ÷ 2 = 72"
            },
            {
              "lhs": "△EFG = 144 − 16 − 16 − 72",
              "rhs": "40",
              "badge": "答案"
            }
          ],
          "caption": "把 △EFG 还原为正方形减去三块外围区域"
        },
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "正方形被分成四块：两个直角三角形 + 一个梯形 + 目标三角形"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔺",
              "count": 40,
              "label": "△EFG 面积"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "正方形 ABCD 的边长为 10。E、F、G 分别在 AB、BC、CD 上，且 AE = 6，BF = 6，CG = 6。求三角形 EFG 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "△EFG 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 32
    },
    "hint": "用正方形面积减去两个直角三角形 △BEF、△CFG 以及梯形 AEGD。"
  },
  "tags": [
    "等积变形",
    "面积法"
  ]
} satisfies ProblemData;
