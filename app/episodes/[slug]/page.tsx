import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatEpisodeDate,
  getEpisodes,
  HOSTS,
  PODCAST,
  shortEpisodeTitle,
} from "../../../lib/podcast";

export const revalidate = 900;

type EpisodePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episodes = await getEpisodes();
  const episode = episodes.find((candidate) => candidate.slug === slug);
  if (!episode) return { title: "Episode not found" };
  const description = episode.description.replace(/\s+/g, " ").slice(0, 155);
  return {
    title: shortEpisodeTitle(episode.title),
    description,
    alternates: { canonical: `/episodes/${episode.slug}` },
    openGraph: {
      type: "article",
      title: episode.title,
      description,
      publishedTime: episode.publishedAt,
      images: episode.youtube?.thumbnail ? [episode.youtube.thumbnail] : ["/og.png"],
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episodes = await getEpisodes();
  const episode = episodes.find((candidate) => candidate.slug === slug);
  if (!episode) notFound();

  const paragraphs = episode.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#") && !line.startsWith("©"));

  const schema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: paragraphs.slice(0, 4).join(" "),
    datePublished: episode.publishedAt,
    episodeNumber: episode.episodeNumber ?? undefined,
    partOfSeason: episode.seasonNumber
      ? { "@type": "PodcastSeason", seasonNumber: episode.seasonNumber }
      : undefined,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: PODCAST.name,
      url: "https://dxb-dads.laleshlohith.chatgpt.site",
    },
    associatedMedia: episode.audioUrl
      ? { "@type": "AudioObject", contentUrl: episode.audioUrl }
      : undefined,
    video: episode.youtube
      ? {
          "@type": "VideoObject",
          name: episode.youtube.title,
          thumbnailUrl: episode.youtube.thumbnail,
          uploadDate: episode.publishedAt,
          embedUrl: `https://www.youtube.com/embed/${episode.youtube.id}`,
          contentUrl: episode.youtube.url,
        }
      : undefined,
    author: HOSTS.map((host) => ({ "@type": "Person", name: host.name })),
  };

  return (
    <main className="inner-page episode-page">
      <header className="site-header inner-header">
        <Link className="wordmark" href="/" aria-label="DXB Dads home">
          <Image src="/dxb-dads-logo-clean.png" alt="DXB Dads" width={1254} height={1254} sizes="78px" />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/episodes">All episodes</Link>
          <Link href="/#dads">The dads</Link>
        </nav>
        <a className="header-listen" href={PODCAST.spotify} target="_blank" rel="noreferrer">Spotify ↗</a>
      </header>

      <article>
        <header className="episode-hero">
          <p className="section-label">
            [ SEASON {String(episode.seasonNumber ?? 1).padStart(2, "0")} · {episode.type === "full" ? `EPISODE ${String(episode.episodeNumber ?? 1).padStart(2, "0")}` : episode.type.toUpperCase()} ]
          </p>
          <h1>{episode.title}</h1>
          <div className="episode-hero-meta">
            <span>{formatEpisodeDate(episode.publishedAt)}</span>
            {episode.duration && <span>{episode.duration}</span>}
            <span>DXB Dads</span>
          </div>
        </header>

        <div className="episode-player">
          {episode.youtube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${episode.youtube.id}`}
              title={episode.youtube.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="audio-poster">
              <Image src="/dxb-dads-studio.png" alt="The DXB Dads studio" fill sizes="100vw" />
            </div>
          )}
        </div>

        <div className="episode-body">
          <aside className="listen-panel">
            <p className="section-label">[ WATCH / LISTEN ]</p>
            {episode.youtube && <a href={episode.youtube.url} target="_blank" rel="noreferrer">YouTube <span>↗</span></a>}
            <a href={episode.spotifyUrl} target="_blank" rel="noreferrer">Spotify <span>↗</span></a>
            <a href={PODCAST.apple} target="_blank" rel="noreferrer">Apple Podcasts <span>↗</span></a>
            {episode.audioUrl && <a href={episode.audioUrl} target="_blank" rel="noreferrer">Play audio <span>↗</span></a>}
          </aside>
          <div className="show-notes">
            <p className="section-label">[ ABOUT THIS EPISODE ]</p>
            {paragraphs.slice(0, 12).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {episode.episodeNumber === 1 && (
              <>
                <h2>In this conversation</h2>
                <ul>
                  <li>Surviving Dubai summer with children at home</li>
                  <li>Creating structure when school and nursery are closed</li>
                  <li>The honest truth about screen time</li>
                  <li>Indoor activities, boredom and family routines</li>
                  <li>Balancing work, parenting and everyone&apos;s sanity</li>
                </ul>
              </>
            )}
            <div className="share-row">
              <span>Share this episode</span>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${episode.title} https://dxb-dads.laleshlohith.chatgpt.site/episodes/${episode.slug}`)}`} target="_blank" rel="noreferrer">WhatsApp ↗</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://dxb-dads.laleshlohith.chatgpt.site/episodes/${episode.slug}`)}`} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </article>

      <section className="episode-next">
        <p className="section-label">[ KEEP LISTENING ]</p>
        <h2>MORE REAL TALK<br /><span>FROM DUBAI.</span></h2>
        <Link className="button primary" href="/episodes">Browse all episodes ↗</Link>
      </section>

      <footer className="simple-footer">
        <p>© 2026 DXB Dads. All Rights Reserved.</p>
        <Link href="/">Back home ↑</Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
