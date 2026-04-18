import type { KnowledgeEntry } from "@/types/knowledge";
import similarityModelSvg from "./figures/similarity-model.svg?raw";

const entry: KnowledgeEntry = {
  slug: "similarity-model",
  name: "相似模型",
  tag: "相似模型",
  category: "geometry",
  summary:
    "平行线截三角形得沙漏/金字塔，对应边成比例，面积比 = 相似比的平方。",
  intuition:
    "把三角形“压扁”或“放大”，只要角不变，它就只是自己的缩放版。用平行线一截，大三角套小三角（金字塔），或上下倒置（沙漏），边比立刻抄出来。",
  derivation: [
    "平行于三角形某边的直线，截得的小三角形与原三角形相似。",
    "对应边比 = 相似比 k。",
    "对应面积比 = k²。",
  ],
  keyPoints: [
    "金字塔型（A 字）：小三角在大三角内部，共顶点。",
    "沙漏型（X 字）：两三角形顶点相对，平行线在中间。",
    "相似比 k → 面积比 k²，体积比 k³。",
  ],
  examples: [
    {
      title: "金字塔",
      problem: "△ABC 中，DE∥BC，AD:DB = 2:3。S△ABC = 50，求 S△ADE。",
      solution: [
        "AD:AB = 2:5，相似比 k = 2/5。",
        "面积比 = (2/5)² = 4/25。",
        "S△ADE = 50 × 4/25 = 8。",
      ],
    },
    {
      title: "沙漏",
      problem:
        "梯形 ABCD（AB∥CD）对角线交于 O，AB = 3，CD = 5。S△AOB = 9，求 S△COD。",
      solution: [
        "△AOB ∼ △COD（沙漏型），相似比 = 3:5。",
        "面积比 = 9:25，S△COD = 9 × 25/9 = 25。",
      ],
    },
  ],
  pitfalls: [
    "对应面积比是相似比的平方，不要漏掉“平方”。",
    "先证相似（通常靠平行线），再用比例。",
  ],
  relatedSlugs: ["butterfly-model", "swallowtail-model"],
  figures: [
    {
      svg: similarityModelSvg,
      alt: "金字塔型相似三角形",

    },
  ],
};

export default entry;
