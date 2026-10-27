import type { SkillsCard, TimelineCard } from "../lib/profile";

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type Camera = { x: number; y: number; scale: number };
export type Pane = "layers" | "inspect";
export type Profile = { skills: SkillsCard; timeline: TimelineCard };
