import type { CanvasGestures } from "./useCanvasGestures";

type Props = { slug: string; label: string; gestures: CanvasGestures };

export function CardResizeHandle({ slug, label, gestures }: Props) {
  return (
    <button
      className="card-resize-handle"
      aria-label={label}
      onPointerDown={(event) => gestures.startCardResize(event, slug)}
      onPointerMove={gestures.moveCardResize}
      onPointerUp={gestures.endCardResize}
      onPointerCancel={gestures.endCardResize}
      onLostPointerCapture={gestures.endCardResize}
      onKeyDown={(event) => gestures.resizeCardWithKeyboard(event, slug)}
      onClick={(event) => event.stopPropagation()}
    />
  );
}
