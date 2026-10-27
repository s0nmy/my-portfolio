import type { Camera, Point, Size } from "./types";

export const aboutPosition: Point = { x: 600, y: 430 };
export const aboutSize: Size = { width: 520, height: 470 };
export const projectSize: Size = { width: 350, height: 380 };
export const skillsSize: Size = { width: 390, height: 340 };
export const timelineSize: Size = { width: 500, height: 500 };

export type CardKind = "about" | "project" | "timeline";
export const cardSizeLimits: Record<CardKind, { minWidth: number; minHeight: number; maxWidth: number; maxHeight: number }> = {
  about: { minWidth: 440, minHeight: 430, maxWidth: 800, maxHeight: 750 },
  project: { minWidth: 300, minHeight: 340, maxWidth: 650, maxHeight: 650 },
  timeline: { minWidth: 450, minHeight: 460, maxWidth: 720, maxHeight: 750 },
};

export const initialCamera: Camera = { x: -421, y: -239, scale: 0.9 };
export const minScale = 0.5;
export const maxScale = 1.8;

export const resizerWidth = 8;
export const minCanvasWidth = 320;
export const minLayersWidth = 160;
export const minInspectWidth = 200;
