import type { KnowledgeEntry } from "@/types/knowledge";
import areaMethodSvg from "./figures/area-method.svg?raw";

const entry: KnowledgeEntry = {
  slug: "area-method",
  name: "面积法",
  tag: "面积法",
  category: "geometry",
  summary: "以面积为“中转货币”：把要求的长度 / 比例问题转化为面积等式。",
  intuition:
    "同一个三角形可以用不同的底 × 高来算面积，结果都一样。这就像同一笔钱换成不同面额的硬币，总值不变——选对“底和高”就能让未知量暴露出来。",
  derivation: [
    "找到一个三角形（或四边形），它能用两种方式表达面积。",
    "一种方式里出现未知量（比如某条高、某条边）。",
    "另一种方式用已知量直接算出。",
    "两式相等，解出未知量。",
  ],
  keyPoints: [
    "三角形面积 = ½ × 底 × 高（任意一边都可以做底）。",
    "同底等高三角形面积相等；同高时面积比等于底边比。",
  ],
  examples: [
    {
      title: "用面积求高",
      problem: "直角三角形两直角边为 6 和 8，斜边为 10。求斜边上的高。",
      solution: [
        "以两直角边为底 × 高：面积 = ½ × 6 × 8 = 24。",
        "以斜边为底：面积 = ½ × 10 × h。",
        "24 = 5h → h = 4.8。",
      ],
      takeaway: "同一面积两种写法，是面积法最朴素也最好用的模式。",
    },
    {
      title: "用面积求线段比",
      problem: "△ABC 中，D 在 BC 上，S△ABD = 6，S△ACD = 9。求 BD:DC。",
      solution: [
        "△ABD 与 △ACD 同高（都以 A 到 BC 的高为高）。",
        "面积比 = 底边比，即 BD:DC = 6:9 = 2:3。",
      ],
    },
  ],
  pitfalls: ["“同高”“同底”要看仔细——随便换底会让高也跟着变。"],
  relatedSlugs: [
    "equal-area-transformation",
    "bird-head-model",
    "butterfly-model",
  ],
  figures: [
    {
      svg: areaMethodSvg,
      alt: "直角三角形的两种底高表达",
      caption: "同一面积两种写法：½·AB·BC = ½·AC·BH。",
    },
  ],
};

export default entry;
