import type { Profile as ProfileData } from "./types";
import type { Project } from "../lib/projects";
import { aboutPosition, aboutSize, cardSizeLimits, projectSize, skillsSize, timelineSize, type CardKind } from "./constants";
import type { Point, Size } from "./types";

/** Pure core of the card layout: default placement and the size invariants. */

export function cardKindOf(slug: string): CardKind {
  return slug === "about" || slug === "timeline" ? slug : "project";
}

/** The only way to build a resized card size: always inside the limits for that card. */
export function clampCardSize(slug: string, size: Size): Size {
  const limits = cardSizeLimits[cardKindOf(slug)];
  return {
    width: Math.round(Math.min(limits.maxWidth, Math.max(limits.minWidth, size.width))),
    height: Math.round(Math.min(limits.maxHeight, Math.max(limits.minHeight, size.height))),
  };
}

export function defaultPosition(slug: string, projects: Project[], profile: ProfileData): Point {
  const project = projects.find((item) => item.slug === slug);
  if (project) return { x: project.x, y: project.y };
  if (slug === "skills" || slug === "timeline") return { x: profile[slug].x, y: profile[slug].y };
  return aboutPosition;
}

export function defaultSize(slug: string, projects: Project[]): Size {
  if (projects.some((item) => item.slug === slug)) return projectSize;
  return slug === "skills" ? skillsSize : slug === "timeline" ? timelineSize : aboutSize;
}
