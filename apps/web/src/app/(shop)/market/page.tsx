import type { Metadata } from "next";
import { OrderSteps } from "@/components/commerce/order-steps";
import { ProductListing } from "@/components/commerce/product-listing";
import { ShopTitle } from "@/components/commerce/shop-title";
import { getProducts, toCard } from "@/lib/catalog/queries";
import { buildMetadata } from "@/lib/seo";
import marketSmartphones from "../../../../public/images/landing/market-smartphones.png";

export const metadata: Metadata = buildMetadata({
  title: "Continental Market — produits du quotidien",
  description: "Téléphonie, informatique et équipement de la maison, à l’unité comme en quantité.",
  path: "/market",
  image: marketSmartphones,
});

export default function MarketPage() {
  const products = getProducts("market").map(toCard);

  return (
    <div className="shop-page">
      <ShopTitle
        title="Continental Market"
        intro="Téléphonie, informatique et équipement de la maison, à l’unité comme en quantité."
      />
      <ProductListing products={products} division="market" />
      <OrderSteps division="market" />
    </div>
  );
}
