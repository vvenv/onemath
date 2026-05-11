import svg1 from "./figures/10122-1.svg?raw";
import svgV from "./figures/10122-v.svg?raw";
import type { ProblemData } from "@/types/problem";

export default {
  id: "10122",
  title: "共角模型·多级比例点综合",
  grade: "六年级",
  difficulty: "挑战",
  module: "几何",
  question:
    "如图，三角形 ABC 的面积为 1。\n\nD 在 BC 上，且 BC = 5·BD；E 在 AC 上，且 AC = 4·EC（即 AE = 3·EC）。\n\n连接 DE；在线段 DE 上取两点 G、S，使 DG = GS = SE（即 G、S 把 DE 三等分）。连接 AG 并在 AG 上取点 F，使 AF = FG（F 为 AG 的中点）。\n\n求三角形 FGS 的面积。",
  figures: [
    {
      svg: svg1,
      alt: "三角形 ABC 中多级比例点构成的小三角形 FGS",
    },
  ],
  solutions: [
    {
      key: "shared-angle",
      label: "连续运用共角与等高三角形",
      steps: [
        {
          text: "分析：每一层都可以化为“同底等高比”或“共顶点底比”的缩放。\n\n按依赖顺序从大到小：△ABC → △ADC → △ADE → △ADG → △AGS → △FGS，每步都是一次比例乘法。",
        },
        {
          text: "逐层缩放（详见 scenes 的 equation-list）：△ADC = △ABC · DC/BC = 4/5；△ADE = △ADC · AE/AC = 3/5（同底 AD）；△ADG = △ADE · DG/DE = 1/5；△AGS = △ADG · GS/DG = 1/5（GS = DG）；△FGS = △AGS · FG/AG = 1/10（F 为 AG 中点）。",
        },
        {
          text: "结论：△FGS 的面积为 1/10。",
          scenes: [
            {
              kind: "equation-list",
              rows: [
                { lhs: "△ADC = △ABC × 4/5", rhs: "4/5" },
                { lhs: "△ADE = △ADC × 3/4", rhs: "3/5" },
                { lhs: "△ADG = △ADE × 1/3", rhs: "1/5" },
                { lhs: "△AGS = △ADG × (GS/DG) (GS = DG)", rhs: "1/5" },
                { lhs: "△FGS = △AGS × 1/2", rhs: "1/10" },
              ],
            },
            {
              kind: "compare-bars",
              rows: [
                { label: "△ABC", value: 1, max: 1, tone: "muted" },
                { label: "△ADE", value: 0.6, max: 1, tone: "muted" },
                { label: "△ADG", value: 0.2, max: 1, tone: "muted" },
                { label: "△FGS", value: 0.1, max: 1, tone: "primary" },
              ],
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 ABC 面积为 180。D 在 BC 上且 BD : DC = 2 : 3；E 在 AC 上且 AE : EC = 2 : 1。\n\n连接 DE。G 在 DE 上且 DG : GE = 1 : 2。连接 AG，F 在 AG 上且 AF : FG = 3 : 1。\n\n求三角形 DGF 的面积。",
    figures: [
      {
        svg: svgV,
        alt: "三角形 ABC 中按比例构造的三角形 DGF",
      },
    ],
    fields: [
      {
        key: "area",
        label: "△DGF 面积",
        type: "number",
      },
    ],
    answer: {
      area: 6,
    },
    hint: "△ADC = 180 × 3/5 = 108；△ADE = 108 × 2/3 = 72；△ADG = 72 × 1/3 = 24；△DGF = △ADG × (FG/AG) = 24 × 1/4 = 6（AF:FG = 3:1，所以 AG = 4·FG，FG:AG = 1:4）。",
  },
  tags: ["鸟头模型", "等积变形"],
} satisfies ProblemData;
