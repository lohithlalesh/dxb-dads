import type { Metadata } from "next";
import Link from "next/link";
import {
  formatEpisodeDate,
  getEpisodes,
  PODCAST,
  shortEpisodeTitle,
} from "../../lib/podcast";
import { assetPath } from "../../lib/site";
import Image from "../../components/DirectImage";

export const revalidate = 900;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Watch and listen to every DXB Dads episode—honest conversations about fatherhood, family, friendship and life in Dubai.",
};

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <main className="inner-page">
      <header className="site-header inner-header">
        <Link className="wordmark" href="/" aria-label="DXB Dads home">
          <Image src={assetPath("/dxb-dads-logo-clean.png")} alt="DXB Dads" width={1254} height={1254} sizes="78px" />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/#dads">The dads</Link>
          <Link href="/episodes" aria-current="page">Episodes</Link>
        </nav>
        <a className="header-listen" href={PODCAST.youtube} target="_blank" rel="noreferrer">
          YouTube <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="archive-hero">
        <p className="section-label">[ SEASON 01 · DUBAI / UAE ]</p>
        <h1>EVERY<br /><span>CONVERSATION.</span></h1>
        <p>
          Full episodes, honest detours and the moments every parent recognizes.
          New releases appear here automatically.
        </p>
      </section>

      <section className="archive-grid" aria-label="DXB Dads episodes">
        {episodes.map((episode) => (
          <article className="archive-card" key={episode.slug}>
            <Link className="archive-media" href={`/episodes/${episode.slug}`}>
              <Image
                src={episode.youtube?.thumbnail ?? assetPath("/podcast-conversation.jpg")}
                alt=""
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
              <span aria-hidden="true">{episode.type === "trailer" ? "Trailer" : `EP ${String(episode.episodeNumber ?? 0).padStart(2, "0")}`}</span>
            </Link>
            <div className="archive-copy">
              <p className="episode-meta">
                {formatEpisodeDate(episode.publishedAt)} · {episode.type}
              </p>
              <h2><Link href={`/episodes/${episode.slug}`}>{shortEpisodeTitle(episode.title)}</Link></h2>
              <p>{episode.description.split("\n").filter(Boolean).slice(0, 2).join(" ").slice(0, 250)}</p>
              <div className="archive-actions">
                <Link href={`/episodes/${episode.slug}`}>Episode notes <span aria-hidden="true">↗</span></Link>
                {episode.youtube && (
                  <a href={episode.youtube.url} target="_blank" rel="noreferrer">Watch <span aria-hidden="true">↗</span></a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="archive-cta">
        <p className="section-label">[ FOLLOW THE SHOW ]</p>
        <h2>ONE FOLLOW.<br /><span>NO MISSED EPISODES.</span></h2>
        <div className="hero-actions">
          <a className="button primary" href={PODCAST.youtube} target="_blank" rel="noreferrer">Subscribe on YouTube ↗</a>
          <a className="button secondary" href={PODCAST.spotify} target="_blank" rel="noreferrer">Follow on Spotify ↗</a>
        </div>
      </section>

      <footer className="simple-footer">
        <p>© 2026 DXB Dads. All Rights Reserved.</p>
        <Link href="/">Back home ↑</Link>
      </footer>
    </main>
  );
}
