"use client";

import { useEffect, useState } from "react";
import type { Project } from "../content/projects";
import { SectionTitle } from "./SectionTitle";

const focusClassName = "focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px]";

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
    <img
      className="block h-full w-full object-cover object-center"
      src={project.images[index]}
      alt={`${project.imageAlt}${project.images.length > 1 ? ` ${index + 1}` : ""}`}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <article
      className="relative overflow-hidden rounded-brand transition-all duration-300 motion-reduce:transition-none"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setIndex(0);
      }}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-surface-muted before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)] before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100 motion-reduce:before:transition-none">
        {project.href ? (
          <a className={`relative z-[1] block h-full w-full ${focusClassName}`} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} のリポジトリを開く`}>
            {picture}
          </a>
        ) : picture}
        {project.images.length > 1 && (
          <>
            <span className="absolute bottom-3 right-3 z-[2] rounded-full bg-[rgba(44,62,80,0.72)] px-[0.55rem] py-[0.4rem] font-en text-[0.75rem] leading-none text-white" aria-live="polite">{index + 1} / {project.images.length}</span>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[3] flex -translate-y-1/2 justify-between px-2" role="group" aria-label={`${project.title} の画像切り替え`}>
              <button className={`pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-[rgba(44,62,80,0.72)] text-2xl text-white ${focusClassName}`} type="button" onClick={() => setIndex((current) => (current - 1 + project.images.length) % project.images.length)} aria-label="前の画像">‹</button>
              <button className={`pointer-events-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-[rgba(44,62,80,0.72)] text-2xl text-white ${focusClassName}`} type="button" onClick={() => setIndex((current) => (current + 1) % project.images.length)} aria-label="次の画像">›</button>
            </div>
          </>
        )}
      </div>
      <div className="relative z-[2] bg-white p-8">
        <h3 className="mb-2 text-[1.2rem] font-semibold text-ink">{project.title}</h3>
        <p className="mb-2 text-[0.9rem] leading-[1.7] text-muted">{project.description}</p>
        <p className="font-en text-[0.8rem] font-medium text-primary-dark">{project.technologies}</p>
        {project.href && (
          <a className={`mt-3 block text-[0.85rem] text-primary-dark ${focusClassName}`} href={project.href} target="_blank" rel="noopener noreferrer">
            GitHubで見る<span aria-hidden="true"> ↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  return (
    <section id="projects" className="relative z-10 bg-surface-muted py-24 max-[768px]:py-16">
      <div className="mx-auto max-w-[1200px] px-8">
        <SectionTitle english="PROJECTS" japanese="プロジェクト" sparkleSide="left" />
        <div className="grid grid-cols-1 gap-8 min-[769px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  );
}
