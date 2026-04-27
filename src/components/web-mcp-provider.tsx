import { useEffect } from "react";
import { useNavigate } from "react-router";

import { knowledgeEntries, getKnowledgeBySlug } from "@/data/knowledge";
import { GRADES, MODULES } from "@/lib/modules";
import { getProblemById, getRandomProblem, problems } from "@/lib/problems";
import type { ProblemData, ProblemModule } from "@/types/problem";

/**
 * WebMCP integration: expose this site's key actions to AI agents via
 * `navigator.modelContext.registerTool()`. Tools are registered on mount and
 * unregistered on unmount via an `AbortController` signal.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */

type JSONSchema = Record<string, unknown>;

type ToolExecuteCallback = (
  input: Record<string, unknown>,
) => Promise<unknown> | unknown;

type ModelContextTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema?: JSONSchema;
  execute: ToolExecuteCallback;
};

type ModelContextRegisterToolOptions = {
  signal?: AbortSignal;
};

type ModelContext = {
  registerTool: (
    tool: ModelContextTool,
    options?: ModelContextRegisterToolOptions,
  ) => void;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const DIFFICULTY_ENUM = ["基础", "进阶", "挑战"] as const;

function problemSummary(p: ProblemData) {
  return {
    id: p.id,
    title: p.title,
    grade: p.grade,
    module: p.module,
    difficulty: p.difficulty,
    tags: p.tags,
    url: `/p/${p.id}`,
  };
}

export function WebMCPProvider() {
  const navigate = useNavigate();

  useEffect(() => {
    const mc = navigator.modelContext;
    if (!mc || typeof mc.registerTool !== "function") return;

    const controller = new AbortController();
    const options = { signal: controller.signal };

    const moduleEnum = MODULES.map((m) => m.key);
    const gradeEnum = GRADES.map((g) => g.label);

    const register = (tool: ModelContextTool) => {
      try {
        mc.registerTool(tool, options);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`WebMCP: failed to register "${tool.name}"`, err);
      }
    };

    register({
      name: "search_problems",
      title: "搜索题目",
      description:
        "Search the site's math problems by module, grade, difficulty, tag, or a title keyword. Returns a list of matching problems with id, title, and URL.",
      inputSchema: {
        type: "object",
        properties: {
          module: {
            type: "string",
            enum: moduleEnum,
            description: "题目模块 / problem module",
          },
          grade: {
            type: "string",
            enum: gradeEnum,
            description: "年级 / grade",
          },
          difficulty: {
            type: "string",
            enum: [...DIFFICULTY_ENUM],
            description: "难度 / difficulty",
          },
          tag: {
            type: "string",
            description: "方法标签 / method tag",
          },
          query: {
            type: "string",
            description: "标题关键词 / title keyword (case-insensitive)",
          },
          limit: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 20,
          },
        },
        additionalProperties: false,
      },
      async execute(input) {
        const {
          module,
          grade,
          difficulty,
          tag,
          query,
          limit = 20,
        } = input as {
          module?: ProblemModule;
          grade?: string;
          difficulty?: string;
          tag?: string;
          query?: string;
          limit?: number;
        };
        const q = query?.toLowerCase().trim();
        const filtered = problems.filter((p) => {
          if (module && p.module !== module) return false;
          if (grade && p.grade !== grade) return false;
          if (difficulty && p.difficulty !== difficulty) return false;
          if (tag && !p.tags.includes(tag)) return false;
          if (q && !p.title.toLowerCase().includes(q)) return false;
          return true;
        });
        return {
          count: filtered.length,
          results: filtered.slice(0, limit).map(problemSummary),
        };
      },
    });

    register({
      name: "get_problem",
      title: "获取题目详情",
      description:
        "Fetch the full content of a single problem by its id, including question, solutions (steps), tags, and linked knowledge points.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "题目 id, e.g. '10001'" },
        },
        required: ["id"],
        additionalProperties: false,
      },
      async execute(input) {
        const { id } = input as { id: string };
        const p = getProblemById(id);
        if (!p) return { error: `problem ${id} not found` };
        return {
          ...problemSummary(p),
          question: p.question,
          solutions: p.solutions.map((s) => ({
            key: s.key,
            label: s.label,
            steps: s.steps,
          })),
          knowledgePoints: p.knowledgePoints,
        };
      },
    });

    register({
      name: "random_problem",
      title: "随机题目",
      description:
        "Return a random problem, optionally filtered by module. Useful for surfacing a fresh practice prompt.",
      inputSchema: {
        type: "object",
        properties: {
          module: { type: "string", enum: moduleEnum },
        },
        additionalProperties: false,
      },
      async execute(input) {
        const { module } = input as { module?: ProblemModule };
        const p = getRandomProblem({ module });
        if (!p) return { error: "no problem available" };
        return problemSummary(p);
      },
    });

    register({
      name: "list_modules",
      title: "列出模块与年级",
      description:
        "List the problem modules (with one-line description and problem counts) and the grade levels supported by the site.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      async execute() {
        const counts = new Map<string, number>();
        for (const p of problems) {
          counts.set(p.module, (counts.get(p.module) ?? 0) + 1);
        }
        return {
          modules: MODULES.map((m) => ({
            key: m.key,
            label: m.label,
            description: m.description,
            count: counts.get(m.key) ?? 0,
          })),
          grades: GRADES.map((g) => ({
            label: g.label,
            subtitle: g.subtitle,
          })),
        };
      },
    });

    register({
      name: "list_knowledge",
      title: "列出方法手册",
      description:
        "List the method/technique knowledge entries shown on /k. Each entry has a slug, name, category, one-line summary and URL.",
      inputSchema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            description: "Optional category filter (e.g. 'word', 'geometry').",
          },
        },
        additionalProperties: false,
      },
      async execute(input) {
        const { category } = input as { category?: string };
        const entries = category
          ? knowledgeEntries.filter((e) => e.category === category)
          : knowledgeEntries;
        return {
          count: entries.length,
          results: entries.map((e) => ({
            slug: e.slug,
            name: e.name,
            category: e.category,
            summary: e.summary,
            tag: e.tag,
            url: `/k/${e.slug}`,
          })),
        };
      },
    });

    register({
      name: "get_knowledge",
      title: "获取方法详情",
      description:
        "Fetch the full content of a method/knowledge entry by slug, including intuition, derivation, key points, worked examples, and pitfalls.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "知识点 slug" },
        },
        required: ["slug"],
        additionalProperties: false,
      },
      async execute(input) {
        const { slug } = input as { slug: string };
        const e = getKnowledgeBySlug(slug);
        if (!e) return { error: `knowledge ${slug} not found` };
        return {
          slug: e.slug,
          name: e.name,
          category: e.category,
          tag: e.tag,
          summary: e.summary,
          intuition: e.intuition,
          derivation: e.derivation,
          keyPoints: e.keyPoints ?? [],
          examples: e.examples,
          pitfalls: e.pitfalls ?? [],
          relatedSlugs: e.relatedSlugs ?? [],
          url: `/k/${e.slug}`,
        };
      },
    });

    register({
      name: "navigate",
      title: "跳转页面",
      description:
        "Navigate the user to a page within the site. Accepts a site-relative path: '/' (home), '/p/:id' (a problem), '/k' (knowledge index), or '/k/:slug' (a knowledge entry).",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Site-relative path beginning with '/'.",
          },
        },
        required: ["path"],
        additionalProperties: false,
      },
      async execute(input) {
        const { path } = input as { path: string };
        if (typeof path !== "string" || !path.startsWith("/")) {
          return {
            error: "path must be a site-relative path starting with '/'",
          };
        }
        navigate(path);
        return { ok: true, path };
      },
    });

    return () => {
      controller.abort();
    };
  }, [navigate]);

  return null;
}
