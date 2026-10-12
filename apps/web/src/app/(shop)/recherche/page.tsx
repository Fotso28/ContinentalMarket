import type { Metadata } from "next";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/commerce/product-card";
import { ShopTitle } from "@/components/commerce/shop-title";
import { getCategories, searchProducts, toCard } from "@/lib/catalog/queries";

export const metadata: Metadata = {
  title: "Rechercher un produit — Continental",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 80) ?? "";
  const results = query ? searchProducts(query).map(toCard) : [];

  return (
    <div className="shop-page">
      <ShopTitle title="Rechercher un produit">
        <form className="page-search" role="search" action="/recherche">
          <label htmlFor="page-q" className="sr-only">Produit recherché</label>
          <MagnifyingGlass size={20} aria-hidden />
          <input id="page-q" type="search" name="q" defaultValue={query} autoComplete="off" autoFocus={!query} placeholder="Un produit, une marque, une catégorie" />
          <button type="submit" className="button button-primary">Rechercher</button>
        </form>
      </ShopTitle>

      {query && (
        <p className="listing-count" role="status">
          {results.length > 0
            ? `${results.length} ${results.length > 1 ? "résultats" : "résultat"} pour « ${query} »`
            : `Aucun résultat pour « ${query} »`}
        </p>
      )}

      {results.length > 0 && (
        <div className="product-grid search-results">
          {results.map((product) => (
            <ProductCard product={product} showDivision key={product.href} />
          ))}
        </div>
      )}

      {(!query || results.length === 0) && (
        <section className="search-suggest" aria-label="Parcourir les catégories">
          <h2>Parcourir par catégorie</h2>
          <ul>
            {(["market", "energy"] as const).flatMap((division) =>
              getCategories(division).map((category) => (
                <li key={`${division}-${category.slug}`}>
                  <Link href={`/${division}/category/${category.slug}`}>
                    <span>{division === "market" ? "Market" : "Energy"}</span>
                    {category.name}
                  </Link>
                </li>
              )),
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
