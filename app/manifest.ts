import type { MetadataRoute } from "next";
import { assetPath } from "../lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DXB Dads Podcast",
    short_name: "DXB Dads",
    description:
      "Three Dads. Three Cultures. Dubai Life. Honest conversations about fatherhood, manhood, friendship and family.",
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#0d0b09",
    theme_color: "#0d0b09",
    icons: [
      {
        src: assetPath("/dxb-dads-logo-clean.png"),
        sizes: "1254x1254",
        type: "image/png",
      },
    ],
  };
}
