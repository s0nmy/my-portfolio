export function Activity() {
 return (
<section id="activity" className="section activity-section">
        <div className="container">
            <h2 className="section-title">
                <span className="title-en">ACTIVITY</span>
                <span className="title-ja">活動実績</span>
            </h2>
            <div className="activity-content">
                <div className="activity-card">
                    <div className="activity-date">2024.04 - 2028.03</div>
                    <h3 className="activity-title">神戸電子専門学校</h3>
                    <p className="activity-description">
                        神戸電子専門学校 ITエキスパート科にてweb開発やネットワークなど幅広く学習。基本情報技術者試験、C言語プログラミング能力認定試験2級を取得しました。
                    </p>
                </div>
                <div className="activity-card">
                    <div className="activity-date">2026.02 - 現在</div>
                    <h3 className="activity-title">株式会社オプティム インターンシップ</h3>
                    <p className="activity-description">
                        医療系プロダクトのバックエンド開発を担当。Go、PostgreSQL、Clean Architectureを使用した実務経験を積んでいます。
                    </p>
                </div>
                <div className="activity-card">
                    <div className="activity-date">2026.03</div>
                    <h3 className="activity-title">GDG on Campus Hackathon 2026</h3>
                    <p className="activity-description">
                        4人チームでPdM・バックエンド・iOSフロントエンドを担当し、近距離音楽交換SNS「すれック」を開発。ゴネンゴ賞（スポンサー賞）を受賞しました。
                    </p>
                </div>
                <div className="activity-card">
                    <div className="activity-date">2025.03 - 2026.02</div>
                    <h3 className="activity-title">Alpha+ Project</h3>
                    <p className="activity-description">
                        経済産業省地方未踏(AKATSUKI)プロジェクの1つ。PgMコースとして進行管理・情報整理・運営改善などのプロジェクトマネジメントを学びました。
                    </p>
                </div>
                <div className="activity-card">
                    <div className="activity-date">2025.07 - 現在</div>
                    <h3 className="activity-title">Google Developer Groups Greater Kwansai Organizer</h3>
                    <p className="activity-description">
                        技術系イベントの運営に携わっています。DevFest Tokyo 2025 ではPRチームとして登録者数1000人を達成しました。
                    </p>
                </div>
                <div className="activity-card">
                    <div className="activity-date">LINKS</div>
                    <h3 className="activity-title">SNS・コード</h3>
                    <p className="activity-description">
                        日々の学習記録や開発したプロジェクトは各プラットフォームで公開しています。
                    </p>
                    <div className="sns-links">
                        <a href="https://github.com/s0nmy/" target="_blank" rel="noopener noreferrer" className="sns-link sns-github">
                            <svg className="sns-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                        </a>
                        <a href="https://note.com/snmy_" target="_blank" rel="noopener noreferrer" className="sns-link sns-website">
                            <svg className="sns-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            <span>note</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
 );
}
