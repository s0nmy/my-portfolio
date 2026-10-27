import type { SkillsCard } from "../lib/profile";
import type { CardProps } from "./cardProps";
import { SkillIcon } from "./SkillIcon";

/** The Skills card is fixed in size, so it takes no size or resize handle. */
export function SkillsInfoCard({ skills, position, zIndex, selected, onSelect, dragHandleProps, touchDragProps }: Omit<CardProps, "size" | "resizeHandleProps"> & { skills: SkillsCard }) {
  return (
    <article className={`canvas-card info-card skills-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, zIndex }} onClick={onSelect} {...touchDragProps}>
      <div className="project-card-handle" {...dragHandleProps}>
        <span>PROFILE / 01</span><span aria-hidden="true">⠿</span>
      </div>
      <div className="info-card-body">
        <h2>Skills</h2>
        {skills.groups.map((group) => (
          <section key={group.title} className="skills-group">
            <h3>{group.title}</h3>
            <ul className="skills-tools">
              {group.technologies.split(" / ").map((technology) => <li key={technology}><SkillIcon name={technology} /><span>{technology}</span></li>)}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
