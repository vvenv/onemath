# 题目图形化增强 · 执行计划

> 上一版文档是与本仓库无关的通用模板（提到 D3.js / Chart.js / Figma 等本项目并不使用的工具）。本文档基于实际仓库结构（截至 2026‑04），重写为可执行的、与现有 `src/components/visuals/` 体系对齐的方案。

## 1. 背景与现状

### 1.1 现有可视化体系

* 渲染入口：`src/components/visuals/scene-renderer.tsx`，根据 `SceneSpec.kind` 分发到具体组件。
* 数据来源：`src/data/problems/*.ts` 中每个 `solution` 可附带 `scenes: SceneSpec[]`，与 `solutions[].steps` 配合呈现。
* 类型定义：`src/types/visual.ts`，所有 scene 类型均为联合类型成员，新增类型需先在此扩展。
* 视觉规范：颜色 / `stroke-width` / 暗色模式 / 标签写法的硬性约束写在 `AGENTS.md`（"SVG Figures"、"Scene Labels"、"Text Content"）。
* 主题变量：`src/styles/globals.css` 使用 Tailwind v4 + `oklch(...)` CSS 变量（如 `--primary`、`--border`、`--muted`、`--accent`）。**注意：变量本身是 oklch 值，不是 hsl，因此不可写 `hsl(var(--primary))`。**

### 1.2 现有 scene 类型（12 种）

| 分类 | kind | 用途 |
| --- | --- | --- |
| 数值对比 | `compare-bars`、`result-badges` | 量级比较、个数清单 |
| 数学运算 | `equation-list`、`number-line`、`number-grid` | 等式链、数轴标点、数表 |
| 几何 / 结构 | `heads`、`heads-split`、`lattice`、`cube-net`、`pit-diagram` | 离散计数、网格、立方体展开、挖填 |
| 表格 / 逻辑 | `statement-table` | 真假推理表 |
| 自由作图 | `svg` | 通过 `?raw` 引入的独立 SVG 文件 |

### 1.3 覆盖度审计（脚本统计）

* 题目总数：143
* 完全无场景的题目：**0**（每题至少 1 个 scene）
* 弱覆盖（某些 solution 没有对应 scene）：**2 题**
  * `10001.ts`：solution `hypothesis` 缺 scene
  * `10143.ts`：solution `enumeration` 缺 scene

scene 类型频次（高 → 低）：

```
172  equation-list
129  result-badges
 48  compare-bars
 28  svg
 26  number-line
 21  statement-table
 17  number-grid
  7  heads
  7  heads-split
  3  lattice
  3  pit-diagram
  1  cube-net
```

> **审计修正**：本计划第一版（PR #11）报告了 35 题弱覆盖，使用的是只看全文 `"key":` / `"kind":` 出现次数的粗略正则——它把 `variant.fields[].key`（题目下方变式的字段名）也算进了 "solutions" 计数，导致虚高。换用对每个 `solutions[]` 数组成员单独计数 `kind` 的解析后，真实数字是 **2 题**。Phase 3 因此从 "3–4 个分批 PR" 收敛为 1 个 PR。

### 1.4 已存在但未启用的工具

* `src/lib/svg-builders.ts` 提供了 `createSeatingChart` / `createMatrixDiagram` / `createDecisionTree` / `createBarChart` / `createVennDiagram`。Phase 2（PR #12）已将其重写为 `currentColor` + 单行 SVG、删除 `createNumberLine`（`number-line` scene 已覆盖）。首处实际调用会随 Phase 3 之后的题目出现。

## 2. 目标

1. 让每个 solution 至少有一个语义贴合的 scene（消灭弱覆盖）。
2. 提升 SVG 类 scene 的工程化水平：把"手写 SVG 字符串"逐步收敛到符合 AGENTS.md 的 helper 体系。
3. 在不重复造类型的前提下，按需扩充 SceneSpec（仅当现有 12 种确实表达不了时）。
4. 打磨 `Scene` 容器的视觉细节（间距、对比度、暗色模式安全、响应式）。
5. 沉淀"图形化样板库"，作为后续 `/generate-problem` / `/optimize-problem` 工作流的范例。

## 3. 分阶段方案

> 每个 Phase 一个 PR，互不阻塞。Phase 1 仅文档；Phase 2 起进入代码改动。

### Phase 1 · 计划文档 + 覆盖度审计（已合 PR #11）

* 重写 `docs/VISUALIZATION-ENHANCEMENT-PLAN.md`（即本文件）。
* 输出弱覆盖清单作为 Phase 3 输入。
* 不动业务代码、不动 UI。

### Phase 2 · SVG Helper 收敛（已合 PR #12）

* 重写 `src/lib/svg-builders.ts`：
  * 一律使用 `currentColor`（强调色用 `text-primary` 等 className 包裹外层，而非在 SVG 内嵌 `hsl(var(--primary))`）。
  * 默认不写 `stroke-width`（沿用 AGENTS.md 默认 1）。
  * 容器矩形 `fill="none"`，不再压字暗色不可读的浅色背景。
* 删除与 `number-line` scene 重叠的 `createNumberLine`。
* Devin Review 发现并修复 Venn 图非默认 overlap 下区域文字定位 bug。

### Phase 3 · 弱覆盖题目补 scene（本 PR）

* 仅 2 题需要补 scene，本 PR 一次性完成：
  * `10001.ts` `hypothesis` 补 `equation-list`（全鸡假设 → 脸额差 → 摄回到兔子数）。
  * `10143.ts` `enumeration` 补 `equation-list`（逐级枚举路径清单 · 与递推法不重复），并把原本重复枚举的 step 文本收敛为两句总结。
* 本轮不动几何题中的内联 SVG（未发现未拆分例）。

### Phase 4 · 按需扩展 SceneSpec（暂不启动）

* Phase 3 只补了 2 题，没有采集到 "当前 12 种 scene 类型表达不了" 的负面例，所以不主动新增。
* 如未来 `/generate-problem` / `/optimize-problem` 工作流中出现明确表达不了的记号，再拉起本 Phase。候选仍为 `fraction-strips`、`timeline`、`permutation-tree`。
* 纪律不变：任何新增类型必须同时动 `src/types/visual.ts` + `scene-renderer.tsx` + 独立组件 + `src/components/visuals/index.ts` 导出，且在首个 PR 里就上至少 1 处真实调用。

### Phase 5 · Scene 容器与 UI 细节打磨（本 PR）

* 审计结论（`src/components/visuals/*.tsx`）：
  * 硬编码十六进制 / `rgb()` / `hsl()` 颜色：**0 处**，全部已走主题变量或 `currentColor`。
  * 浅色背景上叠 `currentColor` 文本：**0 处**。
  * 不必要的 `stroke-width` 显式声明：**0 处**（Phase 2 已清理）。
  * Tailwind 调色板颜色缺 `dark:` 变体：**2 处**，集中在 `pit-diagram.tsx`（`text-emerald-700` 在 `bg-emerald-500/10~15` 上，暗色模式下近乎不可读）——本 PR 修正，补齐 `dark:text-emerald-400`，与 `statement-table.tsx` 既有模式一致。
* `Scene` 容器 padding / 间距：当前 `p-3` + `mt-2` caption 在 PR #13 的明暗测试中均可读且对齐，无需改动。响应式方面 shadcn `Table` 已内置 `overflow-x-auto`，`equation-list` 的 `whitespace-nowrap` rhs 在窄屏下可横向滚动，不会破版。
* 结论：除上述 2 处 `dark:` 变体外，Phase 5 无其他可见改动。

## 4. 验收标准

| Phase | 通过标准 |
| --- | --- |
| 1 | 本文件合入；CI（typecheck + build）通过。 |
| 2 | `svg-builders.ts` 全部 helper 通过 `tsc -b`；不再含 `hsl(var(--*))`；至少 1 个 helper 在某个题目中实际被使用以验证渲染。 |
| 3 | 弱覆盖题目数从 35 → 0；每个新增 scene 都通过 AGENTS.md "Scene Labels" 自检（无 `5×4` 表"5 个 4"等违规）。 |
| 4 | 新增类型有完整类型链（types → renderer → 组件 → 导出 → 至少 1 处真实用例）。 |
| 5 | 全部 visuals 组件不再出现硬编码 `#xxxxxx` 颜色；Tailwind 调色板颜色均成对给出 `dark:` 变体；浅色 / 暗色截图对比无可读性问题。 |

## 5. 不做的事

* 不引入 D3.js / Chart.js / Recharts 等运行时图表库（与项目 SSG / 静态优先策略冲突，且 AGENTS.md 未授权）。
* 不在 `src/data/problems/*.ts` 文本字段使用 Markdown 或 LaTeX（AGENTS.md "Text Content"）。
* 不为了凑场景数量而把已经在 `equation-list` 里完整推导过的内容再做一份 `compare-bars`（AGENTS.md "Problem Solutions"）。
* 不动 `src/components/ui/*` 的 shadcn primitive（Phase 5 仅调 visuals 子目录）。

## 6. 后续工作流接入

* `/generate-problem` 与 `/optimize-problem` 工作流（位于 `.windsurf/workflows/`）应在 Phase 3 后增加一项检查："新生成 / 优化的题目，每个 solution 必须至少绑定 1 个 scene"。本计划暂不修改工作流文件，待 Phase 3 完成后再随之更新。
