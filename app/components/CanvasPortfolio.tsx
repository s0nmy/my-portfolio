"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { CanvasProject } from "../content/canvas-projects";
import "../canvas.css";

type Camera = { x: number; y: number; scale: number };
type Point = { x: number; y: number };
type Gesture = { pointerId: number; kind: "pan" | "card"; origin: Point; camera: Camera; slug?: string; card?: Point };

const initialCamera: Camera = { x: 36, y: 26, scale: 1 };
const mobileCamera: Camera = { x: -25, y: 45, scale: 0.72 };
const minScale = 0.5;
const maxScale = 1.8;
const cardWidth = 350;

export function CanvasPortfolio({ projects }: { projects: CanvasProject[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const [camera, setCamera] = useState<Camera>(initialCamera);
  const [selected, setSelected] = useState("about");
  const [positions, setPositions] = useState<Record<string, Point>>({});
  const selectedProject = projects.find((project) => project.slug === selected);
  const getPosition = (project: CanvasProject) => positions[project.slug] ?? { x: project.x, y: project.y };

  useEffect(() => {
    if (!window.matchMedia("(max-width: 720px)").matches) return;
    const frame = window.requestAnimationFrame(() => setCamera(mobileCamera));
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
    const position = project ? getPosition(project) : positions.about ?? { x: 90, y: 110 };
    const width = project ? cardWidth : 430;
    setCamera((current) => ({ ...current, x: bounds.width / 2 - (position.x + width / 2) * current.scale, y: bounds.height / 2 - (position.y + 120) * current.scale }));
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

  return (
    <main className="portfolio-shell">
      <header className="portfolio-topbar">
        <div className="portfolio-brand"><span className="brand-mark">M.</span><span><strong>Miyu Sone</strong><small>Portfolio / 2026</small></span></div>
        <div className="topbar-center"><span className="topbar-dot" /> A space for ideas and things I make</div>
        <a className="topbar-link" href="/classic/">従来のページ ↗</a>
      </header>

      <div className="portfolio-workspace">
        <aside className="portfolio-layers" aria-label="Layers">
          <div className="pane-heading"><span>LAYERS</span><span>01 / {String(projects.length + 1).padStart(2, "0")}</span></div>
          <p className="pane-caption">Explore the canvas</p>
          <div className="layer-group-label">PORTFOLIO</div>
          <button className={`layer-item ${selected === "about" ? "is-selected" : ""}`} onClick={() => focusItem("about")}><span className="layer-icon">◇</span><span>About me</span></button>
          <div className="layer-group-label layer-group-projects">SELECTED WORK</div>
          {projects.map((project, index) => <button key={project.slug} className={`layer-item ${selected === project.slug ? "is-selected" : ""}`} onClick={() => focusItem(project.slug)}><span className="layer-number">{String(index + 1).padStart(2, "0")}</span><span>{project.title}</span></button>)}
          <div className="layers-bottom"><span className="mini-sparkle">✳</span><p>気になるカードを選んで、<br />右側で概要を見られます。</p></div>
        </aside>

        <section className="portfolio-canvas-panel" aria-label="Canvas">
          <div className="canvas-toolbar"><span className="canvas-toolbar-label"><span className="canvas-toolbar-icon">⊞</span> CANVAS</span><span className="canvas-toolbar-hint">ドラッグで移動 · ホイールで拡大縮小</span></div>
          <div ref={viewportRef} className="canvas-viewport" tabIndex={0} aria-label="キャンバス。矢印キーで移動、プラスとマイナスで拡大縮小" onPointerDown={startPan} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture} onKeyDown={onCanvasKeyDown}>
            <div className="canvas-world" style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
              <article className={`canvas-card about-card ${selected === "about" ? "card-selected" : ""}`} style={{ left: positions.about?.x ?? 90, top: positions.about?.y ?? 110 }} onClick={() => setSelected("about")}>
                <div className="card-eyebrow about-card-handle" onPointerDown={(event) => startCardDrag(event, "about", positions.about ?? { x: 90, y: 110 })} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture} title="ドラッグして移動"><span className="eyebrow-line" /> HELLO, I&apos;M <span className="about-drag-icon">⠿</span></div>
                <h1>Miyu<br /><em>Sone.</em></h1>
                <p className="about-role">Software engineer &amp; product thinker</p>
                <p className="about-copy">Webとモバイルの開発を中心に、使う人の体験を考えながらものづくりに取り組んでいます。</p>
                <div className="about-card-footer"><span>Based in Japan</span><span>✳ Open to ideas</span></div>
              </article>
              {projects.map((project, index) => {
                const position = getPosition(project);
                return <article key={project.slug} className={`canvas-card project-card ${selected === project.slug ? "card-selected" : ""}`} style={{ left: position.x, top: position.y } as CSSProperties} onClick={() => setSelected(project.slug)}>
                  <div className="project-card-handle" onPointerDown={(event) => startCardDrag(event, project.slug, position)} onPointerMove={moveGesture} onPointerUp={endGesture} onPointerCancel={endGesture} title="ドラッグして移動"><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">⠿</span></div>
                  <div className="project-image"><Image src={project.image} alt={project.imageAlt} width={700} height={420} unoptimized /></div>
                  <div className="project-card-body"><h2>{project.title}</h2><p>{project.description}</p><span className="project-tag">{project.technologies}</span></div>
                </article>;
              })}
              <div className="canvas-note" style={{ left: 565, top: 640 }} aria-hidden="true">A collection of things<br />I&apos;ve learned by making. <span>↗</span></div>
            </div>
          </div>
          <div className="canvas-controls" aria-label="キャンバス操作"><button onClick={() => zoomAt(1 / 1.2)} aria-label="縮小">−</button><span>{Math.round(camera.scale * 100)}%</span><button onClick={() => zoomAt(1.2)} aria-label="拡大">＋</button><button className="reset-button" onClick={() => setCamera(window.matchMedia("(max-width: 720px)").matches ? mobileCamera : initialCamera)}>初期位置</button></div>
        </section>

        <aside className="portfolio-inspect" aria-label="Inspect">
          <div className="pane-heading"><span>INSPECT</span><span className="inspect-sparkle">✳</span></div>
          <div className="inspect-content"><div className="inspect-type">{selectedProject ? "SELECTED PROJECT" : "PROFILE"}</div><h2>{selectedProject?.title ?? "About Me"}</h2><p className="inspect-description">{selectedProject?.description ?? "神戸電子専門学校で学びながら、Webアプリケーション、モバイル開発、UI/UX、プロダクトマネジメントに取り組んでいます。"}</p>
            {selectedProject ? <><div className="inspect-divider" /><div className="inspect-field"><span>STACK</span><p>{selectedProject.technologies}</p></div>{selectedProject.body && <div className="inspect-field"><span>NOTE</span><p>{selectedProject.body.split(/\n\s*\n/)[0]}</p></div>}{selectedProject.href && <a className="inspect-cta" href={selectedProject.href} target="_blank" rel="noopener noreferrer">プロジェクトを見る <span>↗</span></a>}</> : <><div className="inspect-divider" /><div className="inspect-field"><span>FOCUS</span><p>Software Engineering<br />Product &amp; Experience</p></div><div className="inspect-links"><a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer">note ↗</a></div></>}
          </div>
          <div className="inspect-footer">Made with curiosity <span>✳</span></div>
        </aside>
      </div>
    </main>
  );
}
