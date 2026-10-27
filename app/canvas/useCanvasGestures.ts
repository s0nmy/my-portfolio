import { useRef, useState, type Dispatch, type KeyboardEvent, type PointerEvent, type SetStateAction } from "react";
import { cardSizeLimits, type CardKind } from "./constants";
import type { Camera, CardSize, Point } from "./types";

type Gesture = { pointerId: number; kind: "pan" | "card"; origin: Point; camera: Camera; slug?: string; card?: Point };
type CardResizeGesture = { pointerId: number; slug: string; origin: Point; size: CardSize; scale: number };

type Options = {
  camera: Camera;
  setCamera: Dispatch<SetStateAction<Camera>>;
  isPinching: () => boolean;
  select: (slug: string) => void;
};

function clampCardSize(slug: string, size: CardSize): CardSize {
  const kind: CardKind = slug === "about" || slug === "timeline" ? slug : "project";
  const limits = cardSizeLimits[kind];
  return {
    width: Math.round(Math.min(limits.maxWidth, Math.max(limits.minWidth, size.width))),
    height: Math.round(Math.min(limits.maxHeight, Math.max(limits.minHeight, size.height))),
  };
}

/** Canvas pan, card drag and card resize, including per-visit card positions and sizes. */
export function useCanvasGestures({ camera, setCamera, isPinching, select }: Options) {
  const gestureRef = useRef<Gesture | null>(null);
  const cardResizeRef = useRef<CardResizeGesture | null>(null);
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [cardSizes, setCardSizes] = useState<Record<string, CardSize>>({});

  function cancel() {
    gestureRef.current = null;
    cardResizeRef.current = null;
  }

  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (isPinching() || event.target !== event.currentTarget || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = { pointerId: event.pointerId, kind: "pan", origin: { x: event.clientX, y: event.clientY }, camera };
  }

  function startCardDrag(event: PointerEvent<HTMLElement>, slug: string, card: Point) {
    if (isPinching() || event.button !== 0) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    select(slug);
    gestureRef.current = { pointerId: event.pointerId, kind: "card", slug, origin: { x: event.clientX, y: event.clientY }, camera, card };
  }

  /** On touch screens the whole card body drags, not only its header. */
  function startTouchCardDrag(event: PointerEvent<HTMLElement>, slug: string, card: Point) {
    if (event.pointerType === "touch") startCardDrag(event, slug, card);
  }

  function moveGesture(event: PointerEvent<HTMLElement>) {
    if (isPinching()) return;
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const dx = event.clientX - gesture.origin.x;
    const dy = event.clientY - gesture.origin.y;
    if (gesture.kind === "pan") {
      setCamera({ ...gesture.camera, x: gesture.camera.x + dx, y: gesture.camera.y + dy });
    } else if (gesture.slug && gesture.card) {
      const { slug, card } = gesture;
      setPositions((current) => ({ ...current, [slug]: { x: card.x + dx / gesture.camera.scale, y: card.y + dy / gesture.camera.scale } }));
    }
  }

  function endGesture(event: PointerEvent<HTMLElement>) {
    if (gestureRef.current?.pointerId === event.pointerId) gestureRef.current = null;
  }

  function startCardResize(event: PointerEvent<HTMLButtonElement>, slug: string) {
    if (isPinching() || event.button !== 0) return;
    const card = event.currentTarget.parentElement;
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    select(slug);
    cardResizeRef.current = {
      pointerId: event.pointerId,
      slug,
      origin: { x: event.clientX, y: event.clientY },
      size: { width: card.offsetWidth, height: card.offsetHeight },
      scale: camera.scale,
    };
  }

  function moveCardResize(event: PointerEvent<HTMLButtonElement>) {
    if (isPinching()) return;
    const resize = cardResizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    event.stopPropagation();
    const size = clampCardSize(resize.slug, {
      width: resize.size.width + (event.clientX - resize.origin.x) / resize.scale,
      height: resize.size.height + (event.clientY - resize.origin.y) / resize.scale,
    });
    setCardSizes((current) => ({ ...current, [resize.slug]: size }));
  }

  function endCardResize() {
    cardResizeRef.current = null;
  }

  function resizeCardWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, slug: string) {
    const movement: Record<string, Point> = {
      ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
    };
    const direction = movement[event.key];
    if (!direction) return;
    event.preventDefault();
    event.stopPropagation();
    select(slug);
    const card = event.currentTarget.parentElement;
    if (!card) return;
    const size = cardSizes[slug] ?? { width: card.offsetWidth, height: card.offsetHeight };
    const step = event.shiftKey ? 40 : 16;
    setCardSizes((current) => ({
      ...current,
      [slug]: clampCardSize(slug, { width: size.width + direction.x * step, height: size.height + direction.y * step }),
    }));
  }

  return {
    positions,
    cardSizes,
    cancel,
    startPan,
    startCardDrag,
    startTouchCardDrag,
    moveGesture,
    endGesture,
    startCardResize,
    moveCardResize,
    endCardResize,
    resizeCardWithKeyboard,
  };
}

export type CanvasGestures = ReturnType<typeof useCanvasGestures>;
