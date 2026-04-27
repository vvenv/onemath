import type { KnowledgeEntry } from "@/types/knowledge";
import equalAreaTransformationSvg from "./figures/equal-area-transformation.svg?raw";

const entry: KnowledgeEntry = {
  slug: "equal-area-transformation",
  name: "等积变形",
  tag: "等积变形",
  category: "geometry",
  summary:
    "在平行线之间平移顶点，三角形面积不变；用来“把难算的图形搬到好算的位置”。",
  intuition:
    "把一个三角形的顶点沿着与底平行的直线左右滑动，底没变、高没变，面积自然也不变。这就是“等积变形”——不动的只是面积，图形却可以变得规整得多。",
  derivation: [
    "核心条件：存在一组平行线，顶点在其中一条上，底在另一条上。",
    "把顶点沿平行线平移，三角形面积不变。",
    "通过平移把阴影部分拼成一个容易计算的整体（如直角三角形、矩形）。",
  ],
  keyPoints: [
    "平行线之间的三角形，等底则等面积。",
    "对角线、中线、中位线常见于等积变形构造。",
  ],
  examples: [
    {
      title: "中点等分",
      problem: "△ABC 中 D 是 BC 中点，则 S△ABD = S△ACD。",
      solution: [
        "两个三角形同高（都是 A 到 BC 的距离）。",
        "底 BD = DC（中点），面积相等。",
      ],
    },
    {
      title: "平移化简",
      problem:
        "梯形 ABCD（AB∥CD）中，对角线 AC 将其分成两个三角形，S△ABC 与 S△ACD 的关系如何？",
      solution: [
        "△ABC 以 AB 为底，高为两底之间距离 h。",
        "△ACD 以 CD 为底，高也为 h。",
        "所以 S△ABC : S△ACD = AB : CD。",
      ],
      takeaway: "平行四边形、梯形里对角线分出的两块，面积比就是两底之比。",
    },
  ],
  pitfalls: ["必须存在平行线或等长底边，才能“等积”。"],
  relatedSlugs: ["area-method", "butterfly-model"],
  figures: [
    {
      svg: equalAreaTransformationSvg,
      alt: "三角形顶点沿平行线平移",
      caption: "A 沿平行线滑到 A'：底与高不变，面积不变。",
    },
  ],
};

export default entry;
