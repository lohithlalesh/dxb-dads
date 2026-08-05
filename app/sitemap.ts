import type { MetadataRoute } from "next";
import { getEpisodes } from "../lib/podcast";

const BASE_URL = "https://dxb-dads.laleshlohith.chatgpt.site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getEpisodes();
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/episodes`,
      lastModified: episodes[0]?.publishedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...episodes.map((episode) => ({
      url: `${BASE_URL}/episodes/${episode.slug}`,
      lastModified: episode.publishedAt,
      changeFrequency: "monthly" as const,
      priority: episode.type === "full" ? 0.8 : 0.6,
    })),
  ];
}
