import type { HTMLAttributes, RefObject } from "react";
import type { Project } from "../lib/projects";
import { AboutCard } from "./AboutCard";
import type { CardProps } from "./cardProps";
import { ProjectCard } from "./ProjectCard";
import { SkillsInfoCard } from "./SkillsInfoCard";
import { TimelineInfoCard } from "./TimelineInfoCard";
import type { Camera, Profile } from "./types";

type Props = {
  projects: Project[];
  profile: Profile;
  camera: Camera;
  viewportRef: RefObject<HTMLDivElement | null>;
  viewportProps: HTMLAttributes<HTMLDivElement>;
  cardPropsOf: (slug: string) => CardProps;
  onZoom: (factor: number) => void;
  onReset: () => void;
};

export function CanvasView({ projects, profile, camera, viewportRef, viewportProps, cardPropsOf, onZoom, onReset }: Props) {
  return (
    <section className="portfolio-canvas-panel" aria-label="Canvas">
      <div
        ref={viewportRef}
        className="canvas-viewport"
        tabIndex={0}
        aria-label="キャンバス。矢印キーで移動、プラスとマイナスで拡大縮小。タッチ操作では2本指で拡大縮小"
        {...viewportProps}
      >
        <div className="canvas-world" style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})` }}>
          <AboutCard {...cardPropsOf("about")} />
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} {...cardPropsOf(project.slug)} />)}
          <SkillsInfoCard skills={profile.skills} {...cardPropsOf("skills")} />
          <TimelineInfoCard timeline={profile.timeline} {...cardPropsOf("timeline")} />
        </div>
      </div>
      <div className="canvas-controls" aria-label="キャンバス操作">
        <button onClick={() => onZoom(1 / 1.2)} aria-label="縮小">−</button>
        <span>{Math.round(camera.scale * 100)}%</span>
        <button onClick={() => onZoom(1.2)} aria-label="拡大">＋</button>
        <button className="reset-button" onClick={onReset}>初期位置</button>
      </div>
    </section>
  );
}
