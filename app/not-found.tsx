import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-label">[ 404 · OFF SCRIPT ]</p>
      <h1>THAT CONVERSATION<br /><span>ISN&apos;T HERE.</span></h1>
      <p>Head back to the table and choose another episode.</p>
      <Link className="button primary" href="/episodes">Browse episodes ↗</Link>
    </main>
  );
}
