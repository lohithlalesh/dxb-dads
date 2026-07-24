const episodes = [
  {
    number: "01",
    title: "The Daughter Effect",
    note: "How raising girls changes the way you lead, listen and show up.",
    color: "aqua",
  },
  {
    number: "02",
    title: "Built in the Sand",
    note: "The honest version of building a business in the UAE.",
    color: "yellow",
  },
  {
    number: "03",
    title: "The School-Run CEO",
    note: "Big meetings, tiny backpacks and the myth of perfect balance.",
    color: "orange",
  },
];

const hosts = [
  {
    number: "01",
    role: "The Builder",
    line: "Big ideas, honest lessons and a permanent soft spot for his girls.",
    focus: "left",
  },
  {
    number: "02",
    role: "The Balancer",
    line: "Family first. Ambition intact. Still figuring out the calendar.",
    focus: "center",
  },
  {
    number: "03",
    role: "The Connector",
    line: "People, perspective and the stories that make Dubai feel like home.",
    focus: "right",
  },
];

const ticker =
  "FATHERHOOD  •  FAMILY  •  BUSINESS  •  DUBAI  •  REAL TALK  •  ";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="DXB Dads home">
            <img
              src="/dxb-dads-logo.png"
              alt="DXB Dads"
              className="wordmark-image"
            />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#episodes">Episodes</a>
            <a href="#about">Our story</a>
            <a href="#dads">The dads</a>
          </nav>
          <a className="nav-cta" href="#listen">
            <span>Season 01</span>
            <ArrowIcon />
          </a>
        </header>

        <div className="hero-content" id="content">
          <p className="hero-kicker">A Dubai podcast about</p>
          <h1 id="hero-title">
            <span className="title-line">THREE DADS.</span>
            <span className="title-line title-serif">ONLY DAUGHTERS.</span>
            <span className="title-sticker">ZERO FILTER.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Life, business and raising girls in the city
              <br />
              where everything moves fast.
            </p>
            <a className="round-link" href="#episodes" aria-label="Explore episodes">
              <span>Explore</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-side-note" aria-hidden="true">
          25.2048° N&nbsp;&nbsp;55.2708° E
        </div>
      </section>

      <div className="ticker" aria-label="Fatherhood, family, business, Dubai, real talk">
        <div className="ticker-track" aria-hidden="true">
          <span>{ticker}</span>
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      </div>

      <section className="intro" id="about" aria-labelledby="intro-title">
        <div className="intro-logo" aria-hidden="true">
          <img src="/dxb-dads-logo.png" alt="" />
        </div>
        <p className="section-label">[ THE SHORT VERSION ]</p>
        <h2 id="intro-title">
          Built in Dubai.
          <br />
          <em>Raised by daughters.</em>
        </h2>
        <div className="intro-copy">
          <p className="intro-lede">
            Three friends. Three different playbooks. One thing in common:
            daughters who rewired the way they see the world.
          </p>
          <p>
            DXB Dads is the table where fatherhood meets ambition—without the
            polished answers. Expect sharp opinions, spectacular detours and
            the kind of honesty that usually arrives after the microphones
            switch off.
          </p>
        </div>
      </section>

      <section className="studio-story" aria-label="Inside the DXB Dads studio">
        <div className="studio-photo-wrap">
          <img
            className="studio-photo"
            src="/dxb-dads-studio.png"
            alt="Three hosts recording the DXB Dads podcast in a warm brick-walled studio"
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
            <span>REAL TALK.</span>
          </h2>
          <p>
            No gurus. No parenting manuals. Just three dads comparing notes on
            family, work, identity and the beautifully chaotic business of
            raising daughters in the UAE.
          </p>
          <a className="text-link" href="#dads">
            Meet the trio <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="episodes" id="episodes" aria-labelledby="episodes-title">
        <div className="episodes-heading">
          <div>
            <p className="section-label">[ SEASON 01 / COMING SOON ]</p>
            <h2 id="episodes-title">
              FIRST
              <br />
              CONVERSATIONS
            </h2>
          </div>
          <p>
            A preview of the conversations we are bringing to the table.
            Follow the launch and be there from episode one.
          </p>
        </div>

        <div className="episode-list">
          {episodes.map((episode) => (
            <article className={`episode-card ${episode.color}`} key={episode.number}>
              <div className="episode-number">{episode.number}</div>
              <div className="episode-info">
                <span>Season 01 preview</span>
                <h3>{episode.title}</h3>
                <p>{episode.note}</p>
              </div>
              <div className="episode-arrow" aria-hidden="true">
                ↗
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cover-break" aria-label="DXB Dads podcast artwork">
        <div className="cover-copy">
          <p className="section-label">[ THIS IS THE CREW ]</p>
          <p className="scribble">Real dads. Real talk. Dubai life.</p>
          <h2>
            THE CITY
            <br />
            IS OUR
            <br />
            <span>FOURTH HOST.</span>
          </h2>
        </div>
        <div className="cover-art-wrap">
          <div className="cover-halo" aria-hidden="true" />
          <img
            className="cover-art"
            src="/dxb-dads-cover.png"
            alt="Illustrated DXB Dads podcast artwork with fathers, daughters and the Dubai skyline"
          />
          <span className="cover-note">Made in the UAE ↗</span>
        </div>
      </section>

      <section className="hosts" id="dads" aria-labelledby="hosts-title">
        <div className="hosts-heading">
          <p className="section-label">[ THREE POINTS OF VIEW ]</p>
          <h2 id="hosts-title">
            MEET
            <br />
            THE DADS
          </h2>
          <p>
            Different backgrounds. Different takes. The same fierce devotion
            to family.
          </p>
        </div>

        <div className="host-grid">
          {hosts.map((host) => (
            <article className="host-card" key={host.number}>
              <div className={`host-photo host-photo-${host.focus}`}>
                <img src="/dxb-dads-studio.png" alt="" aria-hidden="true" />
                <span className="host-index">{host.number}</span>
              </div>
              <div className="host-copy">
                <h3>{host.role}</h3>
                <p>{host.line}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="listen" id="listen" aria-labelledby="listen-title">
        <div className="listen-poster">
          <img
            src="/dxb-dads-coming-soon.png"
            alt="Coming soon — DXB Dads podcast"
          />
        </div>
        <div className="listen-content">
          <p className="section-label">[ PULL UP A CHAIR ]</p>
          <h2 id="listen-title">
            SOMETHING
            <br />
            <span>REAL</span> IS COMING.
          </h2>
          <p className="listen-copy">
            Season one is on the way. Find DXB Dads soon on your favourite
            podcast platform.
          </p>
          <div className="platforms" aria-label="Coming soon on podcast platforms">
            <span>Spotify</span>
            <span>Apple Podcasts</span>
            <span>YouTube</span>
          </div>
          <a className="listen-cta" href="#home">
            Back to the top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>

      <footer>
        <a className="footer-logo" href="#home" aria-label="DXB Dads home">
          <img src="/dxb-dads-logo.png" alt="DXB Dads" />
        </a>
        <p>Real dads. Real talk. Dubai life.</p>
        <p>© 2026 DXB Dads</p>
      </footer>
    </main>
  );
}
