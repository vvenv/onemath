import svg1 from "./figures/10116-1.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10116",
  title: "等积变换·两条边上的比例点",
  grade: "五年级",
  difficulty: "基础",
  module: "几何",
  question:
    "如图，在三角形 ABC 中，D 在 BC 上，且 BD = 2DC；E 在 AC 上，且 AE = 3EC。\n\n已知三角形 DEC 的面积为 3，求三角形 ABC 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "三角形 ABC 中两条边上的比例点构成的小三角形",
    },
  ],
  solutions: [
    {
      key: "ratio",
      label: "两次等积变换",
      steps: [
        {
          text: "分析：D 把 BC 分成 BD : DC = 2 : 1，所以 DC 占 BC 的 1/3；E 把 AC 分成 AE : EC = 3 : 1，所以 EC 占 AC 的 1/4。\n\n两条边上的“裁剪比例”可以依次应用。",
        },
        {
          text: "连 AD。△ADC 与 △ABC 同以 A 为顶点，底分别是 DC 与 BC，底在同一直线上 ⇒ 等高 ⇒ △ADC = △ABC × (DC / BC) = △ABC × 1/3。",
        },
        {
          text: "在 △ADC 中，E 在 AC 上。△DEC 与 △ADC 同以 D 为顶点，底分别是 EC 与 AC ⇒ △DEC = △ADC × (EC / AC) = △ADC × 1/4。",
        },
        {
          text: "连乘 △DEC = △ABC × (1/3) × (1/4) = △ABC × 1/12。",
        },
        {
          text: "代入：3 = △ABC × 1/12 ⇒ △ABC = 36。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "DC / BC (BD = 2DC)", rhs: "1/3" },
                { lhs: "EC / AC (AE = 3EC)", rhs: "1/4" },
                { lhs: "△DEC : △ABC", rhs: "1/3 × 1/4 = 1/12" },
                { lhs: "△ABC = 3 × 12", rhs: "36" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "△DEC", value: 3, max: 36, tone: "primary" },
                { label: "△ADC", value: 12, max: 36, tone: "muted" },
                { label: "△ABC", value: 36, max: 36, tone: "muted" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "在三角形 ABC 中，D 在 BC 上使 BD = 3DC，E 在 AC 上使 AE = 4EC。已知三角形 DEC 的面积为 2，求三角形 ABC 的面积。",
    fields: [
      {
        key: "area",
        label: "△ABC 面积",
        type: "number",
      },
    ],
    answer: {
      area: 40,
    },
    hint: "△DEC : △ABC = (DC/BC) × (EC/AC) = (1/4) × (1/5) = 1/20。",
  },
  tags: ["等积变形"],
} satisfies ProblemData;
