import { attributeDefs, attributeGroupOrder, attributeGroupTitles } from "./attributes";
import { categories, products } from "./data";
import { formatAttribute, formatPrice } from "./format";
import type { Category, Division, Product, SpecGroup } from "./types";
import type { CardData } from "./view";

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

const divisionLabels: Record<Division, string> = { market: "Market", energy: "Energy" };

export function toCard(product: Product): CardData {
  const tier = [...(product.tiers ?? [])].sort((a, b) => a.minQty - b.minQty)[0];
  const capacity = product.attributes.capacite_kwh;
  return {
    slug: product.slug,
    href: `/${product.division}/product/${product.slug}`,
    name: product.name,
    brand: product.brand,
    image: product.images[0],
    division: product.division,
    divisionLabel: divisionLabels[product.division],
    facts: product.division === "energy" ? getKeyFacts(product).map((fact) => fact.value) : [],
    price: product.price,
    tierHint: tier ? `dès ${tier.minQty} : ${formatPrice(tier.unitPrice)}` : undefined,
    inStock: product.availability === "in_stock",
    capacityKwh: typeof capacity === "number" ? capacity : undefined,
  };
}

const fold = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Recherche simple : tous les mots saisis doivent apparaître dans le nom, la marque, le résumé ou la catégorie. */
export function searchProducts(query: string): Product[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return products.filter((product) => {
    const category = categories.find((c) => c.division === product.division && c.slug === product.categorySlug);
    const haystack = fold([product.name, product.brand, product.summary, category?.name, String(product.attributes.reference ?? "")].join(" "));
    return words.every((word) => haystack.includes(word));
  });
}
