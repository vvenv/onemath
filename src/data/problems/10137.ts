import svg1 from "./figures/10137-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10137",
  title: "燕尾模型·三条 塞瓦线 围成的中心三角形",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，三角形 ABC 中：\n\n- D 在 AB 上使 BD = 2·DA（即 DA : DB = 1 : 2）\n- E 在 BC 上使 CE = 2·EB（即 EB : EC = 1 : 2）\n- F 在 CA 上使 AF = 2·FC（即 FC : FA = 1 : 2）\n\n连接三条塞瓦线 AE、BF、CD，它们两两相交形成一个中心小三角形 GHI。\n\n证明：△ABC 的面积恰好是 △GHI 面积的 7 倍。",
  figures: [
    {
      svg: svg1,
      alt: "三角形内三条 塞瓦线 围成的中心小三角形",
    },
  ],
  solutions: [
    {
      key: "routh-formula",
      label: "Routh 定理（选学）",
      steps: [
        {
          text: "分析：高中/竞赛中的 Routh 定理给出一般结论。",
        },
        {
          text: "设三条 塞瓦线 分别把三边分成比例 x = BD/DA = 2、y = CE/EB = 2、z = AF/FC = 2（沿同方向循环）。\n\n中心三角形与原三角形面积比为：△GHI / △ABC = (xyz − 1)² / [(xy + y + 1)(yz + z + 1)(zx + x + 1)]。",
        },
        {
          text: "代入 x = y = z = 2：分子 (2·2·2 − 1)² = 7² = 49；分母 (4 + 2 + 1)³ = 7³ = 343；比 = 49/343 = 1/7。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "x = y = z", rhs: "2" },
                {
                  lhs: "(xyz − 1)² / (xy + y + 1)³",
                  rhs: "49 / 343 = 1/7",
                  badge: "验证",
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
      "三角形 ABC 面积为 49。D、E、F 分别在 AB、BC、CA 上，且 BD = 2DA、CE = 2EB、AF = 2FC。三条塞瓦线 AE、BF、CD 围出中心三角形 GHI。\n\n求 △GHI 的面积。",
    fields: [
      {
        key: "area",
        label: "△GHI 面积",
        type: "number",
      },
    ],
    answer: {
      area: 7,
    },
    hint: "△GHI = △ABC / 7 = 49 / 7 = 7。",
  },
  tags: ["燕尾模型", "等积变形"],
} satisfies ProblemData;
