import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from "react";
import { aboutPosition, aboutSize, initialCamera, maxScale, minScale } from "./constants";
import type { Camera, CardSize, Point } from "./types";

type PinchGesture = { distance: number; center: Point; camera: Camera };

function clampScale(scale: number) {
  return Math.min(maxScale, Math.max(minScale, scale));
}

function zoomAround(current: Camera, factor: number, anchorX: number, anchorY: number): Camera {
  const scale = clampScale(current.scale * factor);
  return { scale, x: anchorX - ((anchorX - current.x) / current.scale) * scale, y: anchorY - ((anchorY - current.y) / current.scale) * scale };
}

export function useCamera(viewportRef: RefObject<HTMLDivElement | null>) {
  const touchPointsRef = useRef<Map<number, Point>>(new Map());
  const pinchRef = useRef<PinchGesture | null>(null);
  const [camera, setCamera] = useState<Camera>(initialCamera);

  const getHomeCamera = useCallback((currentAboutSize?: CardSize): Camera => {
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return initialCamera;
    const width = currentAboutSize?.width ?? aboutSize.width;
    const height = currentAboutSize?.height ?? aboutSize.height;
    const scale = window.innerWidth <= 720 ? Math.min(0.7, (bounds.width - 24) / width) : bounds.width < 900 ? 0.9 : 1;
    return {
      scale,
      x: bounds.width / 2 - (aboutPosition.x + width / 2) * scale,
      y: bounds.height / 2 - (aboutPosition.y + height / 2) * scale,
    };
  }, [viewportRef]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCamera(getHomeCamera()));
    return () => window.cancelAnimationFrame(frame);
  }, [getHomeCamera]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const bounds = viewport.getBoundingClientRect();
      setCamera((current) => zoomAround(current, Math.exp(-event.deltaY * 0.001), event.clientX - bounds.left, event.clientY - bounds.top));
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [viewportRef]);

  function zoomAt(factor: number, clientX?: number, clientY?: number) {
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const anchorX = (clientX ?? bounds.left + bounds.width / 2) - bounds.left;
    const anchorY = (clientY ?? bounds.top + bounds.height / 2) - bounds.top;
    setCamera((current) => zoomAround(current, factor, anchorX, anchorY));
  }

  /** Returns true when this event started a two-finger pinch. */
  function trackTouchStart(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || touchPointsRef.current.size >= 2) return false;
    touchPointsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touchPointsRef.current.size !== 2) return false;
    const [first, second] = [...touchPointsRef.current.values()];
    const bounds = event.currentTarget.getBoundingClientRect();
    pinchRef.current = {
      distance: Math.hypot(second.x - first.x, second.y - first.y),
      center: { x: (first.x + second.x) / 2 - bounds.left, y: (first.y + second.y) / 2 - bounds.top },
      camera,
    };
    return true;
  }

  function trackTouchMove(event: PointerEvent<HTMLDivElement>) {
    if (!touchPointsRef.current.has(event.pointerId)) return;
    touchPointsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const pinch = pinchRef.current;
    if (!pinch || touchPointsRef.current.size !== 2 || pinch.distance === 0) return;
    const [first, second] = [...touchPointsRef.current.values()];
    const bounds = event.currentTarget.getBoundingClientRect();
    const scale = clampScale(pinch.camera.scale * Math.hypot(second.x - first.x, second.y - first.y) / pinch.distance);
    const centerX = (first.x + second.x) / 2 - bounds.left;
    const centerY = (first.y + second.y) / 2 - bounds.top;
    setCamera({
      scale,
      x: centerX - ((pinch.center.x - pinch.camera.x) / pinch.camera.scale) * scale,
      y: centerY - ((pinch.center.y - pinch.camera.y) / pinch.camera.scale) * scale,
    });
  }

  function trackTouchEnd(event: PointerEvent<HTMLDivElement>) {
    if (!touchPointsRef.current.delete(event.pointerId)) return;
    if (touchPointsRef.current.size < 2) pinchRef.current = null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 120 : 48;
    const movement: Record<string, Point> = { ArrowLeft: { x: step, y: 0 }, ArrowRight: { x: -step, y: 0 }, ArrowUp: { x: 0, y: step }, ArrowDown: { x: 0, y: -step } };
    if (movement[event.key]) {
      event.preventDefault();
      setCamera((current) => ({ ...current, x: current.x + movement[event.key].x, y: current.y + movement[event.key].y }));
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAt(1.2);
    } else if (event.key === "-") {
      event.preventDefault();
      zoomAt(1 / 1.2);
    }
  }

  return {
    camera,
    setCamera,
    getHomeCamera,
    zoomAt,
    isPinching: () => pinchRef.current !== null,
    trackTouchStart,
    trackTouchMove,
    trackTouchEnd,
    onKeyDown,
  };
}

export type CameraControls = ReturnType<typeof useCamera>;
