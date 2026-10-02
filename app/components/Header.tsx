"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [isHeroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-[10px] transition-all duration-300 motion-reduce:transition-none ${
        isHeroVisible ? "invisible pointer-events-none -translate-y-full opacity-0" : "bg-white/[0.98]"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4 max-[768px]:flex-col max-[768px]:gap-4 max-[768px]:px-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[0.05em] text-primary-dark">Miyu Sone</h1>
          <p className="mt-[0.2rem] font-en text-[0.7rem] tracking-[0.15em] text-muted">ENGINEER PORTFOLIO</p>
        </div>
        <nav className="flex gap-8 max-[768px]:flex-wrap max-[768px]:justify-center max-[768px]:gap-4">
          <a href="#profile" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-3 max-[768px]:py-[0.4rem] max-[768px]:text-[0.8rem] motion-reduce:transition-none">プロフィール</a>
          <a href="#skills" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-3 max-[768px]:py-[0.4rem] max-[768px]:text-[0.8rem] motion-reduce:transition-none">スキル</a>
          <a href="#projects" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-3 max-[768px]:py-[0.4rem] max-[768px]:text-[0.8rem] motion-reduce:transition-none">プロジェクト</a>
          <a href="#activity" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-3 max-[768px]:py-[0.4rem] max-[768px]:text-[0.8rem] motion-reduce:transition-none">活動</a>
        </nav>
      </div>
    </header>
  );
}
