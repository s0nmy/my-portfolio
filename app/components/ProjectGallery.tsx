"use client";

import { useEffect, useState } from "react";
import type { Project } from "../content/projects";

function ProjectCard({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!active || reducedMotion || project.images.length < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % project.images.length), 1400);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion, project.images.length]);

  const picture = (
    // The gallery switches between files in public and does not need image optimization.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="gallery-photo" src={project.images[index]} alt={`${project.imageAlt}${project.images.length > 1 ? ` ${index + 1}` : ""}`} loading="lazy" decoding="async" />
  );

  return (
    <article className="gallery-item" onMouseEnter={() => setActive(true)} onMouseLeave={() => { setActive(false); setIndex(0); }} onFocus={() => setActive(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setActive(false); setIndex(0); } }}>
      <div className="gallery-placeholder">
        {project.href ? <a className="gallery-picture-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} のリポジトリを開く`}>{picture}</a> : picture}
        {project.images.length > 1 && (
          <>
            <span className="gallery-image-count" aria-live="polite">{index + 1} / {project.images.length}</span>
            <div className="gallery-controls" aria-label={`${project.title} の画像切り替え`}>
              <button type="button" onClick={() => setIndex((current) => (current - 1 + project.images.length) % project.images.length)} aria-label="前の画像">‹</button>
              <button type="button" onClick={() => setIndex((current) => (current + 1) % project.images.length)} aria-label="次の画像">›</button>
            </div>
          </>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-tech">{project.technologies}</p>
        {project.href && <a className="project-source" href={project.href} target="_blank" rel="noopener noreferrer">GitHubで見る<span aria-hidden="true"> ↗</span></a>}
      </div>
    </article>
  );
}

export function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  return (
    <section id="projects" className="section gallery-section">
      <div className="container">
        <h2 className="section-title"><span className="title-en">PROJECTS</span><span className="title-ja">プロジェクト</span></h2>
        <div className="gallery-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      </div>
    </section>
  );
}
