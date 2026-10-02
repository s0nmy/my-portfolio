import { SectionTitle } from "./SectionTitle";

const cardClassName = "rounded-brand bg-white p-16 transition-all duration-300 hover:bg-[linear-gradient(135deg,#fff_0%,rgba(227,242,253,0.6)_50%,rgba(187,222,251,0.4)_100%)] hover:shadow-[0_4px_16px_rgba(79,195,247,0.12)] motion-reduce:transition-none";
const linkClassName = "flex items-center gap-2 rounded-[25px] border-2 border-transparent px-[1.2rem] py-[0.7rem] text-[0.9rem] font-medium text-white no-underline transition-all duration-300 focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px] motion-reduce:transition-none";

export function Activity() {
  return (
    <section id="activity" className="relative z-10 bg-white py-24 max-[768px]:py-16">
      <div className="mx-auto max-w-[1200px] px-8">
        <SectionTitle english="ACTIVITY" japanese="活動実績" />
        <div className="grid gap-8">
          <article className={cardClassName}>
            <div className="mb-4 inline-block rounded-[20px] bg-primary px-4 py-[0.3rem] font-en text-[0.8rem] font-bold tracking-[0.1em] text-white">2024.04 - 2028.03</div>
            <h3 className="mb-4 text-[1.3rem] font-semibold text-ink">神戸電子専門学校</h3>
            <p className="leading-[1.9] text-muted">神戸電子専門学校 ITエキスパート科にてweb開発やネットワークなど幅広く学習。基本情報技術者試験、C言語プログラミング能力認定試験2級を取得しました。</p>
          </article>
          <article className={cardClassName}>
            <div className="mb-4 inline-block rounded-[20px] bg-primary px-4 py-[0.3rem] font-en text-[0.8rem] font-bold tracking-[0.1em] text-white">2026.02 - 現在</div>
            <h3 className="mb-4 text-[1.3rem] font-semibold text-ink">株式会社オプティム インターンシップ</h3>
            <p className="leading-[1.9] text-muted">医療系プロダクトのバックエンド開発を担当。Go、PostgreSQL、Clean Architectureを使用した実務経験を積んでいます。</p>
          </article>
          <article className={cardClassName}>
            <div className="mb-4 inline-block rounded-[20px] bg-primary px-4 py-[0.3rem] font-en text-[0.8rem] font-bold tracking-[0.1em] text-white">2026.03</div>
            <h3 className="mb-4 text-[1.3rem] font-semibold text-ink">GDG on Campus Hackathon 2026</h3>
            <p className="leading-[1.9] text-muted">4人チームでPdM・バックエンド・iOSフロントエンドを担当し、近距離音楽交換SNS「すれック」を開発。ゴネンゴ賞（スポンサー賞）を受賞しました。</p>
          </article>
          <article className={cardClassName}>
            <div className="mb-4 inline-block rounded-[20px] bg-primary px-4 py-[0.3rem] font-en text-[0.8rem] font-bold tracking-[0.1em] text-white">2025.03 - 2026.02</div>
            <h3 className="mb-4 text-[1.3rem] font-semibold text-ink">Alpha+ Project</h3>
            <p className="leading-[1.9] text-muted">経済産業省地方未踏(AKATSUKI)プロジェクの1つ。PgMコースとして進行管理・情報整理・運営改善などのプロジェクトマネジメントを学びました。</p>
          </article>
          <article className={cardClassName}>
            <div className="mb-4 inline-block rounded-[20px] bg-primary px-4 py-[0.3rem] font-en text-[0.8rem] font-bold tracking-[0.1em] text-white">2025.07 - 現在</div>
            <h3 className="mb-4 text-[1.3rem] font-semibold text-ink">Google Developer Groups Greater Kwansai Organizer</h3>
            <p className="leading-[1.9] text-muted">技術系イベントの運営に携わっています。DevFest Tokyo 2025 ではPRチームとして登録者数1000人を達成しました。</p>
          </article>
          <article className={cardClassName}>
            <div className="mb-4 inline-block rounded-[20px] bg-primary px-4 py-[0.3rem] font-en text-[0.8rem] font-bold tracking-[0.1em] text-white">LINKS</div>
            <h3 className="mb-4 text-[1.3rem] font-semibold text-ink">SNS・コード</h3>
            <p className="leading-[1.9] text-muted">日々の学習記録や開発したプロジェクトは各プラットフォームで公開しています。</p>
            <div className="mt-8 flex flex-wrap gap-4 max-[768px]:flex-col">
              <a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer" className={`${linkClassName} bg-[#24292e] hover:bg-[#1a1e22] hover:shadow-[0_4px_12px_rgba(36,41,46,0.4)] max-[768px]:w-full max-[768px]:justify-center`}>
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                <span>GitHub</span>
              </a>
              <a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer" className={`${linkClassName} bg-primary hover:bg-primary-dark hover:shadow-[0_4px_12px_rgba(95,184,217,0.4)] max-[768px]:w-full max-[768px]:justify-center`}>
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
                <span>note</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
