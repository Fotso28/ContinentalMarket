import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { absoluteUrl } from "./site";

/**
 * Métadonnées d'une page, avec les balises Open Graph (Facebook, WhatsApp) et Twitter.
 * L'image doit être absolue : WhatsApp et Facebook la récupèrent hors du site.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image: StaticImageData;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.src);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Continental Group",
      locale: "fr_CM",
      type: "website",
      images: [{ url: imageUrl, width: image.width, height: image.height, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
