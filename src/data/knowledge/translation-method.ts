import type { KnowledgeEntry } from "@/types/knowledge";

const entry: KnowledgeEntry = {
  slug: "translation-method",
  name: "平移法",
  tag: "平移法",
  category: "geometry",
  summary: "把图形的一部分沿某方向平移，拼出规则图形或抵消阴影。",
  intuition:
    "阴影部分形状怪异，但只要把其中一块沿一条方向滑动，它就能与另一块拼合或消掉，变成规则图形——面积不变，但计算瞬间简单。",
  derivation: [
    "找出阴影里形状对称或可拼的部分。",
    "沿某一方向平移（方向通常由平行边决定），拼成一个三角形 / 矩形 / 梯形等规则图形。",
    "用规则图形面积公式计算。",
  ],
  keyPoints: [
    "平移的图形大小、形状都不变，面积守恒。",
    "常与“等积变形”联用。",
  ],
  examples: [
    {
      title: "平移拼合",
      problem:
        "边长 10 的正方形内部画两条相互垂直的直线把它分成 4 块，阴影为左上和右下两块。若两条线相交点距左边 3、距上边 4，求阴影面积。",
      solution: [
        "左上阴影是 3 × 4 = 12。",
        "右下阴影是 (10 − 3) × (10 − 4) = 42。",
        "平移理解：若把两块沿线移到对角对齐，拼合后会重新得到整齐的矩形区块——这里直接相加即可，12 + 42 = 54。",
      ],
      takeaway: "简单情形里平移的核心只是“换个角度看图”。",
    },
  ],
  pitfalls: [
    "平移前后图形一致才能“等价”；不要误以为旋转或翻转也等价（有时会改变方向）。",
  ],
  relatedSlugs: ["equal-area-transformation", "area-method"],
};

export default entry;
