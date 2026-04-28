import type { ProblemData } from "@/types/problem";
import svg1 from "./figures/10122-1.svg?raw";
import svgV from "./figures/10122-v.svg?raw";

export default {
  id: "10122",
  title: "共角模型·多级比例点综合",
  grade: "六年级",
  module: "几何",
  difficulty: "挑战",
  question:
    "如图，三角形 ABC 的面积为 1。D 在 BC 上，且 BC = 5·BD；E 在 AC 上，且 AC = 4·EC（即 AE = 3·EC）。连接 DE；在线段 DE 上取两点 G、S，使 DG = GS = SE（即 G、S 把 DE 三等分）。连接 AG 并在 AG 上取点 F，使 AF = FG（F 为 AG 的中点）。求三角形 FGS 的面积。",
  figures: [
    {
      svg: svg1,
      caption:
        "△ABC 内部的多级比例点：D 把 BC 分 1:4；E 把 AC 分 3:1；G、S 三等分 DE；F 是 AG 的中点",
      alt: "三角形 ABC 中多级比例点构成的小三角形 FGS",
    },
  ],
  solutions: [
    {
      key: "shared-angle",
      label: "连续运用共角与等高三角形",
      steps: [
        "分析：每一层都可以化为「同底等高比」或「共顶点底比」的缩放。按依赖顺序从大到小：△ABC → △ADC → △ADE → △ADG → △AGS → △FGS，每步都是一次比例乘法。",
        "逐层缩放（详见 scenes 的 equation-list）：△ADC = △ABC · DC/BC = 4/5；△ADE = △ADC · AE/AC = 3/5（同底 AD）；△ADG = △ADE · DG/DE = 1/5；△AGS = △ADG · GS/DG = 1/5（GS = DG）；△FGS = △AGS · FG/AG = 1/10（F 为 AG 中点）。",
        "结论：△FGS 的面积为 1/10。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "△ADC = △ABC × 4/5",
              rhs: "4/5",
            },
            {
              lhs: "△ADE = △ADC × 3/4",
              rhs: "3/5",
            },
            {
              lhs: "△ADG = △ADE × 1/3",
              rhs: "1/5",
            },
            {
              lhs: "△AGS = △ADG × (GS/DG) (GS = DG)",
              rhs: "1/5",
            },
            {
              lhs: "△FGS = △AGS × 1/2 (答案)",
              rhs: "1/10",
            },
          ],
          caption: "从大到小逐层缩放",
        },
        {
          kind: "compare-bars",
          rows: [
            {
              label: "△ABC",
              value: 1,
              max: 1,
              tone: "muted",
            },
            {
              label: "△ADE",
              value: 0.6,
              max: 1,
              tone: "muted",
            },
            {
              label: "△ADG",
              value: 0.2,
              max: 1,
              tone: "muted",
            },
            {
              label: "△FGS",
              value: 0.1,
              max: 1,
              tone: "primary",
            },
          ],
          caption: "每一步的面积都是可以显式列出的缩小比例",
        },
        {
          kind: "result-badges",
          items: [
            {
              icon: "📐",
              count: "1/10",
              label: "△FGS 面积",
            },
          ],
        },
      ],
    },
    {
      key: "vector",
      label: "向量/坐标法（校核）",
      steps: [
        "分析：取 A 为原点，AB、AC 为基底 b、c，|b × c| = 2（因为 △ABC 面积为 1）。把所有分点用 b、c 线性表出，再用叉积公式求 △FGS。",
        "逐点表示：D = (4/5)b + (1/5)c，E = (3/4)c，G = (2/3)D + (1/3)E = (8/15)b + (23/60)c，S = (1/3)D + (2/3)E = (4/15)b + (17/30)c，F = G/2 = (4/15)b + (23/120)c。",
        "△FGS = (1/2) · |det(G − F, S − F)| · |b × c| = (1/2) · (1/10) · 2 = 1/10，与前解一致。",
      ],
      scenes: [
        {
          kind: "equation-list",
          rows: [
            {
              lhs: "G − F",
              rhs: "(4/15) b + (23/120) c",
            },
            {
              lhs: "S − F",
              rhs: "(0) b + (45/120) c",
            },
            {
              lhs: "△FGS (验证)",
              rhs: "1/10",
            },
          ],
        },
      ],
    },
  ],
  variant: {
    question:
      "三角形 ABC 面积为 60。D 在 BC 上且 BD : DC = 1 : 2；E 在 AC 上且 AE : EC = 1 : 1（E 为 AC 的中点）。M 是 DE 的中点，N 是 AM 的中点。求三角形 ADN 的面积。",
    figures: [
      {
        svg: svgV,
        caption:
          "D 把 BC 分为 1:2；E 是 AC 中点；M 是 DE 中点；N 是 AM 中点；阴影为 △ADN",
        alt: "三角形 ABC 中按比例与取中点构造的三角形 ADN",
      },
    ],
    fields: [
      {
        key: "area",
        label: "△ADN 面积",
        type: "number",
      },
    ],
    answer: {
      area: 5,
    },
    hint: "△ADC = 60 × 2/3 = 40；△ADE = 40 × 1/2 = 20；△ADM = △ADE × 1/2 = 10（M 是 DE 中点）；△ADN = 10 × 1/2 = 5（N 是 AM 中点）。",
  },
  tags: ["鸟头模型", "等积变形"],
} satisfies ProblemData;
