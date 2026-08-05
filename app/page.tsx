import Image from "next/image";
import Link from "next/link";
import {
  formatEpisodeDate,
  getEpisodes,
  HOSTS,
  PODCAST,
  shortEpisodeTitle,
} from "../lib/podcast";

export const revalidate = 900;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function PlatformLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "platform-links compact" : "platform-links"}>
      <a href={PODCAST.youtube} target="_blank" rel="noreferrer">
        <span className="platform-dot youtube-dot" aria-hidden="true" />
        YouTube <Arrow />
      </a>
      <a href={PODCAST.spotify} target="_blank" rel="noreferrer">
        <span className="platform-dot spotify-dot" aria-hidden="true" />
        Spotify <Arrow />
      </a>
      <a href={PODCAST.apple} target="_blank" rel="noreferrer">
        <span className="platform-dot apple-dot" aria-hidden="true" />
        Apple Podcasts <Arrow />
      </a>
    </div>
  );
}

export default async function Home() {
  const episodes = await getEpisodes();
  const fullEpisodes = episodes.filter((episode) => episode.type === "full");
  const latest = fullEpisodes[0] ?? episodes[0];
  const latestUrl = latest.youtube?.url ?? latest.spotifyUrl;
  const hasEpisodeTwo = fullEpisodes.some(
    (episode) => (episode.episodeNumber ?? 0) >= 2,
  );

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

      <header className="site-header" id="home">
        <a className="wordmark" href="#home" aria-label="DXB Dads home">
          <Image src="/dxb-dads-logo-clean.png" alt="DXB Dads" width={1254} height={1254} sizes="78px" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#episodes">Episodes</a>
          <a href="#dads">The dads</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-listen" href={latestUrl} target="_blank" rel="noreferrer">
          Listen now <Arrow />
        </a>
      </header>

      <section className="hero" id="content" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span>DXB Dads Podcast</span>
              <span>Dubai · UAE</span>
            </p>
            <h1 id="hero-title">
              REAL DADS.
              <br />
              <span>REAL LIFE.</span>
              <br />
              REAL TALK.
            </h1>
            <p className="hero-summary">
              Three dads. Three cultures. One honest table. Fatherhood,
              manhood, friendship and family life in Dubai—without the polished
              answers.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={latestUrl} target="_blank" rel="noreferrer">
                {latest.youtube ? "Watch the latest episode" : "Play the latest episode"}
                <Arrow />
              </a>
              <a className="button secondary" href="#episodes">
                Explore episodes <span aria-hidden="true">↓</span>
              </a>
            </div>
            <PlatformLinks compact />
          </div>

          <div className="hero-visual" aria-label="Pranav, Mustapha and Pavle recording DXB Dads">
            <div className="hero-orbit" aria-hidden="true" />
            <div className="hero-stamp" aria-hidden="true">
              <strong>03</strong>
              <span>Dads</span>
              <span>One city</span>
            </div>
            <Image
              src="/dxb-dads-cutout.png"
              alt="Pranav, Mustapha and Pavle recording the DXB Dads podcast"
              width={1537}
              height={1023}
              sizes="(max-width: 860px) 98vw, 58vw"
              priority
            />
            <div className="now-playing">
              <span className="playing-icon" aria-hidden="true">▶</span>
              <span>
                <small>Now playing</small>
                <strong>{shortEpisodeTitle(latest.title)}</strong>
              </span>
            </div>
          </div>
        </div>
        <p className="hero-coordinate" aria-hidden="true">
          25.2048° N / 55.2708° E
        </p>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>FATHERHOOD · MANHOOD · FRIENDSHIP · FAMILY · DUBAI · REAL TALK · </span>
          <span>FATHERHOOD · MANHOOD · FRIENDSHIP · FAMILY · DUBAI · REAL TALK · </span>
        </div>
      </div>

      <section className="latest" id="episodes" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <p className="section-label">[ LATEST CONVERSATION ]</p>
            <h2 id="latest-title">PRESS PLAY.<br /><span>STAY FOR THE TRUTH.</span></h2>
          </div>
          <Link className="text-link" href="/episodes">
            View every episode <Arrow />
          </Link>
        </div>

        <article className="featured-episode">
          <a
            className="episode-media"
            href={latest.youtube?.url ?? `/episodes/${latest.slug}`}
            target={latest.youtube ? "_blank" : undefined}
            rel={latest.youtube ? "noreferrer" : undefined}
            aria-label={`Watch ${latest.title}`}
          >
            <Image
              src={latest.youtube?.thumbnail ?? "/dxb-dads-studio.png"}
              alt=""
              fill
              sizes="(max-width: 1120px) 100vw, 62vw"
            />
            <span className="play-button" aria-hidden="true">▶</span>
            <span className="media-corner">Full episode</span>
          </a>
          <div className="episode-content">
            <p className="episode-meta">
              Season {String(latest.seasonNumber ?? 1).padStart(2, "0")} · Episode {String(latest.episodeNumber ?? 1).padStart(2, "0")} · {formatEpisodeDate(latest.publishedAt)}
            </p>
            <h3>{latest.title}</h3>
            <p className="episode-description">
              Dubai summer. Kids at home. Temperatures through the roof. The dads
              compare notes on routines, activities, screen time, travel and
              maintaining some version of sanity.
            </p>
            <div className="topic-chips" aria-label="Episode topics">
              <span>Dubai summer</span>
              <span>Screen time</span>
              <span>Family routines</span>
              <span>Dad survival</span>
            </div>
            <div className="episode-actions">
              <a className="button primary dark" href={`/episodes/${latest.slug}`}>
                Episode notes <Arrow />
              </a>
              <a className="button ghost" href={latest.spotifyUrl} target="_blank" rel="noreferrer">
                Listen on Spotify <Arrow />
              </a>
            </div>
          </div>
        </article>

        {!hasEpisodeTwo && (
          <article className="up-next">
            <div>
              <p className="section-label">[ EPISODE 02 · COMING NEXT ]</p>
              <h3>FAMILY HOLIDAYS AREN&apos;T HOLIDAYS.</h3>
            </div>
            <p>
              Travelling with kids: upgrade dreams, endless snacks and the chaos
              that begins before you even reach the destination.
            </p>
            <span className="up-next-mark" aria-hidden="true">02</span>
          </article>
        )}
      </section>

      <section className="studio-section" id="about" aria-labelledby="about-title">
        <div className="studio-image">
          <Image
            src="/dxb-dads-studio.png"
            alt="The DXB Dads recording in their brick-walled Dubai studio"
            fill
            sizes="(max-width: 1120px) 100vw, 55vw"
          />
          <span className="on-air"><i aria-hidden="true" /> On air / Dubai</span>
        </div>
        <div className="studio-copy">
          <p className="section-label">[ WHY DXB DADS ]</p>
          <h2 id="about-title">THE CONVERSATIONS MEN HAVE<br /><span>WHEN THE SCRIPT RUNS OUT.</span></h2>
          <p className="studio-lede">
            DXB Dads is where three fathers from different cultures compare
            notes on raising families in one of the world&apos;s fastest-moving cities.
          </p>
          <p>
            No gurus. No perfect-parent performances. Just honest stories about
            fatherhood, identity, friendship, relationships, work and the
            beautifully chaotic reality of family life in Dubai.
          </p>
          <div className="pillars" aria-label="DXB Dads themes">
            <span>Fatherhood</span><span>Manhood</span><span>Friendship</span><span>Real talk</span>
          </div>
        </div>
      </section>

      <section className="hosts" id="dads" aria-labelledby="hosts-title">
        <div className="section-heading hosts-heading">
          <div>
            <p className="section-label">[ THREE CULTURES · ONE TABLE ]</p>
            <h2 id="hosts-title">MEET<br /><span>THE DADS.</span></h2>
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
                <Image src="/dxb-dads-studio.png" alt="" aria-hidden="true" fill sizes="(max-width: 860px) 100vw, 33vw" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="host-info">
                <p>{host.label}</p>
                <h3>{host.name}{host.nickname && <small>“{host.nickname}”</small>}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="follow" aria-labelledby="follow-title">
        <div>
          <p className="section-label">[ NEVER MISS A CONVERSATION ]</p>
          <h2 id="follow-title">FOLLOW ONCE.<br /><span>GET EVERY EPISODE.</span></h2>
          <p>
            New releases, clips and the conversations that continue after the
            microphones switch off.
          </p>
        </div>
        <PlatformLinks />
        <a className="instagram-card" href={PODCAST.instagram} target="_blank" rel="noreferrer">
          <span>Daily clips &amp; behind the scenes</span>
          <strong>@dxb.dads</strong>
          <Arrow />
        </a>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div>
          <p className="section-label">[ QUICK ANSWERS ]</p>
          <h2 id="faq-title">NEW HERE?</h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>What is DXB Dads?</summary>
            <p>
              A Dubai podcast hosted by Pranav, Mustapha and Pavle about
              fatherhood, manhood, friendship, family and real life in the UAE.
            </p>
          </details>
          <details>
            <summary>Where can I watch or listen?</summary>
            <p>
              Watch full video episodes on YouTube, or listen on Spotify and
              Apple Podcasts. Every released episode is collected on this site.
            </p>
          </details>
          <details>
            <summary>How do I suggest a topic or guest?</summary>
            <p>
              Send a message on Instagram at @dxb.dads or email us at
              dxb.dads@gmail.com.
            </p>
          </details>
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#home" aria-label="DXB Dads home">
          <Image src="/dxb-dads-logo-clean.png" alt="DXB Dads" width={1254} height={1254} sizes="94px" />
          <span>Real dads. Real life. Real talk.</span>
        </a>
        <div className="footer-links">
          <Link href="/episodes">Episodes</Link>
          <a href={PODCAST.youtube} target="_blank" rel="noreferrer">YouTube</a>
          <a href={PODCAST.spotify} target="_blank" rel="noreferrer">Spotify</a>
          <a href={PODCAST.apple} target="_blank" rel="noreferrer">Apple Podcasts</a>
          <a href={PODCAST.rss} target="_blank" rel="noreferrer">RSS</a>
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
