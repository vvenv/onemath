import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Source entry for the Agent Skills discovery index.
 *
 * `name` becomes the skill identifier (and the URL segment). `sourceFile` is
 * read verbatim for the skill body; the plugin prepends/overwrites a `name`
 * field in its YAML frontmatter so a single file can serve as both the
 * project's internal workflow (e.g. `.windsurf/workflows/*.md`) and the
 * externally-published `SKILL.md`.
 */
export type AgentSkillSource = {
  name: string;
  sourceFile: string;
};

export type AgentSkillsOptions = {
  skills: AgentSkillSource[];
  schema?: string;
  basePath?: string;
};

type GeneratedFile = {
  /** Path below the site root, always with a leading slash. */
  urlPath: string;
  contentType: string;
  content: string;
};

const DEFAULT_SCHEMA =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json";
const DEFAULT_BASE = "/.well-known/agent-skills/";
const NAME_RE = /^[a-z0-9](?:[a-z0-9]|-(?!-)){0,62}[a-z0-9]$/;

type Frontmatter = { order: string[]; values: Record<string, string> };

function parseFrontmatter(raw: string): {
  fm: Frontmatter;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { fm: { order: [], values: {} }, body: raw };
  const block = match[1];
  const body = raw.slice(match[0].length);
  const fm: Frontmatter = { order: [], values: {} };
  for (const line of block.split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z_$][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (!(key in fm.values)) fm.order.push(key);
    fm.values[key] = value.trim();
  }
  return { fm, body };
}

function renderFrontmatter(fm: Frontmatter, body: string): string {
  const lines = fm.order.map((k) => `${k}: ${fm.values[k]}`);
  const leading = body.startsWith("\n") ? "" : "\n";
  return `---\n${lines.join("\n")}\n---\n${leading}${body}`;
}

function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf-8").digest("hex");
}

function generate(
  root: string,
  opts: Required<Pick<AgentSkillsOptions, "schema" | "basePath">> &
    Pick<AgentSkillsOptions, "skills">,
): GeneratedFile[] {
  const out: GeneratedFile[] = [];
  const index: {
    $schema: string;
    skills: Array<{
      name: string;
      type: "skill-md";
      description: string;
      url: string;
      digest: string;
    }>;
  } = { $schema: opts.schema, skills: [] };

  for (const s of opts.skills) {
    if (!NAME_RE.test(s.name)) {
      throw new Error(
        `[agent-skills] invalid skill name ${JSON.stringify(s.name)}: ` +
          "must be 1-64 chars, lowercase alphanumeric + hyphens, no leading/trailing/consecutive hyphens",
      );
    }
    const abs = path.resolve(root, s.sourceFile);
    const raw = readFileSync(abs, "utf-8");
    const { fm, body } = parseFrontmatter(raw);

    const merged: Frontmatter = { order: ["name"], values: { name: s.name } };
    for (const key of fm.order) {
      if (key === "name") continue;
      merged.order.push(key);
      merged.values[key] = fm.values[key];
    }
    const md = renderFrontmatter(merged, body);

    const url = `${opts.basePath}${s.name}/SKILL.md`;
    out.push({
      urlPath: url,
      contentType: "text/markdown; charset=utf-8",
      content: md,
    });

    index.skills.push({
      name: s.name,
      type: "skill-md",
      description: fm.values.description ?? "",
      url,
      digest: `sha256:${sha256Hex(md)}`,
    });
  }

  out.push({
    urlPath: `${opts.basePath}index.json`,
    contentType: "application/json; charset=utf-8",
    content: `${JSON.stringify(index, null, 2)}\n`,
  });

  return out;
}

/**
 * Publish an Agent Skills discovery document per the
 * [Agent Skills Discovery RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc).
 *
 * At build time, emits `{basePath}index.json` + `{basePath}<name>/SKILL.md` for each
 * configured skill into the client output directory. During `vite dev`, the same
 * paths are served via middleware so local previews match production byte-for-byte.
 *
 * The `index.json` `digest` for every entry is computed from the exact bytes this
 * plugin writes out, so the served `sha256` is always in sync with the served
 * `SKILL.md` — there is no manual digest to maintain.
 */
export function agentSkills(opts: AgentSkillsOptions): Plugin {
  const basePath = (opts.basePath ?? DEFAULT_BASE).replace(/\/?$/, "/");
  const schema = opts.schema ?? DEFAULT_SCHEMA;

  let rootDir = process.cwd();

  return {
    name: "agent-skills",
    configResolved(cfg) {
      rootDir = cfg.root;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const url = req.url.split("?", 1)[0];
        let files: GeneratedFile[];
        try {
          files = generate(rootDir, { schema, basePath, skills: opts.skills });
        } catch (err) {
          return next(err);
        }
        const match = files.find((f) => f.urlPath === url);
        if (!match) return next();
        res.statusCode = 200;
        res.setHeader("Content-Type", match.contentType);
        res.end(match.content);
      });
    },
    writeBundle(options) {
      // React Router builds both a server and a client bundle under
      // `build/server` and `build/client`. We only want the client output.
      const dir = options.dir ?? "";
      const norm = dir.replace(/\\/g, "/");
      if (!norm.endsWith("/client")) return;

      const files = generate(rootDir, { schema, basePath, skills: opts.skills });
      for (const f of files) {
        const outPath = path.join(dir, f.urlPath.replace(/^\//, ""));
        mkdirSync(path.dirname(outPath), { recursive: true });
        writeFileSync(outPath, f.content);
      }
    },
  };
}
