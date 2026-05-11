import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10126-1.svg?raw";

export default {
  id: "10126",
  title: "蝴蝶模型·正六边形内对角线交点",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，正六边形 ABCDEF 的面积为 1。连接对角线 AC 与 BD，它们相交于点 P。\n\n求三角形 BCP 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "正六边形内两条对角线的交点",
    },
  ],
  solutions: [
    {
      key: "butterfly",
      label: "四边形 ABCD 的蝴蝶模型",
      steps: [
        {
          text: "分析：P 是四边形 ABCD 的对角线交点。在正六边形里 ABCD 恰好是一个等腰梯形（AD ∥ BC，AD = 2·BC），且梯形面积 = 六边形的一半 = 1/2。\n\n对梯形套用蝴蝶模型即可。",
        },
        {
          text: "梯形蝴蝶分配：△BCP : △ADP : △ABP : △CDP = BC² : AD² : BC·AD : BC·AD = 1 : 4 : 2 : 2，四块之和 9·△BCP = 1/2。",
        },
        {
          text: "解得 △BCP = 1/18。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "梯形 ABCD 面积 (六边形的一半)", rhs: "1/2" },
                { lhs: "AD : BC (主对角线 : 边)", rhs: "2 : 1" },
                { lhs: "△BCP : △ADP : △ABP : △CDP", rhs: "1 : 4 : 2 : 2" },
                {
                  lhs: "9·△BCP = 1/2",
                  rhs: "△BCP = 1/18",
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
      "如图，正六边形 ABCDEF 的边长为 6。\n\n连接 AC、CE、EA，三条对角线两两相交形成中心小三角形 GHI。求三角形 GHI 的面积。",
    fields: [
      {
        key: "area",
        label: "△GHI 面积",
        type: "number",
      },
    ],
    answer: {
      area: 8,
    },
    hint: "由 1 : 4 : 2 : 2 的分配，△ADP 占梯形 ABCD 的 4/9；梯形 = 六边形 ÷ 2 = 18；△ADP = 18 × 4/9 = 8。",
  },
  tags: ["蝴蝶模型"],
} satisfies ProblemData;
