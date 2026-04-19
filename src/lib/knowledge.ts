import { METHOD_TAGS } from "@/lib/tags";
import { problems } from "@/lib/problems";
import type { ProblemData } from "@/types/problem";

/**
 * Knowledge base for method/technique explainer pages (`/knowledge/:slug`).
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
