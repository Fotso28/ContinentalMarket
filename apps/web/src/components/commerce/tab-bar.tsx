"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightning, Storefront, WhatsappLogo } from "@phosphor-icons/react";
import { whatsappLink } from "@/lib/contact";

/** Listes Market et Energy uniquement : sur une fiche produit, la barre d'achat collée prend cette place. */
const listingPage = /^\/(market|energy)(\/category\/[^/]+)?\/?$/;

/** Barre basse mobile : trois accès utiles à un client de boutique. L'accueil vit dans le menu. */
export function TabBar() {
  const pathname = usePathname();
  if (!listingPage.test(pathname)) return null;

  const isEnergy = pathname.startsWith("/energy");

  return (
    <nav className="tabbar" aria-label="Navigation mobile">
      <Link href="/market" aria-current={isEnergy ? undefined : "page"}>
        <span className="tab-icon"><Storefront size={20} weight={isEnergy ? "regular" : "fill"} aria-hidden /></span>
        Market
      </Link>
      <Link href="/energy" aria-current={isEnergy ? "page" : undefined}>
        <span className="tab-icon"><Lightning size={20} weight={isEnergy ? "fill" : "regular"} aria-hidden /></span>
        Energy
      </Link>
      <a href={whatsappLink("Bonjour Continental Group, je souhaite échanger avec votre équipe.")} target="_blank" rel="noreferrer">
        <span className="tab-icon"><WhatsappLogo size={20} weight="regular" aria-hidden /></span>
        Contact
      </a>
    </nav>
  );
}
