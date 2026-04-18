import type { KnowledgeEntry } from "@/types/knowledge";
import pythagoreanTheoremSvg from "./figures/pythagorean-theorem.svg?raw";

const entry: KnowledgeEntry = {
  slug: "pythagorean-theorem",
  name: "勾股定理",
  tag: "勾股定理",
  category: "geometry",
  summary: "直角三角形两直角边平方之和 = 斜边平方：a² + b² = c²。",
  intuition:
    "在直角三角形外画三个正方形，分别以三边为边长。两条直角边上的两个正方形面积加起来，正好等于斜边上的正方形面积。",
  derivation: [
    "直角三角形两直角边为 a, b，斜边为 c。",
    "面积法证法：四个相同直角三角形拼出大正方形，中间留出一个小正方形，面积关系即得 a² + b² = c²。",
  ],
  keyPoints: [
    "常见勾股数：3-4-5，5-12-13，6-8-10，7-24-25，8-15-17，9-40-41。",
    "c = √(a² + b²)；反过来给 c, a 求 b = √(c² − a²)。",
  ],
  examples: [
    {
      title: "求斜边",
      problem: "直角三角形两直角边长为 6 和 8。斜边多长？",
      solution: ["c² = 6² + 8² = 100，c = 10。"],
    },
    {
      title: "求直角边",
      problem: "斜边 13，其中一条直角边为 5。另一条多长？",
      solution: ["b² = 13² − 5² = 169 − 25 = 144，b = 12。"],
    },
  ],
  pitfalls: [
    "仅适用于直角三角形；有直角才能用。",
    "使用前要分清哪条是斜边（最长的那条）。",
  ],
  relatedSlugs: ["area-method"],
  figures: [
    {
      svg: pythagoreanTheoremSvg,
      alt: "勾股定理三正方形示意",

    },
  ],
};

export default entry;
