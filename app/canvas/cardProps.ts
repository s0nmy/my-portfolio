import type { Point, CardSize } from "./types";
import type { CanvasGestures } from "./useCanvasGestures";

/** Props shared by every card on the canvas. */
export type CardProps = {
  position: Point;
  size?: CardSize;
  zIndex: number;
  selected: boolean;
  onSelect: (slug: string) => void;
  gestures: CanvasGestures;
};
