import { useCallback, useEffect, useState, type KeyboardEvent, type RefObject } from "react";
import { cameraKeyAction, centerOn, homeCamera, normalizeCamera, zoomAround } from "./camera";
import { initialCamera } from "./constants";
import type { Camera, Point, Size } from "./types";

/**
 * Intent:  Own the canvas camera (pan offset + zoom) and the viewport-driven ways of changing it.
 *          Changes when the view model or its viewport interactions (wheel, keys, jump to a card) change.
 * Boundary: in  — the viewport element ref (to measure it and listen to the wheel).
 *           out — camera, plus a small update surface (below).
 * State modeling: one useState<Camera>. Every write goes through normalizeCamera, so an out-of-range
 *          scale cannot be stored; `setCamera` is the only way for other hooks to write.
 * Update surface: setCamera(camera), zoomBy(factor), goHome(aboutSize?), focusOn(position, size), onKeyDown.
 * Hidden complexity: viewport measuring, wheel anchoring (non-passive listener), initial placement
 *          after first layout, focusing the viewport for keyboard use.
 * Composition: root of the view chain. usePinchZoom and useCardGestures write back through setCamera.
 * Test notes: the math lives in camera.ts and is testable with inputs and outputs only.
 */
export function useCamera(viewportRef: RefObject<HTMLDivElement | null>) {
  const [camera, setCameraState] = useState<Camera>(initialCamera);
  const setCamera = useCallback((next: Camera) => setCameraState(normalizeCamera(next)), []);

  const measureViewport = useCallback((): Size | null => {
    const bounds = viewportRef.current?.getBoundingClientRect();
    return bounds ? { width: bounds.width, height: bounds.height } : null;
  }, [viewportRef]);

  const goHome = useCallback((aboutCardSize?: Size) => {
    const viewport = measureViewport();
    setCameraState(viewport ? homeCamera(viewport, window.innerWidth, aboutCardSize) : initialCamera);
  }, [measureViewport]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => goHome());
    return () => window.cancelAnimationFrame(frame);
  }, [goHome]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const bounds = viewport.getBoundingClientRect();
      const anchor: Point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      setCameraState((current) => zoomAround(current, Math.exp(-event.deltaY * 0.001), anchor));
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [viewportRef]);

  function zoomBy(factor: number) {
    const viewport = measureViewport();
    if (!viewport) return;
    setCameraState((current) => zoomAround(current, factor, { x: viewport.width / 2, y: viewport.height / 2 }));
  }

  function focusOn(position: Point, size: Size) {
    const viewport = measureViewport();
    if (!viewport) return;
    setCameraState((current) => centerOn(current, viewport, position, size));
    viewportRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const action = cameraKeyAction(event.key, event.shiftKey);
    if (!action) return;
    event.preventDefault();
    if (action.kind === "zoom") zoomBy(action.factor);
    else setCameraState((current) => ({ ...current, x: current.x + action.dx, y: current.y + action.dy }));
  }

  return { camera, setCamera, zoomBy, goHome, focusOn, onKeyDown };
}
