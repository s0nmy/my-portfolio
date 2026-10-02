import { SectionTitle } from "./SectionTitle";

const profileLabelClassName = "min-w-[140px] font-semibold text-primary-dark";
const profileValueClassName = "flex items-center gap-2 text-ink";

export function Profile() {
  return (
    <section id="profile" className="relative z-10 bg-surface-muted py-24 max-[768px]:py-16">
      <div className="mx-auto max-w-[1200px] px-8">
        <SectionTitle english="PROFILE" japanese="プロフィール" sparkleSide="left" />
        <div className="mx-auto max-w-[880px]">
          <div className="flex flex-col gap-8">
            <div className="flex rounded-brand bg-[rgba(240,248,255,0.7)] p-4 transition-colors duration-300 hover:bg-[rgba(227,242,253,0.9)] motion-reduce:transition-none">
              <span className={profileLabelClassName}>名前</span>
              <span className={profileValueClassName}>曽根 望夢（そね みゆ）</span>
            </div>
            <div className="flex rounded-brand bg-[rgba(240,248,255,0.7)] p-4 transition-colors duration-300 hover:bg-[rgba(227,242,253,0.9)] motion-reduce:transition-none">
              <span className={profileLabelClassName}>所属</span>
              <span className={profileValueClassName}>神戸電子専門学校 ITエキスパート科 3年</span>
            </div>
            <div className="flex rounded-brand bg-[rgba(240,248,255,0.7)] p-4 transition-colors duration-300 hover:bg-[rgba(227,242,253,0.9)] motion-reduce:transition-none">
              <span className={profileLabelClassName}>興味分野</span>
              <span className={profileValueClassName}>Webアプリケーション開発、バックエンド開発、モバイルアプリ開発、UI/UX、プロダクトマネジメント</span>
            </div>
            <div className="flex rounded-brand bg-[rgba(240,248,255,0.7)] p-4 transition-colors duration-300 hover:bg-[rgba(227,242,253,0.9)] motion-reduce:transition-none">
              <span className={profileLabelClassName}>プログラミング歴</span>
              <span className={profileValueClassName}>約2年（2024年4月〜）</span>
            </div>
            <div className="flex rounded-brand bg-[rgba(240,248,255,0.7)] p-4 transition-colors duration-300 hover:bg-[rgba(227,242,253,0.9)] motion-reduce:transition-none">
              <span className={profileLabelClassName}>自己紹介</span>
              <span className={profileValueClassName}>技術系イベント運営を中心に活動を行っています。Webアプリケーション開発にも取り組んでおり、最近はswiftを含むモバイルアプリ開発にも関心を持っています。</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
