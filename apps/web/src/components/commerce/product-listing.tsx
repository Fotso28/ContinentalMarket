"use client";

import { useState } from "react";
import type { CardData } from "@/lib/catalog/view";
import { ProductCard } from "./product-card";

type Sort = "default" | "price-asc" | "price-desc" | "capacity-desc" | "name";

const sortLabels: Record<Sort, string> = {
  default: "Sélection",
  "price-asc": "Prix croissant",
  "price-desc": "Prix décroissant",
  "capacity-desc": "Capacité décroissante",
  name: "Nom, A à Z",
};

function sortProducts(products: CardData[], sort: Sort): CardData[] {
  const list = [...products];
  if (sort === "price-asc") return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (sort === "price-desc") return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (sort === "capacity-desc") return list.sort((a, b) => (b.capacityKwh ?? 0) - (a.capacityKwh ?? 0));
  if (sort === "name") return list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  return list;
}

/**
 * Liste de produits avec tri et filtre de disponibilité.
 * Les produits Energy se vendent sur devis : on les trie par capacité plutôt que par prix.
 */
export function ProductListing({ products, division }: { products: CardData[]; division: "market" | "energy" }) {
  const [sort, setSort] = useState<Sort>("default");
  const [inStockOnly, setInStockOnly] = useState(false);

  const options: Sort[] = division === "energy" ? ["default", "capacity-desc", "name"] : ["default", "price-asc", "price-desc", "name"];
  const shown = sortProducts(products.filter((p) => !inStockOnly || p.inStock), sort);
  const hasOrderOnly = products.some((p) => !p.inStock);

  return (
    <section aria-label="Produits">
      <div className="listing-toolbar">
        <p className="listing-count" role="status">
          {shown.length} {shown.length > 1 ? "produits" : "produit"}
        </p>
        <div className="listing-controls">
          {hasOrderOnly && (
            <label className="check">
              <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} />
              En stock
            </label>
          )}
          {products.length > 1 && (
            <label className="select-field">
              <span>Trier par</span>
              <select aria-label="Trier par" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
                {options.map((key) => (
                  <option value={key} key={key}>{sortLabels[key]}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      {shown.length > 0 ? (
        <div className="product-grid">
          {shown.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>Aucun produit en stock pour le moment.</p>
          <button type="button" className="text-link" onClick={() => setInStockOnly(false)}>Afficher tous les produits</button>
        </div>
      )}
    </section>
  );
}
