import Image from "next/image";
import type { Project } from "../lib/projects";
import type { CardProps } from "./cardProps";

export function ProjectCard({ project, index, position, size, zIndex, selected, onSelect, dragHandleProps, touchDragProps, resizeHandleProps }: CardProps & { project: Project; index: number }) {
  return (
    <article className={`canvas-card project-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: size?.width, height: size?.height, zIndex }} onClick={onSelect} {...touchDragProps}>
      <div className="project-card-handle" {...dragHandleProps}>
        <span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">⠿</span>
      </div>
      <div className="project-image"><Image src={project.image} alt={project.imageAlt} width={700} height={420} unoptimized /></div>
      <div className="project-card-body"><h2>{project.title}</h2><p>{project.description}</p><span className="project-tag">{project.technologies}</span></div>
      <button className="card-resize-handle" aria-label={`${project.title} のサイズを変更`} {...resizeHandleProps} />
    </article>
  );
}
