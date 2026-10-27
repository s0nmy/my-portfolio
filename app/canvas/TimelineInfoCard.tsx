import type { TimelineCard } from "../lib/profile";
import { CardHandle } from "./CardHandle";
import { CardResizeHandle } from "./CardResizeHandle";
import type { CardProps } from "./cardProps";

export function TimelineInfoCard({ timeline, position, size, zIndex, selected, onSelect, gestures }: CardProps & { timeline: TimelineCard }) {
  return (
    <article className={`canvas-card info-card timeline-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: size?.width, height: size?.height, zIndex }} onPointerDown={(event) => gestures.startTouchCardDrag(event, "timeline", position)} onClick={() => onSelect("timeline")}>
      <CardHandle className="project-card-handle" slug="timeline" position={position} gestures={gestures}>
        <span>PROFILE / 02</span><span aria-hidden="true">⠿</span>
      </CardHandle>
      <div className="info-card-body">
        <h2>Timeline</h2>
        <ol className="timeline-list">
          {timeline.entries.map((entry) => <li key={`${entry.date}-${entry.title}`}><time>{entry.date}</time><strong>{entry.title}</strong></li>)}
        </ol>
      </div>
      <CardResizeHandle slug="timeline" label="Timeline のサイズを変更" gestures={gestures} />
    </article>
  );
}
