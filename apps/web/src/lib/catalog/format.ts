import type { AttributeDef, AttributeValue, PriceTier, Product } from "./types";

/** Les données actuelles sont des exemples : aucune ne vient encore du backoffice. */
export const catalogIsDemo = true;

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function formatAttribute(def: AttributeDef, value: AttributeValue): string {
  const shown = typeof value === "number" ? value.toLocaleString("fr-FR") : value;
  return def.unit ? `${shown} ${def.unit}` : `${shown}`;
}

/** Palier applicable à une quantité : le dernier palier dont le minimum est atteint. */
export function tierFor(quantity: number, tiers: PriceTier[] | undefined, basePrice: number): number {
  if (!tiers || tiers.length === 0) return basePrice;
  const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
  let unit = basePrice;
  for (const tier of sorted) {
    if (quantity >= tier.minQty) unit = tier.unitPrice;
  }
  return unit;
}

/** Prix « à partir de » d'un produit général, ou undefined pour un produit sur devis. */
export function startingPrice(product: Product): number | undefined {
  if (product.price === undefined) return undefined;
  const tierPrices = (product.tiers ?? []).map((t) => t.unitPrice);
  return Math.min(product.price, ...tierPrices);
}
