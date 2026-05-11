import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10120-1.svg?raw";

export default {
  id: "10120",
  title: "共角三角形·平行四边形四角延伸",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，平行四边形 ABCD 中，AB = 12，AD = 8。\n\nE 是 AD 上一点，AE = 3。连接 BE 并延长，与 CD 所在直线的延长线相交于点 F（F 在 D 的外侧）。求 DF 的长度。",
  figures: [
    {
      svg: svg1,
      alt: "平行四边形及其四周延伸点构成的四边形",
    },
  ],
  solutions: [
    {
      key: "bird-head-sum",
      label: "四个角上的共角三角形相加",
      steps: [
        {
          text: "分析：EFGH 可以拆成中间的平行四边形 ABCD 加上四个“角上”的共角三角形 △AHE、△BEF、△CFG、△DGH。\n\n每个顶点处两条延长线与原顶点夹角和平行四边形相应角互补，可以直接用鸟头模型（互补型）的夹边乘积比求面积。",
        },
        {
          text: "取 ABCD 一条对角线把它分成两块，每块面积 = 1（即 △ABD = △ABC = △BCD = △CDA = 1），作为四个角上共角三角形的参照。",
        },
        {
          text: "四角按夹边乘积比计算（详见 scenes 的 equation-list）：△AHE : △ABD = 4 · 2 = 8，△BEF : △ABC = 1 · 3 = 3，△CFG : △BCD = 2 · 4 = 8，△DGH : △CDA = 3 · 5 = 15；各自乘以参照 1 即为自身面积。",
        },
        {
          text: "EFGH = ABCD + 8 + 3 + 8 + 15 = 2 + 34 = 36，是 ABCD 的 18 倍。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "顶点 A：AH·AE / AD·AB (△AHE = 8 × 1)",
                  rhs: "4 · 2 = 8",
                },
                {
                  lhs: "顶点 B：BE·BF / BA·BC (△BEF = 3 × 1)",
                  rhs: "1 · 3 = 3",
                },
                {
                  lhs: "顶点 C：CF·CG / CB·CD (△CFG = 8 × 1)",
                  rhs: "2 · 4 = 8",
                },
                {
                  lhs: "顶点 D：DG·DH / DC·DA (△DGH = 15 × 1)",
                  rhs: "3 · 5 = 15",
                },
                {
                  lhs: "EFGH = 2 + 8 + 3 + 8 + 15",
                  rhs: "36",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "平行四边形 ABCD 面积为 3。\n\n把它四条边依次向外延长：BE = AB，CF = CB，DG = DC，AH = AD。求四边形 EFGH 的面积。",
    fields: [
      {
        key: "area",
        label: "EFGH 面积",
        type: "number",
      },
    ],
    answer: {
      area: 15,
    },
    hint: "四个角上的共角三角形：每个顶点处 AH·AE / AD·AB 之类的比都是 1·2 = 2 或 2·1 = 2（四个角同为互补型），四个三角形都等于相应半平行四边形的 2 倍，即每个 3 × 2 / 2 = 3；EFGH = 3 + 4 × 3 = 15。",
  },
  tags: ["鸟头模型", "等积变形"],
} satisfies ProblemData;
