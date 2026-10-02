const socialLinkClassName = "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white no-underline transition-colors duration-300 hover:bg-white/20 focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] motion-reduce:transition-none";

export function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#2c3e50_0%,#34495e_100%)] pb-8 pt-16 text-white">
      <div className="mx-auto max-w-[1200px] px-8 text-center">
        <div>
          <h3 className="mb-[0.3rem] text-2xl tracking-[0.1em]">Miyu Sone</h3>
          <p className="mb-8 font-en text-[0.8rem] tracking-[0.2em] opacity-70">ENGINEER PORTFOLIO</p>
        </div>
        <div className="my-8">
          <p className="mb-2 font-en text-[0.75rem] tracking-[0.15em] opacity-70">Contact &amp; Social</p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer" className={socialLinkClassName} aria-label="GitHub">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="mailto:kd1417997@st.kobedenshi.ac.jp" className={socialLinkClassName} aria-label="Email">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer" className={socialLinkClassName} aria-label="note">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </a>
          </div>
        </div>
        <p className="pt-8 text-[0.8rem] opacity-60">&copy; 2024 Miyu Sone. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
