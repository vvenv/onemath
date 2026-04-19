import type { KnowledgeEntry } from "./types";

export const countingEntries: KnowledgeEntry[] = [
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
];
