import type { Point, Size } from "./types";
import type { CardGestures } from "./useCardGestures";

/** Everything a card needs; cards never see the gesture hooks themselves. */
export type CardProps = {
  position: Point;
  size?: Size;
  zIndex: number;
  selected: boolean;
  onSelect: () => void;
  dragHandleProps: ReturnType<CardGestures["dragHandleProps"]>;
  touchDragProps: ReturnType<CardGestures["touchDragProps"]>;
  resizeHandleProps: ReturnType<CardGestures["resizeHandleProps"]>;
};
