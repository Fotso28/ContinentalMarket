import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/commerce/product-listing";
import { ShopTitle } from "@/components/commerce/shop-title";
import { getCategories, getCategory, getProducts, toCard } from "@/lib/catalog/queries";
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

  const items = getProducts("market", slug).map(toCard);

  return (
    <div className="shop-page">
      <ShopTitle
        title={category.name}
        intro={category.intro}
        crumbs={[{ href: "/market", label: "Market" }, { label: category.name }]}
      />
      <ProductListing products={items} division="market" />
    </div>
  );
}
