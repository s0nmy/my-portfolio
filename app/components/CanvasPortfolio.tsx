"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { CanvasProject } from "../content/canvas-projects";
import "../canvas.css";

type Camera = { x: number; y: number; scale: number };
type Point = { x: number; y: number };
type Gesture = { pointerId: number; kind: "pan" | "card"; origin: Point; camera: Camera; slug?: string; card?: Point };
type Pane = "layers" | "inspect";
type PaneWidths = { layers: number | null; inspect: number | null };
type ResizeGesture = { pointerId: number; pane: Pane; originX: number; layers: number; inspect: number; workspace: number };
type CardSize = { width: number; height: number };
type CardResizeGesture = { pointerId: number; slug: string; origin: Point; size: CardSize; scale: number };

const aboutPosition: Point = { x: 600, y: 430 };
const aboutWidth = 520;
const aboutHeight = 470;
const initialCamera: Camera = { x: -421, y: -239, scale: 0.9 };
const minScale = 0.5;
const maxScale = 1.8;
const cardWidth = 350;
const cardHeight = 380;
const cardSizeLimits: Record<"about" | "project", { minWidth: number; minHeight: number; maxWidth: number; maxHeight: number }> = {
  about: { minWidth: 440, minHeight: 430, maxWidth: 800, maxHeight: 750 },
  project: { minWidth: 300, minHeight: 340, maxWidth: 650, maxHeight: 650 },
};
const resizerWidth = 8;
const minCanvasWidth = 320;
const minLayersWidth = 160;
const minInspectWidth = 200;

export function CanvasPortfolio({ projects }: { projects: CanvasProject[] }) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLElement>(null);
  const inspectRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const resizeRef = useRef<ResizeGesture | null>(null);
  const cardResizeRef = useRef<CardResizeGesture | null>(null);
  const [paneWidths, setPaneWidths] = useState<PaneWidths>({ layers: null, inspect: null });
  const [camera, setCamera] = useState<Camera>(initialCamera);
  const [selected, setSelected] = useState("about");
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const [cardSizes, setCardSizes] = useState<Record<string, CardSize>>({});
  const selectedProject = projects.find((project) => project.slug === selected);
  const getPosition = (project: CanvasProject) => positions[project.slug] ?? { x: project.x, y: project.y };

  function getHomeCamera(): Camera {
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return initialCamera;
    const width = cardSizes.about?.width ?? aboutWidth;
    const height = cardSizes.about?.height ?? aboutHeight;
    const scale = window.innerWidth <= 720 ? Math.min(0.7, (bounds.width - 24) / width) : bounds.width < 900 ? 0.9 : 1;
    return {
      scale,
      x: bounds.width / 2 - (aboutPosition.x + width / 2) * scale,
      y: bounds.height / 2 - (aboutPosition.y + height / 2) * scale,
    };
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCamera(getHomeCamera()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const bounds = viewport.getBoundingClientRect();
      const anchorX = event.clientX - bounds.left;
      const anchorY = event.clientY - bounds.top;
      setCamera((current) => {
        const scale = Math.min(maxScale, Math.max(minScale, current.scale * Math.exp(-event.deltaY * 0.001)));
        return { scale, x: anchorX - ((anchorX - current.x) / current.scale) * scale, y: anchorY - ((anchorY - current.y) / current.scale) * scale };
      });
    };
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, []);

  function zoomAt(factor: number, clientX?: number, clientY?: number) {
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const anchorX = (clientX ?? bounds.left + bounds.width / 2) - bounds.left;
    const anchorY = (clientY ?? bounds.top + bounds.height / 2) - bounds.top;
    setCamera((current) => {
      const scale = Math.min(maxScale, Math.max(minScale, current.scale * factor));
      return { scale, x: anchorX - ((anchorX - current.x) / current.scale) * scale, y: anchorY - ((anchorY - current.y) / current.scale) * scale };
    });
  }

  function focusItem(slug: string) {
    setSelected(slug);
    const bounds = viewportRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const project = projects.find((item) => item.slug === slug);
    const position = project ? getPosition(project) : positions.about ?? aboutPosition;
    const width = cardSizes[slug]?.width ?? (project ? cardWidth : aboutWidth);
    const height = cardSizes[slug]?.height ?? (project ? cardHeight : aboutHeight);
    setCamera((current) => ({ ...current, x: bounds.width / 2 - (position.x + width / 2) * current.scale, y: bounds.height / 2 - (position.y + height / 2) * current.scale }));
    viewportRef.current?.focus();
  }

  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = { pointerId: event.pointerId, kind: "pan", origin: { x: event.clientX, y: event.clientY }, camera };
  }

  function startCardDrag(event: PointerEvent<HTMLDivElement>, slug: string, card: Point) {
    if (event.button !== 0) return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(slug);
    gestureRef.current = { pointerId: event.pointerId, kind: "card", slug, origin: { x: event.clientX, y: event.clientY }, camera, card };
  }

  function moveGesture(event: PointerEvent<HTMLElement>) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const dx = event.clientX - gesture.origin.x;
    const dy = event.clientY - gesture.origin.y;
    if (gesture.kind === "pan") {
      setCamera({ ...gesture.camera, x: gesture.camera.x + dx, y: gesture.camera.y + dy });
    } else if (gesture.slug && gesture.card) {
      setPositions((current) => ({ ...current, [gesture.slug!]: { x: gesture.card!.x + dx / gesture.camera.scale, y: gesture.card!.y + dy / gesture.camera.scale } }));
    }
  }

  function endGesture(event: PointerEvent<HTMLElement>) {
    if (gestureRef.current?.pointerId === event.pointerId) gestureRef.current = null;
  }

  function clampCardSize(slug: string, size: CardSize): CardSize {
    const limits = cardSizeLimits[slug === "about" ? "about" : "project"];
    return {
      width: Math.round(Math.min(limits.maxWidth, Math.max(limits.minWidth, size.width))),
      height: Math.round(Math.min(limits.maxHeight, Math.max(limits.minHeight, size.height))),
    };
  }

  function startCardResize(event: PointerEvent<HTMLButtonElement>, slug: string) {
    if (event.button !== 0) return;
    const card = event.currentTarget.parentElement;
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelected(slug);
    cardResizeRef.current = {
      pointerId: event.pointerId,
      slug,
      origin: { x: event.clientX, y: event.clientY },
      size: { width: card.offsetWidth, height: card.offsetHeight },
      scale: camera.scale,
    };
  }

  function moveCardResize(event: PointerEvent<HTMLButtonElement>) {
    const resize = cardResizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    event.stopPropagation();
    const size = clampCardSize(resize.slug, {
      width: resize.size.width + (event.clientX - resize.origin.x) / resize.scale,
      height: resize.size.height + (event.clientY - resize.origin.y) / resize.scale,
    });
    setCardSizes((current) => ({ ...current, [resize.slug]: size }));
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
    const card = event.currentTarget.parentElement;
    if (!card) return;
    const size = cardSizes[slug] ?? { width: card.offsetWidth, height: card.offsetHeight };
    const step = event.shiftKey ? 40 : 16;
    setCardSizes((current) => ({
      ...current,
      [slug]: clampCardSize(slug, { width: size.width + direction.x * step, height: size.height + direction.y * step }),
    }));
  }

  function onCanvasKeyDown(event: KeyboardEvent<HTMLDivElement>) {
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

  function resizePane(pane: Pane, nextWidth: number, otherWidth: number, workspaceWidth: number) {
    const minWidth = pane === "layers" ? minLayersWidth : minInspectWidth;
    const availableWidth = workspaceWidth - otherWidth - resizerWidth * 2;
    const maxWidth = Math.min(availableWidth - minCanvasWidth, availableWidth / 2);
    const width = Math.round(Math.max(minWidth, Math.min(maxWidth, nextWidth)));
    setPaneWidths((current) => ({ ...current, [pane]: width }));
  }

  function startPaneResize(event: PointerEvent<HTMLButtonElement>, pane: Pane) {
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

  function movePaneResize(event: PointerEvent<HTMLButtonElement>) {
    const resize = resizeRef.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    const delta = event.clientX - resize.originX;
    if (resize.pane === "layers") resizePane("layers", resize.layers + delta, resize.inspect, resize.workspace);
    else resizePane("inspect", resize.inspect - delta, resize.layers, resize.workspace);
  }

  function resizePaneWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, pane: Pane) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (!workspaceRef.current || !layersRef.current || !inspectRef.current) return;
    event.preventDefault();
    const step = event.shiftKey ? 40 : 16;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const layers = layersRef.current.getBoundingClientRect().width;
    const inspect = inspectRef.current.getBoundingClientRect().width;
    resizePane(pane, (pane === "layers" ? layers : inspect) + (pane === "layers" ? direction : -direction) * step, pane === "layers" ? inspect : layers, workspaceRef.current.getBoundingClientRect().width);
  }

  return (
    <main className="portfolio-shell">
      <div ref={workspaceRef} className="portfolio-workspace" style={{ "--layers-width": paneWidths.layers === null ? undefined : `${paneWidths.layers}px`, "--inspect-width": paneWidths.inspect === null ? undefined : `${paneWidths.inspect}px` } as CSSProperties}>
        <aside ref={layersRef} className="portfolio-layers" aria-label="Layers">
          <div className="pane-heading"><span>LAYERS</span><span>01 / {String(projects.length + 1).padStart(2, "0")}</span></div>
          <div className="layer-group-label">PORTFOLIO</div>
          <button className={`layer-item ${selected === "about" ? "is-selected" : ""}`} onClick={() => focusItem("about")}><span className="layer-icon">◇</span><span>About me</span></button>
          <div className="layer-group-label layer-group-projects">SELECTED WORK</div>
          {projects.map((project, index) => <button key={project.slug} className={`layer-item ${selected === project.slug ? "is-selected" : ""}`} onClick={() => focusItem(project.slug)}><span className="layer-number">{String(index + 1).padStart(2, "0")}</span><span>{project.title}</span></button>)}
        </aside>
        <button className="pane-resizer" aria-label="Layers の幅を変更" onPointerDown={(event) => startPaneResize(event, "layers")} onPointerMove={movePaneResize} onPointerUp={() => { resizeRef.current = null; }} onPointerCancel={() => { resizeRef.current = null; }} onLostPointerCapture={() => { resizeRef.current = null; }} onKeyDown={(event) => resizePaneWithKeyboard(event, "layers")} />

        <section className="portfolio-canvas-panel" aria-label="Canvas">
          <div ref={viewportRef} className="canvas-viewport" tabIndex={0} aria-label="キャンバス。矢印キーで移動、プラスとマイナスで拡大縮小" onPointerDown={startPan} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture} onKeyDown={onCanvasKeyDown}>
            <div className="canvas-world" style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
              <article className={`canvas-card about-card ${selected === "about" ? "card-selected" : ""}`} style={{ left: positions.about?.x ?? aboutPosition.x, top: positions.about?.y ?? aboutPosition.y, width: cardSizes.about?.width, height: cardSizes.about?.height }} onClick={() => setSelected("about")}>
                <div className="card-eyebrow about-card-handle" onPointerDown={(event) => startCardDrag(event, "about", positions.about ?? aboutPosition)} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture}><span className="eyebrow-line" /> ABOUT ME <span className="about-drag-icon">⠿</span></div>
                <h1>Miyu<br /><em>Sone.</em></h1>
                <p className="about-role">Software engineer &amp; product thinker</p>
                <p className="about-copy">「ユーザーの生活をより豊かに！」をモットーとして、web開発に励んでいます。</p>
                <div className="about-card-footer"><span>Kobe / Students</span></div>
                <button className="card-resize-handle" aria-label="About me のサイズを変更" onPointerDown={(event) => startCardResize(event, "about")} onPointerMove={moveCardResize} onPointerUp={() => { cardResizeRef.current = null; }} onPointerCancel={() => { cardResizeRef.current = null; }} onLostPointerCapture={() => { cardResizeRef.current = null; }} onKeyDown={(event) => resizeCardWithKeyboard(event, "about")} onClick={(event) => event.stopPropagation()} />
              </article>
              {projects.map((project, index) => {
                const position = getPosition(project);
                return <article key={project.slug} className={`canvas-card project-card ${selected === project.slug ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: cardSizes[project.slug]?.width, height: cardSizes[project.slug]?.height }} onClick={() => setSelected(project.slug)}>
                  <div className="project-card-handle" onPointerDown={(event) => startCardDrag(event, project.slug, position)} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture}><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">⠿</span></div>
                  <div className="project-image"><Image src={project.image} alt={project.imageAlt} width={700} height={420} unoptimized /></div>
                  <div className="project-card-body"><h2>{project.title}</h2><p>{project.description}</p><span className="project-tag">{project.technologies}</span></div>
                  <button className="card-resize-handle" aria-label={`${project.title} のサイズを変更`} onPointerDown={(event) => startCardResize(event, project.slug)} onPointerMove={moveCardResize} onPointerUp={() => { cardResizeRef.current = null; }} onPointerCancel={() => { cardResizeRef.current = null; }} onLostPointerCapture={() => { cardResizeRef.current = null; }} onKeyDown={(event) => resizeCardWithKeyboard(event, project.slug)} onClick={(event) => event.stopPropagation()} />
                </article>;
              })}
            </div>
          </div>
          <div className="canvas-controls" aria-label="キャンバス操作"><button onClick={() => zoomAt(1 / 1.2)} aria-label="縮小">−</button><span>{Math.round(camera.scale * 100)}%</span><button onClick={() => zoomAt(1.2)} aria-label="拡大">＋</button><button className="reset-button" onClick={() => setCamera(getHomeCamera())}>初期位置</button></div>
        </section>

        <button className="pane-resizer" aria-label="Inspect の幅を変更" onPointerDown={(event) => startPaneResize(event, "inspect")} onPointerMove={movePaneResize} onPointerUp={() => { resizeRef.current = null; }} onPointerCancel={() => { resizeRef.current = null; }} onLostPointerCapture={() => { resizeRef.current = null; }} onKeyDown={(event) => resizePaneWithKeyboard(event, "inspect")} />
        <aside ref={inspectRef} className="portfolio-inspect" aria-label="Inspect">
          <div className="pane-heading"><span>INSPECT</span></div>
          <div className="inspect-content"><div className="inspect-type">{selectedProject ? "SELECTED PROJECT" : "PROFILE"}</div><h2>{selectedProject?.title ?? "About Me"}</h2><p className="inspect-description">{selectedProject?.description ?? "神戸電子専門学校で学びながら、Webアプリケーション、モバイル開発、UI/UX、プロダクトマネジメントに取り組んでいます。"}</p>
            {selectedProject ? <><div className="inspect-divider" /><div className="inspect-field"><span>STACK</span><p>{selectedProject.technologies}</p></div>{selectedProject.body && <div className="inspect-field"><span>NOTE</span><p>{selectedProject.body.split(/\n\s*\n/)[0]}</p></div>}{selectedProject.href && <a className="inspect-cta" href={selectedProject.href} target="_blank" rel="noopener noreferrer">プロジェクトを見る <span>↗</span></a>}</> : <><div className="inspect-divider" /><div className="inspect-field"><span>FOCUS</span><p>Software Engineering<br />Product &amp; Experience</p></div><div className="inspect-links"><a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer">note ↗</a></div></>}
          </div>
          <div className="inspect-footer">Made with curiosity</div>
        </aside>
      </div>
    </main>
  );
}
