import Image from "next/image";
import type { Project } from "../lib/projects";
import { CardHandle } from "./CardHandle";
import { CardResizeHandle } from "./CardResizeHandle";
import type { CardProps } from "./cardProps";

export function ProjectCard({ project, index, position, size, zIndex, selected, onSelect, gestures }: CardProps & { project: Project; index: number }) {
  return (
    <article className={`canvas-card project-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: size?.width, height: size?.height, zIndex }} onPointerDown={(event) => gestures.startTouchCardDrag(event, project.slug, position)} onClick={() => onSelect(project.slug)}>
      <CardHandle className="project-card-handle" slug={project.slug} position={position} gestures={gestures}>
        <span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">⠿</span>
      </CardHandle>
      <div className="project-image"><Image src={project.image} alt={project.imageAlt} width={700} height={420} unoptimized /></div>
      <div className="project-card-body"><h2>{project.title}</h2><p>{project.description}</p><span className="project-tag">{project.technologies}</span></div>
      <CardResizeHandle slug={project.slug} label={`${project.title} のサイズを変更`} gestures={gestures} />
    </article>
  );
}
