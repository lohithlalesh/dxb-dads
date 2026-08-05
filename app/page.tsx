import Image from "next/image";
import Link from "next/link";
import {
  formatEpisodeDate,
  getEpisodes,
  HOSTS,
  PODCAST,
  shortEpisodeTitle,
  type Episode,
} from "../lib/podcast";

export const revalidate = 900;

const ticker =
  "FATHERHOOD  •  MANHOOD  •  FRIENDSHIP  •  FAMILY  •  DUBAI  •  REAL TALK  •  ";

function Arrow({ direction = "out" }: { direction?: "out" | "down" }) {
  return <span aria-hidden="true">{direction === "down" ? "↓" : "↗"}</span>;
}

function episodeLabel(episode: Episode) {
  if (episode.type === "trailer") return "Official trailer";
  if (episode.type === "bonus") return "Bonus episode";
  return `Season ${String(episode.seasonNumber ?? 1).padStart(2, "0")} · Episode ${String(episode.episodeNumber ?? 1).padStart(2, "0")}`;
}

function episodeExcerpt(value: string) {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter(
      (line) =>
        line.length > 35 &&
        !/^(welcome|follow|hosted by|if you enjoy|copyright|all original|unauthorized|sharing this|dxbdads™)/i.test(
          line,
        ) &&
        !line.startsWith("#"),
    );
  const excerpt = lines.slice(0, 3).join(" ");
  if (!excerpt) return PODCAST.description;
  return excerpt.length > 280 ? `${excerpt.slice(0, 277).trim()}…` : excerpt;
}

function PlatformLinks() {
  const platforms = [
    { name: "YouTube", note: "Watch full episodes", url: PODCAST.youtube },
    { name: "Spotify", note: "Listen and follow", url: PODCAST.spotify },
    { name: "Apple Podcasts", note: "Listen and follow", url: PODCAST.apple },
  ];

  return (
    <div className="platform-grid" aria-label="Listen to DXB Dads">
      {platforms.map((platform) => (
        <a key={platform.name} href={platform.url} target="_blank" rel="noreferrer">
          <span>{platform.note}</span>
          <strong>{platform.name}</strong>
          <Arrow />
        </a>
      ))}
    </div>
  );
}

export default async function Home() {
  const episodes = await getEpisodes();
  const latest =
    episodes.find((episode) => episode.type === "full") ?? episodes[0];
  const recent = episodes
    .filter((episode) => episode.slug !== latest.slug)
    .slice(0, 3);
  const latestWatchUrl = latest.youtube?.url ?? latest.spotifyUrl;

  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: PODCAST.name,
    description: PODCAST.description,
    url: "https://dxb-dads.laleshlohith.chatgpt.site",
    webFeed: PODCAST.rss,
    image:
      "https://dxb-dads.laleshlohith.chatgpt.site/dxb-dads-logo-clean.png",
    inLanguage: "en",
    genre: ["Parenting", "Kids & Family", "Society & Culture"],
    author: HOSTS.map((host) => ({
      "@type": "Person",
      name: host.nickname ? `${host.name} (${host.nickname})` : host.name,
    })),
    sameAs: [
      PODCAST.youtube,
      PODCAST.spotify,
      PODCAST.apple,
      PODCAST.instagram,
    ],
  };

  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <section className="hero split-hero" id="home" aria-labelledby="hero-title">
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="DXB Dads home">
            <Image
              src="/dxb-dads-logo-clean.png"
              alt="DXB Dads"
              width={1254}
              height={1254}
              sizes="78px"
              priority
            />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#about">The show</a>
            <Link href="/episodes">Episodes</Link>
            <a href="#dads">The dads</a>
          </nav>
          <a
            className="nav-cta"
            href={latestWatchUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>{latest.youtube ? "Watch latest" : "Listen now"}</span>
            <Arrow />
          </a>
        </header>

        <div className="split-hero-grid" id="content">
          <div className="show-poster">
            <Image
              className="show-poster-photo"
              src="/dxb-dads-studio.png"
              alt="Pranav, Mustapha and Pavle recording DXB Dads in their Dubai studio"
              width={1537}
              height={1023}
              sizes="(max-width: 860px) 100vw, 50vw"
              priority
            />
            <div className="show-poster-scrim" aria-hidden="true" />
            <div className="show-poster-frame" aria-hidden="true" />
            <Image
              className="show-poster-logo"
              src="/dxb-dads-logo-clean.png"
              alt="DXB Dads — real dads, real talk, Dubai life"
              width={1254}
              height={1254}
              sizes="(max-width: 860px) 74vw, 38vw"
              priority
            />
            <p className="poster-coordinate" aria-hidden="true">
              25° 12′ N · 55° 16′ E
            </p>
            <div className="poster-stamp" aria-hidden="true">
              <span>Original podcast</span>
              <strong>DXB / 2026</strong>
            </div>
          </div>

          <div className="hero-editorial">
            <div className="hero-editorial-inner">
              <p className="hero-kicker">
                Three dads <span>Three cultures · Dubai life</span>
              </p>
              <h1 id="hero-title">
                <strong>A FATHERHOOD</strong>
                <br />
                PODCAST WITHOUT
                <br />
                <span>THE FILTER.</span>
              </h1>
              <p className="hero-deck">
                Pranav, Mustapha and Pavle compare notes on fatherhood,
                manhood, friendship and family—with sharp opinions, real
                stories and no polished answers.
              </p>
              <div className="hero-actions">
                <Link className="hero-primary" href={`/episodes/${latest.slug}`}>
                  Start with the latest <Arrow />
                </Link>
                <Link className="hero-secondary" href="/episodes">
                  All episodes <Arrow direction="down" />
                </Link>
              </div>

              <div className="hero-listen" aria-label="Listen to DXB Dads on">
                <span>Listen on</span>
                <a href={PODCAST.spotify} target="_blank" rel="noreferrer">
                  Spotify
                </a>
                <a href={PODCAST.apple} target="_blank" rel="noreferrer">
                  Apple Podcasts
                </a>
                <a href={PODCAST.youtube} target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </div>

              <Link className="editorial-now-playing" href={`/episodes/${latest.slug}`}>
                <span className="play-mark" aria-hidden="true">▶</span>
                <span>
                  <small>[ Latest conversation ]</small>
                  <strong>{shortEpisodeTitle(latest.title)}</strong>
                </span>
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        className="ticker"
        aria-label="Fatherhood, manhood, friendship, family, Dubai and real talk"
      >
        <div className="ticker-track" aria-hidden="true">
          <span>{ticker}</span>
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      </div>

      <section className="intro" id="about" aria-labelledby="intro-title">
        <p className="section-label">[ THE SHORT VERSION ]</p>
        <h2 id="intro-title">
          BUILT IN DUBAI.
          <br />
          <em>RAISED ON REAL TALK.</em>
        </h2>
        <div className="intro-copy">
          <p className="intro-lede">
            Three fathers from different cultures comparing notes on family,
            identity and the city they call home.
          </p>
          <p>
            No gurus. No perfect-parent performances. Just sharp opinions,
            spectacular detours and the kind of honesty that usually arrives
            after the microphones switch off.
          </p>
        </div>
      </section>

      <section className="latest" id="latest" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <p className="section-label">[ LATEST CONVERSATION ]</p>
            <h2 id="latest-title">
              PRESS PLAY.
              <br />
              <span>STAY FOR THE TRUTH.</span>
            </h2>
          </div>
          <Link className="text-link" href="/episodes">
            Browse every episode <Arrow />
          </Link>
        </div>

        <article className="featured-episode">
          <a
            className="episode-media"
            href={latestWatchUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${latest.youtube ? "Watch" : "Listen to"} ${latest.title}`}
          >
            <Image
              src={latest.youtube?.thumbnail ?? "/dxb-dads-studio.png"}
              alt=""
              fill
              sizes="(max-width: 960px) 100vw, 58vw"
            />
            <span className="play-button" aria-hidden="true">
              ▶
            </span>
            <span className="media-corner">
              {latest.youtube ? "Watch full episode" : "Listen to episode"}
            </span>
          </a>
          <div className="episode-content">
            <p className="episode-meta">
              {episodeLabel(latest)} · {formatEpisodeDate(latest.publishedAt)}
            </p>
            <h3>{shortEpisodeTitle(latest.title)}</h3>
            <p className="episode-description">
              {episodeExcerpt(latest.description)}
            </p>
            <div className="episode-actions">
              <Link className="button primary dark" href={`/episodes/${latest.slug}`}>
                Episode notes <Arrow />
              </Link>
              <a
                className="button ghost"
                href={latest.spotifyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Listen on Spotify <Arrow />
              </a>
            </div>
          </div>
        </article>

        {recent.length > 0 && (
          <div className="recent-block">
            <div className="recent-heading">
              <p className="section-label">[ MORE FROM THE TABLE ]</p>
              <p>New releases move to the front automatically.</p>
            </div>
            <div className="recent-grid">
              {recent.map((episode) => (
                <article className="recent-card" key={episode.slug}>
                  <Link className="recent-image" href={`/episodes/${episode.slug}`}>
                    <Image
                      src={episode.youtube?.thumbnail ?? "/dxb-dads-studio.png"}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                    <span>{episodeLabel(episode)}</span>
                  </Link>
                  <div>
                    <p>{formatEpisodeDate(episode.publishedAt)}</p>
                    <h3>
                      <Link href={`/episodes/${episode.slug}`}>
                        {shortEpisodeTitle(episode.title)}
                      </Link>
                    </h3>
                    <Link className="card-link" href={`/episodes/${episode.slug}`}>
                      Open episode <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="studio-story" aria-label="Inside the DXB Dads studio">
        <div className="studio-photo-wrap">
          <Image
            className="studio-photo"
            src="/dxb-dads-studio.png"
            alt="Pranav, Mustapha and Pavle recording in the DXB Dads studio"
            fill
            sizes="(max-width: 960px) 100vw, 58vw"
          />
          <div className="photo-badge" aria-hidden="true">
            <span>ON AIR</span>
            <small>DXB / UAE</small>
          </div>
        </div>
        <div className="studio-copy">
          <p className="section-label">[ ON MIC / OFF SCRIPT ]</p>
          <h2>
            REAL DADS.
            <br />
            <span>REAL LIFE.</span>
          </h2>
          <p className="studio-lede">
            The conversations men have when the script runs out.
          </p>
          <p>
            Fatherhood, identity, friendship, relationships, work and the
            beautifully chaotic reality of raising a family in one of the
            world&apos;s fastest-moving cities.
          </p>
          <a className="text-link light" href="#dads">
            Meet the trio <Arrow />
          </a>
        </div>
      </section>

      <section className="hosts" id="dads" aria-labelledby="hosts-title">
        <div className="section-heading hosts-heading">
          <div>
            <p className="section-label">[ THREE CULTURES · ONE TABLE ]</p>
            <h2 id="hosts-title">
              MEET
              <br />
              <span>THE DADS.</span>
            </h2>
          </div>
          <p>
            Different backgrounds. Different opinions. The same commitment to
            showing up for their families.
          </p>
        </div>

        <div className="host-grid">
          {HOSTS.map((host, index) => (
            <article className="host-card" key={host.name}>
              <div className={`host-portrait host-${host.position}`}>
                <Image
                  src="/dxb-dads-studio.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="host-info">
                <p>{host.label}</p>
                <h3>
                  {host.name}
                  {host.nickname && <small>“{host.nickname}”</small>}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="listen" id="listen" aria-labelledby="listen-title">
        <div className="listen-copy">
          <p className="section-label">[ PULL UP A CHAIR ]</p>
          <h2 id="listen-title">
            FOLLOW ONCE.
            <br />
            <span>MISS NOTHING.</span>
          </h2>
          <p>
            Follow DXB Dads on your preferred platform. Every new episode will
            also appear on this site automatically.
          </p>
        </div>
        <PlatformLinks />
        <a
          className="instagram-card"
          href={PODCAST.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <span>Clips &amp; behind the scenes</span>
          <strong>@dxb.dads</strong>
          <Arrow />
        </a>
      </section>

      <footer>
        <a className="footer-brand" href="#home" aria-label="DXB Dads home">
          <Image
            src="/dxb-dads-logo-clean.png"
            alt="DXB Dads"
            width={1254}
            height={1254}
            sizes="94px"
          />
          <span>Three dads. Three cultures. Dubai life.</span>
        </a>
        <div className="footer-links">
          <Link href="/episodes">Episodes</Link>
          <a href={PODCAST.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
          <a href={PODCAST.spotify} target="_blank" rel="noreferrer">
            Spotify
          </a>
          <a href={PODCAST.apple} target="_blank" rel="noreferrer">
            Apple Podcasts
          </a>
          <a href={PODCAST.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={PODCAST.rss} target="_blank" rel="noreferrer">
            RSS
          </a>
          <a href={`mailto:${PODCAST.email}`}>Contact</a>
        </div>
        <div className="footer-bottom">
          <p>© 2026 DXB Dads. All Rights Reserved.</p>
          <p>Made in Dubai / UAE</p>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
      />
    </main>
  );
}
