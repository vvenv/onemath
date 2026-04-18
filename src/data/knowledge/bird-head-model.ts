import type { KnowledgeEntry } from "@/types/knowledge";
import birdHeadModelSvg from "./figures/bird-head-model.svg?raw";

const entry: KnowledgeEntry = {
  slug: "bird-head-model",
  name: "鸟头模型",
  tag: "鸟头模型",
  category: "geometry",
  summary:
    "共角三角形面积比 = 夹该角的两邻边乘积之比；相等角或互补角都适用。",
  intuition:
    "两个三角形像两只共用一只眼睛的小鸟——它们共用一个角。那只“眼睛”张开的角度一样，它们的大小就只取决于两只翅膀（两邻边）的长度。",
  derivation: [
    "设 △ABC 与 △ADE 共用 ∠A（或 ∠BAC 与 ∠DAE 互补）。",
    "由面积公式 S = ½ · 邻边1 · 邻边2 · sin(夹角)。",
    "相等角或互补角时 sin 值相等，两三角形面积比 = (AD·AE) ÷ (AB·AC)。",
  ],
  keyPoints: [
    "共角公式：S△ADE / S△ABC = (AD × AE) / (AB × AC)。",
    "出现在 A 字型（相等角）与 X 字型（互补角）两种图形。",
  ],
  examples: [
    {
      title: "A 字型直接套用",
      problem: "△ABC 中 AB = 3AE，AC = 2AD，S△ABC = 36。求 S△AED。",
      solution: [
        "△AED 与 △ABC 共用 ∠A。",
        "S△AED / S△ABC = (AE × AD) / (AB × AC) = (1/3) × (1/2) = 1/6。",
        "所以 S△AED = 36 × 1/6 = 6。",
      ],
    },
    {
      title: "互补角（X 字型）",
      problem:
        "△ABC 中 D 在 BA 延长线上，E 在 AC 上，AB:AD = 5:2，AE:EC = 3:2，S△ADE = 12。求 S△ABC。",
      solution: [
        "∠DAE 与 ∠BAC 互补，仍可用鸟头模型。",
        "AE:AC = 3:5。",
        "S△ADE / S△ABC = (AD × AE) / (AB × AC) = (2/5) × (3/5) = 6/25。",
        "所以 S△ABC = 12 × 25/6 = 50。",
      ],
      takeaway: "判断出“共角或互补角”就能直接写比例，比算坐标快得多。",
    },
  ],
  pitfalls: [
    "只对“共同那个角”两边做比，不要误用其它边。",
    "先把图中所有边的比用同一个基准表达清楚，再套公式。",
  ],
  relatedSlugs: [],
  figures: [
    {
      svg: birdHeadModelSvg,
      alt: "A 字型共角三角形",

    },
  ],
};

export default entry;
