---
description: Audit and optimize an existing OneMath problem JSON file against the project's quality standards.
---

# 优化单题题目 (/optimize-problem)

针对 `src/data/problems/<id>.json` 下的**单个已存在题目文件**，依据 OneMath 的题目规范做一次完整审计与优化，输出可直接落盘的改进版本。

## 使用方式

```
/optimize-problem <题目文件路径>
```

例如：

```
/optimize-problem src/data/problems/10059.json
/optimize-problem 优化一下 src/data/problems/10035.json
```

## 参数

| 参数   | 必填 | 说明                                                          |
| ------ | ---- | ------------------------------------------------------------- |
| `file` | ✅   | 目标题目 JSON 文件的路径，通常位于 `src/data/problems/*.json` |

缺省时：若用户未指定文件，询问要优化哪一道题的 `id` 或文件路径，不要擅自挑选。

## 执行流程

### 阶段 1：读取与诊断

1. **读取目标文件**：完整读取 `file`，解析 JSON。若解析失败，先报告语法错误并停止。
2. **读取规范参考**：
   - Schema：`src/data/problem.schema.json`
   - 分类：`docs/CATEGORY.md`
   - 方法白名单：`src/lib/tags.ts`（`TAG_WHITELIST`）
   - 题目规范：`.windsurf/workflows/generate-problem.md` 中 "题目内容规范" 与 "质量检查清单" 部分，是本 workflow 的核心判据。
3. **对照已有题目风格**：至少抽查 1 个同 `module` + 同 `difficulty` 的 `src/data/problems/*.json`，用作 `solutions` / `scenes` / `variant` 结构对标。
4. **逐项诊断**，按以下维度列出问题清单（带证据引用原文片段）：
   - **Schema 合规**：`id` / `grade` / `module` / `difficulty` 是否在合法枚举内；必填字段是否齐全。
   - **题干泄露**：`question` 是否包含 "提示：…"、"可写成…"、"令 x = …"、方法名、关键中间量等解法线索。
   - **figures 泄露**：`figures[].svg` / `caption` / `alt` 是否出现方法暗示（捆绑框、∧ 形空位、隔板①②、"只能填…"、"固定一人"、"每格 = 左 + 下" 等）。若 SVG 本身优秀但有方法暗示，标记为"应移入 `solutions[i].scenes`"。
   - **solutions 质量**：
     - `solutions.length >= 1`，推荐 2–3 种不同思路。
     - 每个 `solutions[i].steps[0]` 是否以"分析"开头，并承载题面约束 / 特殊位置 / 对称性等。
     - `key` 为英文短标识、`label` 为中文方法名；`steps` 关键结论是否单列。
     - `scenes[].kind` 是否为 schema 合法值；选型是否合理（见下）。
   - **variant**：
     - `question` 同主题不同数值、难度相近。
     - `fields[]` 至少 1 项、键名语义清晰；比较类用 `type: "text"` + `enum: [">","<","="]`。
     - `answer` 的键与 `fields[].key` 一一对应，给最简/准确形式。
     - `hint` 简短，可含方法线索。
   - **tags**：仅含 `TAG_WHITELIST` 白名单方法，0–3 个，只选 `solutions` 中真正用到的方法；不得包含年级 / 难度 / 模块 / 题型。
5. **输出诊断报告**：以 Markdown 形式呈现，按维度分组，每条问题给出：
   - 引用原文（JSON 片段或行号）
   - 违规原因
   - 建议的修改方向（先不落盘）

### 阶段 2：应用优化

1. 如果诊断报告里有**破坏性改动**（改题面、删 figure、重写 solution 主线），先让用户确认范围；如果只是小幅修补（加"分析"步、收紧 tags、修 variant 字段一致性等），可直接进入修改。
2. **就地修改** `file`，保持：
   - JSON 风格与仓库其他题目一致（缩进、键序、中文标点）。
   - `id` 不变，`$schema` 不变。
   - 未被诊断标记的内容尽量不动（最小改动原则）。
3. **把泄露方法的 figure 搬家**：若原 `figures[]` 中某张 SVG 只有在知道方法后才画得出，将其以 `{ "kind": "svg", "svg": "…", "caption": "…" }` 放入对应 `solutions[i].scenes`（通常接在该方法的分析/建模步骤之后），并在 `figures[]` 留一张中性示意图。
4. **补齐"分析"步**：若 `solutions[i].steps[0]` 不是"分析"开头，前置一条以"分析"开头的步骤，把从 figure 移除的约束翻译成文字放入此处。
5. **收敛 tags**：只保留 `solutions` 实际用到的方法；不在白名单内的 tag 删除或改写；若一个合适的 tag 都没有，设为 `[]`，不硬凑。
6. **variant 自洽**：确保 `variant.answer` 的键集合 = `variant.fields[].key` 集合。

### 阶段 3：自检

按顺序执行：

1. JSON 语法自检：
   // turbo

   ```bash
   node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'));console.log('OK')"
   ```

2. Tag 规范化自检（期望无改动；若有改动，说明 tags 仍不合规，回到阶段 2）：
   // turbo

   ```bash
   node scripts/normalize-tags.mjs
   ```

3. 对照 "质量检查清单" 再走一遍，全部打钩后汇总变更说明。

## scenes 选型建议

- 数值/公式推演：`equation-list`
- 数量或大小对比：`compare-bars`、`number-line`
- 最终结论徽标：`result-badges`
- 图形/几何/面积变化：`svg`（完整 `<svg>…</svg>`）或 `lattice`/`cube-net`
- 枚举/真假/逻辑：`statement-table`、`number-grid`
- 排列/排队、插空、捆绑等计数题：优先 `equation-list` 承载计数式，辅以 `svg` 画座位/空位示意
- 鸡兔同笼类：`heads`、`heads-split`

## 质量检查清单（优化后逐项核对）

- [ ] JSON 语法合法；`$schema` 与 `id` 未被改动
- [ ] `grade` / `module` / `difficulty` 在 schema enum 内
- [ ] `question` 与任一 `figures[].svg` / `caption` 均不含解法、提示、公式、答案
- [ ] 任一 `figures[]` 未出现方法名或等效暗示（"捆在一起"、"隔板"、"插空"、"只能填…"、"固定一人"、"每格 = 左 + 下" 等）
- [ ] 每个 `solutions[i].steps[0]` 以"分析"开头，承载了题面约束/特殊位置/对称性等背景推理
- [ ] `solutions.length >= 1`，步骤完整、结论明确；推荐 2–3 种不同思路
- [ ] 所有 `scenes[].kind` 为 schema 中列出的合法值
- [ ] `variant.answer` 的键与 `variant.fields[].key` 一一对应
- [ ] `tags` 仅含 `src/lib/tags.ts` 白名单内的方法（0–3 个），不含年级/难度/模块
- [ ] `node -e "JSON.parse(…)"` 通过；`node scripts/normalize-tags.mjs` 无改动

## 输出格式

优化完成后，向用户汇报：

1. **变更摘要**：按 "题面 / figures / solutions / variant / tags / 其他" 分组列出修改项（一行一条，带原因）。
2. **保留项**：简要说明哪些已符合规范、未改动。
3. **自检结果**：列出每步命令的结论（PASS / 差异）。

## 参考资料

- Schema：`src/data/problem.schema.json`
- 生成规范（父规范）：`.windsurf/workflows/generate-problem.md`
- 分类体系：`docs/CATEGORY.md`
- 方法白名单：`src/lib/tags.ts`
- 结构对标示例：`src/data/problems/10054.json`（行程）、`src/data/problems/10057.json`、`src/data/problems/10059.json`
