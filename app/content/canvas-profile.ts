import { readFileSync } from "node:fs";
import { join } from "node:path";

type BaseInfoCard = { title: string; summary: string; x: number; y: number };
export type SkillsCard = BaseInfoCard & { groups: { title: string; technologies: string }[] };
export type TimelineCard = BaseInfoCard & { entries: { date: string; title: string; description: string }[] };

function readCard(filename: string): { fields: Record<string, string>; sections: { heading: string; lines: string[] }[] } {
  const source = readFileSync(join(process.cwd(), "content", filename), "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${filename}: Frontmatter is missing`);
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`${filename}: invalid Frontmatter line: ${line}`);
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  for (const key of ["title", "summary", "x", "y"]) {
    if (!fields[key]) throw new Error(`${filename}: ${key} is required`);
  }
  const sections = match[2].trim().split(/^## /m).filter(Boolean).map((block) => {
    const [heading, ...lines] = block.trim().split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    return { heading, lines };
  });
  if (sections.length === 0) throw new Error(`${filename}: at least one section is required`);
  return { fields, sections };
}

function baseCard(filename: string, fields: Record<string, string>): BaseInfoCard {
  const x = Number(fields.x);
  const y = Number(fields.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error(`${filename}: invalid canvas coordinates`);
  return { title: fields.title, summary: fields.summary, x, y };
}

export function getCanvasProfile(): { skills: SkillsCard; timeline: TimelineCard } {
  const skillsSource = readCard("skills.md");
  const timelineSource = readCard("timeline.md");
  return {
    skills: {
      ...baseCard("skills.md", skillsSource.fields),
      groups: skillsSource.sections.map(({ heading, lines }) => {
        if (lines.length !== 1) throw new Error("skills.md: each group needs one technology line");
        return { title: heading, technologies: lines[0] };
      }),
    },
    timeline: {
      ...baseCard("timeline.md", timelineSource.fields),
      entries: timelineSource.sections.map(({ heading, lines }) => {
        if (lines.length < 2) throw new Error("timeline.md: each entry needs a title and description");
        return { date: heading, title: lines[0], description: lines.slice(1).join(" ") };
      }),
    },
  };
}
