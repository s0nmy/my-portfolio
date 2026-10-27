import type { RefObject } from "react";
import type { Project } from "../lib/projects";
import { AboutCard } from "./AboutCard";
import { ProjectCard } from "./ProjectCard";
import { SkillsInfoCard } from "./SkillsInfoCard";
import { TimelineInfoCard } from "./TimelineInfoCard";
import type { CameraControls } from "./useCamera";
import type { CanvasGestures } from "./useCanvasGestures";
import type { CardProps } from "./cardProps";
import type { Point, Profile } from "./types";

type Props = {
  projects: Project[];
  profile: Profile;
  selected: string;
  onSelect: (slug: string) => void;
  positionOf: (slug: string) => Point;
  zIndexOf: (slug: string) => number;
  viewportRef: RefObject<HTMLDivElement | null>;
  cameraControls: CameraControls;
  gestures: CanvasGestures;
};

export function CanvasView({ projects, profile, selected, onSelect, positionOf, zIndexOf, viewportRef, cameraControls, gestures }: Props) {
  const { camera, zoomAt, setCamera, getHomeCamera } = cameraControls;
  const cardProps = (slug: string): CardProps => ({
    position: positionOf(slug),
    size: gestures.cardSizes[slug],
    zIndex: zIndexOf(slug),
    selected: selected === slug,
    onSelect,
    gestures,
  });

  return (
    <section className="portfolio-canvas-panel" aria-label="Canvas">
      <div
        ref={viewportRef}
        className="canvas-viewport"
        tabIndex={0}
        aria-label="キャンバス。矢印キーで移動、プラスとマイナスで拡大縮小。タッチ操作では2本指で拡大縮小"
        onPointerDownCapture={(event) => { if (cameraControls.trackTouchStart(event)) gestures.cancel(); }}
        onPointerMoveCapture={cameraControls.trackTouchMove}
        onPointerUpCapture={cameraControls.trackTouchEnd}
        onPointerCancelCapture={cameraControls.trackTouchEnd}
        onPointerDown={gestures.startPan}
        onPointerMove={gestures.moveGesture}
        onPointerUp={gestures.endGesture}
        onPointerCancel={gestures.endGesture}
        onKeyDown={cameraControls.onKeyDown}
      >
        <div className="canvas-world" style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
          <AboutCard {...cardProps("about")} />
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} {...cardProps(project.slug)} />)}
          <SkillsInfoCard skills={profile.skills} {...cardProps("skills")} />
          <TimelineInfoCard timeline={profile.timeline} {...cardProps("timeline")} />
        </div>
      </div>
      <div className="canvas-controls" aria-label="キャンバス操作">
        <button onClick={() => zoomAt(1 / 1.2)} aria-label="縮小">−</button>
        <span>{Math.round(camera.scale * 100)}%</span>
        <button onClick={() => zoomAt(1.2)} aria-label="拡大">＋</button>
        <button className="reset-button" onClick={() => setCamera(getHomeCamera(gestures.cardSizes.about))}>初期位置</button>
      </div>
    </section>
  );
}
