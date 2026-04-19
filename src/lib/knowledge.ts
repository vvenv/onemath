import { METHOD_TAGS } from "@/lib/tags";
import { problems } from "@/lib/problems";
import type { ProblemData, ProblemFigure } from "@/types/problem";

/**
 * Knowledge base for method/technique explainer pages (`/k/:slug`).
 *
 * Each entry is authored around a single canonical method tag from
 * `@/lib/tags.ts`. The `tag` field bridges problems → knowledge: any
 * problem whose `tags` include that string can link here, and we can
 * list "uses this method" problems on the explainer page.
 */

export type KnowledgeCategory = keyof typeof METHOD_TAGS;

export type KnowledgeExample = {
  title?: string;
  problem: string;
  solution: string[];
  takeaway?: string;
};

export type KnowledgeEntry = {
  slug: string;
  name: string;
  /** canonical method tag this page explains, if any */
  tag?: string;
  category: KnowledgeCategory;
  /** one-line positioning, shown under the title */
  summary: string;
  /** concrete, visualizable scene that builds intuition */
  intuition: string;
  /** step-by-step derivation / why it works */
  derivation: string[];
  /** short formulas or invariants worth memorizing */
  keyPoints?: string[];
  /** 2–3 progressive worked examples */
  examples: KnowledgeExample[];
  /** common pitfalls / when this method does NOT apply */
  pitfalls?: string[];
  /** other knowledge slugs that pair naturally with this one */
  relatedSlugs?: string[];
  /** illustrative figures rendered alongside the intuition section */
  figures?: ProblemFigure[];
};

const ENTRIES: KnowledgeEntry[] = [
  {
    slug: "hypothesis-method",
    name: "假设法",
    tag: "假设法",
    category: "word",
    summary: "先假设一种极端情况，再按差额回退，把两类未知数拆成一次关系。",
    intuition:
      "鸡兔同笼里，如果先把所有动物都当成鸡，那脚数一定比实际少；每把一只鸡“换成”一只兔，就多出 2 只脚。少的脚数 ÷ 每次多出的脚数，就是兔子的只数。",
    derivation: [
      "把两种未知数之一，全部假设成另一种（通常假设成“脚少”的那一种）。",
      "按假设计算总量，与题目实际总量作差，得到“差额”。",
      "每替换一个单位，差额固定变化一个“单位差”。",
      "差额 ÷ 单位差 = 被替换的那一类的数量；再用总头数减去它，得到另一类。",
    ],
    keyPoints: [
      "兔数 = (实际脚数 − 假设全是鸡的脚数) ÷ (兔脚 − 鸡脚)",
      "本质上是把二元一次方程组，用“替换”语言写成一元运算。",
    ],
    examples: [
      {
        title: "鸡兔同笼",
        problem: "鸡和兔共 30 只，脚共 88 只。各多少只？",
        solution: [
          "假设全是鸡：30 × 2 = 60 只脚。",
          "差额：88 − 60 = 28 只脚。",
          "每只鸡换成兔多 2 只脚，所以兔 = 28 ÷ 2 = 14 只。",
          "鸡 = 30 − 14 = 16 只。",
        ],
        takeaway: "“假设 → 算差 → 除以单位差”三步一气呵成。",
      },
      {
        title: "盈亏变形",
        problem:
          "一批苹果分给小朋友，每人 3 个还多 7 个，每人 5 个还差 3 个。多少人？多少苹果？",
        solution: [
          "“每人 3 个多 7” → 苹果总数 = 3 × 人数 + 7。",
          "“每人 5 个差 3” → 苹果总数 = 5 × 人数 − 3。",
          "两式相减得 5 × 人数 − 3 × 人数 = 7 + 3，即 2 × 人数 = 10。",
          "所以人数 = 5，苹果 = 3 × 5 + 7 = 22 个。",
        ],
        takeaway:
          "盈亏题就是两次假设下“每人拿的量 × 人数”与总数的两个等式，直接相减消掉总数。",
      },
    ],
    pitfalls: [
      "必须确认两类对象除了“单位脚数（单位量）”以外其他属性对称，否则差额法不成立。",
      "遇到“每只少几只脚”这类反向单位差时，要明确差的符号。",
    ],
    relatedSlugs: ["equation-method", "drawing-method"],
  },
  {
    slug: "drawing-method",
    name: "画图法",
    tag: "画图法",
    category: "word",
    summary: "把抽象数量关系画成圆圈、线段、条形，让“多/少/倍”一眼可见。",
    intuition:
      "低年级看文字吃力，但看到“长的一条线段比短的一条长出一小段”就立刻能指出差在哪里。画图就是把语言翻译成“可指的图形”。",
    derivation: [
      "找到题目里的主角（对象）和它们之间的关系：相等、相差、相倍、总和。",
      "为每个主角画一条线段（或一排圆圈），让长度/数量正比于它代表的量。",
      "把“差”或“总和”标在图上，变成一段明显可测量的长度。",
      "从图上直接读出“1 份 = 多少”，再还原回原题。",
    ],
    keyPoints: [
      "和差问题：画两条长短不同的线段，总和标在上方，差标在突出的一段。",
      "倍数问题：把“1 倍量”当作 1 格，大量画成 n 格，一眼看出一共几格。",
    ],
    examples: [
      {
        title: "和差问题",
        problem: "甲乙两人共有糖 30 颗，甲比乙多 6 颗。各几颗？",
        solution: [
          "画两条线段，甲稍长于乙。",
          "从甲的线段末端截掉 6 颗，两条一样长，总数变成 30 − 6 = 24 颗。",
          "一条 = 24 ÷ 2 = 12 颗，所以乙 = 12，甲 = 12 + 6 = 18。",
        ],
      },
      {
        title: "倍数 + 差",
        problem: "姐姐的年龄是妹妹的 3 倍，姐姐比妹妹大 8 岁。各几岁？",
        solution: [
          "画妹妹 1 格，姐姐 3 格，两人相差 3 − 1 = 2 格。",
          "2 格对应 8 岁，所以 1 格 = 4 岁。",
          "妹妹 4 岁，姐姐 12 岁。",
        ],
        takeaway: "图上“几格对应多少”是线段图最关键的一步。",
      },
    ],
    pitfalls: [
      "线段长度要大致按比例，否则误导自己。",
      "遇到多次变化（比如“再过 3 年”），画两排线段对照更清晰。",
    ],
    relatedSlugs: ["hypothesis-method", "equation-method"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="20" y="24" width="80" height="22" fill="currentColor" fill-opacity="0.12"/><rect x="20" y="64" width="120" height="22" fill="currentColor" fill-opacity="0.12"/><line x1="100" y1="46" x2="100" y2="98"/><line x1="140" y1="46" x2="140" y2="98"/><g fill="currentColor" stroke="none" font-size="11" font-family="sans-serif"><text x="4" y="40">乙</text><text x="4" y="80">甲</text><text x="104" y="110">多 6</text></g></svg>`,
        alt: "两条长短不同的线段图示和差问题",
        caption: "和差问题：两条线段差 6、总 30，一眼可见。",
      },
    ],
  },
  {
    slug: "equation-method",
    name: "方程法",
    tag: "方程法",
    category: "word",
    summary: "用字母表示未知量，按题意列等式，把推理交给代数运算。",
    intuition:
      "当条件多、关系绕、用算术法很难一步步推时，设未知数是“先承认我不知道”，再让方程替你思考。",
    derivation: [
      "找到“设谁”：通常设题目问的那个量，或设能让其它量最好表达的量。",
      "把每个条件翻译成一个含未知数的等式。",
      "合并同类项、移项，解出未知数。",
      "回代验证：原题的每一个条件是否都成立。",
    ],
    keyPoints: [
      "一元一次：ax + b = c → x = (c − b) ÷ a。",
      "二元一次：消元法（加减 / 代入）。",
    ],
    examples: [
      {
        title: "鸡兔同笼",
        problem: "鸡兔共 30 只，脚共 88 只。各多少只？",
        solution: [
          "设鸡 x 只，兔 y 只。",
          "x + y = 30；2x + 4y = 88。",
          "由第一式 x = 30 − y 代入：2(30 − y) + 4y = 88，解得 y = 14。",
          "所以兔 14 只，鸡 16 只。",
        ],
      },
      {
        title: "年龄问题",
        problem:
          "父亲今年 38 岁，儿子 10 岁。多少年后父亲的年龄是儿子的 3 倍？",
        solution: [
          "设 x 年后，此时父亲 38 + x 岁，儿子 10 + x 岁。",
          "38 + x = 3(10 + x)，解得 x = 4。",
          "所以 4 年后。",
        ],
        takeaway: "年龄问题的不变量是“年龄差”，列方程时要利用这一点。",
      },
    ],
    pitfalls: [
      "设未知数后要明确单位，避免“只”和“元”混淆。",
      "解出答案一定要回代验证。",
    ],
    relatedSlugs: ["hypothesis-method"],
  },
  {
    slug: "inclusion-exclusion",
    name: "容斥原理",
    tag: "容斥原理",
    category: "counting",
    summary: "两圈相交要减重合；三圈相交要“加单、减双、加三”。",
    intuition:
      "把两个兴趣小组的花名册贴在墙上，一个人同时在两边就被数了两次——要让他只数一次，就得减去重合部分。Venn 图让这个重合看得见。",
    derivation: [
      "两集合：|A ∪ B| = |A| + |B| − |A ∩ B|。",
      "三集合：|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|。",
      "一般地：单项相加、双交相减、三交相加……奇加偶减。",
    ],
    keyPoints: [
      "“至少参加一项” = 单项和 − 两两交集 + 三交集。",
      "“都不参加” = 总人数 − 至少参加一项。",
    ],
    examples: [
      {
        title: "两圈容斥",
        problem:
          "全班 42 人，参加数学组 28 人，参加英语组 22 人，两组都参加的 15 人。两组都不参加的几人？",
        solution: [
          "至少参加一项 = 28 + 22 − 15 = 35。",
          "都不参加 = 42 − 35 = 7。",
        ],
      },
      {
        title: "三圈容斥",
        problem:
          "100 名学生，喜欢语文 50，数学 45，英语 40；语数都喜欢 20，数英都喜欢 15，语英都喜欢 10，三科都喜欢 5。一科都不喜欢的几人？",
        solution: [
          "至少喜欢一科 = 50 + 45 + 40 − 20 − 15 − 10 + 5 = 95。",
          "都不喜欢 = 100 − 95 = 5。",
        ],
        takeaway: "三圈时，每个交集出现的符号就是 Venn 图里被盖了几层的修正。",
      },
    ],
    pitfalls: [
      "注意“既 A 又 B”和“只 A 不 B”的区别，后者等于 |A| − |A ∩ B|。",
      "三交集在题目里常被漏掉，要主动检查是否有“三者同时”这种条件。",
    ],
    relatedSlugs: ["parity"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="90" cy="70" r="55" fill="currentColor" fill-opacity="0.12"/><circle cx="150" cy="70" r="55" fill="currentColor" fill-opacity="0.12"/><g fill="currentColor" stroke="none" font-size="12" font-family="serif"><text x="50" y="74">A</text><text x="182" y="74">B</text><text x="104" y="74">A∩B</text></g></svg>`,
        alt: "两圆相交的韦恩图",
        caption: "两圆相交处被数了两次，必须减去一次。",
      },
    ],
  },
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="50,20 30,120 200,120"/><line x1="40" y1="70" x2="125" y2="70"/><g fill="currentColor" stroke="none" font-size="11" font-family="serif"><text x="52" y="18">A</text><text x="16" y="130">B</text><text x="202" y="130">C</text><text x="24" y="74">D</text><text x="130" y="74">E</text></g></svg>`,
        alt: "A 字型共角三角形",
        caption: "共角 ∠A：△ADE 与 △ABC 共享顶点与夹角。",
      },
    ],
  },
  {
    slug: "parity",
    name: "奇偶性",
    tag: "奇偶性",
    category: "general",
    summary:
      "只看奇偶，不看数值。奇 + 奇 = 偶；奇 × 偶 = 偶；不变量一旦矛盾，题目即无解。",
    intuition:
      "棋盘上马每走一步颜色必换；硬币翻偶数次总是恢复原状。这些都是“奇偶性”作为不变量在说话：不管怎么操作，某个奇偶身份不变。",
    derivation: [
      "加法：奇 + 奇 = 偶；偶 + 偶 = 偶；奇 + 偶 = 奇。",
      "乘法：含一个偶数，结果就是偶；全是奇数才得奇。",
      "解题套路：① 找一个量的奇偶性；② 证明每步操作不改变它；③ 若目标状态奇偶性不同，则无法达成。",
    ],
    keyPoints: [
      "n 个奇数之和的奇偶 = n 的奇偶。",
      "找不变量时，常见选择：总和、差、个数的奇偶。",
    ],
    examples: [
      {
        title: "能否正好分配",
        problem: "能否把 1 到 9 分成两组，使每组和相等？",
        solution: [
          "1 + 2 + … + 9 = 45，是奇数。",
          "若两组和相等，总和必须为偶数。",
          "矛盾，故不能。",
        ],
      },
      {
        title: "翻硬币",
        problem:
          "桌上 7 枚硬币全部正面朝上。每次必须同时翻动 2 枚。能否经若干次操作后，全部反面朝上？",
        solution: [
          "记“正面朝上的硬币数”为 N，初始 N = 7（奇）。",
          "每次翻 2 枚：N 变化 ±2 或 0，奇偶性不变，始终奇数。",
          "目标 N = 0（偶），与奇数矛盾，不可能。",
        ],
        takeaway:
          "“每步操作对某量的奇偶影响是固定的”就是奇偶不变量证明的核心。",
      },
    ],
    pitfalls: [
      "先检查“奇偶是否真的不变”，不是所有操作都保奇偶。",
      "奇偶只能证“不行”，不能直接证“一定行”。",
    ],
    relatedSlugs: ["inclusion-exclusion"],
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 140" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="30,30 30,110 190,110"/><line x1="30" y1="30" x2="190" y2="110"/><line x1="30" y1="110" x2="62" y2="46" stroke-dasharray="4 3"/><polyline points="30,102 38,102 38,110"/><g fill="currentColor" stroke="none" font-size="11" font-family="serif"><text x="20" y="24">A</text><text x="20" y="126">B</text><text x="194" y="124">C</text><text x="64" y="44">H</text></g></svg>`,
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="10" y1="30" x2="230" y2="30" stroke-dasharray="4 3"/><line x1="10" y1="110" x2="230" y2="110"/><polygon points="80,30 30,110 210,110"/><polygon points="180,30 30,110 210,110" stroke-dasharray="3 3"/><g fill="currentColor" stroke="none" font-size="11" font-family="serif"><text x="72" y="24">A</text><text x="184" y="24">A'</text><text x="20" y="122">B</text><text x="212" y="122">C</text></g></svg>`,
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="60,30 180,30 210,110 30,110"/><line x1="60" y1="30" x2="210" y2="110"/><line x1="180" y1="30" x2="30" y2="110"/><g fill="currentColor" stroke="none" font-size="11" font-family="serif"><text x="54" y="24">A</text><text x="176" y="24">B</text><text x="214" y="122">C</text><text x="22" y="122">D</text><text x="116" y="58">O</text><text x="116" y="44">S₂</text><text x="76" y="82">S₁</text><text x="152" y="82">S₃</text><text x="114" y="104">S₄</text></g></svg>`,
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 140" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="120,20 30,120 210,120"/><line x1="84" y1="60" x2="156" y2="60"/><g fill="currentColor" stroke="none" font-size="11" font-family="serif"><text x="122" y="16">A</text><text x="18" y="130">B</text><text x="214" y="130">C</text><text x="72" y="58">D</text><text x="160" y="58">E</text></g></svg>`,
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="120,20 30,120 210,120"/><line x1="120" y1="20" x2="120" y2="120"/><line x1="30" y1="120" x2="120" y2="75" stroke-dasharray="3 3"/><line x1="210" y1="120" x2="120" y2="75" stroke-dasharray="3 3"/><circle cx="120" cy="75" r="2.8" fill="currentColor"/><g fill="currentColor" stroke="none" font-size="11" font-family="serif"><text x="122" y="16">A</text><text x="18" y="130">B</text><text x="214" y="130">C</text><text x="126" y="72">G</text><text x="124" y="138">D</text></g></svg>`,
        alt: "三角形内点引线构成的燕尾图形",
        caption: "AG 延长交 BC 于 D：S△ABG : S△ACG = BD : DC。",
      },
    ],
  },
  {
    slug: "enumeration",
    name: "枚举法",
    tag: "枚举法",
    category: "counting",
    summary: "按某个顺序把所有可能性“走一遍”，保证不重不漏。",
    intuition:
      "当问题的结构还看不清、公式不好套的时候，干脆一个一个列出来——只要建立清晰的“排列顺序”，答案就会从列表里浮出来。",
    derivation: [
      "先设计一个能保证“不重”的枚举顺序（按大小、按字典序、按层）。",
      "边枚举边检查是否满足题目条件。",
      "收集所有满足条件的情况，统计个数或读出答案。",
    ],
    keyPoints: [
      "分层枚举：先固定一个变量，再枚举另一个。",
      "对称性：有时可以只枚举一半再乘 2。",
    ],
    examples: [
      {
        title: "数对",
        problem: "方程 x + y = 10（x, y 均为正整数）有多少组解？",
        solution: [
          "固定 x 从 1 枚举到 9，y = 10 − x 自动确定。",
          "x = 1..9 共 9 组解。",
        ],
      },
      {
        title: "三位数",
        problem:
          "用 1、2、3、4 中的数字（可重复）组成三位数，其中各位之和为 6 的有多少个？",
        solution: [
          "按百位分类枚举：",
          "百位 1：十 + 个 = 5，组合有 (1,4)(2,3)(3,2)(4,1)，4 个。",
          "百位 2：十 + 个 = 4，有 (1,3)(2,2)(3,1)，3 个。",
          "百位 3：十 + 个 = 3，有 (1,2)(2,1)，2 个。",
          "百位 4：十 + 个 = 2，有 (1,1)，1 个。",
          "共 4 + 3 + 2 + 1 = 10 个。",
        ],
        takeaway: "“按百位分类 + 小范围枚举”是典型组合。",
      },
    ],
    pitfalls: [
      "没有排序就容易漏或重复，先定顺序再开枚举。",
    ],
    relatedSlugs: ["case-analysis", "inclusion-exclusion"],
  },
  {
    slug: "case-analysis",
    name: "分类讨论",
    tag: "分类讨论",
    category: "counting",
    summary: "按关键特征把所有情况拆成互不重叠且覆盖全体的几类，逐类计算后相加。",
    intuition:
      "遇到“看情况”的题，与其正面硬算，不如把“情况”明确切开：每类内部规则统一，整体加起来就是答案。关键是分类要做到“互斥 + 穷举”。",
    derivation: [
      "识别决定答案形式的“关键属性”（如奇偶、大小、位置）。",
      "按这个属性把所有情况拆成若干类，确保两两不重、合起来不漏。",
      "每类单独算数量或结果。",
      "汇总：通常是求和。",
    ],
    keyPoints: [
      "互斥（不重）+ 穷举（不漏）是分类的两条红线。",
      "好分类 = 每类内部结构一致，便于统一计算。",
    ],
    examples: [
      {
        title: "数字问题",
        problem: "100 以内有多少个数含数字 3？",
        solution: [
          "按“3 出现在哪一位”分类（互斥地计数，最后去重）：",
          "个位是 3：3, 13, 23, …, 93，共 10 个。",
          "十位是 3：30, 31, …, 39，共 10 个。",
          "同时两位都是 3 的：33，被算了 2 次。",
          "合计 10 + 10 − 1 = 19 个。",
        ],
        takeaway: "分类后发现“交集”再用容斥修正，是常见组合。",
      },
    ],
    pitfalls: [
      "分类标准不清晰会导致漏/重；交集一定要检查。",
    ],
    relatedSlugs: ["enumeration", "inclusion-exclusion"],
  },
  {
    slug: "reverse-reasoning",
    name: "逆向推理",
    tag: "逆向推理",
    category: "word",
    summary: "从结果倒着走回起点：每一步都反着做那一步的运算。",
    intuition:
      "想象一段录像倒放——加变减、乘变除、左变右。题目给出“最后是多少”，最容易的路径就是按时间倒带回到“最初是多少”。",
    derivation: [
      "把题目的操作按时间顺序列出来。",
      "从末尾的已知结果出发，按相反顺序逐步反操作。",
      "反操作对应：+ ↔ −，× ↔ ÷，“去掉一半” ↔ “乘 2”…",
      "回到最初，就是要求的原值。",
    ],
    keyPoints: [
      "顺着算是正向方程；倒着算是逆向推理，两者等价但后者更省脑。",
    ],
    examples: [
      {
        title: "倒推还原",
        problem:
          "一个数先加 5，再乘 3，再减 7，得 26。原数是多少？",
        solution: [
          "倒推：26 + 7 = 33。",
          "33 ÷ 3 = 11。",
          "11 − 5 = 6。原数是 6。",
        ],
      },
      {
        title: "三次平分",
        problem:
          "甲先给乙自己钱的一半，又给丙剩下的一半，最后剩 6 元。甲原来多少钱？",
        solution: [
          "最后 6 元是“给丙一半”之后剩下的一半，所以“给丙前”有 6 × 2 = 12 元。",
          "12 元是“给乙一半”之后剩下的，所以甲原有 12 × 2 = 24 元。",
        ],
        takeaway: "带分数操作的题，倒推往往比列方程更干脆。",
      },
    ],
    pitfalls: [
      "要把操作顺序完整记清，缺一步就错。",
    ],
    relatedSlugs: ["equation-method"],
  },
  {
    slug: "accumulation-method",
    name: "累加法",
    tag: "累加法",
    category: "magicSquare",
    summary:
      "把所有行（或列、对角线）的和累加起来，用“总和的总和”反求单元格之和。",
    intuition:
      "幻方里每行、每列、每对角线的和都相等，都等于“幻和”。把所有行加在一起，其实就是把每个格子加了一次——于是总和 = 行数 × 幻和。反过来就能求幻和。",
    derivation: [
      "幻方 n × n 的格子总和 S = 所有数字之和。",
      "所有行的和之和 = n × 幻和 = S。",
      "所以 幻和 = S ÷ n。",
      "结合某一行/列已有的部分数字，即可解出其余。",
    ],
    keyPoints: [
      "3 阶幻方用 1..9，总和 45，幻和 = 15。",
      "n 阶幻方（用 1..n²）幻和 = n(n² + 1) / 2。",
    ],
    examples: [
      {
        title: "三阶幻和",
        problem: "用 1–9 填入 3×3 幻方，每行/列/对角线之和相等。求这个和。",
        solution: [
          "总和 = 1 + 2 + … + 9 = 45。",
          "3 行相加 = 3 × 幻和 = 45，幻和 = 15。",
        ],
      },
      {
        title: "部分已填",
        problem:
          "三阶幻方中某行已知两个数 8 和 3，求该行第三个。",
        solution: ["幻和 = 15；第三个数 = 15 − 8 − 3 = 4。"],
      },
    ],
    pitfalls: [
      "当填入的数字不是 1..n² 时，幻和要按给定数字集合重新算。",
    ],
    relatedSlugs: ["center-number-method"],
  },
  {
    slug: "center-number-method",
    name: "中心数法",
    tag: "中心数法",
    category: "magicSquare",
    summary: "三阶幻方的中心数 = 幻和 ÷ 3 = 所有数字平均值。",
    intuition:
      "三阶幻方有 4 条线过中心（2 条对角线 + 中间行 + 中间列），每条线和 = 幻和。把这 4 条加起来，中心被数了 4 次，其它格子各数了 1 次。稍一整理，中心数就浮出来了。",
    derivation: [
      "4 条过中心的线：和 = 4 × 幻和。",
      "左边展开：中心 × 4 + 其余 8 个数字各一次。",
      "设数字总和为 S，中心数为 c：4 × 幻和 = 4c + (S − c) = S + 3c。",
      "由 3 × 幻和 = S，得 4 × 幻和 = S + 3c → c = 幻和 / 3。",
    ],
    keyPoints: [
      "3 阶幻方中心 = 所有 9 个数的平均数。",
      "用 1..9 填时中心必为 5。",
    ],
    examples: [
      {
        title: "经典",
        problem: "3×3 幻方填 1–9。中心是几？",
        solution: ["幻和 15，中心 = 15/3 = 5。"],
      },
      {
        title: "变形",
        problem: "3×3 幻方填 2, 4, 6, …, 18（9 个偶数）。求中心。",
        solution: [
          "总和 2 + 4 + … + 18 = 90，幻和 = 30。",
          "中心 = 30 / 3 = 10。",
        ],
      },
    ],
    pitfalls: [
      "中心数法只对“3 阶”幻方成立，更大阶需要其他工具。",
    ],
    relatedSlugs: ["accumulation-method"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130"><rect x="45" y="45" width="40" height="40" fill="currentColor" fill-opacity="0.18"/><g stroke="currentColor" stroke-width="1" fill="none"><rect x="5" y="5" width="120" height="120"/><line x1="45" y1="5" x2="45" y2="125"/><line x1="85" y1="5" x2="85" y2="125"/><line x1="5" y1="45" x2="125" y2="45"/><line x1="5" y1="85" x2="125" y2="85"/></g><g stroke="currentColor" stroke-width="1.4" stroke-opacity="0.55" stroke-dasharray="3 2" fill="none"><line x1="65" y1="5" x2="65" y2="125"/><line x1="5" y1="65" x2="125" y2="65"/><line x1="5" y1="5" x2="125" y2="125"/><line x1="125" y1="5" x2="5" y2="125"/></g><text x="60" y="71" font-size="13" font-family="serif" fill="currentColor" stroke="none">c</text></svg>`,
        alt: "3×3 幻方过中心的四条线",
        caption: "四条过中心的线（中列、中行、两条对角线）各等于幻和。",
      },
    ],
  },
  {
    slug: "pigeonhole",
    name: "抽屉原理",
    tag: "抽屉原理",
    category: "counting",
    summary:
      "把 n + 1 只鸽子塞进 n 个抽屉，一定有一个抽屉里有 ≥ 2 只；推广后用来证“至少有 k 个相同”。",
    intuition:
      "抽屉不够用就一定得挤。关键不是“算出数量”，而是把题目里的对象匹配成“鸽子 / 抽屉”，让挤压不可避免。",
    derivation: [
      "简单形式：把 n + 1 个物体放入 n 个抽屉，至少一个抽屉有 ≥ 2 个物体。",
      "推广形式：n × k + 1 个物体放入 n 个抽屉，至少一个抽屉有 ≥ k + 1 个。",
      "解题模板：构造“抽屉”（按余数、颜色、区间等等价类）；数清“鸽子”数量；套公式得结论。",
    ],
    keyPoints: [
      "至少有一个抽屉多于 ⌈总数 / 抽屉数⌉ 个。",
      "常见抽屉：按余数分类、按区间分段、按颜色分组。",
    ],
    examples: [
      {
        title: "同月生日",
        problem: "13 个人中，至少有两个人同一个月出生。为什么？",
        solution: [
          "把 12 个月看作 12 个抽屉，13 个人看作鸽子。",
          "13 > 12，由抽屉原理至少一个月有 ≥ 2 人。",
        ],
      },
      {
        title: "颜色袜子",
        problem:
          "抽屉里有红、蓝、黑三种颜色袜子各若干。闭着眼至少拿几只，才能保证有两只同色？",
        solution: [
          "3 种颜色即 3 个抽屉。",
          "拿 4 只 = 3 × 1 + 1，由推广形式，一定有一个颜色 ≥ 2 只。",
          "所以至少拿 4 只。",
        ],
        takeaway: "“至少拿几只”这类题，鸽子数取“抽屉数 × (需要数 − 1) + 1”。",
      },
    ],
    pitfalls: [
      "抽屉构造要“互不重叠且覆盖全部”，否则结论不成立。",
      "问“至少”时别多算一个：公式是 n·k + 1，不是 n·k。",
    ],
    relatedSlugs: ["case-analysis", "worst-case-principle"],
  },
  {
    slug: "additive-multiplicative",
    name: "加乘原理",
    tag: "加乘原理",
    category: "counting",
    summary:
      "分类相加，分步相乘。判断“分类”还是“分步”，是计数题的第一关。",
    intuition:
      "如果一件事可以分成几种情况独立完成 → 情况数相加；如果必须按顺序完成几步 → 每步的方案数相乘。一句话：OR 用加，AND 用乘。",
    derivation: [
      "加法原理：完成一件事有 n 类办法，每类分别有 a₁, a₂, …, aₙ 种，共 a₁ + a₂ + … + aₙ 种。",
      "乘法原理：完成一件事分 n 步，每步分别有 b₁, b₂, …, bₙ 种选择（步间独立），共 b₁ × b₂ × … × bₙ 种。",
    ],
    keyPoints: [
      "并列选择（或）→ 加。",
      "依次确定（且）→ 乘。",
    ],
    examples: [
      {
        title: "纯加法",
        problem:
          "从甲地到乙地有 3 班汽车或 2 班火车可乘，共有多少种走法？",
        solution: [
          "“或”：两类方式并列。",
          "3 + 2 = 5 种。",
        ],
      },
      {
        title: "纯乘法",
        problem: "早餐 3 种主食，4 种饮料，每种组合一次，共几种组合？",
        solution: ["“且”：两步依次选择。", "3 × 4 = 12 种。"],
      },
      {
        title: "混合",
        problem:
          "从 A 地到 B 地有 2 条路，从 B 地到 C 地有 3 条路；也可以从 A 直达 C 有 4 条。从 A 到 C 共几种走法？",
        solution: [
          "经 B：2 × 3 = 6。",
          "直达：4。",
          "总数 6 + 4 = 10。",
        ],
        takeaway: "外层分类加，内层分步乘——典型两层结构。",
      },
    ],
    pitfalls: [
      "分类必须互斥、分步必须独立，否则会漏或重。",
    ],
    relatedSlugs: ["enumeration", "inclusion-exclusion"],
  },
  {
    slug: "recurrence",
    name: "递推法",
    tag: "递推法",
    category: "counting",
    summary:
      "用“上一步怎么办”写出公式，把未知规模的问题一层层推回已知的小规模。",
    intuition:
      "楼梯一步能迈 1 或 2 级，第 n 级的方法数 = 第 n−1 级（再跨 1）+ 第 n−2 级（再跨 2）。把“第 n 的答案”表达成“更小规模的答案”，就能像多米诺一样推过去。",
    derivation: [
      "设 a_n 为规模为 n 时的方案数。",
      "分析“最后一步”，把它拆成几种情形，每种情形剩下的规模分别是 n − k。",
      "于是 a_n = a_{n-1} + a_{n-2} + …（看实际情形）。",
      "结合初值 a_0, a_1 从小到大算出 a_n。",
    ],
    keyPoints: [
      "递推的灵魂是“分析最后一步”。",
      "常见初值：a_0, a_1，有时 a_2；必须独立计算以启动递推。",
    ],
    examples: [
      {
        title: "爬楼梯",
        problem:
          "楼梯有 10 级，每步上 1 级或 2 级。有多少种不同走法？",
        solution: [
          "a_1 = 1, a_2 = 2。",
          "a_n = a_{n-1} + a_{n-2}。",
          "依次算：3, 5, 8, 13, 21, 34, 55, 89。",
          "a_10 = 89。",
        ],
      },
    ],
    pitfalls: [
      "初值算错，整条链都错。",
      "“分析最后一步”时情形不要漏。",
    ],
    relatedSlugs: ["enumeration"],
  },
  {
    slug: "telescoping",
    name: "裂项",
    tag: "裂项",
    category: "numberCalc",
    summary: "把一项拆成“相邻两项之差”，前后相消，长和瞬间折叠成头尾两项。",
    intuition:
      "一列看似很长的加法，如果每一项都能写成“下一项 − 这一项”的差，那一连串加法就会像多米诺一样前后抵消，只留下最前和最后的两小块。",
    derivation: [
      "寻找形如 1 / [k(k+1)] = 1/k − 1/(k+1) 的拆分结构。",
      "把每一项都按这种方式拆开。",
      "相邻项相消，只剩首尾。",
    ],
    keyPoints: [
      "1 / [k(k+1)] = 1/k − 1/(k+1)。",
      "1 / [k(k+d)] = (1/d) · (1/k − 1/(k+d))。",
      "k / [(k)(k+1)!] 类也常见，思路一致。",
    ],
    examples: [
      {
        title: "经典分数和",
        problem: "求 1/(1·2) + 1/(2·3) + 1/(3·4) + … + 1/(99·100)。",
        solution: [
          "每项 1/(k(k+1)) = 1/k − 1/(k+1)。",
          "原式 = (1 − 1/2) + (1/2 − 1/3) + … + (1/99 − 1/100)。",
          "相消后 = 1 − 1/100 = 99/100。",
        ],
      },
      {
        title: "带步长",
        problem: "1/(1·3) + 1/(3·5) + … + 1/(99·101)。",
        solution: [
          "1/(k(k+2)) = (1/2)(1/k − 1/(k+2))。",
          "原式 = (1/2) · [(1/1 − 1/3) + (1/3 − 1/5) + … + (1/99 − 1/101)]。",
          "= (1/2)(1 − 1/101) = 50/101。",
        ],
        takeaway: "公差不是 1 时，前面要加“1 / 公差”作为系数。",
      },
    ],
    pitfalls: [
      "先验证每项真的能拆成相邻差；不要乱拆。",
    ],
    relatedSlugs: ["distributive-law"],
  },
  {
    slug: "distributive-law",
    name: "乘法分配律",
    tag: "乘法分配律",
    category: "numberCalc",
    summary:
      "(a + b) × c = a × c + b × c；正反两用，是速算与巧算的主力工具。",
    intuition:
      "分配律就像“批发共同因数”：几笔相似的乘积里如果有同一个因数，就把它提出来一次算；反过来，难算的乘积里也可以主动“凑”出共同因数。",
    derivation: [
      "基本形式：(a + b) · c = a · c + b · c。",
      "反向使用（提公因数）：a · c + b · c = (a + b) · c。",
      "速算：把一个复杂因数拆成 (整 + 尾) 或 (整 − 尾)，分别与另一因数相乘再合并。",
    ],
    keyPoints: [
      "正用：拆开；反用：合并。",
      "“凑整”是速算的核心动机。",
    ],
    examples: [
      {
        title: "正用拆开",
        problem: "99 × 37 = ?",
        solution: ["99 × 37 = (100 − 1) × 37 = 3700 − 37 = 3663。"],
      },
      {
        title: "反用提取",
        problem: "125 × 7 + 125 × 3 = ?",
        solution: ["= 125 × (7 + 3) = 125 × 10 = 1250。"],
      },
      {
        title: "混合",
        problem: "37 × 24 + 37 × 76 = ?",
        solution: ["= 37 × (24 + 76) = 37 × 100 = 3700。"],
      },
    ],
    pitfalls: [
      "分配只对“乘 + 加/减”成立，不要对“加 × 加”乱用。",
    ],
    relatedSlugs: ["rounding", "telescoping"],
  },
  {
    slug: "place-value",
    name: "位值原理",
    tag: "位值原理",
    category: "numberCalc",
    summary:
      "一个 n 位数 = 各位数字 × 其位权之和；遇到“数字交换”或“数字约束”的题，必须从位值写起。",
    intuition:
      "数字 “234” 不是 “2、3、4 三个符号”，而是 2 × 100 + 3 × 10 + 4 × 1。把数字拆开按位权加权，题目里的“十位是什么”“交换前后”瞬间就有代数表达。",
    derivation: [
      "三位数 abc = 100a + 10b + c（a, b, c 为数字，1 ≤ a ≤ 9）。",
      "数字交换：交换后新数 − 原数 = 位值差 · 数字差。",
      "带约束的“寻数”题，通常列出位值表达，再用整除 / 奇偶分析逐位确定。",
    ],
    keyPoints: [
      "两位数 ab 翻转后减原数 = 9(b − a)。",
      "三位数百位与个位交换，差 = 99(c − a)。",
    ],
    examples: [
      {
        title: "数字交换",
        problem:
          "一个两位数，交换十位与个位后比原数大 36。原数十位与个位差多少？",
        solution: [
          "设原数为 10a + b，交换后 10b + a。",
          "(10b + a) − (10a + b) = 9(b − a) = 36，b − a = 4。",
        ],
      },
      {
        title: "三位数重组",
        problem:
          "一个三位数的百位、十位、个位分别为 a, b, c。把它倒过来写成三位数（c, b, a），原数与新数之差是多少？",
        solution: [
          "原数 = 100a + 10b + c，新数 = 100c + 10b + a。",
          "原数 − 新数 = 99a − 99c = 99(a − c)。",
          "结论：差值一定是 99 的倍数，与十位无关。",
        ],
        takeaway:
          "位值展开后，数字的加减立刻对应到“位权 × 数字差”，中间位常常消掉。",
      },
    ],
    pitfalls: [
      "首位数字不能为 0。",
      "写成位值后别忘了数字本身的取值范围（0–9）。",
    ],
    relatedSlugs: ["congruence"],
  },
  {
    slug: "congruence",
    name: "同余",
    tag: "同余",
    category: "numberCalc",
    summary:
      "两个数除以 m 余数相同，记作 a ≡ b (mod m)。余数守加、守减、守乘——整除问题的万能语言。",
    intuition:
      "“钟表上的 14 点和 2 点指针指向同一位置”，这就是 14 ≡ 2 (mod 12)。同余让我们忽略具体数值，只关心“余数”这一特征。",
    derivation: [
      "定义：a ≡ b (mod m) ⇔ m | (a − b)。",
      "运算性质：若 a ≡ b, c ≡ d (mod m)，则 a + c ≡ b + d，a − c ≡ b − d，a · c ≡ b · d (mod m)。",
      "幂：a^k ≡ b^k (mod m)。",
      "常用技巧：把大数对 m 取余后再运算，保持结果正确。",
    ],
    keyPoints: [
      "同加减乘：余数守恒（但除法不一定）。",
      "求余 = 先对每一部分求余，再合并。",
    ],
    examples: [
      {
        title: "大数求余",
        problem: "求 7^100 除以 5 的余数。",
        solution: [
          "7 ≡ 2 (mod 5)，所以 7^100 ≡ 2^100 (mod 5)。",
          "2^4 = 16 ≡ 1 (mod 5)，所以 2^100 = (2^4)^25 ≡ 1 (mod 5)。",
          "余数 = 1。",
        ],
      },
      {
        title: "星期几",
        problem: "今天是星期三，100 天后是星期几？",
        solution: [
          "100 ≡ 2 (mod 7)。",
          "星期三 + 2 天 = 星期五。",
        ],
      },
    ],
    pitfalls: [
      "除法不满足同余，不能直接“两边除”。",
      "取余时保持 0 ≤ 余数 < m。",
    ],
    relatedSlugs: ["place-value"],
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
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 220" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="90,70 90,150 150,70"/><polygon points="90,70 90,150 10,150 10,70" fill="currentColor" fill-opacity="0.1"/><polygon points="90,70 150,70 150,10 90,10" fill="currentColor" fill-opacity="0.1"/><polygon points="90,150 150,70 230,130 170,210" fill="currentColor" fill-opacity="0.18"/><g fill="currentColor" stroke="none" font-size="12" font-family="serif"><text x="40" y="115">b²</text><text x="115" y="45">a²</text><text x="180" y="150">c²</text></g></svg>`,
        alt: "勾股定理三正方形示意",
        caption: "两直角边上正方形之和 = 斜边上正方形：a² + b² = c²。",
      },
    ],
  },
  {
    slug: "line-segment-diagram",
    name: "线段图法",
    tag: "线段图法",
    category: "word",
    summary:
      "用线段的长短表示数量，把“和/差/倍”翻译成一张可测量的图，复杂条件一眼可读。",
    intuition:
      "把每个未知量画成一条线段，长短正比于它代表的量。和、差、倍立刻变成“总长”“超出段”“多出的格”，避免在文字里绕。",
    derivation: [
      "对每个主要对象画一条线段，长度正比于数量。",
      "用“一段 / 多出 / 总长”等标注刻画题目条件。",
      "用分段的概念找到“一份” = 多少，再整体还原。",
    ],
    keyPoints: [
      "和差问题：两段总长 & 多出段。",
      "倍数问题：大量若干格，小量 1 格。",
      "差倍结合：先切掉“多出”凑齐倍数，再均分。",
    ],
    examples: [
      {
        title: "差倍",
        problem: "甲是乙的 3 倍，甲比乙多 16。各是多少？",
        solution: [
          "乙画 1 格，甲画 3 格，多出 2 格对应 16。",
          "1 格 = 8。乙 = 8，甲 = 24。",
        ],
      },
      {
        title: "和倍",
        problem:
          "甲乙两筐共 42 个苹果，甲是乙的 2 倍。各多少？",
        solution: [
          "乙 1 格，甲 2 格，共 3 格对应 42。",
          "1 格 = 14。乙 = 14，甲 = 28。",
        ],
      },
    ],
    pitfalls: [
      "画图时长度比例要近似真实，否则误导判断。",
    ],
    relatedSlugs: ["drawing-method", "hypothesis-method"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="20" y="24" width="40" height="22" fill="currentColor" fill-opacity="0.12"/><rect x="20" y="64" width="120" height="22" fill="currentColor" fill-opacity="0.12"/><line x1="60" y1="24" x2="60" y2="86"/><line x1="100" y1="64" x2="100" y2="86"/><line x1="140" y1="46" x2="140" y2="86"/><g fill="currentColor" stroke="none" font-size="11" font-family="sans-serif"><text x="4" y="40">乙</text><text x="4" y="80">甲</text><text x="64" y="110">多 2 格 = 16</text></g></svg>`,
        alt: "差倍问题的线段图",
        caption: "差倍：甲 3 格、乙 1 格，多出 2 格对应 16。",
      },
    ],
  },
  {
    slug: "cross-multiplication",
    name: "十字交叉法",
    tag: "十字交叉法",
    category: "word",
    summary:
      "两种浓度 / 单价混合，求比例时按“差对交叉写”：所求比 = 对方差值 : 本方差值。",
    intuition:
      "把两种浓度（或价格）写在上方，目标浓度写在中间，四角相减再交叉，写出来的两个差就是两种物质的“质量比”。纸上画个十字，速度极快。",
    derivation: [
      "设两种浓度 a > b，目标浓度 c，a > c > b。",
      "把 a, b 分别写在左右两列顶部，c 写中心。",
      "“上 − 中” = a − c，“中 − 下” = c − b。",
      "两种物质的质量比 = (c − b) : (a − c)（注意交叉写）。",
    ],
    keyPoints: [
      "浓度、价格、利率等“加权平均”问题都可用。",
      "口诀：“差对交叉”——记住结果按对角线取值。",
    ],
    examples: [
      {
        title: "浓度混合",
        problem:
          "20% 盐水和 5% 盐水混合成 12% 盐水，两种盐水的质量比是多少？",
        solution: [
          "20 − 12 = 8；12 − 5 = 7。",
          "20% 盐水 : 5% 盐水 = 7 : 8。",
        ],
      },
      {
        title: "买糖",
        problem:
          "单价 8 元与 5 元的糖混合后平均每千克 7 元，两种糖的质量比？",
        solution: [
          "8 − 7 = 1；7 − 5 = 2。",
          "8 元 : 5 元 = 2 : 1。",
        ],
        takeaway: "谁贵谁对应“便宜端的差”——总结成“交叉”最不易错。",
      },
    ],
    pitfalls: [
      "只适用于按质量的加权平均；按体积等别的权重时要先换算。",
      "若目标值在两端之外（c 不夹在 a 和 b 间），无法混合出。",
    ],
    relatedSlugs: ["hypothesis-method"],
  },
  {
    slug: "worst-case-principle",
    name: "最不利原则",
    tag: "最不利原则",
    category: "general",
    summary:
      "考虑“最差的情况”：要保证某事件发生，必须先跨过最差那道坎。常与抽屉原理联用。",
    intuition:
      "“至少拿几只才能保证有两只同色”——这类“保证”题就是在问“运气最差时还要多少”。先假装全是不巧，再加 1，就是答案。",
    derivation: [
      "要保证“至少发生 k 个 X”——先想“最多能连续不发生多少次”。",
      "答案 = 最多不发生次数 + 需要发生的次数。",
    ],
    keyPoints: [
      "“保证” = 最坏情况也成立。",
      "与抽屉原理组合使用最常见。",
    ],
    examples: [
      {
        title: "袜子",
        problem:
          "抽屉里有红袜子 10 只、蓝袜子 8 只、黑袜子 6 只。闭眼至少拿几只，才能保证有 3 只同色？",
        solution: [
          "最坏情况：每种颜色拿 2 只都不成 3，共 2 × 3 = 6 只。",
          "再拿一只，必定凑出 3 只同色。",
          "答案 = 6 + 1 = 7 只。",
        ],
      },
      {
        title: "扑克抽牌",
        problem:
          "一副去掉大小王的扑克（52 张，4 种花色），至少抽几张能保证有 5 张同花色？",
        solution: [
          "最坏：每种花色先抽 4 张，共 16 张。",
          "再抽 1 张必凑出一种 5 张同花。",
          "答案 17 张。",
        ],
        takeaway: "“最差 + 1”是这个套路的公式。",
      },
    ],
    pitfalls: [
      "最坏情况要考虑全——别遗漏某种“更坏”的分配。",
    ],
    relatedSlugs: ["pigeonhole"],
  },
  {
    slug: "bundling",
    name: "捆绑法",
    tag: "捆绑法",
    category: "counting",
    summary: "必须相邻的对象先捆成一捆，再与其它人一起排，内部再做排列。",
    intuition:
      "题目要求“甲乙必须相邻”——那就用一根橡皮筋把他俩捆在一起，视为“一个人”，等排好之后再解开，让橡皮筋里的甲乙自己换位置。",
    derivation: [
      "把必须相邻的 k 个对象看作一个整体，与其余 n − k 个对象一起排列，共 (n − k + 1)! 种。",
      "这个整体内部还能相互换位置，贡献 k! 种。",
      "答案 = (n − k + 1)! × k!。",
    ],
    keyPoints: [
      "相邻 → 捆绑。",
      "别忘了内部还要乘 k!。",
    ],
    examples: [
      {
        title: "必须相邻",
        problem: "5 个人排成一排，甲乙必须相邻。共有多少种排法？",
        solution: [
          "把甲乙捆为一个“合体”，与其余 3 人共 4 个对象排列：4! = 24。",
          "甲乙内部有 2! = 2 种顺序。",
          "共 24 × 2 = 48 种。",
        ],
      },
    ],
    pitfalls: [
      "多于两个人相邻时，捆内排列是 k! 不是 2。",
    ],
    relatedSlugs: ["gap-insertion", "additive-multiplicative"],
  },
  {
    slug: "gap-insertion",
    name: "插空法",
    tag: "插空法",
    category: "counting",
    summary: "要求“不相邻”的对象最后插入，先把其它对象排好，再往“空隙”里放。",
    intuition:
      "要让几个人不相邻，先别让他们上台；让其他人先站好形成若干空隙，再把这些人分别插进不同空隙，天然就不挨着。",
    derivation: [
      "先把“可以随意站”的 m 个对象排列：m! 种。",
      "这 m 个对象形成 m + 1 个空隙（两端也算）。",
      "把不能相邻的 k 个对象从这些空隙里任选 k 个分别放入：A(m+1, k) 种。",
      "总数 = m! × A(m+1, k)。",
    ],
    keyPoints: [
      "不相邻 → 插空。",
      "空隙数 = m + 1；若有“不靠端”等限制，空隙要少算。",
    ],
    examples: [
      {
        title: "不相邻",
        problem: "5 个人排一排，甲乙不能相邻。共多少种排法？",
        solution: [
          "其余 3 人先排：3! = 6。",
          "产生 4 个空隙，甲乙从中选两个分别插入：4 × 3 = 12。",
          "共 6 × 12 = 72 种。",
        ],
        takeaway: "也可用“总排列 − 相邻排列 = 120 − 48 = 72”验证。",
      },
    ],
    pitfalls: [
      "空隙数要按“已排对象 + 1”计，容易漏掉两端的空隙。",
    ],
    relatedSlugs: ["bundling"],
  },
  {
    slug: "stars-and-bars",
    name: "隔板法",
    tag: "隔板法",
    category: "counting",
    summary:
      "把 n 个相同的物品分给 k 个人，每人至少 1 个 → C(n−1, k−1)；可以为 0 → C(n+k−1, k−1)。",
    intuition:
      "n 个相同的球排一排，它们之间有 n − 1 个缝隙。要分给 k 个人，就相当于在这些缝隙里选 k − 1 个位置插“隔板”——隔板把球切成 k 堆，每堆分给一个人。",
    derivation: [
      "n 个球排成一排，共 n − 1 个空隙。",
      "选 k − 1 个空隙插板：C(n − 1, k − 1) 种。",
      "允许有 0：先给每人“借 1 个”，转为“每人至少 1”，规模变成 n + k 个球分 k 人每人至少 1。",
      "结果：C(n + k − 1, k − 1)。",
    ],
    keyPoints: [
      "n 相同球分 k 人，每人 ≥ 1：C(n − 1, k − 1)。",
      "每人 ≥ 0：C(n + k − 1, k − 1)。",
    ],
    examples: [
      {
        title: "每人至少 1",
        problem: "10 个相同苹果分给 3 个小朋友，每人至少 1 个。多少种分法？",
        solution: ["C(10 − 1, 3 − 1) = C(9, 2) = 36。"],
      },
      {
        title: "允许为 0",
        problem: "10 个相同苹果分给 3 个小朋友，可以有人一个都不拿。多少种？",
        solution: ["C(10 + 3 − 1, 3 − 1) = C(12, 2) = 66。"],
      },
    ],
    pitfalls: [
      "球必须“相同”才能用；不同物品不能用此公式。",
      "“每人至少 m 个”也可以先借 m 再用。",
    ],
    relatedSlugs: ["bundling", "gap-insertion"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 60"><g fill="currentColor"><circle cx="20" cy="30" r="7"/><circle cx="40" cy="30" r="7"/><circle cx="60" cy="30" r="7"/></g><line x1="75" y1="10" x2="75" y2="50" stroke="currentColor" stroke-width="2.5"/><g fill="currentColor"><circle cx="90" cy="30" r="7"/><circle cx="110" cy="30" r="7"/><circle cx="130" cy="30" r="7"/><circle cx="150" cy="30" r="7"/></g><line x1="165" y1="10" x2="165" y2="50" stroke="currentColor" stroke-width="2.5"/><g fill="currentColor"><circle cx="180" cy="30" r="7"/><circle cx="200" cy="30" r="7"/><circle cx="220" cy="30" r="7"/></g></svg>`,
        alt: "10 球与 2 隔板分成三堆",
        caption: "10 个相同球 + 2 块隔板 → 分成 3 堆，一种分法对应一种选板方案。",
      },
    ],
  },
  {
    slug: "divisibility",
    name: "整除特征",
    tag: "整除特征",
    category: "numberCalc",
    summary: "常见小因数的整除规律：看尾数、看数字和、看奇偶位差——秒判能否整除。",
    intuition:
      "想知道一个大数能不能被某个小数整除，不必真的除，只要看它的“特征部位”：末位、数字和、倒数几位……一眼定论。",
    derivation: [
      "2：末位为偶。",
      "3：数字和能被 3 整除。",
      "4：末两位能被 4 整除。",
      "5：末位为 0 或 5。",
      "6：同时能被 2 和 3 整除。",
      "8：末三位能被 8 整除。",
      "9：数字和能被 9 整除。",
      "11：奇位数字和 − 偶位数字和 能被 11 整除。",
      "25：末两位是 00、25、50、75。",
      "125：末三位能被 125 整除。",
    ],
    keyPoints: [
      "“看尾几位”系列：2/4/8/5/25/125。",
      "“看数字和”系列：3/9。",
      "“奇偶位差”：11（小学奥数常考）。",
    ],
    examples: [
      {
        title: "判 11",
        problem: "判断 12345678 是否是 11 的倍数。",
        solution: [
          "奇位（从右起）：8 + 6 + 4 + 2 = 20。",
          "偶位：7 + 5 + 3 + 1 = 16。",
          "差 = 4，不是 11 的倍数。",
        ],
      },
      {
        title: "判 9",
        problem: "9876543 是否能被 9 整除？",
        solution: [
          "数字和 = 9 + 8 + 7 + 6 + 5 + 4 + 3 = 42。",
          "42 不是 9 的倍数，故原数也不是。",
        ],
      },
    ],
    pitfalls: [
      "7 没有简便特征（常用减去末位 × 2 的“折叠法”），记不住就老老实实除。",
    ],
    relatedSlugs: ["place-value", "congruence"],
  },
  {
    slug: "prime-factorization",
    name: "质因数分解",
    tag: "质因数分解",
    category: "numberCalc",
    summary:
      "每个合数都能唯一写成质数的乘积；求约数个数、公约数、最小公倍数的底层语言。",
    intuition:
      "质因数像一个数的“基因”。两个数比较约数、倍数关系，不看它们的十进制长相，只看基因组成。",
    derivation: [
      "任何 > 1 的整数 = 质数的乘积，且分解方式唯一（算术基本定理）。",
      "约数个数：若 n = p₁^a₁ · p₂^a₂ · … · pₖ^aₖ，则约数个数 = (a₁+1)(a₂+1)…(aₖ+1)。",
      "最大公约数：每个质因数取最小指数相乘。",
      "最小公倍数：每个质因数取最大指数相乘。",
    ],
    keyPoints: [
      "分解：试除法，从最小质数 2 开始除。",
      "GCD × LCM = a × b（两数之积）。",
    ],
    examples: [
      {
        title: "约数个数",
        problem: "360 有多少个正约数？",
        solution: [
          "360 = 2³ × 3² × 5。",
          "约数个数 = (3+1)(2+1)(1+1) = 24。",
        ],
      },
      {
        title: "GCD 与 LCM",
        problem: "求 gcd(84, 90) 与 lcm(84, 90)。",
        solution: [
          "84 = 2² · 3 · 7；90 = 2 · 3² · 5。",
          "GCD：2¹ · 3¹ = 6。",
          "LCM：2² · 3² · 5 · 7 = 1260。",
          "验证：6 × 1260 = 7560 = 84 × 90。",
        ],
      },
    ],
    pitfalls: [
      "判断质数时要到 √n 就够了。",
      "写分解时按升序排质因数，便于比较。",
    ],
    relatedSlugs: ["divisibility"],
  },
  {
    slug: "rounding",
    name: "凑整法",
    tag: "凑整法",
    category: "numberCalc",
    summary: "把数配成 10、100、1000 的整数倍，借助分配律/结合律让算式秒算。",
    intuition:
      "心算爱 10、100——因为它们“干净”。凑整就是主动把相邻数字搭配成整 10/整 100，再借分配律 / 结合律完成速算。",
    derivation: [
      "利用加法交换与结合：把“凑整对子”搬到一起先加（如 25 + 75 = 100）。",
      "利用乘法结合：把 25 × 4 = 100、125 × 8 = 1000 提前算出。",
      "必要时拆一个数成 (整 ± 小)，再分配。",
    ],
    keyPoints: [
      "黄金搭档：25 × 4 = 100，125 × 8 = 1000。",
      "两位数速算：a × 11 = a × 10 + a。",
    ],
    examples: [
      {
        title: "加法凑整",
        problem: "37 + 48 + 63 + 52 = ?",
        solution: [
          "(37 + 63) + (48 + 52) = 100 + 100 = 200。",
        ],
      },
      {
        title: "乘法凑整",
        problem: "25 × 36 × 4 = ?",
        solution: ["25 × 4 = 100；100 × 36 = 3600。"],
      },
    ],
    pitfalls: [
      "凑整要用律，不是胡拼凑——先确认加/乘的交换或结合成立。",
    ],
    relatedSlugs: ["distributive-law", "head-tail-pairing"],
  },
  {
    slug: "head-tail-pairing",
    name: "首尾配对",
    tag: "首尾配对",
    category: "numberCalc",
    summary: "等差数列求和：头尾两两配对，每对和相同，总和 = 对数 × 配对和。",
    intuition:
      "1 + 2 + 3 + … + 100 写成两排，一排顺、一排倒：1 + 100，2 + 99，…每对都是 101。共 50 对，于是总和 = 50 × 101 = 5050。这就是高斯小时候用的配对法。",
    derivation: [
      "等差数列 a₁, a₂, …, aₙ（公差 d）。",
      "首尾 a₁ + aₙ 与 a₂ + a_{n-1} 都等于 a₁ + aₙ（对称性）。",
      "共 n/2 对，总和 = n × (a₁ + aₙ) / 2。",
    ],
    keyPoints: [
      "等差数列求和公式：S = n × (首 + 末) ÷ 2。",
      "项数 n = (末 − 首) / d + 1。",
    ],
    examples: [
      {
        title: "连续整数",
        problem: "1 + 2 + … + 100 = ?",
        solution: ["S = 100 × (1 + 100) / 2 = 5050。"],
      },
      {
        title: "等差有公差",
        problem: "3 + 7 + 11 + … + 99 = ?",
        solution: [
          "项数 n = (99 − 3)/4 + 1 = 25。",
          "S = 25 × (3 + 99) / 2 = 1275。",
        ],
      },
    ],
    pitfalls: [
      "项数要用公式算清楚，不能数手指。",
    ],
    relatedSlugs: ["arithmetic-sequence-method", "telescoping"],
  },
  {
    slug: "invariant",
    name: "不变量",
    tag: "不变量",
    category: "general",
    summary:
      "找一个“无论怎么操作都不变”的量，当目标状态里这个量变了，就说明不可能达成。",
    intuition:
      "河流怎么拐弯流速会变，但“水的总量”不变。题目里无论怎么折腾，总有一个量像“水量”一样纹丝不动；盯住它，往往能一眼看出结论。",
    derivation: [
      "识别一个量 Q，证明每一步操作之后 Q 不变。",
      "计算初始 Q₀ 与目标 Q_target。",
      "若 Q₀ ≠ Q_target，则目标状态不可达；反之需其它手段判定。",
    ],
    keyPoints: [
      "常见不变量：总和、奇偶性、余数、颜色分布、某种“权和”。",
      "不变量只能证“不行”，不能直接证“一定行”。",
    ],
    examples: [
      {
        title: "黑白棋盘",
        problem:
          "8×8 棋盘去掉两个对角的格子。能否用 1×2 的多米诺骨牌完全覆盖剩下的 62 格？",
        solution: [
          "黑白相间染色，每张 1×2 骨牌必覆盖 1 黑 1 白。",
          "两个对角是同色，去掉后黑白各剩 30、32（不等）。",
          "不变量：黑白数目之差。骨牌保持差为 0，而目标差为 2——不可能。",
        ],
        takeaway: "找到合适的“染色”是构造不变量最常见的手段。",
      },
    ],
    pitfalls: [
      "要证明不变性对“每一种”允许操作都成立。",
    ],
    relatedSlugs: ["parity"],
    figures: [
      {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130"><g fill="currentColor"><rect x="35" y="5" width="30" height="30"/><rect x="95" y="5" width="30" height="30"/><rect x="5" y="35" width="30" height="30"/><rect x="65" y="35" width="30" height="30"/><rect x="35" y="65" width="30" height="30"/><rect x="95" y="65" width="30" height="30"/><rect x="5" y="95" width="30" height="30"/><rect x="65" y="95" width="30" height="30"/></g><g stroke="currentColor" stroke-width="0.8" fill="none"><rect x="5" y="5" width="120" height="120"/><line x1="35" y1="5" x2="35" y2="125"/><line x1="65" y1="5" x2="65" y2="125"/><line x1="95" y1="5" x2="95" y2="125"/><line x1="5" y1="35" x2="125" y2="35"/><line x1="5" y1="65" x2="125" y2="65"/><line x1="5" y1="95" x2="125" y2="95"/><line x1="5" y1="5" x2="35" y2="35" stroke-width="1.5"/><line x1="35" y1="5" x2="5" y2="35" stroke-width="1.5"/><line x1="95" y1="95" x2="125" y2="125" stroke-width="1.5"/><line x1="125" y1="95" x2="95" y2="125" stroke-width="1.5"/></g></svg>`,
        alt: "去掉同色两角的棋盘",
        caption: "两个对角同色——去掉后黑白格数不相等，骨牌无法覆盖。",
      },
    ],
  },
  {
    slug: "ratio-method",
    name: "比例法",
    tag: "比例法",
    category: "word",
    summary:
      "把未知量写成比，再按比分配总量；遇到“倍”“占比”“比 a:b”都能直接用。",
    intuition:
      "把几个量拆成“统一的一份”的整数倍，题目里的关系就变成了一张“几份几份”的地图——每份多少算出来，其它全有了。",
    derivation: [
      "识别题目里的比例关系，用 k 份表示每个量。",
      "按“总量 = Σ 份数 × 1 份”解出“1 份 = 多少”。",
      "还原每个量。",
    ],
    keyPoints: [
      "“按比分配”：总量 ÷ 总份数 = 1 份。",
      "“三量连比”：化成公共份数再分。",
    ],
    examples: [
      {
        title: "按比分配",
        problem:
          "一笔 360 元的奖金按 3 : 4 : 5 分给甲乙丙。各多少？",
        solution: [
          "总份 = 3 + 4 + 5 = 12 份。",
          "1 份 = 360 ÷ 12 = 30。",
          "甲 90、乙 120、丙 150。",
        ],
      },
    ],
    pitfalls: [
      "三量连比要先“对齐”公共基准，再求份。",
    ],
    relatedSlugs: ["shares-method", "line-segment-diagram"],
  },
  {
    slug: "shares-method",
    name: "份数法",
    tag: "份数法",
    category: "word",
    summary:
      "把未知量抽象成整数“份”，把复杂的倍数 / 分数关系简化成整数份的加减。",
    intuition:
      "“甲比乙多 1/3”“乙是丙的 2/5”——分数运算让人头晕。设一个量为 k 份，让它和其它量都变成整数份，复杂关系立刻变简单。",
    derivation: [
      "选择一个量作为“1 份”或“n 份”，让题目里的其它分数 / 倍数关系都能整数化。",
      "用份写出所有量之间的加减关系。",
      "从已知条件算出“1 份 = 多少”，还原真值。",
    ],
    keyPoints: [
      "份数基数要选“最小公倍数友好”的。",
      "份数法 = 线段图法的代数化。",
    ],
    examples: [
      {
        title: "比例转换",
        problem: "甲是乙的 2/3，乙是丙的 3/4。甲乙丙共 52，求各是多少。",
        solution: [
          "丙 4 份，乙 3 份，甲 2 份（方便地表达所有比例关系）。",
          "总份 = 2 + 3 + 4 = 9；1 份 = 52 / 9 ≈ 5.78——不整，调整基数。",
          "取丙 = 12 份（使乙 = 9、甲 = 6 都是整数），总份 6 + 9 + 12 = 27，1 份 = 52/27——依旧非整。",
          "说明题目本身不取整；此时结果就是分数：1 份 = 52/9（以最初的份数），甲 = 104/9 ≈ 11.56……",
          "做题时如果给出总数“可整除总份数”，过程就会很干净。",
        ],
        takeaway:
          "份数法的效率依赖于“好基数”；数字不整时换基数或直接用分数也行。",
      },
    ],
    pitfalls: [
      "基数选错会让 1 份变分数；选最小公倍数最稳。",
    ],
    relatedSlugs: ["ratio-method", "line-segment-diagram"],
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
  {
    slug: "arithmetic-sequence-method",
    name: "等差数列法",
    tag: "等差数列法",
    category: "magicSquare",
    summary:
      "幻方里的数字常形成等差（或多个等差段）；用“首尾配对 + 平均值”一次性算出幻和与中心。",
    intuition:
      "幻方的数字不是随便乱给的——它们几乎总能写成等差数列。一旦发现“数字等差”，总和、平均、幻和这些都是等差公式的直接产出。",
    derivation: [
      "设幻方里的数字是公差为 d 的等差数列。",
      "总和 = n² × (首 + 末) / 2（n 阶幻方用 n² 个数）。",
      "幻和 = 总和 / n = n × (首 + 末) / 2。",
      "3 阶幻方的中心 = 平均值 = (首 + 末) / 2。",
    ],
    keyPoints: [
      "等差数列求和公式是入口。",
      "幻和 = n × 平均值（n 阶）。",
    ],
    examples: [
      {
        title: "非 1..9 的 3 阶",
        problem: "用 1, 3, 5, 7, 9, 11, 13, 15, 17 填 3 阶幻方。幻和与中心？",
        solution: [
          "等差数列：首 1，末 17，共 9 项。",
          "平均 = (1 + 17)/2 = 9，中心 = 9。",
          "幻和 = 3 × 9 = 27。",
        ],
      },
    ],
    pitfalls: [
      "不能确定数字真的构成等差时，先验证。",
    ],
    relatedSlugs: ["center-number-method", "accumulation-method", "head-tail-pairing"],
  },
];

const BY_SLUG = new Map(ENTRIES.map((e) => [e.slug, e]));
const BY_TAG = new Map(
  ENTRIES.filter((e) => e.tag).map((e) => [e.tag as string, e]),
);

export const knowledgeEntries: KnowledgeEntry[] = ENTRIES;

export function getKnowledgeBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return BY_SLUG.get(slug);
}

export function getKnowledgeByTag(tag: string | undefined) {
  if (!tag) return undefined;
  return BY_TAG.get(tag);
}

/**
 * Resolve a knowledge entry from either an explicit slug (as declared on
 * a problem's `knowledgePoints[].slug`) or a raw method tag name.
 */
export function resolveKnowledge(
  key: { slug?: string; tag?: string; name?: string } | string,
): KnowledgeEntry | undefined {
  if (typeof key === "string") {
    return BY_SLUG.get(key) ?? BY_TAG.get(key);
  }
  return (
    getKnowledgeBySlug(key.slug) ??
    getKnowledgeByTag(key.tag ?? key.name)
  );
}

export function getProblemsForKnowledge(
  entry: KnowledgeEntry,
  limit = 8,
): ProblemData[] {
  if (!entry.tag) return [];
  return problems
    .filter((p) => p.tags.includes(entry.tag as string))
    .slice(0, limit);
}
