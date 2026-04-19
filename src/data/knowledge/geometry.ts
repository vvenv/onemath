import type { KnowledgeEntry } from "./types";
import birdHeadModelSvg from "./figures/bird-head-model.svg?raw";
import areaMethodSvg from "./figures/area-method.svg?raw";
import equalAreaTransformationSvg from "./figures/equal-area-transformation.svg?raw";
import butterflyModelSvg from "./figures/butterfly-model.svg?raw";
import similarityModelSvg from "./figures/similarity-model.svg?raw";
import swallowtailModelSvg from "./figures/swallowtail-model.svg?raw";
import pythagoreanTheoremSvg from "./figures/pythagorean-theorem.svg?raw";

export const geometryEntries: KnowledgeEntry[] = [
  {
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
        takeaway:
          "判断出“共角或互补角”就能直接写比例，比算坐标快得多。",
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
        caption: "共角 ∠A：△ADE 与 △ABC 共享顶点与夹角。",
      },
    ],
  },
  {
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
        problem:
          "直角三角形两直角边为 6 和 8，斜边为 10。求斜边上的高。",
        solution: [
          "以两直角边为底 × 高：面积 = ½ × 6 × 8 = 24。",
          "以斜边为底：面积 = ½ × 10 × h。",
          "24 = 5h → h = 4.8。",
        ],
        takeaway: "同一面积两种写法，是面积法最朴素也最好用的模式。",
      },
      {
        title: "用面积求线段比",
        problem:
          "△ABC 中，D 在 BC 上，S△ABD = 6，S△ACD = 9。求 BD:DC。",
        solution: [
          "△ABD 与 △ACD 同高（都以 A 到 BC 的高为高）。",
          "面积比 = 底边比，即 BD:DC = 6:9 = 2:3。",
        ],
      },
    ],
    pitfalls: [
      "“同高”“同底”要看仔细——随便换底会让高也跟着变。",
    ],
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
  },
  {
    slug: "equal-area-transformation",
    name: "等积变形",
    tag: "等积变形",
    category: "geometry",
    summary: "在平行线之间平移顶点，三角形面积不变；用来“把难算的图形搬到好算的位置”。",
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
    pitfalls: [
      "必须存在平行线或等长底边，才能“等积”。",
    ],
    relatedSlugs: ["area-method", "butterfly-model"],
    figures: [
      {
        svg: equalAreaTransformationSvg,
        alt: "三角形顶点沿平行线平移",
        caption: "A 沿平行线滑到 A'：底与高不变，面积不变。",
      },
    ],
  },
  {
    slug: "butterfly-model",
    name: "蝴蝶模型",
    tag: "蝴蝶模型",
    category: "geometry",
    summary: "四边形两条对角线分出的四块，对角相乘相等；梯形里的面积比等于上下底平方比。",
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
  },
  {
    slug: "similarity-model",
    name: "相似模型",
    tag: "相似模型",
    category: "geometry",
    summary: "平行线截三角形得沙漏/金字塔，对应边成比例，面积比 = 相似比的平方。",
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
        problem:
          "△ABC 中，DE∥BC，AD:DB = 2:3。S△ABC = 50，求 S△ADE。",
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
        caption: "金字塔型：DE∥BC，△ADE ∽ △ABC。",
      },
    ],
  },
  {
    slug: "swallowtail-model",
    name: "燕尾模型",
    tag: "燕尾模型",
    category: "geometry",
    summary: "三角形内三线共点，分成的面积比 = 对应底边比；常用于三角形内部“枢纽点”问题。",
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
    pitfalls: [
      "共用的那条线必须过内部交点并与对边相交；不满足时不能套。",
    ],
    relatedSlugs: ["bird-head-model", "area-method"],
    figures: [
      {
        svg: swallowtailModelSvg,
        alt: "三角形内点引线构成的燕尾图形",
        caption: "AG 延长交 BC 于 D：S△ABG : S△ACG = BD : DC。",
      },
    ],
  },
  {
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
        caption: "两直角边上正方形之和 = 斜边上正方形：a² + b² = c²。",
      },
    ],
  },
  {
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
  },
];
