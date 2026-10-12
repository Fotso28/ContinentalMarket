/** Adresse publique du site : sert aux liens partagés (WhatsApp, Facebook) et aux aperçus. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://continental-group.cm").replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
