import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>ページが見つかりません</h1>
      <p>URLをご確認ください。</p>
      <Link href="/">トップページに戻る</Link>
    </main>
  );
}
