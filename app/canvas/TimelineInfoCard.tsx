import type { TimelineCard } from "../lib/profile";
import type { CardProps } from "./cardProps";

export function TimelineInfoCard({ timeline, position, size, zIndex, selected, onSelect, dragHandleProps, touchDragProps, resizeHandleProps }: CardProps & { timeline: TimelineCard }) {
  return (
    <article className={`canvas-card info-card timeline-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: size?.width, height: size?.height, zIndex }} onClick={onSelect} {...touchDragProps}>
      <div className="project-card-handle" {...dragHandleProps}>
        <span>PROFILE / 02</span><span aria-hidden="true">⠿</span>
      </div>
      <div className="info-card-body">
        <h2>Timeline</h2>
        <ol className="timeline-list">
          {timeline.entries.map((entry) => <li key={`${entry.date}-${entry.title}`}><time>{entry.date}</time><strong>{entry.title}</strong></li>)}
        </ol>
      </div>
      <button className="card-resize-handle" aria-label="Timeline のサイズを変更" {...resizeHandleProps} />
    </article>
  );
}
