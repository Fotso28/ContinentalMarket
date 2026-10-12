import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CategoryChips } from "@/components/commerce/category-chips";
import { ProductCard } from "@/components/commerce/product-card";
import { getCategories, getProducts } from "@/lib/catalog/queries";
import { buildMetadata } from "@/lib/seo";
import marketSmartphones from "../../../../public/images/landing/market-smartphones.png";

export const metadata: Metadata = buildMetadata({
  title: "Continental Market — produits du quotidien",
  description: "Téléphonie, informatique et équipement de la maison, à l’unité comme en quantité.",
  path: "/market",
  image: marketSmartphones,
});

export default function MarketPage() {
  const categories = getCategories("market");
  const featured = getProducts("market");

  return (
    <>
      <section className="catalog-intro">
        <h1>Continental Market</h1>
        <p>Téléphonie, informatique et équipement de la maison : une sélection pensée pour acheter à l’unité comme en quantité.</p>
        <a className="button button-primary" href="#produits">
          Voir les produits <ArrowRight size={18} weight="bold" aria-hidden />
        </a>
      </section>

      <CategoryChips division="market" categories={categories} />

      <section className="section-block" aria-labelledby="categories-title">
        <div className="section-head">
          <h2 id="categories-title">Par catégorie</h2>
        </div>
        <div className="tile-grid">
          {categories.map((category) => (
            <Link href={`/market/category/${category.slug}`} className="tile" key={category.slug}>
              <Image src={category.image} alt="" fill sizes="(max-width: 767px) 88vw, 30vw" />
              <span className="tile-label">
                <strong>{category.name}</strong>
                <ArrowRight size={18} weight="bold" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="produits" className="section-block" aria-labelledby="featured-title">
        <div className="section-head">
          <h2 id="featured-title">Produits en vedette</h2>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>

    </>
  );
}
