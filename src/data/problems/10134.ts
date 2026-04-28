import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10134-1.svg?raw";

export default {
  id: "10134",
  title: "相似模型·正方形两中点连线所围四边形",
  grade: "六年级",
  module: "几何",
  difficulty: "挑战",
  question:
    "如图，正方形 ABCD 的边长为 12。E 是 AB 的中点，F 是 BC 的中点。连接 AF 与 CE 相交于点 G。求四边形 AGCD 的面积。",
  figures: [
    {
      svg: svg1,
      caption:
        "正方形 ABCD 边长 12；E、F 分别是 AB、BC 中点；G = AF ∩ CE（黄色为四边形 AGCD）",
      alt: "正方形内两条中点连线相交形成的四边形",
    },
  ],
  solutions: [
    {
      key: "split",
      label: "拆成 △ACD + △AGC",
      steps: [
        "分析：把 AGCD 沿对角线 AC 拆成两块：AC 下侧的 △ACD（正方形的一半）+ AC 上侧的 △AGC。只需定出 G 的位置。",
        "建系 A(0, 12), B(12, 12), C(12, 0), D(0, 0), E(6, 12), F(12, 6)。AF: y = 12 − x/2；CE: y = −2x + 24；联立得 G = (8, 8)。",
        "△ACD = 144/2 = 72；△AGC（A, G, C 三点）行列式 = (1/2)|0·(8−0) + 8·(0−12) + 12·(12−8)| = 24。AGCD = 72 + 24 = 96。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "正方形面积",
              rhs: "144",
            },
            {
              lhs: "△ACD = 144 / 2",
              rhs: "72",
            },
            {
              lhs: "G = AF ∩ CE",
              rhs: "(8, 8)",
            },
            {
              lhs: "△AGC",
              rhs: "24",
            },
            {
              lhs: "AGCD = 72 + 24",
              rhs: "96",
              badge: "答案",
            },
          ],
          caption: "用对角线 AC 把四边形分成两块",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "🔷",
              count: 96,
              label: "AGCD 面积",
            },
          ],
        },
      ],
    },
    {
      key: "complement",
      label: "整体减去两个小三角形（相似法）",
      steps: [
        "分析：AGCD 的补集是 AF、CE 切出的三块外围三角形 △ABG + △BFG + △FCG，用坐标直接算出三块即可反求 AGCD。",
        "由解法一得 G = (8, 8)。三块三角形的顶点面积（行列式法）：△ABG = (1/2)|0·(12−8) + 12·(8−12) + 8·(12−12)| = 24；△BFG = (1/2)|12·(6−8) + 12·(8−12) + 8·(12−6)| = 12；△FCG = (1/2)|12·(0−8) + 12·(8−6) + 8·(6−0)| = 12。",
        "补集合计 24 + 12 + 12 = 48，AGCD = 144 − 48 = 96，与前解一致。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "△ABG",
              rhs: "24",
            },
            {
              lhs: "△BFG",
              rhs: "12",
            },
            {
              lhs: "△FCG",
              rhs: "12",
            },
            {
              lhs: "AGCD = 144 − (24 + 12 + 12)",
              rhs: "96",
              badge: "验证",
            },
          ],
          caption: "补集法：正方形减去三块外围三角形",
        },
      ],
    },
  ],
  variant: {
    question:
      "正方形 ABCD 的边长为 6。E 是 AB 的中点，F 是 BC 的中点。AF 与 CE 相交于 G。求四边形 AGCD 的面积。",
    fields: [
      {
        key: "area",
        label: "AGCD 面积",
        type: "number",
      },
    ],
    answer: {
      area: 24,
    },
    hint: "用同样的方法可以证明 AGCD 总等于正方形面积的 2/3。边长 6 ⇒ 正方形 = 36，AGCD = 36 × 2/3 = 24。",
  },
  tags: ["相似模型", "等积变形"],
} satisfies ProblemData;
