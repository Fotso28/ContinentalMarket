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
  return getCategories("energy").map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory("energy", slug);
  if (!category) return { title: "Continental Energy" };
  return buildMetadata({
    title: `${category.name} — Continental Energy`,
    description: category.intro,
    path: `/energy/category/${category.slug}`,
    image: category.image,
  });
}

export default async function EnergyCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory("energy", slug);
  if (!category) notFound();

  const items = getProducts("energy", slug);

  return (
    <SiteFrame message={`Bonjour Continental Energy, je souhaite un devis pour la catégorie ${category.name}.`} withTabBar>
      <section className="catalog-intro">
        <Breadcrumbs items={[{ href: "/energy", label: "Energy" }, { label: category.name }]} />
        <h1>{category.name}</h1>
        <p>{category.intro}</p>
      </section>

      <CategoryChips division="energy" categories={getCategories("energy")} activeSlug={slug} />

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

      <TabBar active="energy" />
    </SiteFrame>
  );
}
