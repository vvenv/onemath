import type { KnowledgeEntry } from "@/types/knowledge";
import swallowtailModelSvg from "./figures/swallowtail-model.svg?raw";

const entry: KnowledgeEntry = {
  slug: "swallowtail-model",
  name: "燕尾模型",
  tag: "燕尾模型",
  category: "geometry",
  summary:
    "三角形内三线共点，分成的面积比 = 对应底边比；常用于三角形内部“枢纽点”问题。",
  intuition:
    "在三角形 ABC 中，从顶点 A 引一条线到 BC 上一点 D，再有两条线把点 D 与其它顶点相连，构成像燕尾一样的图形。共用一点的两个三角形，面积之比由它们“没共用的那条底”的比决定。",
  derivation: [
    "设 G 是 △ABC 内一点，AG 延长交 BC 于 D。",
    "△ABG 与 △ACG 共享 AG 为底，高分别为 B、C 到 AG 的距离。",
    "同时 △ABD 与 △ACD 共享 AD 为底，高为 B、C 到 AD 的距离——两组高之比相同。",
    "所以 S△ABG : S△ACG = S△ABD : S△ACD = BD : DC。",
  ],
  keyPoints: [
    "S△ABG : S△ACG = BD : DC（D 在 BC 上，AG 过 G 延伸至 D）。",
    "类似地 S△BGA : S△BGC = AF : FC，S△AGC : S△BGC = AE : EB。",
  ],
  examples: [
    {
      title: "直接套用",
      problem:
        "△ABC 中 G 是内部一点，AG 延长交 BC 于 D，BD:DC = 2:3，S△ABG = 12。求 S△ACG。",
      solution: [
        "S△ABG : S△ACG = BD : DC = 2 : 3。",
        "S△ACG = 12 × 3/2 = 18。",
      ],
    },
  ],
  pitfalls: ["共用的那条线必须过内部交点并与对边相交；不满足时不能套。"],
  relatedSlugs: ["bird-head-model", "area-method"],
  figures: [
    {
      svg: swallowtailModelSvg,
      alt: "三角形内点引线构成的燕尾图形",
      caption: "AG 延长交 BC 于 D：S△ABG : S△ACG = BD : DC。",
    },
  ],
};

export default entry;
