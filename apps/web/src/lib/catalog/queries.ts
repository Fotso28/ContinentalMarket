import { attributeDefs, attributeGroupOrder, attributeGroupTitles } from "./attributes";
import { categories, products } from "./data";
import { formatAttribute } from "./format";
import type { Category, Division, Product, SpecGroup } from "./types";

export function getCategories(division: Division): Category[] {
  return categories.filter((c) => c.division === division);
}

export function getCategory(division: Division, slug: string): Category | undefined {
  return categories.find((c) => c.division === division && c.slug === slug);
}

export function getProducts(division: Division, categorySlug?: string): Product[] {
  return products.filter(
    (p) => p.division === division && (categorySlug === undefined || p.categorySlug === categorySlug),
  );
}

export function getProduct(division: Division, slug: string): Product | undefined {
  return products.find((p) => p.division === division && p.slug === slug);
}

export function getRelated(product: Product): Product[] {
  return product.related
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);
}

/**
 * Fiche technique : seuls les attributs du périmètre de la division et renseignés sont affichés.
 * C'est ce qui rend la page d'un produit énergétique différente de celle d'un produit général.
 */
export function getSpecGroups(product: Product): SpecGroup[] {
  const defs = attributeDefs.filter((d) => d.scope === "all" || d.scope === product.division);
  return attributeGroupOrder
    .map((group) => {
      const rows = defs
        .filter((d) => d.group === group && product.attributes[d.key] !== undefined)
        .map((d) => ({ label: d.label, value: formatAttribute(d, product.attributes[d.key]) }));
      return { group, title: attributeGroupTitles[group], rows };
    })
    .filter((g) => g.rows.length > 0);
}

/** Attributs clés d'un produit énergétique, affichés en tête de fiche. */
export function getKeyFacts(product: Product): { label: string; value: string }[] {
  const keys = ["capacite_kwh", "tension_v", "garantie_ans"];
  return keys
    .map((key) => attributeDefs.find((d) => d.key === key))
    .filter((d): d is NonNullable<typeof d> => d !== undefined && product.attributes[d.key] !== undefined)
    .map((d) => ({ label: d.label, value: formatAttribute(d, product.attributes[d.key]) }));
}
