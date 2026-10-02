import type { CSSProperties } from "react";

export function Hero() {
  return (
    <section id="hero" className="relative z-[1] isolate flex h-screen min-h-[640px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--color-primary-light)_0%,var(--color-primary)_48%,var(--color-primary-dark)_100%)] max-[768px]:min-h-[560px]">
      <div className="hero-overlay" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        <span className="hero-star hero-star-large" style={{ "--x": "12%", "--y": "21%", "--delay": "0s" } as CSSProperties} />
        <span className="hero-star" style={{ "--x": "25%", "--y": "68%", "--delay": "1.2s" } as CSSProperties} />
        <span className="hero-star" style={{ "--x": "38%", "--y": "16%", "--delay": "2.1s" } as CSSProperties} />
        <span className="hero-star hero-star-large" style={{ "--x": "73%", "--y": "24%", "--delay": "0.7s" } as CSSProperties} />
        <span className="hero-star" style={{ "--x": "87%", "--y": "43%", "--delay": "1.7s" } as CSSProperties} />
        <span className="hero-star" style={{ "--x": "78%", "--y": "75%", "--delay": "2.8s" } as CSSProperties} />
        <span className="shooting-star" />
      </div>

      <div className="relative z-[3] w-[min(760px,calc(100%-2rem))] animate-fade-in-up p-8 text-center motion-reduce:animate-none">
        <p className="mb-8 font-en text-[1.2rem] tracking-[0.35em] text-[rgba(237,252,255,0.96)] max-[768px]:text-base">MIYU SONE</p>
        <h2 className="mb-4 text-[4rem] font-bold tracking-[0.28em] text-white [text-shadow:0_4px_22px_rgba(95,184,217,0.55)] max-[768px]:text-[2.5rem]">Portfolio</h2>
        <div className="mt-8 flex justify-center gap-8">
          <a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/20 hover:text-white focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] motion-reduce:transition-none" aria-label="GitHub">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
          </a>
          <a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/20 hover:text-white focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] motion-reduce:transition-none" aria-label="note">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
          </a>
          <a href="https://twitter.com/s0nmy_" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/20 hover:text-white focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] motion-reduce:transition-none" aria-label="X">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-0 right-0 mx-auto flex w-fit flex-col items-center gap-2 animate-scroll-bounce motion-reduce:animate-none">
        <span className="font-en text-[0.7rem] tracking-[0.2em] text-white/85">SCROLL</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/85 to-transparent" />
      </div>
    </section>
  );
}
