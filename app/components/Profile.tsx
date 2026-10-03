export function Profile() {
 return (
<section id="profile" className="section profile-section">
        <div className="container">
            <h2 className="section-title">
                <span className="title-en">PROFILE</span>
                <span className="title-ja">プロフィール</span>
            </h2>
            <div className="profile-content">
                <div className="profile-info">
                    <div className="profile-item">
                        <span className="profile-label">名前</span>
                        <span className="profile-value">曽根 望夢（そね みゆ）</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">所属</span>
                        <span className="profile-value">神戸電子専門学校 ITエキスパート科 3年</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">興味分野</span>
                        <span className="profile-value">Webアプリケーション開発、バックエンド開発、モバイルアプリ開発、UI/UX、プロダクトマネジメント</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">プログラミング歴</span>
                        <span className="profile-value">約2年（2024年4月〜）</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">自己紹介</span>
                        <span className="profile-value">技術系イベント運営を中心に活動を行っています。Webアプリケーション開発にも取り組んでおり、最近はswiftを含むモバイルアプリ開発にも関心を持っています。</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
 );
}
