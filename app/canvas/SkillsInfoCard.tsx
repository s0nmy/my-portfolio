import type { SkillsCard } from "../lib/profile";
import { CardHandle } from "./CardHandle";
import type { CardProps } from "./cardProps";
import { SkillIcon } from "./SkillIcon";

export function SkillsInfoCard({ skills, position, zIndex, selected, onSelect, gestures }: Omit<CardProps, "size"> & { skills: SkillsCard }) {
  return (
    <article className={`canvas-card info-card skills-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, zIndex }} onPointerDown={(event) => gestures.startTouchCardDrag(event, "skills", position)} onClick={() => onSelect("skills")}>
      <CardHandle className="project-card-handle" slug="skills" position={position} gestures={gestures}>
        <span>PROFILE / 01</span><span aria-hidden="true">⠿</span>
      </CardHandle>
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
