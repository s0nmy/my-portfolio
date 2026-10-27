import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type Project = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  technologies: string;
  image: string;
  imageAlt: string;
  href?: string;
  x: number;
  y: number;
  body: string;
};

const required = ["slug", "title", "description", "overview", "technologies", "image", "imageAlt", "x", "y"] as const;

function parseProject(source: string, filename: string): Project {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${filename}: Frontmatter is missing`);

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`${filename}: invalid Frontmatter line: ${line}`);
    const key = line.slice(0, separator).trim();
    if (key in fields) throw new Error(`${filename}: duplicate field ${key}`);
    fields[key] = line.slice(separator + 1).trim();
  }
  for (const key of required) {
    if (!fields[key]) throw new Error(`${filename}: ${key} is required`);
  }
  const x = Number(fields.x);
  const y = Number(fields.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error(`${filename}: invalid canvas coordinates`);
  if (!fields.image.startsWith("/images/")) throw new Error(`${filename}: image must use a local public image`);
  if (fields.href && !/^https:\/\//.test(fields.href)) throw new Error(`${filename}: href must be HTTPS`);

  return {
    slug: fields.slug,
    title: fields.title,
    description: fields.description,
    overview: fields.overview,
    technologies: fields.technologies,
    image: fields.image,
    imageAlt: fields.imageAlt,
    href: fields.href || undefined,
    x,
    y,
    body: match[2].trim(),
  };
}

export function getProjects(): Project[] {
  const directory = join(process.cwd(), "content", "projects");
  return readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"))
    .sort()
    .map((filename) => parseProject(readFileSync(join(directory, filename), "utf8"), filename));
}
