import { forwardRef } from "react";
import type { Project } from "../lib/projects";

type Props = { projects: Project[]; selected: string; onFocus: (slug: string) => void };

const profileItems = [
  { slug: "about", label: "About me" },
  { slug: "skills", label: "Skills" },
  { slug: "timeline", label: "Timeline" },
];

export const LayersPane = forwardRef<HTMLElement, Props>(function LayersPane({ projects, selected, onFocus }, ref) {
  return (
    <aside ref={ref} className="portfolio-layers" aria-label="Layers">
      <div className="pane-heading"><span>LAYERS</span><span>01 / {String(projects.length + 1).padStart(2, "0")}</span></div>
      <div className="layer-group-label">PROFILE</div>
      {profileItems.map((item) => (
        <button key={item.slug} className={`layer-item ${selected === item.slug ? "is-selected" : ""}`} onClick={() => onFocus(item.slug)}>
          <span className="layer-icon">◇</span><span>{item.label}</span>
        </button>
      ))}
      <div className="layer-group-label layer-group-projects">SELECTED WORK</div>
      {projects.map((project, index) => (
        <button key={project.slug} className={`layer-item ${selected === project.slug ? "is-selected" : ""}`} onClick={() => onFocus(project.slug)}>
          <span className="layer-number">{String(index + 1).padStart(2, "0")}</span><span>{project.title}</span>
        </button>
      ))}
    </aside>
  );
});
