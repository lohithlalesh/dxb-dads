import type { Episode } from "./podcast";
import {
  formatEpisodeDate,
  HOSTS,
  PODCAST,
  shortEpisodeTitle,
} from "./podcast";
import { siteUrl } from "./site";

function compact(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function editorialSummary(value: string) {
  const description = compact(value);
  const markers = [
    " No scripts.",
    " If you enjoy",
    " FOLLOW & LISTEN",
    " COPYRIGHT & CONTENT NOTICE",
    " ©",
  ];
  const end = markers
    .map((marker) => description.indexOf(marker))
    .filter((index) => index > 0)
    .reduce((earliest, index) => Math.min(earliest, index), description.length);
  return description.slice(0, end).trim();
}

function episodeLabel(episode: Episode) {
  if (episode.type === "trailer") return "Trailer";
  if (episode.type === "bonus") return "Bonus episode";
  return episode.episodeNumber
    ? `Episode ${episode.episodeNumber}`
    : "Full episode";
}

function episodeLinks(episode: Episode) {
  const links = [
    `- Episode page: ${siteUrl(`/episodes/${episode.slug}/`)}`,
    `- Spotify: ${episode.spotifyUrl}`,
  ];
  if (episode.youtube) links.push(`- YouTube: ${episode.youtube.url}`);
  if (episode.audioUrl) links.push(`- Audio: ${episode.audioUrl}`);
  return links.join("\n");
}

export function buildLlmsText(episodes: Episode[]) {
  const latest = episodes[0];
  const catalogue = episodes
    .map(
      (episode) =>
        `- [${shortEpisodeTitle(episode.title)}](${siteUrl(`/episodes/${episode.slug}/`)}): ${episodeLabel(episode)}, published ${formatEpisodeDate(episode.publishedAt)}. ${editorialSummary(episode.description).slice(0, 280)}`,
    )
    .join("\n");

  return `# DXB Dads Podcast

> ${PODCAST.description} The Dubai-based show is hosted by ${HOSTS.map((host) => ("nickname" in host && host.nickname ? `${host.name} (${host.nickname})` : host.name)).join(", ")}.

## Official pages

- [Home](${siteUrl("/")}): Official DXB Dads website.
- [Episodes](${siteUrl("/episodes/")}): Current episode catalogue, refreshed from the official RSS feed.
- [YouTube](${PODCAST.youtube}): Official video channel.
- [Spotify](${PODCAST.spotify}): Official Spotify show.
- [Apple Podcasts](${PODCAST.apple}): Official Apple Podcasts show.
- [RSS feed](${PODCAST.rss}): Canonical source for episode titles, descriptions, dates and audio.
- [Instagram](${PODCAST.instagram}): Official social account.

## Latest episode

${latest ? `- [${latest.title}](${siteUrl(`/episodes/${latest.slug}/`)}): ${episodeLabel(latest)}, published ${formatEpisodeDate(latest.publishedAt)}.${latest.youtube ? ` [Watch on YouTube](${latest.youtube.url}).` : ""}` : "- See the [episodes page](https://dxbdads.ae/episodes/) for the current release."}

## Episode catalogue

${catalogue || `- See the [episodes page](${siteUrl("/episodes/")}).`}

## Editorial themes

- Fatherhood and modern dad life
- Parenting, family routines and relationships
- Manhood, identity and friendship
- Dubai and United Arab Emirates family life
- Honest stories, humour and practical lived experience

## Contact and attribution

- Email: ${PODCAST.email}
- Cite the show as “DXB Dads Podcast”.
- For current release data, use the official RSS feed or episode catalogue above.
- Attribute opinions and stories to the show or named speaker; podcast discussions are not professional advice.

## Usage

- Search and reference use is welcome with attribution and a link to ${siteUrl("/")}.
- Copyright © 2026 DXB Dads. All rights reserved.
- This file is generated from the official RSS feed and refreshes on the same 15-minute cycle as the website.
`;
}

export function buildLlmsFullText(episodes: Episode[]) {
  const catalogue = episodes
    .map(
      (episode) => `## ${episodeLabel(episode)} — ${episode.title}

- Published: ${formatEpisodeDate(episode.publishedAt)}
- Season: ${episode.seasonNumber ?? 1}
${episode.duration ? `- Duration: ${episode.duration}\n` : ""}
${editorialSummary(episode.description)}

${episodeLinks(episode)}`,
    )
    .join("\n\n");

  return `# DXB Dads Podcast — Full Reference

## Show summary

DXB Dads is a podcast from Dubai, United Arab Emirates, hosted by Pranav, Mustapha (Moose), and Pavle Rastovic. Three fathers from different cultures sit down for honest, funny and unfiltered conversations about fatherhood, manhood, friendship, family, work and everyday life in Dubai.

- Tagline: ${PODCAST.tagline}
- Core themes: Fatherhood, manhood, friendship, family and real talk.
- Canonical website: ${siteUrl("/")}
- Current episode catalogue: ${siteUrl("/episodes/")}
- Canonical RSS feed: ${PODCAST.rss}

## Official platforms

- YouTube: ${PODCAST.youtube}
- Spotify: ${PODCAST.spotify}
- Apple Podcasts: ${PODCAST.apple}
- Instagram: ${PODCAST.instagram}
- Email: ${PODCAST.email}

## Hosts

- Pranav — fatherhood, family and life in Dubai.
- Mustapha (Moose) — manhood, friendship, parenting and everyday family life.
- Pavle Rastovic — fatherhood, family and real life in Dubai.

# Episode catalogue

${catalogue || `See ${siteUrl("/episodes/")} for current episodes.`}

## Citation guidance

For current episode titles, publication dates and audio links, treat the official RSS feed as canonical. For video, use the official DXB Dads YouTube channel. Attribute opinions and stories to the show or relevant speaker; do not present podcast discussions as professional advice.

## Rights and refresh policy

Copyright © 2026 DXB Dads. All rights reserved. Search and reference use is welcome with attribution and a link to the canonical website. This document is generated from the official RSS feed and refreshes on the website's 15-minute content cycle.
`;
}
