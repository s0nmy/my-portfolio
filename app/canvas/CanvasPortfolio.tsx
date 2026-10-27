"use client";

import { useRef } from "react";
import type { Project } from "../lib/projects";
import "../styles/canvas.css";
import { CanvasView } from "./CanvasView";
import type { CardProps } from "./cardProps";
import { InspectPane } from "./InspectPane";
import { defaultPosition, defaultSize } from "./cardLayout";
import { LayersPane } from "./LayersPane";
import type { Profile } from "./types";
import { useCamera } from "./useCamera";
import { useCardGestures } from "./useCardGestures";
import { useCardLayout } from "./useCardLayout";
import { useCardSelection } from "./useCardSelection";
import { usePaneResize } from "./usePaneResize";
import { usePinchZoom } from "./usePinchZoom";

/** Composition root: wires the camera, layout, selection and gesture hooks together. */
export function CanvasPortfolio({ projects, profile }: { projects: Project[]; profile: Profile }) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLElement>(null);
  const inspectRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const { camera, setCamera, zoomBy, goHome, focusOn, onKeyDown } = useCamera(viewportRef);
  const layout = useCardLayout();
  const { selected, select, zIndexOf } = useCardSelection();
  const pinch = usePinchZoom(camera, setCamera);
  const gestures = useCardGestures({ camera, setCamera, isPinching: pinch.isPinching, select, sizes: layout.sizes, moveCard: layout.moveCard, resizeCard: layout.resizeCard });
  const panes = usePaneResize({ workspaceRef, layersRef, inspectRef });

  const positionOf = (slug: string) => layout.positions[slug] ?? defaultPosition(slug, projects, profile);

  function cardPropsOf(slug: string): CardProps {
    const position = positionOf(slug);
    return {
      position,
      size: layout.sizes[slug],
      zIndex: zIndexOf(slug),
      selected: selected === slug,
      onSelect: () => select(slug),
      dragHandleProps: gestures.dragHandleProps(slug, position),
      touchDragProps: gestures.touchDragProps(slug, position),
      resizeHandleProps: gestures.resizeHandleProps(slug),
    };
  }

  function focusItem(slug: string) {
    select(slug);
    focusOn(positionOf(slug), layout.sizes[slug] ?? defaultSize(slug, projects));
  }

  const viewportProps = { ...gestures.canvasProps, ...pinch.bind(gestures.cancel), onKeyDown };

  return (
    <main className="portfolio-shell">
      <div ref={workspaceRef} className="portfolio-workspace" style={panes.workspaceStyle}>
        <LayersPane ref={layersRef} projects={projects} selected={selected} onFocus={focusItem} />
        <button {...panes.resizerProps("layers")} />
        <CanvasView projects={projects} profile={profile} camera={camera} viewportRef={viewportRef} viewportProps={viewportProps} cardPropsOf={cardPropsOf} onZoom={zoomBy} onReset={() => goHome(layout.sizes.about)} />
        <button {...panes.resizerProps("inspect")} />
        <InspectPane ref={inspectRef} selected={selected} project={projects.find((project) => project.slug === selected)} profile={profile} />
      </div>
    </main>
  );
}
