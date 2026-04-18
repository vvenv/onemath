import svg1 from "./figures/10031-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10031",
  title: "梯形面积·蝴蝶模型",
  grade: "四年级",
  difficulty: "进阶",
  module: "几何",
  question:
    "如图，四边形 ABCD 是一个梯形，上底 AD 长 4，下底 BC 长 8。\n对角线 AC 和 BD 相交于点 O。\n已知三角形 AOD 的面积是 10 平方厘米，\n那么梯形 ABCD 的总面积是多少平方厘米？",
  figures: [
    {
      svg: svg1,
      alt: "梯形 ABCD 中，AD 平行于 BC，对角线 AC 和 BD 相交于点 O，形成四个以 O 为顶点的三角形",
    },
  ],
  solutions: [
    {
      key: "butterfly",
      label: "蝴蝶模型与等高模型",
      steps: [
        {
          text: "AD∥BC ⇒ △AOD∽△COB，边长比 4 : 8 = 1 : 2，面积比 1 : 4，故 S△COB = 40。\n蝴蝶模型：两翼各 √(10 × 40) = 20。\n总面积 10 + 40 + 20 + 20 = 90 cm²。",
          scenes: [
            {
              kind: "result-badges",
              items: [
                { icon: "🔺", count: 10, label: "S△AOD" },
                { icon: "🔻", count: 40, label: "S△COB" },
              ],
              separator: "→",

            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "🔷",
                  count: 90,
                  label: "梯形总面积",
                  note: "平方厘米",
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
      "梯形 ABCD 中，AD//BC，对角线交于 O。已知 S△AOD=4，S△BOC=9，求 S△AOB。",
    fields: [
      {
        key: "area",
        label: "三角形AOB面积",
      },
    ],
    answer: {
      area: 6,
    },
    hint: "蝴蝶两翼面积相等，且等于上下两三角形面积之积的平方根。",
  },
  tags: ["蝴蝶模型", "等积变形"],
} satisfies ProblemData;
