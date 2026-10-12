import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { CategoryChips } from "@/components/commerce/category-chips";
import { ProductCard } from "@/components/commerce/product-card";
import { TabBar } from "@/components/commerce/tab-bar";
import { getCategories, getCategory, getProducts } from "@/lib/catalog/queries";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCategories("market").map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory("market", slug);
  if (!category) return { title: "Continental Market" };
  return buildMetadata({
    title: `${category.name} — Continental Market`,
    description: category.intro,
    path: `/market/category/${category.slug}`,
    image: category.image,
  });
}

export default async function MarketCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory("market", slug);
  if (!category) notFound();

  const items = getProducts("market", slug);

  return (
    <SiteFrame message={`Bonjour Continental Market, j’ai une question sur la catégorie ${category.name}.`} withTabBar>
      <section className="catalog-intro">
        <Breadcrumbs items={[{ href: "/market", label: "Market" }, { label: category.name }]} />
        <h1>{category.name}</h1>
        <p>{category.intro}</p>
      </section>

      <CategoryChips division="market" categories={getCategories("market")} activeSlug={slug} />

      <section className="section-block" aria-label={`Produits : ${category.name}`}>
        {items.length > 0 ? (
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        ) : (
          <p className="empty">Aucun produit dans cette catégorie pour le moment.</p>
        )}
      </section>

      <TabBar active="market" />
    </SiteFrame>
  );
}
