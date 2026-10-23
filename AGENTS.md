# Portfolio work guide

- Read `docs/architecture.md` and `docs/infinite-canvas.md` before changing the portfolio experience.
- Preserve existing Git changes and files. Inspect `git status` before edits; do not reset, clean, or overwrite unrelated work.
- Keep the site compatible with Next.js static export (`output: "export"`) and Cloudflare Workers static assets.
- The new portfolio uses Layers / Canvas / Inspect. Keep the canvas central and wide; let visitors explore by pan, zoom, selection, and card drag.
- Store project content in Markdown with Frontmatter. Keep summaries short; detailed case studies can be added later.
- Maintain keyboard access, mobile readability, reduced-motion support, and meaningful image alternative text.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` after implementation. Report browser and deployment verification separately.
- Do not change Cloudflare configuration, branch protection, or production deployment as part of UI work.
