import type { ProblemData } from "@/types/problem";

const modules = import.meta.glob<ProblemData>("@/data/problems/*.json", {
  eager: true,
  import: "default",
});

export const problems: ProblemData[] = Object.values(modules).sort(
  (a, b) => a.id - b.id,
);

export function getProblemById(id: string | undefined) {
  return problems.find((p) => String(p.id) === id);
}
