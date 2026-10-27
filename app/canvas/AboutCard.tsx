import type { CardProps } from "./cardProps";

export function AboutCard({ position, size, zIndex, selected, onSelect, dragHandleProps, touchDragProps, resizeHandleProps }: CardProps) {
  return (
    <article className={`canvas-card about-card ${selected ? "card-selected" : ""}`} style={{ left: position.x, top: position.y, width: size?.width, height: size?.height, zIndex }} onClick={onSelect} {...touchDragProps}>
      <div className="card-eyebrow about-card-handle" {...dragHandleProps}>
        <span className="eyebrow-line" /> ABOUT ME <span className="about-drag-icon">⠿</span>
      </div>
      <h1>Miyu<br /><em>Sone.</em></h1>
      <p className="about-role">Software engineer &amp; product thinker</p>
      <p className="about-copy">「ユーザーの生活をより豊かに！」をモットーとして、web開発に励んでいます。</p>
      <div className="about-card-footer"><span>Kobe / Students</span></div>
      <button className="card-resize-handle" aria-label="About me のサイズを変更" {...resizeHandleProps} />
    </article>
  );
}
