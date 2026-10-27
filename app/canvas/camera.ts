import { aboutPosition, aboutSize, maxScale, minScale } from "./constants";
import type { Camera, Point, Size } from "./types";

/** Pure core of the camera: every Camera produced here has a scale inside the allowed range. */

export function clampScale(scale: number) {
  return Math.min(maxScale, Math.max(minScale, scale));
}

export function normalizeCamera(camera: Camera): Camera {
  return { ...camera, scale: clampScale(camera.scale) };
}

/** Zoom by `factor` while keeping the viewport point `anchor` fixed on screen. */
export function zoomAround(current: Camera, factor: number, anchor: Point): Camera {
  const scale = clampScale(current.scale * factor);
  return { scale, x: anchor.x - ((anchor.x - current.x) / current.scale) * scale, y: anchor.y - ((anchor.y - current.y) / current.scale) * scale };
}

/** The initial view: the About card centered, scaled for the viewport. */
export function homeCamera(viewport: Size, windowWidth: number, aboutCardSize: Size = aboutSize): Camera {
  const scale = windowWidth <= 720 ? Math.min(0.7, (viewport.width - 24) / aboutCardSize.width) : viewport.width < 900 ? 0.9 : 1;
  return {
    scale,
    x: viewport.width / 2 - (aboutPosition.x + aboutCardSize.width / 2) * scale,
    y: viewport.height / 2 - (aboutPosition.y + aboutCardSize.height / 2) * scale,
  };
}

/** Move the camera so a card is centered, keeping the current scale. */
export function centerOn(current: Camera, viewport: Size, position: Point, size: Size): Camera {
  return {
    ...current,
    x: viewport.width / 2 - (position.x + size.width / 2) * current.scale,
    y: viewport.height / 2 - (position.y + size.height / 2) * current.scale,
  };
}

export type PinchStart = { distance: number; center: Point; camera: Camera };

/** `origin` is the viewport's top-left in client coordinates. */
export function startPinch(first: Point, second: Point, origin: Point, camera: Camera): PinchStart {
  return {
    distance: Math.hypot(second.x - first.x, second.y - first.y),
    center: { x: (first.x + second.x) / 2 - origin.x, y: (first.y + second.y) / 2 - origin.y },
    camera,
  };
}

/** Returns null while the two fingers are on the same point (no scale can be derived). */
export function pinchCamera(start: PinchStart, first: Point, second: Point, origin: Point): Camera | null {
  if (start.distance === 0) return null;
  const scale = clampScale(start.camera.scale * Math.hypot(second.x - first.x, second.y - first.y) / start.distance);
  const centerX = (first.x + second.x) / 2 - origin.x;
  const centerY = (first.y + second.y) / 2 - origin.y;
  return {
    scale,
    x: centerX - ((start.center.x - start.camera.x) / start.camera.scale) * scale,
    y: centerY - ((start.center.y - start.camera.y) / start.camera.scale) * scale,
  };
}

export type CameraKeyAction = { kind: "pan"; dx: number; dy: number } | { kind: "zoom"; factor: number };

export function cameraKeyAction(key: string, shift: boolean): CameraKeyAction | null {
  const step = shift ? 120 : 48;
  switch (key) {
    case "ArrowLeft": return { kind: "pan", dx: step, dy: 0 };
    case "ArrowRight": return { kind: "pan", dx: -step, dy: 0 };
    case "ArrowUp": return { kind: "pan", dx: 0, dy: step };
    case "ArrowDown": return { kind: "pan", dx: 0, dy: -step };
    case "+":
    case "=": return { kind: "zoom", factor: 1.2 };
    case "-": return { kind: "zoom", factor: 1 / 1.2 };
    default: return null;
  }
}
