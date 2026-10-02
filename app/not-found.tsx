import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen content-center justify-items-center gap-4 px-8 py-8 text-center">
      <h1 className="text-3xl font-bold">ページが見つかりません</h1>
      <p className="text-muted">URLをご確認ください。</p>
      <Link className="text-[#246d8d] underline focus-visible:outline-3 focus-visible:outline-[#154e67] focus-visible:outline-offset-[3px]" href="/">トップページに戻る</Link>
    </main>
  );
}
