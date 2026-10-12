import { ShopFrame } from "@/components/shop-frame";

/** Mise en page des boutiques (Market, Energy, recherche) : un cadre d'achat, distinct de la vitrine du groupe. */
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <ShopFrame>{children}</ShopFrame>;
}
