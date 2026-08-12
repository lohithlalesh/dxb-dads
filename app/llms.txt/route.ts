import { buildLlmsText } from "../../lib/llms";
import { getEpisodes } from "../../lib/podcast";

export const revalidate = 900;

export async function GET() {
  const episodes = await getEpisodes();
  return new Response(buildLlmsText(episodes), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}
