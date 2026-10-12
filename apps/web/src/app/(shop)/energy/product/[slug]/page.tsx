import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/commerce/back-link";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductCard } from "@/components/commerce/product-card";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { QuotePanel } from "@/components/commerce/quote-panel";
import { ShareLinks } from "@/components/commerce/share-links";
import { SpecTable } from "@/components/commerce/spec-table";
import { getCategory, getKeyFacts, getProduct, getProducts, getRelated, getSpecGroups, toCard } from "@/lib/catalog/queries";
import { productMetadata, productUrl } from "@/lib/catalog/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts("energy").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct("energy", slug);
  return product ? productMetadata(product, "Continental Energy") : { title: "Continental Energy" };
}

export default async function EnergyProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct("energy", slug);
  if (!product) notFound();

  const category = getCategory("energy", product.categorySlug);
  const groups = getSpecGroups(product);
  const facts = getKeyFacts(product);
  const related = getRelated(product);
  const url = productUrl("energy", product.slug);

  return (
    <>
      <div className="product-page energy-page">
        <BackLink href={`/energy/category/${product.categorySlug}`} label={category?.name ?? "Energy"} />
        <Breadcrumbs
          items={[
            { href: "/energy", label: "Energy" },
            { href: `/energy/category/${product.categorySlug}`, label: category?.name ?? "Catégorie" },
            { label: product.name },
          ]}
        />

        <div className="product-layout">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="product-info">
            {product.brand && <p className="product-brand">{product.brand}</p>}
            <h1>{product.name}</h1>
            <p className="product-summary">{product.summary}</p>
            <QuotePanel name={product.name} productUrl={url} facts={facts} />
            <ShareLinks url={url} title={product.name} />
          </div>
        </div>

        <div className="product-details">
          <section aria-labelledby="energy-description-title">
            <h2 id="energy-description-title">Description</h2>
            <p>{product.description}</p>
          </section>
          <section aria-labelledby="energy-spec-title">
            <h2 id="energy-spec-title">Fiche technique</h2>
            <SpecTable groups={groups} />
          </section>
        </div>

        {related.length > 0 && (
          <section className="section-block" aria-labelledby="energy-related-title">
            <div className="section-head">
              <h2 id="energy-related-title">Produits associés</h2>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard product={toCard(item)} key={item.slug} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
