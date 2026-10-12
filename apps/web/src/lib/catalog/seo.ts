import type { Metadata } from "next";
import { absoluteUrl } from "../site";
import { buildMetadata } from "../seo";
import { formatPrice, startingPrice } from "./format";
import type { Division, Product } from "./types";

export function productPath(division: Division, slug: string): string {
  return `/${division}/product/${slug}`;
}

/** URL absolue de la fiche : celle qui part dans les messages WhatsApp et les partages. */
export function productUrl(division: Division, slug: string): string {
  return absoluteUrl(productPath(division, slug));
}

export function productDescription(product: Product): string {
  const from = startingPrice(product);
  const priceLine = from !== undefined ? `À partir de ${formatPrice(from)}.` : "Sur devis.";
  return `${product.summary} ${priceLine}`;
}

export function productMetadata(product: Product, divisionLabel: string): Metadata {
  return buildMetadata({
    title: `${product.name} — ${divisionLabel}`,
    description: productDescription(product),
    path: productPath(product.division, product.slug),
    image: product.images[0],
  });
}
