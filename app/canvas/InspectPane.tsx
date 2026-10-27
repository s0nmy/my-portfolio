import { forwardRef } from "react";
import type { Project } from "../lib/projects";
import type { Profile } from "./types";

type Props = { selected: string; project?: Project; profile: Profile };

const aboutDescription = "神戸電子専門学校で学びながら、Webアプリケーション、モバイル開発、UI/UX、プロダクトマネジメントに取り組んでいます。";

export const InspectPane = forwardRef<HTMLElement, Props>(function InspectPane({ selected, project, profile }, ref) {
  const { skills, timeline } = profile;
  const title = project?.title ?? (selected === "skills" ? skills.title : selected === "timeline" ? timeline.title : "About Me");
  const description = project?.overview ?? (selected === "skills" ? skills.summary : selected === "timeline" ? timeline.summary : aboutDescription);

  return (
    <aside ref={ref} className="portfolio-inspect" aria-label="Inspect">
      <div className="pane-heading"><span>INSPECT</span></div>
      <div className="inspect-content">
        <div className="inspect-type">{project ? "SELECTED PROJECT" : "PROFILE"}</div>
        <h2>{title}</h2>
        <p className="inspect-description">{description}</p>
        <div className="inspect-divider" />
        {project ? (
          <>
            <div className="inspect-field"><span>STACK</span><p>{project.technologies}</p></div>
            {project.href && <a className="inspect-cta" href={project.href} target="_blank" rel="noopener noreferrer">GitHubを見る <span>↗</span></a>}
          </>
        ) : selected === "skills" ? (
          skills.groups.map((group) => <div key={group.title} className="inspect-field"><span>{group.title}</span><p>{group.technologies}</p></div>)
        ) : selected === "timeline" ? (
          timeline.entries.map((entry) => <div key={`${entry.date}-${entry.title}`} className="inspect-field"><span>{entry.date}</span><p><strong>{entry.title}</strong><br />{entry.description}</p></div>)
        ) : (
          <>
            <div className="inspect-field"><span>FOCUS</span><p>Software Engineering<br />Product &amp; Experience</p></div>
            <div className="inspect-links">
              <a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer">note ↗</a>
            </div>
          </>
        )}
      </div>
    </aside>
  );
});
