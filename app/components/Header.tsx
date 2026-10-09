"use client";

import { useEffect, useState } from "react";
import { HERO_INTRO_DONE_EVENT } from "./Hero";

export function Header() {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeaderOffset = () => {
      const headerHeight = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    };

    const resizeObserver = new ResizeObserver(updateHeaderOffset);
    resizeObserver.observe(header);
    updateHeaderOffset();

    const showHeader = () => setVisible(true);
    window.addEventListener(HERO_INTRO_DONE_EVENT, showHeader);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener(HERO_INTRO_DONE_EVENT, showHeader);
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] bg-white/[0.98] backdrop-blur-[10px] transition-all duration-300 motion-reduce:transition-none ${
        isVisible
          ? "visible translate-y-0 opacity-100 pointer-events-auto"
          : "invisible -translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4 max-[768px]:flex-col max-[768px]:gap-1 max-[768px]:px-4 max-[768px]:py-2">
        <div className="max-[768px]:flex max-[768px]:items-baseline max-[768px]:gap-2">
          <h1 className="text-2xl font-semibold tracking-[0.05em] text-primary-dark max-[768px]:text-lg">Miyu Sone</h1>
          <p className="mt-[0.2rem] font-en text-[0.7rem] tracking-[0.15em] text-muted max-[768px]:mt-0 max-[768px]:text-[0.6rem]">ENGINEER PORTFOLIO</p>
        </div>
        <nav className="flex gap-8 max-[768px]:w-full max-[768px]:flex-nowrap max-[768px]:justify-between max-[768px]:gap-0">
          <a href="#profile" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-1 max-[768px]:py-1 max-[768px]:text-[0.75rem] motion-reduce:transition-none">プロフィール</a>
          <a href="#skills" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-1 max-[768px]:py-1 max-[768px]:text-[0.75rem] motion-reduce:transition-none">スキル</a>
          <a href="#projects" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-1 max-[768px]:py-1 max-[768px]:text-[0.75rem] motion-reduce:transition-none">プロジェクト</a>
          <a href="#activity" className="rounded-[20px] px-4 py-2 text-[0.9rem] font-medium text-ink no-underline transition-all duration-300 hover:bg-[linear-gradient(135deg,var(--color-primary-light)_0%,rgba(135,206,235,0.3)_100%)] hover:text-primary-dark focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] max-[768px]:px-1 max-[768px]:py-1 max-[768px]:text-[0.75rem] motion-reduce:transition-none">活動</a>
        </nav>
      </div>
    </header>
  );
}
