---
description: Audit and optimize an existing OneMath problem TS file against the project's quality standards.
---

# 优化单题题目 (/optimize-problem)

针对 `src/data/problems/<id>.ts` 下的**单个已存在题目文件**，依据 OneMath 的题目规范做一次完整审计与优化，输出可直接落盘的改进版本。

## 使用方式

```
/optimize-problem <题目文件路径>
```

例如：

```
/optimize-problem src/data/problems/10059.ts
/optimize-problem 优化一下 src/data/problems/10035.ts
```

## 参数

| 参数   | 必填 | 说明                                                      |
| ------ | ---- | --------------------------------------------------------- |
| `file` | ✅   | 目标题目 TS 文件的路径，通常位于 `src/data/problems/*.ts` |

缺省时：若用户未指定文件，询问要优化哪一道题的 `id` 或文件路径，不要擅自挑选。

## 执行流程

### 阶段 1：读取与诊断

1. **读取目标文件**：完整读取 `file`（TS 模块，骨架为 `export default {…} satisfies ProblemData;`）。若语法或类型有误，先报告错误并停止。
2. **读取规范参考**：
   - 类型源头：`src/types/problem.ts`、`src/types/visual.ts`
   - 分类：`docs/CATEGORY.md`
   - 方法白名单：`src/lib/tags.ts`（`TAG_WHITELIST`）
   - 题目规范：`.windsurf/workflows/generate-problem.md` 中 "题目内容规范" 与 "质量检查清单" 部分，是本 workflow 的核心判据。
3. **对照已有题目风格**：至少抽查 1 个同 `module` + 同 `difficulty` 的 `src/data/problems/*.ts`，用作 `solutions` / `scenes` / `variant` 结构对标。
4. **逐项诊断**，按以下维度列出问题清单（带证据引用原文片段）：
   - **类型合规**：`id` / `grade` / `module` / `difficulty` 是否在 `ProblemData` 的联合值内；必填字段是否齐全（`tsc --noEmit` 可一次全盖）。
   - **题干泄露**：`question` 是否包含 "提示：…"、"可写成…"、"令 x = …"、方法名、关键中间量等解法线索。
   - **figures 泄露**：`figures[].svg` / `caption` / `alt` 是否出现方法暗示（捆绑框、∧ 形空位、隔板①②、"只能填…"、"固定一人"、"每格 = 左 + 下" 等）。若 SVG 本身优秀但有方法暗示，标记为"应移入 `solutions[i].scenes`"。
   - **solutions 质量**：
     - `solutions.length >= 1`，推荐 2–3 种不同思路。
     - 对于复杂的题目，`solutions[i].steps[0]` 是否以"分析"开头，并承载题面约束 / 特殊位置 / 对称性等。
     - `key` 为英文短标识、`label` 为中文方法名；`steps` 关键结论是否单列。
     - `scenes[].kind` 是否为 `SceneSpec` 合法值；选型是否合理（见下）。
   - **解法冗余（重要）**：
     - 每个 `solutions[i].steps` 是否过于啰嗦（>4 条且含大量例行算术）。
     - "分析"步是否已经覆盖了完整解法路径，却又在后续 steps 里把同样的推导再拆成多条；此时应**二选一**：要么删掉冗余的分步推导，保留分析 + 一条紧凑推导链；要么把"分析"收敛成只讲洞察，由后续 steps 展开推导。
     - `steps` 是否把 `scenes`（尤其 `equation-list`）已经逐行展示的内容又复述了一遍；若是，合并为一条叙事。
     - 对照 / 备选解法是否把例行算术拆得过细，而对比结论反而被淹没。
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
   - TS 对象字面量风格与仓库其他题目一致（缩进、键序、中文标点）。
   - `id` 不变；文件尾部的 `satisfies ProblemData` 不动。
   - 未被诊断标记的内容尽量不动（最小改动原则）。
3. **把泄露方法的 figure 搬家**：若原 `figures[]` 中某张 SVG 只有在知道方法后才画得出，将其以 `{ "kind": "svg", "svg": "…", "caption": "…" }` 放入对应 `solutions[i].scenes`（通常接在该方法的分析/建模步骤之后），并在 `figures[]` 留一张中性示意图。
4. **补齐"分析"步**：对于复杂的题目，若 `solutions[i].steps[0]` 不是"分析"开头，前置一条以"分析"开头的步骤，把从 figure 移除的约束翻译成文字放入此处。
5. **收敛 tags**：只保留 `solutions` 实际用到的方法；不在白名单内的 tag 删除或改写；若一个合适的 tag 都没有，设为 `[]`，不硬凑。
6. **variant 自洽**：确保 `variant.answer` 的键集合 = `variant.fields[].key` 集合。

### 阶段 3：自检

按顺序执行：

1. 类型自检：
   // turbo

   ```bash
   pnpm exec tsc --noEmit
   ```

2. Tag 规范化自检（期望无改动；若有改动，说明 tags 仍不合规，回到阶段 2）：
   // turbo

   ```bash
   node scripts/normalize-tags.mjs
   ```

3. 对照 "质量检查清单" 再走一遍，全部打钩后汇总变更说明。

## scenes 选型建议

见 `generate-problem.md` 的 "scenes 选型建议" 小节。

## 质量检查清单（优化后逐项核对）

先完整过一遍 `generate-problem.md` 的 "质量检查清单"，再补充 `optimize` 专属项：

- [ ] `pnpm exec tsc --noEmit` 通过；`id` 未被改动
- [ ] `node scripts/normalize-tags.mjs` 无改动
- [ ] 对照 / 备选解法已合并例行算术，未淹没对比结论

## 输出格式

优化完成后，向用户汇报：

1. **变更摘要**：按 "题面 / figures / solutions / variant / tags / 其他" 分组列出修改项（一行一条，带原因）。
2. **保留项**：简要说明哪些已符合规范、未改动。
3. **自检结果**：列出每步命令的结论（PASS / 差异）。

## 参考资料

- 生成规范（父规范，含题目内容规范 / scenes 选型 / 质量检查清单 / tags 白名单说明）：`.windsurf/workflows/generate-problem.md`
- 结构对标示例：`src/data/problems/10054.ts`（行程）、`src/data/problems/10057.ts`、`src/data/problems/10059.ts`
