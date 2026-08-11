import Image from "next/image";
import Link from "next/link";
import {
  FaApple,
  FaEnvelope,
  FaInstagram,
  FaRss,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";
import {
  getEpisodes,
  HOSTS,
  PODCAST,
  shortEpisodeTitle,
} from "../lib/podcast";
import { assetPath, siteUrl } from "../lib/site";
import LatestConversation from "./LatestConversation";

export const revalidate = 900;
export const dynamic = "force-static";

const ticker =
  "FATHERHOOD  •  MANHOOD  •  FRIENDSHIP  •  FAMILY  •  DUBAI  •  REAL TALK  •  ";

const HOST_IMAGES = {
  left: assetPath("/podcast-pranav.jpg"),
  center: assetPath("/podcast-mustapha.jpg"),
  right: assetPath("/podcast-pavle.jpg"),
} as const;

function Arrow({ direction = "out" }: { direction?: "out" | "down" }) {
  return <span aria-hidden="true">{direction === "down" ? "↓" : "↗"}</span>;
}

function PlatformLinks() {
  const platforms = [
    { name: "YouTube", note: "Watch full episodes", url: PODCAST.youtube, icon: FaYoutube },
    { name: "Spotify", note: "Listen and follow", url: PODCAST.spotify, icon: FaSpotify },
    { name: "Apple Podcasts", note: "Listen and follow", url: PODCAST.apple, icon: FaApple },
  ];

  return (
    <div className="platform-grid" aria-label="Listen to DXB Dads">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <a key={platform.name} href={platform.url} target="_blank" rel="noreferrer">
            <Icon className="platform-icon" aria-hidden="true" />
            <span className="platform-note">{platform.note}</span>
            <strong>{platform.name}</strong>
            <Arrow />
          </a>
        );
      })}
    </div>
  );
}

export default async function Home() {
  const episodes = await getEpisodes();
  const latest =
    episodes.find((episode) => episode.type === "full") ?? episodes[0];
  const latestWatchUrl = latest.youtube?.url ?? latest.spotifyUrl;

  const seriesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": siteUrl("/#organization"),
        name: "DXB Dads",
        url: siteUrl("/"),
        logo: siteUrl("/dxb-dads-logo-clean.png"),
        email: PODCAST.email,
        sameAs: [
          PODCAST.youtube,
          PODCAST.spotify,
          PODCAST.apple,
          PODCAST.instagram,
        ],
      },
      {
        "@type": "WebSite",
        "@id": siteUrl("/#website"),
        name: "DXB Dads Podcast",
        url: siteUrl("/"),
        inLanguage: "en-AE",
        publisher: { "@id": siteUrl("/#organization") },
      },
      {
        "@type": "PodcastSeries",
        "@id": siteUrl("/#podcast"),
        name: PODCAST.name,
        description: PODCAST.description,
        url: siteUrl("/"),
        webFeed: PODCAST.rss,
        image: siteUrl("/dxb-dads-logo-clean.png"),
        inLanguage: "en-AE",
        genre: ["Parenting", "Kids & Family", "Society & Culture"],
        publisher: { "@id": siteUrl("/#organization") },
        author: HOSTS.map((host) => ({
          "@type": "Person",
          name:
            "nickname" in host && host.nickname
              ? `${host.name} (${host.nickname})`
              : host.name,
        })),
        sameAs: [
          PODCAST.youtube,
          PODCAST.spotify,
          PODCAST.apple,
          PODCAST.instagram,
        ],
      },
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
              src={assetPath("/dxb-dads-logo-clean.png")}
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
          <div className="show-poster hero-art" aria-label="Pranav, Mustapha and Pavle on DXB Dads">
            <div className="pulp-halftone" aria-hidden="true" />
            <div className="pulp-stripe" aria-hidden="true">
              <span>NO SCRIPT · NO FILTER · DUBAI ·</span>
            </div>
            <div className="pulp-burst burst-one" aria-hidden="true">REAL</div>
            <div className="pulp-burst burst-two" aria-hidden="true">03</div>

            <figure className="host-cutout cutout-pranav">
              <div className="host-cutout-photo">
                <Image
                  src={assetPath("/host-cutout-pranav.png")}
                  alt="Pranav speaking on the DXB Dads podcast"
                  fill
                  sizes="(max-width: 820px) 54vw, 31vw"
                  priority
                />
              </div>
              <figcaption><span>01</span> Pranav</figcaption>
            </figure>

            <figure className="host-cutout cutout-mustapha">
              <div className="host-cutout-photo">
                <Image
                  src={assetPath("/host-cutout-mustapha.png")}
                  alt="Mustapha speaking on the DXB Dads podcast"
                  fill
                  sizes="(max-width: 820px) 58vw, 34vw"
                  priority
                />
              </div>
              <figcaption><span>02</span> Mustapha</figcaption>
            </figure>

            <figure className="host-cutout cutout-pavle">
              <div className="host-cutout-photo">
                <Image
                  src={assetPath("/host-cutout-pavle.png")}
                  alt="Pavle Rastovic speaking on the DXB Dads podcast"
                  fill
                  sizes="(max-width: 820px) 54vw, 31vw"
                  priority
                />
              </div>
              <figcaption><span>03</span> Pavle</figcaption>
            </figure>

            <div className="hero-art-copy" aria-hidden="true">
              <span>DXB / UAE · ISSUE 01</span>
              <strong>REAL DADS.<br />REAL TALK.</strong>
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
                  <FaSpotify aria-hidden="true" />
                  Spotify
                </a>
                <a href={PODCAST.apple} target="_blank" rel="noreferrer">
                  <FaApple aria-hidden="true" />
                  Apple Podcasts
                </a>
                <a href={PODCAST.youtube} target="_blank" rel="noreferrer">
                  <FaYoutube aria-hidden="true" />
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

      <LatestConversation initialEpisodes={episodes} />

      <section className="studio-story" aria-label="Inside the DXB Dads studio">
        <div className="studio-photo-wrap">
          <Image
            className="studio-photo"
            src={assetPath("/podcast-wide-01.jpg")}
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
                  src={HOST_IMAGES[host.position]}
                  alt={`${host.name} speaking on DXB Dads`}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="host-info">
                <p>{host.label}</p>
                <h3>
                  {host.name}
                  {"nickname" in host && host.nickname && (
                    <small>“{host.nickname}”</small>
                  )}
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
          <FaInstagram className="instagram-icon" aria-hidden="true" />
          <span>Clips &amp; behind the scenes</span>
          <strong>@dxb.dads</strong>
          <Arrow />
        </a>
      </section>

      <footer>
        <a className="footer-brand" href="#home" aria-label="DXB Dads home">
          <Image
            src={assetPath("/dxb-dads-logo-clean.png")}
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
            <FaYoutube aria-hidden="true" />
            YouTube
          </a>
          <a href={PODCAST.spotify} target="_blank" rel="noreferrer">
            <FaSpotify aria-hidden="true" />
            Spotify
          </a>
          <a href={PODCAST.apple} target="_blank" rel="noreferrer">
            <FaApple aria-hidden="true" />
            Apple Podcasts
          </a>
          <a href={PODCAST.instagram} target="_blank" rel="noreferrer">
            <FaInstagram aria-hidden="true" />
            Instagram
          </a>
          <a href={PODCAST.rss} target="_blank" rel="noreferrer">
            <FaRss aria-hidden="true" />
            RSS
          </a>
          <a href={`mailto:${PODCAST.email}`}>
            <FaEnvelope aria-hidden="true" />
            Contact
          </a>
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
