"use client";

import { useRef, useState } from "react";
import type { Project } from "../lib/projects";
import "../styles/canvas.css";
import { aboutPosition, aboutSize, projectSize, skillsSize, timelineSize } from "./constants";
import { CanvasView } from "./CanvasView";
import { InspectPane } from "./InspectPane";
import { LayersPane } from "./LayersPane";
import type { Point, Profile } from "./types";
import { useCamera } from "./useCamera";
import { useCanvasGestures } from "./useCanvasGestures";
import { usePaneResize } from "./usePaneResize";

export function CanvasPortfolio({ projects, profile }: { projects: Project[]; profile: Profile }) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLElement>(null);
  const inspectRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const topCardOrderRef = useRef(1);
  const [selected, setSelected] = useState("about");
  const [cardOrder, setCardOrder] = useState<Record<string, number>>({ about: 1 });

  function selectCard(slug: string) {
    setSelected(slug);
    const order = ++topCardOrderRef.current;
    setCardOrder((current) => ({ ...current, [slug]: order }));
  }

  const cameraControls = useCamera(viewportRef);
  const gestures = useCanvasGestures({ camera: cameraControls.camera, setCamera: cameraControls.setCamera, isPinching: cameraControls.isPinching, select: selectCard });
  const panes = usePaneResize({ workspaceRef, layersRef, inspectRef });
  const selectedProject = projects.find((project) => project.slug === selected);

  function defaultPosition(slug: string): Point {
    const project = projects.find((item) => item.slug === slug);
    if (project) return { x: project.x, y: project.y };
    if (slug === "skills" || slug === "timeline") return { x: profile[slug].x, y: profile[slug].y };
    return aboutPosition;
  }

  function defaultSize(slug: string) {
    if (projects.some((item) => item.slug === slug)) return projectSize;
    return slug === "skills" ? skillsSize : slug === "timeline" ? timelineSize : aboutSize;
  }

  const positionOf = (slug: string) => gestures.positions[slug] ?? defaultPosition(slug);

  function focusItem(slug: string) {
    selectCard(slug);
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const position = positionOf(slug);
    const width = gestures.cardSizes[slug]?.width ?? defaultSize(slug).width;
    const height = gestures.cardSizes[slug]?.height ?? defaultSize(slug).height;
    cameraControls.setCamera((current) => ({ ...current, x: bounds.width / 2 - (position.x + width / 2) * current.scale, y: bounds.height / 2 - (position.y + height / 2) * current.scale }));
    viewportRef.current?.focus();
  }

  return (
    <main className="portfolio-shell">
      <div ref={workspaceRef} className="portfolio-workspace" style={panes.workspaceStyle}>
        <LayersPane ref={layersRef} projects={projects} selected={selected} onFocus={focusItem} />
        <button {...panes.resizerProps("layers")} />
        <CanvasView projects={projects} profile={profile} selected={selected} onSelect={selectCard} positionOf={positionOf} zIndexOf={(slug) => cardOrder[slug] ?? 0} viewportRef={viewportRef} cameraControls={cameraControls} gestures={gestures} />
        <button {...panes.resizerProps("inspect")} />
        <InspectPane ref={inspectRef} selected={selected} project={selectedProject} profile={profile} />
      </div>
    </main>
  );
}
