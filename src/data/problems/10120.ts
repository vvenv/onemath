import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10120-1.svg?raw";
import svg2 from "./figures/10120-2.svg?raw";

export default {
  "id": "10120",
  "title": "共角三角形·平行四边形四角延伸",
  "grade": "六年级",
  "module": "geometry",
  "difficulty": "挑战",
  "question": "如图，平行四边形 ABCD 的面积为 2。把它的四条边依次向外延伸：在 AB 延长线上取 E，使 BE = AB；在 BC 延长线上取 F，使 CF = 2·CB；在 CD 延长线上取 G，使 DG = 3·DC；在 DA 延长线上取 H，使 AH = 4·AD。连接 EFGH 得到一个四边形。求四边形 EFGH 的面积。",
  "figures": [
    {
      "svg": svg1,
      "caption": "平行四边形 ABCD（阴影）及其四条边依次向外延伸得到的 E、F、G、H",
      "alt": "平行四边形及其四周延伸点构成的四边形"
    }
  ],
  "solutions": [
    {
      "key": "bird-head-sum",
      "label": "四个角上的共角三角形相加",
      "steps": [
        "分析：四边形 EFGH 可以拆成中间的平行四边形 ABCD 加上四个「角上」的三角形：△AHE、△BEF、△CFG、△DGH。在 ABCD 的每个顶点处，相邻两条延长线与顶点构成一个共角三角形（鸟头模型，互补型），可以直接由夹边乘积比求出面积。",
        "第一步：取参考。平行四边形 ABCD 的一条对角线把它分成两个面积相等的三角形，每个面积为 1。以下所用的 △ABD、△ABC、△BCD、△CDA 都各占 ABCD 的一半，面积都等于 1。",
        "第二步：顶点 A 处 △AHE。AH = 4·AD，AE = 2·AB（因 BE = AB，所以 AE = AB + BE = 2AB）。∠HAE 与 ∠DAB 互补，△AHE : △DAB = (AH · AE) : (AD · AB) = 4 · 2 = 8 ⇒ △AHE = 8 × 1 = 8。",
        "第三步：顶点 B 处 △BEF。BE = AB，BF = 3·BC（F 在 BC 延长线且 CF = 2BC，所以 BF = BC + CF = 3BC）。△BEF : △ABC = (BE · BF) : (BA · BC) = 1 · 3 = 3 ⇒ △BEF = 3 × 1 = 3。",
        "第四步：顶点 C 处 △CFG。CF = 2·CB，CG = 4·CD（G 在 CD 延长线且 DG = 3DC，所以 CG = CD + DG = 4CD）。△CFG : △BCD = (CF · CG) : (CB · CD) = 2 · 4 = 8 ⇒ △CFG = 8 × 1 = 8。",
        "第五步：顶点 D 处 △DGH。DG = 3·DC，DH = 5·DA（H 在 DA 延长线且 AH = 4AD，所以 DH = DA + AH = 5DA）。△DGH : △CDA = (DG · DH) : (DC · DA) = 3 · 5 = 15 ⇒ △DGH = 15 × 1 = 15。",
        "第六步：把所有部分加起来。EFGH = ABCD + △AHE + △BEF + △CFG + △DGH = 2 + 8 + 3 + 8 + 15 = 36。",
        "结论：四边形 EFGH 的面积为 36，是 ABCD 的 18 倍。"
      ],
      "scenes": [
        {
          "kind": "equation-list",
          "rows": [
            {
              "lhs": "顶点 A：AH·AE / AD·AB",
              "rhs": "4 · 2 = 8",
              "note": "△AHE = 8 × 1"
            },
            {
              "lhs": "顶点 B：BE·BF / BA·BC",
              "rhs": "1 · 3 = 3",
              "note": "△BEF = 3 × 1"
            },
            {
              "lhs": "顶点 C：CF·CG / CB·CD",
              "rhs": "2 · 4 = 8",
              "note": "△CFG = 8 × 1"
            },
            {
              "lhs": "顶点 D：DG·DH / DC·DA",
              "rhs": "3 · 5 = 15",
              "note": "△DGH = 15 × 1"
            },
            {
              "lhs": "EFGH = 2 + 8 + 3 + 8 + 15",
              "rhs": "36",
              "badge": "答案"
            }
          ],
          "caption": "四个角上分别套用互补型鸟头定理，再与中间平行四边形相加"
        },
        {
          "kind": "svg",
          "svg": svg2,
          "caption": "EFGH 拆成 ABCD + 四个共角三角形，面积依次为 2, 8, 3, 8, 15"
        },
        {
          "kind": "result-badges",
          "items": [
            {
              "icon": "🔷",
              "count": 36,
              "label": "EFGH 面积"
            },
            {
              "icon": "📐",
              "count": "18 : 1",
              "label": "EFGH : ABCD"
            }
          ]
        }
      ]
    }
  ],
  "variant": {
    "question": "平行四边形 ABCD 面积为 3。把它四条边依次向外延长：BE = AB，CF = CB，DG = DC，AH = AD。求四边形 EFGH 的面积。",
    "fields": [
      {
        "key": "area",
        "label": "EFGH 面积",
        "type": "number"
      }
    ],
    "answer": {
      "area": 15
    },
    "hint": "四个角上的共角三角形：每个顶点处 AH·AE / AD·AB 之类的比都是 1·2 = 2 或 2·1 = 2（四个角同为互补型），四个三角形都等于相应半平行四边形的 2 倍，即每个 3 × 2 / 2 = 3；EFGH = 3 + 4 × 3 = 15。"
  },
  "tags": [
    "鸟头模型",
    "等积变形"
  ]
} satisfies ProblemData;
