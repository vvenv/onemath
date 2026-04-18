import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10115-1.svg?raw";
import svg2 from "./figures/10115-2.svg?raw";

export default {
  id: "10115",
  title: "等积变换·直角梯形内三角形（比例点）",
  grade: "六年级",
  module: "几何",
  difficulty: "挑战",
  question:
    "如图，直角梯形 ABCD 中，AD ∥ BC，AB ⊥ AD，AD = 5，BC = 7，AB = 8。E 是 AB 上一点，AE = 5（即 EB = 3）；F 是 CD 上一点，DF : FC = 2 : 3。\n求三角形 DEF 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "直角梯形内两个比例点 E、F 与 D 构成的三角形",
    },
  ],
  solutions: [
    {
      key: "split",
      label: "整体减去外围（等积变换）",
      steps: [
        {
          text: "分析：先求 △DEC（暂忽略 F），再按 F 在 DC 上的位置按底比缩放得到 △DEF。",
          scenes: [
            {
              kind: "svg",
              svg: svg2,
            },
          ],
        },
        {
          text: "梯形面积 = (5 + 7)·8/2 = 48；△ADE = (1/2)·5·5 = 12.5（∠A 直角）；△BCE = (1/2)·7·3 = 10.5（∠B 直角）；△DCE = 48 − 12.5 − 10.5 = 25。",
          scenes: [],
        },
        {
          text: "DF : DC = 2 : 5，△DEF 与 △DEC 同以 E 为顶、底共线 ⇒ △DEF = 25 · 2/5 = 10。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "梯形 ABCD",
                  rhs: "(5 + 7) × 8 ÷ 2",
                },
                {
                  lhs: "",
                  rhs: "48",
                },
                {
                  lhs: "△ADE",
                  rhs: "1/2 × 5 × 5",
                },
                {
                  lhs: "",
                  rhs: "12.5",
                },
                {
                  lhs: "△BCE",
                  rhs: "1/2 × 7 × 3",
                },
                {
                  lhs: "",
                  rhs: "10.5",
                },
                {
                  lhs: "△DEC",
                  rhs: "48 − 12.5 − 10.5 (等积变换：整体减去外围)",
                },
                {
                  lhs: "",
                  rhs: "25",
                },
                {
                  lhs: "△DEF",
                  rhs: "25 × (2/5)",
                },
                {
                  lhs: "",
                  rhs: "10",
                  status: "keep",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "coord",
      label: "坐标法",
      steps: [
        {
          text: "分析：取 A 作原点、AB 沿 x 轴、AD 沿 y 轴建系：A(0, 0)、B(8, 0)、D(0, 5)、C(8, 7)、E(5, 0)。\nDF : FC = 2 : 3 ⇒ F = D + (2/5)(C − D) = (16/5, 29/5)。",
          scenes: [],
        },
        {
          text: "行列式公式：△DEF = (1/2)|0·(0 − 29/5) + 5·(29/5 − 5) + (16/5)·(5 − 0)| = (1/2)·20 = 10。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "F",
                  rhs: "D + (2/5)(C − D)",
                },
                {
                  lhs: "",
                  rhs: "(16/5, 29/5)",
                },
                {
                  lhs: "△DEF",
                  rhs: "10 (行列式法)",
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
      "直角梯形 ABCD 中 AD ∥ BC，AB ⊥ AD，AD = 4，BC = 6，AB = 10。E 在 AB 上使 AE = 4；F 在 CD 上使 DF : FC = 1 : 4。求三角形 DEF 的面积。",
    fields: [
      {
        key: "area",
        label: "△DEF 面积",
        type: "number",
      },
    ],
    answer: {
      area: 4.8,
    },
    hint: "梯形面积 (4 + 6)·10/2 = 50；△ADE = (1/2)·4·4 = 8，△BCE = (1/2)·6·6 = 18；△DEC = 50 − 8 − 18 = 24。DF : DC = 1 : 5 ⇒ △DEF = 24/5 = 4.8。",
  },
  tags: ["等积变形", "面积法"],
} satisfies ProblemData;
