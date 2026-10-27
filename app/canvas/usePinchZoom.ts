import { useRef, type PointerEvent } from "react";
import { pinchCamera, startPinch, type PinchStart } from "./camera";
import type { Camera, Point } from "./types";

/**
 * Intent:  Turn two touch pointers into camera zoom. Changes when the touch zoom behavior changes.
 * Boundary: in  — the current camera and `setCamera`.
 *           out — isPinching(), and capture-phase pointer handlers for the viewport via bind().
 * State modeling: refs only (touch points and the pinch start are history, not render data).
 *          At most two touch points are tracked, so a third finger cannot create a pinch.
 * Update surface: isPinching(), bind(onStart).
 * Hidden complexity: pointer bookkeeping across down/move/up/cancel, pinch center anchoring.
 * Composition: sits beside useCardGestures; the caller passes `onStart` (e.g. gestures.cancel) so a
 *          pinch interrupts a drag in progress. Reads isPinching to let others stand down.
 * Test notes: the zoom math is pinchCamera in camera.ts; this hook only does event bookkeeping.
 */
export function usePinchZoom(camera: Camera, setCamera: (camera: Camera) => void) {
  const touchPointsRef = useRef<Map<number, Point>>(new Map());
  const pinchRef = useRef<PinchStart | null>(null);

  function touchPair(): [Point, Point] {
    const [first, second] = [...touchPointsRef.current.values()];
    return [first, second];
  }

  function bind(onStart: () => void) {
    return {
      onPointerDownCapture(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== "touch" || touchPointsRef.current.size >= 2) return;
        touchPointsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (touchPointsRef.current.size !== 2) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const [first, second] = touchPair();
        pinchRef.current = startPinch(first, second, { x: bounds.left, y: bounds.top }, camera);
        onStart();
      },
      onPointerMoveCapture(event: PointerEvent<HTMLElement>) {
        if (!touchPointsRef.current.has(event.pointerId)) return;
        touchPointsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
        const pinch = pinchRef.current;
        if (!pinch || touchPointsRef.current.size !== 2) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const [first, second] = touchPair();
        const next = pinchCamera(pinch, first, second, { x: bounds.left, y: bounds.top });
        if (next) setCamera(next);
      },
      onPointerUpCapture: end,
      onPointerCancelCapture: end,
    };
  }

  function end(event: PointerEvent<HTMLElement>) {
    if (!touchPointsRef.current.delete(event.pointerId)) return;
    if (touchPointsRef.current.size < 2) pinchRef.current = null;
  }

  return { isPinching: () => pinchRef.current !== null, bind };
}
