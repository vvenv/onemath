import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10113-1.svg?raw";
import svgV from "./figures/10113-v.svg?raw";

export default {
  id: "10113",
  title: "等积变换·三次取中点",
  grade: "五年级",
  module: "几何",
  difficulty: "基础",
  question:
    "如图，三角形 ABC 中，D、E、F 分别是 BC、AC、AD 的中点。已知三角形 ABC 的面积为 24，求三角形 DEF 的面积。",
  figures: [
    {
      svg: svg1,
      caption: "△ABC 中 D、E、F 分别为 BC、AC、AD 的中点（图中阴影为 △DEF）",
      alt: "三角形 ABC 及其内部三中点构成的三角形 DEF",
    },
  ],
  solutions: [
    {
      key: "halving",
      label: "逐次取中点·面积减半",
      steps: [
        {
          text: "分析：D 是 BC 中点，E 是 CA 中点，F 是 AD 中点。中点连线把三角形分成两个等面积的部分——这是等积变换最基本的用法：等底等高面积相等。",
          scenes: [],
        },
        {
          text: "第一步：D 是 BC 中点 ⇒ △ABD 与 △ADC 等底等高，面积都是 24 ÷ 2 = 12。",
          scenes: [],
        },
        {
          text: "第二步：看 △ADC，E 是 AC 中点 ⇒ 中线 DE 把 △ADC 分成 △ADE 与 △DEC 两个等面积的三角形，各为 12 ÷ 2 = 6。",
          scenes: [],
        },
        {
          text: "第三步：看 △ADE，F 是 AD 中点 ⇒ 中线 EF 把 △ADE 分成 △AEF 与 △DEF 两个等面积的三角形，各为 6 ÷ 2 = 3。",
          scenes: [],
        },
        {
          text: "结论：三角形 DEF 的面积 = 3。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "△ABC (已知)",
                  rhs: "24",
                },
                {
                  lhs: "△ADC = 24 ÷ 2 (D 为 BC 中点)",
                  rhs: "12",
                },
                {
                  lhs: "△ADE = 12 ÷ 2 (E 为 AC 中点)",
                  rhs: "6",
                },
                {
                  lhs: "△DEF = 6 ÷ 2 (F 为 AD 中点，答案)",
                  rhs: "3",
                },
              ],
              caption: "三次取中点，每次面积减半",
            },
            {
              kind: "compare-bars",
              rows: [
                {
                  label: "△ABC",
                  value: 24,
                  max: 24,
                  tone: "muted",
                },
                {
                  label: "△ADC",
                  value: 12,
                  max: 24,
                  tone: "muted",
                },
                {
                  label: "△ADE",
                  value: 6,
                  max: 24,
                  tone: "muted",
                },
                {
                  label: "△DEF",
                  value: 3,
                  max: 24,
                  tone: "primary",
                },
              ],
              caption: "面积逐层减半的可视化",
            },
            {
              kind: "result-badges",
              items: [
                {
                  icon: "📐",
                  count: 3,
                  label: "△DEF 面积",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "ratio",
      label: "比例连乘",
      steps: [
        {
          text: "分析：三次取中点相当于三次把面积乘以 1/2，可以一次性写成比例连乘。",
          scenes: [],
        },
        {
          text: "△DEF 占 △ADE 的 1/2（F 是 AD 中点，EF 为 △ADE 的中线）。",
          scenes: [],
        },
        {
          text: "△ADE 占 △ADC 的 1/2（E 是 AC 中点，DE 为 △ADC 的中线）。",
          scenes: [],
        },
        {
          text: "△ADC 占 △ABC 的 1/2（D 是 BC 中点，AD 为 △ABC 的中线）。",
          scenes: [],
        },
        {
          text: "因此 △DEF = (1/2)³ × △ABC = 24 × 1/8 = 3。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                {
                  lhs: "△DEF : △ABC",
                  rhs: "1/2 × 1/2 × 1/2 = 1/8",
                },
                {
                  lhs: "△DEF = 24 × 1/8 (答案)",
                  rhs: "3",
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
      "三角形 ABC 的面积为 80。D 是 BC 中点，E 是 AC 中点，F 是 AD 中点，G 是 EF 中点。求三角形 DEG 的面积。",
    figures: [
      {
        svg: svgV,
        caption: "D、E、F 沿用正题定义，G 为 EF 的中点；阴影为目标 △DEG",
        alt: "三角形 ABC 中连续取中点得到的小三角形 DEG",
      },
    ],
    fields: [
      {
        key: "area",
        label: "△DEG 面积",
        type: "number",
      },
    ],
    answer: {
      area: 5,
    },
    hint: "把四次取中点理解为面积连乘 1/2，也可一步步用等积变形推出。",
  },
  tags: ["等积变形"],
} satisfies ProblemData;
