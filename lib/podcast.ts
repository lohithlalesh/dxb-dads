export const PODCAST = {
  name: "DXB Dads",
  tagline: "Three Dads. Three Cultures. Dubai Life.",
  description:
    "Honest, funny and unfiltered conversations about fatherhood, manhood, friendship, family and life in Dubai.",
  email: "dxb.dads@gmail.com",
  rss: "https://anchor.fm/s/1157522fc/podcast/rss",
  youtube: "https://www.youtube.com/@DXBDads",
  youtubeChannelId: "UCSMIojucm0GQlInnw1I8_xw",
  spotify: "https://open.spotify.com/show/033XRlOY44hvb5tbVHd6e1",
  apple: "https://podcasts.apple.com/us/podcast/dxb-dads/id6795961480",
  instagram: "https://www.instagram.com/dxb.dads/",
} as const;

export const HOSTS = [
  {
    name: "Pranav",
    label: "Fatherhood · Family · Dubai life",
    position: "left",
  },
  {
    name: "Mustapha",
    nickname: "Moose",
    label: "Manhood · Friendship · Honest stories",
    position: "center",
  },
  {
    name: "Pavle Rastovic",
    label: "Host · Fatherhood · Real talk",
    position: "right",
  },
] as const;

export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
};

export type Episode = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  episodeNumber: number | null;
  seasonNumber: number | null;
  type: "full" | "trailer" | "bonus";
  spotifyUrl: string;
  audioUrl: string | null;
  duration: string | null;
  youtube: YouTubeVideo | null;
};

const KNOWN_YOUTUBE: YouTubeVideo[] = [
  {
    id: "hZ9q5O4cvAA",
    title:
      "TOO HOT TO PARENT 🔥 | Surviving Dubai Summer Without Losing Your Mind | DXB.DADS EP01",
    url: "https://www.youtube.com/watch?v=hZ9q5O4cvAA",
    thumbnail: "https://i.ytimg.com/vi/hZ9q5O4cvAA/maxresdefault.jpg",
  },
];

const FALLBACK_EPISODES: Episode[] = [
  {
    title:
      "🔥 TOO HOT TO PARENT | Surviving Dubai Summer Without Losing Your Mind",
    slug: "too-hot-to-parent-surviving-dubai-summer-without-losing-your-mind",
    description:
      "Dubai summer. Kids at home. Temperatures through the roof. Pranav, Pavle and Mustapha compare notes on routines, activities, screen time, travel and keeping the family—and themselves—together.",
    publishedAt: "2026-07-30T15:00:00.000Z",
    episodeNumber: 1,
    seasonNumber: 1,
    type: "full",
    spotifyUrl:
      "https://podcasters.spotify.com/pod/show/pavle13/episodes/TOO-HOT-TO-PARENT--Surviving-Dubai-Summer-Without-Losing-Your-Mind-e3mntm0",
    audioUrl:
      "https://anchor.fm/s/1157522fc/podcast/play/123516032/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-6-30%2F428883400-44100-2-2ad6a089e5999.mp3",
    duration: "53:24",
    youtube: KNOWN_YOUTUBE[0],
  },
];

function decodeEntities(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function plainText(value: string) {
  return decodeEntities(value)
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

function tag(block: string, name: string) {
  const escaped = name.replace(":", "\\:");
  const match = block.match(
    new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"),
  );
  return match ? decodeEntities(match[1]).trim() : "";
}

function attribute(block: string, tagName: string, attributeName: string) {
  const escaped = tagName.replace(":", "\\:");
  const match = block.match(
    new RegExp(
      `<${escaped}[^>]*\\s${attributeName}=["']([^"']+)["'][^>]*>`,
      "i",
    ),
  );
  return match ? decodeEntities(match[1]).trim() : "";
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 110);
}

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/episode/g, "ep")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function episodeNumberFromTitle(value: string) {
  const match = value.match(/(?:episode|ep)\s*0*(\d+)/i);
  return match ? Number(match[1]) : null;
}

function matchYouTubeVideo(
  episodeTitle: string,
  episodeNumber: number | null,
  videos: YouTubeVideo[],
) {
  if (episodeNumber) {
    const numbered = videos.find((video) => {
      const number = episodeNumberFromTitle(video.title);
      return number === episodeNumber;
    });
    if (numbered) return numbered;
  }

  const episodeWords = new Set(
    normalizeTitle(episodeTitle)
      .split(" ")
      .filter((word) => word.length > 3),
  );
  let best: YouTubeVideo | null = null;
  let bestScore = 0;
  for (const video of videos) {
    const score = normalizeTitle(video.title)
      .split(" ")
      .filter((word) => episodeWords.has(word)).length;
    if (score > bestScore) {
      best = video;
      bestScore = score;
    }
  }
  return bestScore >= 3 ? best : null;
}

async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${PODCAST.youtubeChannelId}`,
      {
      headers: { "user-agent": "Mozilla/5.0 DXBDadsWebsite/1.0" },
      cache: "force-cache",
      },
    );
    if (!response.ok) return KNOWN_YOUTUBE;
    const xml = await response.text();
    const found = new Map<string, YouTubeVideo>();
    for (const entry of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)) {
      const id = tag(entry[1], "yt:videoId");
      const title = plainText(tag(entry[1], "title"));
      if (!id || !title) continue;
      if (!found.has(id)) {
        found.set(id, {
          id,
          title,
          url: `https://www.youtube.com/watch?v=${id}`,
          thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        });
      }
    }
    return [...KNOWN_YOUTUBE, ...found.values()].filter(
      (video, index, all) =>
        all.findIndex((candidate) => candidate.id === video.id) === index,
    );
  } catch {
    return KNOWN_YOUTUBE;
  }
}

function parseFeed(xml: string, videos: YouTubeVideo[]): Episode[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(
    (match) => match[1],
  );

  return items
    .map((item): Episode | null => {
      const title = plainText(tag(item, "title"));
      if (!title) return null;
      const description = plainText(tag(item, "description"));
      const published = tag(item, "pubDate");
      const episodeValue = tag(item, "itunes:episode");
      const seasonValue = tag(item, "itunes:season");
      const typeValue = tag(item, "itunes:episodeType").toLowerCase();
      const episodeNumber = episodeValue ? Number(episodeValue) : null;
      const seasonNumber = seasonValue ? Number(seasonValue) : null;
      const audioUrl = attribute(item, "enclosure", "url") || null;
      const duration = tag(item, "itunes:duration") || null;
      const spotifyUrl = tag(item, "link") || PODCAST.spotify;
      return {
        title,
        slug: slugify(title),
        description,
        publishedAt: published
          ? new Date(published).toISOString()
          : new Date().toISOString(),
        episodeNumber:
          episodeNumber && Number.isFinite(episodeNumber) ? episodeNumber : null,
        seasonNumber:
          seasonNumber && Number.isFinite(seasonNumber) ? seasonNumber : null,
        type:
          typeValue === "trailer"
            ? "trailer"
            : typeValue === "bonus"
              ? "bonus"
              : "full",
        spotifyUrl,
        audioUrl,
        duration,
        youtube: matchYouTubeVideo(title, episodeNumber, videos),
      };
    })
    .filter((episode): episode is Episode => Boolean(episode))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getEpisodes() {
  try {
    const [response, videos] = await Promise.all([
      fetch(PODCAST.rss, { cache: "force-cache" }),
      fetchYouTubeVideos(),
    ]);
    if (!response.ok) return FALLBACK_EPISODES;
    const parsed = parseFeed(await response.text(), videos);
    return parsed.length ? parsed : FALLBACK_EPISODES;
  } catch {
    return FALLBACK_EPISODES;
  }
}

export function formatEpisodeDate(value: string) {
  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dubai",
  }).format(new Date(value));
}

export function shortEpisodeTitle(title: string) {
  return title.replace(/^🔥\s*/, "").split("|")[0].trim();
}
