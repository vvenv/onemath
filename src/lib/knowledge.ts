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
