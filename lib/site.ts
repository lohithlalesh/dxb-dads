export const SITE_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// One public identity across every deployment. Preview and GitHub Pages builds
// may live elsewhere, but search engines and structured data must always point
// to the primary DXB Dads domain.
export const SITE_URL = "https://dxbdads.ae";

export function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE}${normalized}`;
}

export function siteUrl(path = "") {
  const normalized = path && !path.startsWith("/") ? `/${path}` : path;
  return `${SITE_URL}${normalized}`;
}
