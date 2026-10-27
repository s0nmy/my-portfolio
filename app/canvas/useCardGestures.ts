import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import type { Camera, Point, Size } from "./types";

type Gesture =
  | { kind: "pan"; pointerId: number; origin: Point; camera: Camera }
  | { kind: "drag"; pointerId: number; slug: string; origin: Point; card: Point; scale: number }
  | { kind: "resize"; pointerId: number; slug: string; origin: Point; size: Size; scale: number };

type Options = {
  camera: Camera;
  setCamera: (camera: Camera) => void;
  isPinching: () => boolean;
  select: (slug: string) => void;
  sizes: Record<string, Size>;
  moveCard: (slug: string, position: Point) => void;
  resizeCard: (slug: string, size: Size) => void;
};

const arrowDirections: Record<string, Point> = {
  ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
};

/**
 * Intent:  Translate one pointer gesture at a time (pan the canvas, drag a card, resize a card)
 *          into camera and layout updates. Changes when pointer interaction rules change.
 * Boundary: in  — camera and setters (camera, layout, selection) as arguments; no state of its own to share.
 *           out — props to spread on elements: canvasProps, dragHandleProps, touchDragProps,
 *                 resizeHandleProps, and cancel().
 * State modeling: a single ref holding a discriminated union. Only one gesture can be active, and each
 *          variant carries exactly the fields it needs (a drag always has a slug and a start position).
 * Update surface: the four prop builders and cancel().
 * Hidden complexity: pointer capture, scale-aware deltas, ignoring input while pinching,
 *          keyboard resize steps.
 * Composition: downstream of useCamera/useCardLayout/useCardSelection, beside usePinchZoom.
 * Test notes: needs pointer events; the geometry it applies is delegated to camera.ts / cardLayout.ts.
 */
export function useCardGestures({ camera, setCamera, isPinching, select, sizes, moveCard, resizeCard }: Options) {
  const gestureRef = useRef<Gesture | null>(null);

  function cancel() {
    gestureRef.current = null;
  }

  function end(event: PointerEvent<HTMLElement>) {
    if (gestureRef.current?.pointerId === event.pointerId) gestureRef.current = null;
  }

  function move(event: PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    if (isPinching() || !gesture || gesture.pointerId !== event.pointerId) return;
    const dx = event.clientX - gesture.origin.x;
    const dy = event.clientY - gesture.origin.y;
    if (gesture.kind === "pan") {
      setCamera({ ...gesture.camera, x: gesture.camera.x + dx, y: gesture.camera.y + dy });
      return;
    }
    event.stopPropagation();
    if (gesture.kind === "drag") {
      moveCard(gesture.slug, { x: gesture.card.x + dx / gesture.scale, y: gesture.card.y + dy / gesture.scale });
    } else {
      resizeCard(gesture.slug, { width: gesture.size.width + dx / gesture.scale, height: gesture.size.height + dy / gesture.scale });
    }
  }

  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (isPinching() || event.target !== event.currentTarget || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = { kind: "pan", pointerId: event.pointerId, origin: { x: event.clientX, y: event.clientY }, camera };
  }

  function startDrag(event: PointerEvent<HTMLElement>, slug: string, card: Point) {
    if (isPinching() || event.button !== 0) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    select(slug);
    gestureRef.current = { kind: "drag", pointerId: event.pointerId, slug, origin: { x: event.clientX, y: event.clientY }, card, scale: camera.scale };
  }

  function startResize(event: PointerEvent<HTMLButtonElement>, slug: string) {
    if (isPinching() || event.button !== 0) return;
    const card = event.currentTarget.parentElement;
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    select(slug);
    gestureRef.current = {
      kind: "resize",
      pointerId: event.pointerId,
      slug,
      origin: { x: event.clientX, y: event.clientY },
      size: { width: card.offsetWidth, height: card.offsetHeight },
      scale: camera.scale,
    };
  }

  function resizeWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, slug: string) {
    const direction = arrowDirections[event.key];
    if (!direction) return;
    event.preventDefault();
    event.stopPropagation();
    select(slug);
    const card = event.currentTarget.parentElement;
    if (!card) return;
    const size = sizes[slug] ?? { width: card.offsetWidth, height: card.offsetHeight };
    const step = event.shiftKey ? 40 : 16;
    resizeCard(slug, { width: size.width + direction.x * step, height: size.height + direction.y * step });
  }

  return {
    cancel,
    canvasProps: { onPointerDown: startPan, onPointerMove: move, onPointerUp: end, onPointerCancel: end },
    dragHandleProps: (slug: string, position: Point) => ({
      onPointerDown: (event: PointerEvent<HTMLElement>) => startDrag(event, slug, position),
      onPointerMove: move,
      onPointerUp: end,
      onPointerCancel: end,
    }),
    /** On touch screens the whole card body drags, not only its header. */
    touchDragProps: (slug: string, position: Point) => ({
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "touch") startDrag(event, slug, position);
      },
    }),
    resizeHandleProps: (slug: string) => ({
      onPointerDown: (event: PointerEvent<HTMLButtonElement>) => startResize(event, slug),
      onPointerMove: move,
      onPointerUp: end,
      onPointerCancel: end,
      onLostPointerCapture: end,
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => resizeWithKeyboard(event, slug),
      onClick: (event: { stopPropagation(): void }) => event.stopPropagation(),
    }),
  };
}

export type CardGestures = ReturnType<typeof useCardGestures>;
