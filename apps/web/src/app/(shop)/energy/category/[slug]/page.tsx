import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/commerce/product-listing";
import { ShopTitle } from "@/components/commerce/shop-title";
import { getCategories, getCategory, getProducts, toCard } from "@/lib/catalog/queries";
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

  const items = getProducts("energy", slug).map(toCard);

  return (
    <div className="shop-page">
      <ShopTitle
        title={category.name}
        intro={category.intro}
        crumbs={[{ href: "/energy", label: "Energy" }, { label: category.name }]}
      />
      <ProductListing products={items} division="energy" />
    </div>
  );
}
