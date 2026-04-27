import type { KnowledgeEntry } from "@/types/knowledge";
import butterflyModelSvg from "./figures/butterfly-model.svg?raw";

const entry: KnowledgeEntry = {
  slug: "butterfly-model",
  name: "蝴蝶模型",
  tag: "蝴蝶模型",
  category: "geometry",
  summary:
    "四边形两条对角线分出的四块，对角相乘相等；梯形里的面积比等于上下底平方比。",
  intuition:
    "任意四边形被两条对角线分成四个小三角形，像蝴蝶的四只翅膀。对角两块（上翅与下翅）面积之积 = 另一对角两块之积——蝴蝶左右配对。",
  derivation: [
    "设对角线交于 O，四块面积记作 S₁（左）、S₂（上）、S₃（右）、S₄（下）。",
    "△左与△上同高（O 到对应顶点的垂距），面积比 = 两底比；另两组同理。",
    "整理得到 S₁ × S₃ = S₂ × S₄。",
    "梯形（AB∥CD）特例：四块按“上:下 = AB² : CD²”分布。",
  ],
  keyPoints: [
    "任意四边形：S₁ × S₃ = S₂ × S₄。",
    "梯形：S△AOB : S△COD = AB² : CD²；两腰三角形面积相等。",
  ],
  examples: [
    {
      title: "梯形对角线",
      problem:
        "梯形 ABCD 中 AB∥CD，对角线交于 O，S△AOB = 25，S△BOC = 35。求梯形面积。",
      solution: [
        "S△AOD = S△BOC = 35（两腰三角形面积相等）。",
        "由 S△AOB × S△COD = S△BOC × S△AOD：25 × S△COD = 35 × 35，S△COD = 49。",
        "总面积 = 25 + 35 + 35 + 49 = 144。",
      ],
    },
    {
      title: "任意四边形",
      problem:
        "四边形被两条线分成四块，其中三块面积为 20、25、30。求第四块。",
      solution: [
        "按对角乘积相等：若 20 与第四块为对角，则 20 × S = 25 × 30，S = 37.5。",
        "根据题目具体位置判断哪两块是对角。",
      ],
      takeaway: "先判“谁和谁对角”，再套 S₁·S₃ = S₂·S₄。",
    },
  ],
  pitfalls: [
    "必须分清哪两块是“对角”，别把相邻块相乘。",
    "梯形特例只在两边平行的四边形里成立。",
  ],
  relatedSlugs: ["area-method", "equal-area-transformation"],
  figures: [
    {
      svg: butterflyModelSvg,
      alt: "四边形两对角线分出的四块面积",
      caption: "对角相乘相等：S₁·S₃ = S₂·S₄。",
    },
  ],
};

export default entry;
