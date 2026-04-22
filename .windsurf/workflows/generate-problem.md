---
description: Given a reference document under docs/, produce a generation plan and then create OneMath problems covering its topics.
---

# 基于文档批量生成题目 (/generate-problem)

给定一份位于 `docs/` 下的知识点文档（例如 `docs/排列组合.md`），先**生成计划**（列出要新增哪些题目），再**逐题生成**符合 OneMath 数据结构的完整题目文件。

## 使用方式

```
/generate-problem <文档路径>
```

或自由描述：

```
/generate-problem 根据 docs/排列组合.md 生成一批题目
/generate-problem 按 docs/排列组合.md 里的进阶篇给我出 5 道题
```

## 参数

| 参数    | 必填 | 说明                                                                                    |
| ------- | ---- | --------------------------------------------------------------------------------------- |
| `doc`   | ✅   | `docs/` 下的参考文档路径（Markdown）                                                    |
| `scope` | ❌   | 限定范围，如 `基础篇` / `进阶篇` / `挑战篇` / 某个具体题型，缺省表示整篇                |
| `count` | ❌   | 期望生成的题目数量，缺省按文档题型条目数（每个题型 1 道，难度不足时在同题型内补足变式） |

## 执行流程

### 阶段 1：解析文档并生成计划

1. **读取文档**：完整阅读 `doc`，识别其中的题型表格（通常含"题型分类 / 年级 / 难度 / 所属模块"等列）。
2. **对齐分类体系**：将文档中的模块/题型映射到 `docs/CATEGORY.md` 与 `src/types/problem.ts` 内的联合类型：
   - 模块 → `calc | geometry | numberTheory | word | travel | counting | misc`
   - 年级 → `三年级 | 四年级 | 五年级 | 六年级`
   - 难度 → `基础 | 进阶 | 挑战`
3. **查已有 ID**（// turbo）：
   ```bash
   ls src/data/problems/*.ts | sort -V | tail -1 | sed 's/.*\/\([0-9]*\)\.ts/\1/'
   ```
   新 ID 从「最大 ID + 1」开始依次递增（5 位，10001–19999）。
4. **输出计划表**：以 Markdown 表格形式呈现给用户，包含：

   | 序号 | 预分配 ID | 题型 | 方法标签 | 年级 | 难度 | 模块 | 一句话题面构思 |
   | ---- | --------- | ---- | -------- | ---- | ---- | ---- | -------------- |
   - 每行对应一道将要生成的题目。
   - 同一题型若文档中跨多个难度/年级，按行拆分。
   - 题面构思必须**只描述问题**，不泄露解法。

5. **等待/自动确认**：如用户未明确确认数量或范围，询问是否按此计划生成；若请求已包含明确范围或数量，直接进入阶段 2。

### 阶段 2：逐题生成

对计划表中每一行：

1. **参考同模块已有题目**：至少抽查 1 个 `src/data/problems/*.ts`（优先同 `module` + 同 `difficulty`），保持 `solutions` / `scenes` / `variant` 结构风格一致。
2. **写入** `src/data/problems/{id}.ts`，字段对齐 `ProblemData`（见 `src/types/problem.ts`）；文件骨架：

   ```ts
   import type { ProblemData } from "@/types/problem";

   export default {
     /* 题目数据 */
   } satisfies ProblemData;
   ```

3. **类型自检**（// turbo）：
   ```bash
   pnpm exec tsc --noEmit
   ```
4. 按质量清单自查；全部完成后给出生成汇总（ID 列表 + 标题）。

## 题目内容规范（重要）

### 题干与 figures（呈现给学生的部分）

- **题干只描述问题，不得包含任何解法线索**，包括但不限于：
  - 不出现 "提示：…"、"建议用 … 法"、"可写成 (a+b)(a−b)"、"令 x = …" 之类的解题引导；
  - 不给出关键中间量（如 "两数的差为 60"），除非它本身就是题目条件；
  - 不在 SVG/figure 中标注公式、步骤或结论。
- `figures` 用于展示题面信息（图形、算式、场景），内容应与 `question` 的已知条件等价，不得透露解法或答案。
- **figures 严格禁止泄露方法/分析**。常见违规示例（对应计数类题型，均属禁止）：
  - 把要求相邻的元素画成一个大框并写 "捆在一起 / 视为 1 个" → 泄露**捆绑法**。
  - 画出"空位 ∧ ∧ ∧"并标 "插入不相邻元素" → 泄露**插空法**。
  - 在物品之间画竖线并标 "隔板①隔板②" → 泄露**隔板法**。
  - 把某一位写上 "只能是 1/3/5" 或 "不能填 0" → 泄露**特殊元素优先法 / 分类讨论**。
  - 在网格点上预先写数、标 "每格 = 左 + 下" → 泄露**标数法**。
  - 用方框或箭头标明 "固定一人" / "旋转等价" → 泄露**固定参照物法**。
- **判断标准**：若一张 figure 的标注/形状只有读者"已经知道用哪种方法"之后才写得出来，就是泄露；这种内容必须移到 `solutions`。
- `figures` 只应呈现：题目直接给出的人/物/位置/数值、可直接从题面读出的几何结构，以及帮助理解但不暗示方法的中性示意（例如 6 个位置的空框、5 个人围圆桌、10 个完全相同的苹果一字排开而不画隔板）。
- **带方法暗示的好图不要浪费**：如果一张 SVG 清晰地可视化了某种方法（例如"圈出捆在一起的元素"、"画出 ∧ 形空位"、"苹果之间放 2 块隔板"、"某一位标出允许集合"），把它以 `{ "kind": "svg", "svg": "…", "caption": "…" }` 的形式放进**对应方法的 `solutions[i].scenes`** 中（通常放在该方法 `steps` 的分析/建模步骤之后）。题面 `figures` 里保留一张**中性示意图**即可。
- 已知数值、单位、关系要完整且自洽；避免模糊表述（"若干"、"大约"需谨慎）。

### solutions（讲解部分）

- 至少 1 种完整解法，推荐 2–3 种不同思路（例如：公式法、图示法、倒推法、捆绑/插空/隔板等）。
- 每个 `solution`：
  - `key` 英文短标识（如 `bundle`、`insert`、`divider`、`exclude`）。
  - `label` 中文方法名（如 "捆绑法"、"插空法"、"隔板法"）。
  - `steps[]` 按思考顺序分条，单条可读、不过长；关键结论单列一条。
  - 对于复杂的题目，**第一步必须是"分析"**：把题面中的隐含约束、特殊元素/位置、需要去重的对称性等显式写出来（例如 "个位必须是奇数"、"百位不能是 0"、"3 堆大小相同会产生重复"）。凡是被从 figure 中移除的 "分析/约束翻译" 文字，都应在此步骤中呈现。
  - **简洁性（重要）**：`steps` 要精炼、不冗余。
    - 推荐每个 solution **2–4 条** step：分析 1 条（如果是复杂的题目） + 推导 1–2 条 + 可选结论/点评 1 条。
    - 如果"分析"里已经把解法路径讲清楚了，**不要再把推导拆成多条平铺步骤**——直接用一条紧凑的推导链（如 `99 × 73 = (100 − 1) × 73 = 7300 − 73 = 7227`）收尾。
    - 反过来，如果打算把推导细分成多步，"分析"就不要剧透每一步的算式，只讲洞察与策略。
    - `steps` 与 `scenes` 分工：`scenes`（尤其是 `equation-list`）负责逐行可视化推导；`steps` 只承担叙事，**不要把每一个 equation-list 行再复述成一条 step**。
    - **禁止"合并复述"**：如果 `scenes` 里的 `equation-list` 已经把完整推导逐行展示，就不要再加一条仅把这些行串成一整条等式链的 `step`（例如 `a × b + a × c = a × (b + c) = a × 100 = …`）。分析步 + 场景即可，推导别写两遍。
    - 对照 / 备选解法（`对照`、`直接法` 等）更要紧凑：合并例行算术为一行，只保留与主解法形成对比的结论。
  - `scenes[]` 选用合适的 scene 类型辅助理解（见下）。
- 解法应真正解决题目，不能绕过关键推理。

### variant（可交互练习）

- `question` 与主题相同、数值不同，难度相近；避免让主题解法完全照搬（可微调结构）。
- `fields[]` 至少 1 项，键名语义清晰；比较类题目用 `type: "text"` + `enum: [">", "<", "="]`。
- `answer` 精确可判分；数值给最简/准确形式。
- `hint` 为简短引导（可含方法名），`hint` 是练习提示可含方法线索，但主 `question` 不可。

### scenes 选型建议

- 数值/公式推演：`equation-list`
- 数量或大小对比：`compare-bars`、`number-line`
- 最终结论徽标：`result-badges`
- 图形/几何/面积变化：`svg`（完整 `<svg>…</svg>`）或 `lattice`/`cube-net`
- 枚举/真假/逻辑：`statement-table`、`number-grid`
- 排列/排队、插空、捆绑等计数题：优先 `equation-list` 承载计数式，辅以 `svg` 画座位/空位示意
- 鸡兔同笼类：`heads`、`heads-split`

## 输出骨架

```ts
import type { ProblemData } from "@/types/problem";

export default {
  id: "10060",
  title: "主题·方法（简短）",
  grade: "五年级",
  module: "counting",
  difficulty: "进阶",
  question: "只含题面，不含解法提示……",
  figures: [{ svg: "<svg …></svg>", caption: "…", alt: "…" }],
  solutions: [
    {
      key: "bundle",
      label: "捆绑法",
      steps: ["…", "…"],
      scenes: [{ kind: "equation-list", rows: [], caption: "…" }],
    },
  ],
  variant: {
    question: "同主题变式…",
    fields: [{ key: "answer", label: "答案" }],
    answer: { answer: 0 },
    hint: "简短引导",
  },
  tags: ["方法1", "方法2"],
} satisfies ProblemData;
```

### tags（方法白名单）

- `tags` **只承载解法/思维方法**，不放年级、难度、模块名（这些已在 `grade` / `difficulty` / `module` 中）。
- 合法取值固定在白名单 `@/src/lib/tags.ts` 的 `TAG_WHITELIST`，涵盖：
  - 计数类：`加乘原理` / `加法原理` / `乘法原理` / `容斥原理` / `抽屉原理` / `枚举法` / `捆绑法` / `插空法` / `隔板法` / `排除法` / `标数法` / `消序法` / `特殊元素优先法` / `固定参照物法` / `分类讨论` / `对应思想` / `递推法`
  - 应用题/行程类：`方程法` / `假设法` / `份数法` / `比例法` / `画图法` / `线段图法` / `逆向推理` / `十字交叉法` / `整体代换`
  - 数论/计算类：`整除特征` / `同余` / `质因数分解` / `位值原理` / `凑整法` / `裂项` / `平方差` / `乘法分配律` / `首尾配对`
  - 几何类：`面积法` / `等积变形` / `蝴蝶模型` / `勾股定理` / `平移法`
  - 通用思维：`奇偶性` / `不变量` / `最不利原则`
- 每题 **0–3 个 tag**，只选 `solutions` 中真正用到的方法。选不出就留 `[]`，不要硬凑。
- 新增方法必须先在 `src/lib/tags.ts` 注册后才能使用；不要发明一次性标签。
- 可选自检（// turbo）：重新跑一次 `node scripts/normalize-tags.mjs`，期望无改动。

## 质量检查清单（每题生成后逐项核对）

- [ ] `id` 为 5 位字符串，在本批次内唯一且连续递增
- [ ] `grade` / `module` / `difficulty` 在 `ProblemData` 联合类型允许的值内
- [ ] `question` 与任一 `figures[].svg` / `caption` 均不含解法、提示、公式、答案
- [ ] 任一 `figures[]` 未出现方法名或等效暗示（"捆在一起"、"隔板"、"插空"、"只能填…"、"固定一人"、"每格 = 左 + 下" 等）
- [ ] 每个 `solutions[i].steps[0]` 以"分析"开头，承载了题面约束/特殊位置/对称性等背景推理
- [ ] `solutions.length >= 1`，步骤完整、结论明确
- [ ] 每个 `solutions[i].steps` 精炼（约 2–4 条），`分析` 与后续 `steps`、`scenes` 不重复相同内容；推导可用一条紧凑等式链呈现
- [ ] 所有 `scenes[].kind` 为 `SceneSpec`（见 `src/types/visual.ts`）允许的值
- [ ] `variant.answer` 的键与 `variant.fields[].key` 一一对应
- [ ] `tags` 仅含 `@/src/lib/tags.ts` 白名单内的方法（0–3 个），不含年级/难度/模块
- [ ] `pnpm exec tsc --noEmit` 通过（文件尾端 `satisfies ProblemData` 会自动校验类型）

## 参考资料

- 类型源头：`src/types/problem.ts`、`src/types/visual.ts`
- 旧 JSON Schema（仅供字段形状参考，不再被运行时引用）：`src/data/problem.schema.json`
- 知识点分布：`docs/CATEGORY.md`
- 输入文档示例：`docs/排列组合.md`
- 题目示例：`src/data/problems/10054.ts`（行程）、`src/data/problems/10057.ts`、`src/data/problems/10059.ts`
