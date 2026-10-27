import { CardHandle } from "./CardHandle";
import { CardResizeHandle } from "./CardResizeHandle";
import type { CardProps } from "./cardProps";

export function AboutCard({ position, size, zIndex, selected, onSelect, gestures }: CardProps) {
  return (
    <article className={`canvas-card about-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: size?.width, height: size?.height, zIndex }} onPointerDown={(event) => gestures.startTouchCardDrag(event, "about", position)} onClick={() => onSelect("about")}>
      <CardHandle className="card-eyebrow about-card-handle" slug="about" position={position} gestures={gestures}>
        <span className="eyebrow-line" /> ABOUT ME <span className="about-drag-icon">⠿</span>
      </CardHandle>
      <h1>Miyu<br /><em>Sone.</em></h1>
      <p className="about-role">Software engineer &amp; product thinker</p>
      <p className="about-copy">「ユーザーの生活をより豊かに！」をモットーとして、web開発に励んでいます。</p>
      <div className="about-card-footer"><span>Kobe / Students</span></div>
      <CardResizeHandle slug="about" label="About me のサイズを変更" gestures={gestures} />
    </article>
  );
}
