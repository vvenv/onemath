import type { ProblemData, ProblemModule } from "@/types/problem";

export type ModuleKey = ProblemModule;

export type ModuleInfo = {
  key: ModuleKey;
  label: string;
  description: string;
  /** tailwind classes for the module accent (bg + text + ring) */
  accent: string;
};

export const MODULES: ModuleInfo[] = [
  {
    key: "计算",
    label: "计算",
    description: "速算巧算、等差数列、分数裂项、定义新运算",
    accent: "bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300",
  },
  {
    key: "几何",
    label: "几何",
    description: "周长与面积、立体几何、圆与扇形、勾股定理",
    accent:
      "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300",
  },
  {
    key: "数论",
    label: "数论",
    description: "奇偶性、整除、质合数、约数倍数、同余",
    accent:
      "bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300",
  },
  {
    key: "应用题",
    label: "应用题",
    description: "和差倍、植树、年龄、盈亏、平均数、工程、浓度",
    accent:
      "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
  },
  {
    key: "行程",
    label: "行程",
    description: "相遇追及、火车过桥、流水行船、环形跑道",
    accent:
      "bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300",
  },
  {
    key: "计数",
    label: "计数",
    description: "枚举法、加乘原理、排列组合、容斥、抽屉原理",
    accent:
      "bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:text-indigo-300",
  },
  {
    key: "杂题",
    label: "杂题",
    description: "逻辑推理、最值、统筹优化、幻方、周期",
    accent:
      "bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-300",
  },
];

const MODULE_BY_KEY = new Map(MODULES.map((m) => [m.key, m]));

export function getModule(key: ModuleKey): ModuleInfo {
  const m = MODULE_BY_KEY.get(key);
  if (!m) throw new Error(`Unknown module: ${key}`);
  return m;
}

export function getProblemModule(problem: ProblemData): ModuleInfo {
  return getModule(problem.module);
}

export type GradeInfo = {
  label: string;
  subtitle: string;
};

export const GRADES: GradeInfo[] = [
  { label: "三年级", subtitle: "激发兴趣 · 接触典型应用题" },
  { label: "四年级", subtitle: "承上启下 · 拓展思维深度" },
  { label: "五年级", subtitle: "体系完善 · 强化综合分析" },
  { label: "六年级", subtitle: "冲刺综合 · 抽象建模能力" },
];
