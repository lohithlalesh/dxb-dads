"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  formatEpisodeDate,
  PODCAST,
  shortEpisodeTitle,
  slugify,
  type Episode,
} from "../lib/podcast";
import { assetPath } from "../lib/site";
import Image from "../components/DirectImage";

const RSS_REFRESH_MS = 15 * 60 * 1000;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function episodeLabel(episode: Episode) {
  if (episode.type === "trailer") return "Trailer";
  if (episode.type === "bonus") return "Bonus";
  return `Episode ${String(episode.episodeNumber ?? 1).padStart(2, "0")}`;
}

function episodeExcerpt(value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > 290 ? `${clean.slice(0, 287).trimEnd()}…` : clean;
}

function textFrom(item: Element, tagName: string) {
  return item.getElementsByTagName(tagName)[0]?.textContent?.trim() ?? "";
}

function plainText(value: string) {
  const document = new DOMParser().parseFromString(value, "text/html");
  return (document.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

function parseRss(xml: string, initialEpisodes: Episode[]) {
  const document = new DOMParser().parseFromString(xml, "application/xml");
  if (document.querySelector("parsererror")) return [];

  return [...document.querySelectorAll("item")]
    .map((item): Episode | null => {
      const title = textFrom(item, "title");
      if (!title) return null;

      const episodeValue = Number(textFrom(item, "itunes:episode"));
      const seasonValue = Number(textFrom(item, "itunes:season"));
      const episodeNumber = Number.isFinite(episodeValue) && episodeValue > 0
        ? episodeValue
        : null;
      const seasonNumber = Number.isFinite(seasonValue) && seasonValue > 0
        ? seasonValue
        : null;
      const typeValue = textFrom(item, "itunes:episodeType").toLowerCase();
      const publishedAt = new Date(textFrom(item, "pubDate"));
      const knownEpisode = initialEpisodes.find(
        (episode) =>
          (episodeNumber && episode.episodeNumber === episodeNumber) ||
          episode.slug === slugify(title),
      );

      return {
        title,
        slug: slugify(title),
        description: plainText(
          textFrom(item, "description") || textFrom(item, "itunes:summary"),
        ),
        publishedAt: Number.isNaN(publishedAt.getTime())
          ? new Date().toISOString()
          : publishedAt.toISOString(),
        episodeNumber,
        seasonNumber,
        type:
          typeValue === "trailer"
            ? "trailer"
            : typeValue === "bonus"
              ? "bonus"
              : "full",
        spotifyUrl: textFrom(item, "link") || PODCAST.spotify,
        audioUrl: item.querySelector("enclosure")?.getAttribute("url") ?? null,
        duration: textFrom(item, "itunes:duration") || null,
        youtube: knownEpisode?.youtube ?? null,
      };
    })
    .filter((episode): episode is Episode => Boolean(episode))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

function EpisodeDestination({
  children,
  className,
  episode,
  localSlugs,
}: {
  children: ReactNode;
  className?: string;
  episode: Episode;
  localSlugs: Set<string>;
}) {
  if (localSlugs.has(episode.slug)) {
    return (
      <Link className={className} href={`/episodes/${episode.slug}`}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={episode.spotifyUrl}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function LatestConversation({
  initialEpisodes,
}: {
  initialEpisodes: Episode[];
}) {
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const localSlugs = useMemo(
    () => new Set(initialEpisodes.map((episode) => episode.slug)),
    [initialEpisodes],
  );

  useEffect(() => {
    let active = true;

    async function refreshFromRss() {
      try {
        const response = await fetch(PODCAST.rss, { cache: "no-store" });
        if (!response.ok) return;
        const parsed = parseRss(await response.text(), initialEpisodes);
        if (active && parsed.length) setEpisodes(parsed);
      } catch {
        // Keep the server-rendered episode list if the RSS request is unavailable.
      }
    }

    void refreshFromRss();
    const interval = window.setInterval(refreshFromRss, RSS_REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [initialEpisodes]);

  const latest =
    episodes.find((episode) => episode.type === "full") ?? episodes[0];
  if (!latest) return null;

  const recent = episodes
    .filter((episode) => episode.slug !== latest.slug)
    .slice(0, 3);
  const latestWatchUrl = latest.youtube?.url ?? latest.spotifyUrl;

  return (
    <section className="latest" id="latest" aria-labelledby="latest-title">
      <div className="section-heading">
        <div>
          <p className="section-label">[ NOW PLAYING ]</p>
          <h2 id="latest-title">
            LATEST <span>CONVERSATION</span>
          </h2>
        </div>
        <div className="latest-heading-actions">
          <details className="episode-picker">
            <summary>
              <span>Choose a conversation</span>
              <small>{episodes.length} available</small>
            </summary>
            <div className="episode-picker-menu">
              {episodes.map((episode) => (
                <EpisodeDestination
                  className={episode.slug === latest.slug ? "is-current" : undefined}
                  episode={episode}
                  key={episode.slug}
                  localSlugs={localSlugs}
                >
                  <span>
                    {episode.slug === latest.slug ? "Latest" : episodeLabel(episode)}
                  </span>
                  <strong>{shortEpisodeTitle(episode.title)}</strong>
                  <small>{formatEpisodeDate(episode.publishedAt)}</small>
                </EpisodeDestination>
              ))}
            </div>
          </details>
          <Link className="text-link" href="/episodes">
            Browse every episode <Arrow />
          </Link>
        </div>
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
            src={latest.youtube?.thumbnail ?? assetPath("/podcast-wide-01.jpg")}
            alt=""
            fill
            sizes="(max-width: 960px) 100vw, 58vw"
          />
          <span className="play-button" aria-hidden="true">▶</span>
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
            <EpisodeDestination
              className="button primary dark"
              episode={latest}
              localSlugs={localSlugs}
            >
              {localSlugs.has(latest.slug) ? "Episode notes" : "Open episode"} <Arrow />
            </EpisodeDestination>
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
            <p>New releases move to the front automatically from the RSS feed.</p>
          </div>
          <div className="recent-grid">
            {recent.map((episode) => (
              <article className="recent-card" key={episode.slug}>
                <EpisodeDestination
                  className="recent-image"
                  episode={episode}
                  localSlugs={localSlugs}
                >
                  <Image
                    src={episode.youtube?.thumbnail ?? assetPath("/podcast-conversation.jpg")}
                    alt=""
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                  <span>{episodeLabel(episode)}</span>
                </EpisodeDestination>
                <div>
                  <p>{formatEpisodeDate(episode.publishedAt)}</p>
                  <h3>
                    <EpisodeDestination episode={episode} localSlugs={localSlugs}>
                      {shortEpisodeTitle(episode.title)}
                    </EpisodeDestination>
                  </h3>
                  <EpisodeDestination
                    className="card-link"
                    episode={episode}
                    localSlugs={localSlugs}
                  >
                    Open episode <Arrow />
                  </EpisodeDestination>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
