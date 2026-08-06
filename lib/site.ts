export const SITE_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://dxb-dads.laleshlohith.chatgpt.site"
).replace(/\/$/, "");

export function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE}${normalized}`;
}

export function siteUrl(path = "") {
  const normalized = path && !path.startsWith("/") ? `/${path}` : path;
  return `${SITE_URL}${normalized}`;
}

