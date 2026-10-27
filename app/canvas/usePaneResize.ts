import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type RefObject } from "react";
import { minCanvasWidth, minInspectWidth, minLayersWidth, resizerWidth } from "./constants";
import type { Pane } from "./types";

type PaneWidths = { layers: number | null; inspect: number | null };
type ResizeGesture = { pointerId: number; pane: Pane; originX: number; layers: number; inspect: number; workspace: number };
type Refs = {
  workspaceRef: RefObject<HTMLDivElement | null>;
  layersRef: RefObject<HTMLElement | null>;
  inspectRef: RefObject<HTMLElement | null>;
};

const labels: Record<Pane, string> = { layers: "Layers の幅を変更", inspect: "Inspect の幅を変更" };

/** Draggable and keyboard-resizable Layers / Inspect pane widths. */
export function usePaneResize({ workspaceRef, layersRef, inspectRef }: Refs) {
  const resizeRef = useRef<ResizeGesture | null>(null);
  const [paneWidths, setPaneWidths] = useState<PaneWidths>({ layers: null, inspect: null });

  const workspaceStyle = {
    "--layers-width": paneWidths.layers === null ? undefined : `${paneWidths.layers}px`,
    "--inspect-width": paneWidths.inspect === null ? undefined : `${paneWidths.inspect}px`,
  } as CSSProperties;

  function resizePane(pane: Pane, nextWidth: number, otherWidth: number, workspaceWidth: number) {
    const minWidth = pane === "layers" ? minLayersWidth : minInspectWidth;
    const availableWidth = workspaceWidth - otherWidth - resizerWidth * 2;
    const maxWidth = Math.min(availableWidth - minCanvasWidth, availableWidth / 2);
    const width = Math.round(Math.max(minWidth, Math.min(maxWidth, nextWidth)));
    setPaneWidths((current) => ({ ...current, [pane]: width }));
  }

  function start(event: PointerEvent<HTMLButtonElement>, pane: Pane) {
    if (event.button !== 0 || !workspaceRef.current || !layersRef.current || !inspectRef.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeRef.current = {
      pointerId: event.pointerId,
      pane,
      originX: event.clientX,
      layers: layersRef.current.getBoundingClientRect().width,
      inspect: inspectRef.current.getBoundingClientRect().width,
      workspace: workspaceRef.current.getBoundingClientRect().width,
    };
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    const delta = event.clientX - resize.originX;
    if (resize.pane === "layers") resizePane("layers", resize.layers + delta, resize.inspect, resize.workspace);
    else resizePane("inspect", resize.inspect - delta, resize.layers, resize.workspace);
  }

  function end() {
    resizeRef.current = null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, pane: Pane) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (!workspaceRef.current || !layersRef.current || !inspectRef.current) return;
    event.preventDefault();
    const step = event.shiftKey ? 40 : 16;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const layers = layersRef.current.getBoundingClientRect().width;
    const inspect = inspectRef.current.getBoundingClientRect().width;
    resizePane(pane, (pane === "layers" ? layers : inspect) + (pane === "layers" ? direction : -direction) * step, pane === "layers" ? inspect : layers, workspaceRef.current.getBoundingClientRect().width);
  }

  function resizerProps(pane: Pane) {
    return {
      className: "pane-resizer",
      "aria-label": labels[pane],
      onPointerDown: (event: PointerEvent<HTMLButtonElement>) => start(event, pane),
      onPointerMove: move,
      onPointerUp: end,
      onPointerCancel: end,
      onLostPointerCapture: end,
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => onKeyDown(event, pane),
    };
  }

  return { workspaceStyle, resizerProps };
}
