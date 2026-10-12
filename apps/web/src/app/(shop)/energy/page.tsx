import type { Metadata } from "next";
import { OrderSteps } from "@/components/commerce/order-steps";
import { ProductListing } from "@/components/commerce/product-listing";
import { ShopTitle } from "@/components/commerce/shop-title";
import { getProducts, toCard } from "@/lib/catalog/queries";
import { buildMetadata } from "@/lib/seo";
import auroraVisuel from "../../../../public/images/products/energy/aurora-yf-lfp-16kwh-visuel.jpg";

export const metadata: Metadata = buildMetadata({
  title: "Continental Energy — stockage et onduleurs",
  description: "Batteries lithium et onduleurs hybrides, sur devis, pour les foyers, les commerces et les installations professionnelles.",
  path: "/energy",
  image: auroraVisuel,
});

export default function EnergyPage() {
  const products = getProducts("energy").map(toCard);

  return (
    <div className="shop-page">
      <ShopTitle
        title="Continental Energy"
        intro="Batteries lithium et onduleurs hybrides pour les foyers, les commerces et les installations professionnelles. Prix sur devis."
      />
      <ProductListing products={products} division="energy" />
      <OrderSteps division="energy" />
    </div>
  );
}
