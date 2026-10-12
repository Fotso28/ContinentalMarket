import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";

/** Titre de page de boutique : sobre, il laisse les produits remonter dans l'écran. */
export function ShopTitle({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="shop-title">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
      {children}
    </header>
  );
}
