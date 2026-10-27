import type { ReactNode } from "react";
import type { Point } from "./types";
import type { CanvasGestures } from "./useCanvasGestures";

type Props = { className: string; slug: string; position: Point; gestures: CanvasGestures; children: ReactNode };

export function CardHandle({ className, slug, position, gestures, children }: Props) {
  return (
    <div className={className} onPointerDown={(event) => gestures.startCardDrag(event, slug, position)} onPointerMove={gestures.moveGesture} onPointerUp={gestures.endGesture} onPointerCancel={gestures.endGesture}>
      {children}
    </div>
  );
}
