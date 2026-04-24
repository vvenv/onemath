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
* 解法总数：382
* 场景块总数：462
* 完全无场景的题目：**0**（每题至少 1 个 scene）
* 弱覆盖（某些 solution 没有对应 scene）：**35 题**

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

弱覆盖题目清单（`scenes/solutions`）：

```
10011 (3/4)  10012 (3/4)  10032 (1/4)  10074 (3/4)
10079 (2/3)  10080 (2/3)  10085 (2/4)  10086 (2/4)
10087 (1/3)  10088 (2/3)  10089 (2/3)  10090 (1/2)
10091 (2/3)  10092 (1/2)  10093 (1/2)  10094 (2/3)
10095 (1/2)  10096 (1/3)  10097 (1/3)  10098 (1/2)
10099 (1/2)  10100 (2/3)  10101 (2/3)  10102 (1/3)
10103 (1/3)  10104 (1/3)  10105 (1/2)  10106 (1/2)
10107 (1/3)  10108 (1/2)  10110 (1/3)  10111 (1/3)
10112 (2/3)  10141 (2/3)  10143 (2/3)
```

### 1.4 已存在但未启用的工具

* `src/lib/svg-builders.ts` 提供了 `createSeatingChart` / `createMatrixDiagram` / `createDecisionTree` / `createBarChart` / `createNumberLine` / `createVennDiagram`，但全仓 0 处引用，且实现存在 AGENTS.md 合规问题：使用了 `hsl(var(--primary))`（与 oklch 变量不兼容）、硬编码 `stroke-width="2"`、未走 `currentColor`。Phase 2 将整治。

## 2. 目标

1. 让每个 solution 至少有一个语义贴合的 scene（消灭弱覆盖）。
2. 提升 SVG 类 scene 的工程化水平：把"手写 SVG 字符串"逐步收敛到符合 AGENTS.md 的 helper 体系。
3. 在不重复造类型的前提下，按需扩充 SceneSpec（仅当现有 12 种确实表达不了时）。
4. 打磨 `Scene` 容器的视觉细节（间距、对比度、暗色模式安全、响应式）。
5. 沉淀"图形化样板库"，作为后续 `/generate-problem` / `/optimize-problem` 工作流的范例。

## 3. 分阶段方案

> 每个 Phase 一个 PR，互不阻塞。Phase 1 仅文档；Phase 2 起进入代码改动。

### Phase 1 · 计划文档 + 覆盖度审计（本 PR）

* 重写 `docs/VISUALIZATION-ENHANCEMENT-PLAN.md`（即本文件）。
* 输出 35 题弱覆盖清单作为 Phase 3 输入。
* 不动业务代码、不动 UI。

### Phase 2 · SVG Helper 收敛

* 修复或重写 `src/lib/svg-builders.ts`：
  * 一律使用 `currentColor`（强调色用 `text-primary` 等 className 包裹外层，而非在 SVG 内嵌 `hsl(var(--primary))`）。
  * 默认不写 `stroke-width`（沿用 AGENTS.md 默认 1）。
  * 容器矩形 `fill="none"`，不再压字暗色不可读的浅色背景。
* 不在 Phase 2 引入新业务调用，先把库改对、再加测试样例。

### Phase 3 · 弱覆盖题目补 scene（分批）

* 按上表 35 题分 3–4 批小 PR，每批 8–10 题。
* 每题选择最贴合解法的 scene 类型，遵循 AGENTS.md "Problem Solutions" 节：不在 step 文本里复述 `equation-list` 已经走过的推导。
* 涉及几何题的，把内联 `<svg>...</svg>` 拆到 `src/data/problems/figures/<id>-<n>.svg`，再以 `?raw` 引入。

### Phase 4 · 按需扩展 SceneSpec

* 仅在 Phase 3 实际遇到无法用现有 12 种类型覆盖的场景时才新增。候选（未确认必要性）：
  * `fraction-strips`：分数 / 比例条带。
  * `timeline`：行程、日期、进程类。
  * `permutation-tree`：排列组合树（如能用 `lattice` + `equation-list` 表达则不增）。
* 任何新增类型必须：在 `src/types/visual.ts` 增加联合分支 → 在 `scene-renderer.tsx` 加 case → 增加 1 个独立组件文件 → 在 `src/components/visuals/index.ts` 导出。

### Phase 5 · Scene 容器与 UI 细节打磨

* 审计 `src/components/visuals/*.tsx` 中是否还有：
  * 硬编码十六进制颜色（应换成 `currentColor` 或 `text-*` 工具类）。
  * 在浅色背景上叠 `currentColor` 文本（暗色翻转后不可读）。
  * 不必要的 `stroke-width` 显式声明。
* 调整 `Scene` 容器在小屏的 padding / 间距，确保上文 → 图 → caption 之间留白一致。

## 4. 验收标准

| Phase | 通过标准 |
| --- | --- |
| 1 | 本文件合入；CI（typecheck + build）通过。 |
| 2 | `svg-builders.ts` 全部 helper 通过 `tsc -b`；不再含 `hsl(var(--*))`；至少 1 个 helper 在某个题目中实际被使用以验证渲染。 |
| 3 | 弱覆盖题目数从 35 → 0；每个新增 scene 都通过 AGENTS.md "Scene Labels" 自检（无 `5×4` 表"5 个 4"等违规）。 |
| 4 | 新增类型有完整类型链（types → renderer → 组件 → 导出 → 至少 1 处真实用例）。 |
| 5 | 全部 visuals 组件不再出现硬编码 `#xxxxxx` 颜色；浅色 / 暗色截图对比无可读性问题。 |

## 5. 不做的事

* 不引入 D3.js / Chart.js / Recharts 等运行时图表库（与项目 SSG / 静态优先策略冲突，且 AGENTS.md 未授权）。
* 不在 `src/data/problems/*.ts` 文本字段使用 Markdown 或 LaTeX（AGENTS.md "Text Content"）。
* 不为了凑场景数量而把已经在 `equation-list` 里完整推导过的内容再做一份 `compare-bars`（AGENTS.md "Problem Solutions"）。
* 不动 `src/components/ui/*` 的 shadcn primitive（Phase 5 仅调 visuals 子目录）。

## 6. 后续工作流接入

* `/generate-problem` 与 `/optimize-problem` 工作流（位于 `.windsurf/workflows/`）应在 Phase 3 后增加一项检查："新生成 / 优化的题目，每个 solution 必须至少绑定 1 个 scene"。本计划暂不修改工作流文件，待 Phase 3 完成后再随之更新。
