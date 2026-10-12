import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductCard } from "@/components/commerce/product-card";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { PurchasePanel } from "@/components/commerce/purchase-panel";
import { ShareLinks } from "@/components/commerce/share-links";
import { SpecTable } from "@/components/commerce/spec-table";
import { getCategory, getProduct, getProducts, getRelated, getSpecGroups } from "@/lib/catalog/queries";
import { productMetadata, productUrl } from "@/lib/catalog/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts("market").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct("market", slug);
  return product ? productMetadata(product, "Continental Market") : { title: "Continental Market" };
}

export default async function MarketProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct("market", slug);
  if (!product || product.price === undefined) notFound();

  const category = getCategory("market", product.categorySlug);
  const groups = getSpecGroups(product);
  const related = getRelated(product);
  const url = productUrl("market", product.slug);

  return (
    <SiteFrame message={`Bonjour, j’ai une question sur : ${product.name}\n${url}`}>
      <div className="product-page">
        <Breadcrumbs
          items={[
            { href: "/market", label: "Market" },
            { href: `/market/category/${product.categorySlug}`, label: category?.name ?? "Catégorie" },
            { label: product.name },
          ]}
        />

        <div className="product-layout">
          <ProductGallery images={product.images} alt={product.name} />

          <div className="product-info">
            {product.brand && <p className="product-brand">{product.brand}</p>}
            <h1>{product.name}</h1>
            <p className="product-summary">{product.summary}</p>
            <PurchasePanel
              name={product.name}
              productUrl={url}
              basePrice={product.price}
              tiers={product.tiers ?? []}
              variantLabel={product.variantLabel}
              variants={product.variants}
              available={product.availability === "in_stock"}
            />
            <ShareLinks url={url} title={product.name} />
          </div>
        </div>

        <div className="product-details">
          <section aria-labelledby="description-title">
            <h2 id="description-title">Description</h2>
            <p>{product.description}</p>
          </section>
          <section aria-labelledby="spec-title">
            <h2 id="spec-title">Fiche technique</h2>
            <SpecTable groups={groups} />
          </section>
        </div>

        {related.length > 0 && (
          <section className="section-block" aria-labelledby="related-title">
            <div className="section-head">
              <h2 id="related-title">Vous aimerez aussi</h2>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard product={item} key={item.slug} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteFrame>
  );
}
