import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/catalog/queries";
import { siteUrl } from "@/lib/site";

/** Plan du site : vitrine, boutiques, catégories et fiches produit. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/market",
    "/energy",
    "/software",
    "/pressing",
    ...getCategories("market").map((c) => `/market/category/${c.slug}`),
    ...getCategories("energy").map((c) => `/energy/category/${c.slug}`),
    ...getProducts("market").map((p) => `/market/product/${p.slug}`),
    ...getProducts("energy").map((p) => `/energy/product/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: now }));
}
