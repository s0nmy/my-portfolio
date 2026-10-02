import { SectionTitle } from "./SectionTitle";

const iconClassName = "h-full w-full [filter:brightness(0)_saturate(100%)_invert(72%)_sepia(47%)_saturate(437%)_hue-rotate(153deg)_brightness(90%)_contrast(88%)]";

export function Skills() {
  return (
    <section id="skills" className="relative z-10 bg-white py-24 max-[768px]:py-16">
      <div className="mx-auto max-w-[1200px] px-8">
        <SectionTitle english="SKILLS" japanese="スキル" />
        <div className="grid grid-cols-1 gap-8 min-[769px]:grid-cols-3">
          <section className="rounded-brand bg-white p-8 text-center" aria-label="Frontend and Mobile: TypeScript、React、Vite、Tailwind CSS、React Native、Swift、SwiftUI">
            <h3 className="mb-8 text-[1.3rem] font-semibold text-primary-dark">Frontend &amp; Mobile</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="size-16" title="TypeScript">
                <svg className="h-full w-full" viewBox="0 0 128 128" role="img" aria-label="TypeScript">
                                <rect width="128" height="128" fill="#5FB8D9"/>
                                <path fill="#fff" d="M21 34h57v15H58v47H41V49H21zm80-1c-15 0-25 8-25 20 0 13 10 16 21 19 7 2 10 3 10 7s-4 6-11 6c-8 0-15-3-21-8l-8 12c8 7 18 10 30 10 16 0 26-8 26-21 0-13-10-17-22-20-7-2-9-3-9-7s4-6 10-6c7 0 13 3 18 7l8-12c-7-5-15-7-27-7z"/>
                            </svg>
                        </div>
              <div className="size-16" title="React">
                <svg className={iconClassName} viewBox="0 0 128 128" role="img" aria-label="React">
                                <g fill="none" stroke="#5FB8D9" strokeWidth="6">
                                    <ellipse cx="64" cy="64" rx="50" ry="19"/>
                                    <ellipse cx="64" cy="64" rx="50" ry="19" transform="rotate(60 64 64)"/>
                                    <ellipse cx="64" cy="64" rx="50" ry="19" transform="rotate(120 64 64)"/>
                                </g>
                                <circle cx="64" cy="64" r="10" fill="#5FB8D9"/>
                            </svg>
                        </div>
              <div className="size-16" title="Swift / SwiftUI">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <linearGradient id="swiftGrad" x1="24.67" y1="102.33" x2="103.33" y2="25.67" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#5FB8D9"/>
                                    <stop offset="1" stopColor="#5FB8D9"/>
                                </linearGradient>
                                <path d="M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0zm37.08 81.73c-5.45 8.99-14.12 16.17-24.52 20.29-10.4 4.12-21.88 5.09-32.52 2.73-10.64-2.36-20.29-7.85-27.37-15.57-7.08-7.72-11.32-17.49-12.03-27.73 11.38 13.38 27.65 24.35 46.44 29.95-15.45-9.62-28.54-22.93-37.99-38.78 9.34 8.85 20.34 15.91 32.42 20.67C57.29 65.57 66.6 55.95 72.42 44.5c5.82-11.45 8.1-24.37 6.56-37.09 14.76 16.09 21.61 37.69 18.58 58.59-.91 6.32-2.84 12.47-5.73 18.23z" fill="url(#swiftGrad)"/>
                            </svg>
                        </div>
              <div className="hidden size-16" title="Next.js">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <circle cx="64" cy="64" r="64" fill="#000"/>
                                <path d="M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 006.763-5.209z" fill="#fff"/>
                                <path fill="#fff" d="M81.778 38.4h8.533v51.2h-8.533z"/>
                            </svg>
                        </div>
              <div className="size-16" title="Tailwind CSS">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8"/>
                            </svg>
                        </div>
                    </div>
                </section>
          <section className="rounded-brand bg-white p-8 text-center" aria-label="Backend and Data: Go、C#、.NET、Java、Python、PHP、PostgreSQL、MySQL">
            <h3 className="mb-8 text-[1.3rem] font-semibold text-primary-dark">Backend &amp; Data</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="size-16" title="Go">
                <svg className={iconClassName} viewBox="0 0 205 78">
                                <g fill="#5FB8D9" fillRule="evenodd">
                                    <path d="M16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6l-36.2-.1zM1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6l-47.3.1zM25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7l-21.8-.1zM121.3 23.7c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7h-19.3c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z"/>
                                    <path d="M161.5 76.7c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z"/>
                                </g>
                            </svg>
                        </div>
              <div className="size-16" title="PostgreSQL">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <path d="M93.95 11.82c-10.11.2-17.64 2.06-25.06 6.53-1.99-.13-4-.2-6.03-.2-7.87 0-15.08 1.49-20.8 4.08C29.81 28.43 22.5 39.37 22.5 52.5c0 4.98 1.05 9.63 2.93 13.84-7.7 4.33-13.43 10.71-13.43 18.66 0 13.67 15.51 24.75 34.66 24.75 5.29 0 10.32-.77 14.84-2.16 6.37 8.54 17.43 14.41 30 14.41 19.02 0 34.44-11.66 34.44-26.05 0-7.98-4.87-15.09-12.39-19.88 3.76-5.27 6.01-11.88 6.01-19.07 0-17.51-13.79-31.75-30.81-31.95-.4-6.09-2.98-10.42-6.18-13.24 2.3-.96 4.73-1.73 7.38-1.99z" fill="#336791"/>
                            </svg>
                        </div>
                    </div>
                </section>
          <section className="rounded-brand bg-white p-8 text-center" aria-label="Infrastructure and Tooling: Google Cloud、AWS、Azure、Supabase、Docker、Kubernetes、Git、GitHub、GitLab、npm、pnpm、開発環境">
            <h3 className="mb-8 text-[1.3rem] font-semibold text-primary-dark">Infrastructure &amp; Tooling</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="size-16" title="Docker">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <path d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.9-4.3 2.4-2.8 1-5.9 2-8.9 2H79V49H66V24H51v12H26v13H13v14H1.8l-.2 1.5c-.5 6.4.3 12.6 3 18.5 2.1 4.8 5.1 8.8 9.1 11.8 6.1 4.6 13.7 7.3 21.5 7.8 3.1.2 6.2.3 9.3.3 5.6 0 11.1-.4 16.5-1.3 6.9-1.1 13.5-3.5 19.3-6.9 3.9-2.3 7.4-5.2 10.3-8.7 3.2-3.9 5.6-8.3 7.1-13.1 2 .1 4 .2 6 .2 4.8 0 9.4-.7 13.5-2.1 3.9-1.4 7.3-3.5 10.1-6.3l1.1-1.1-1.1-1.1c-2.8-2.8-6.5-4.8-10.5-5.9zM67 48H54V36h13v12zm-14 0H40V36h13v12zm-14 0H26V36h13v12zm-14 0H12V36h13v12zm28 13H40V49h13v12zm-14 0H26V49h13v12zm-14 0H12V49h13v12zm14-25H26V24h13v12z" fill="#0DB7ED"/>
                            </svg>
                        </div>
              <div className="size-16" title="GitHub">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <path fillRule="evenodd" clipRule="evenodd" d="M64 1.512c-23.493 0-42.545 19.047-42.545 42.545 0 18.797 12.19 34.745 29.095 40.37 2.126.394 2.907-.923 2.907-2.047 0-1.014-.04-4.366-.058-7.92-11.837 2.573-14.334-5.02-14.334-5.02-1.935-4.918-4.724-6.226-4.724-6.226-3.86-2.64.29-2.586.29-2.586 4.273.3 6.523 4.385 6.523 4.385 3.794 6.504 9.953 4.623 12.38 3.536.383-2.75 1.485-4.628 2.702-5.69-9.45-1.075-19.384-4.724-19.384-21.026 0-4.645 1.662-8.44 4.384-11.42-.442-1.072-1.898-5.4.412-11.26 0 0 3.572-1.142 11.7 4.363 3.395-.943 7.035-1.416 10.65-1.432 3.616.017 7.258.49 10.658 1.432 8.12-5.504 11.688-4.362 11.688-4.362 2.316 5.86.86 10.187.418 11.26 2.728 2.978 4.378 6.774 4.378 11.42 0 16.34-9.953 19.938-19.427 20.99 1.526 1.32 2.886 3.91 2.886 7.88 0 5.692-.048 10.273-.048 11.674 0 1.13.766 2.458 2.922 2.04 16.896-5.632 29.07-21.574 29.07-40.365C106.545 20.56 87.497 1.512 64 1.512z" fill="#181616"/>
                            </svg>
                        </div>
              <div className="size-16" title="Google Cloud">
                <svg className={iconClassName} viewBox="0 0 128 128">
                                <path d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.8 32.8 20.3 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.7.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.9-2.7z" fill="#EA4335"/>
                                <path d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80.8 40.1c6 4.9 9.5 12.3 9.5 20.1v2.5c6.9 0 12.5 5.6 12.5 12.5s-5.6 12.5-12.5 12.5H64.1l-2.5 2.5V103l2.5 2.5h26.2c15.6.1 28.3-12.4 28.4-28 .1-10.7-5.9-20.5-15.6-25.7z" fill="#4285F4"/>
                                <path d="M38.3 105.5h26.2V87.7H38.3c-1.7 0-3.3-.4-4.8-1l-3.5 1.1-9.5 9.5-1.2 3.2c5.1 3.2 11 4.9 17.2 5h1.8z" fill="#34A853"/>
                                <path d="M38.3 46.2c-15.6 0-28.3 12.7-28.3 28.3S22.7 102.8 38.3 102.8V84.5c-6.9 0-12.5-5.6-12.5-12.5s5.6-12.5 12.5-12.5z" fill="#FBBC05"/>
                            </svg>
                        </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
