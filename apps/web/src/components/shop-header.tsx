"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagnifyingGlass, WhatsappLogo } from "@phosphor-icons/react";
import { MobileMenu, type MenuCategories } from "./mobile-menu";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";

type Props = {
  categories: MenuCategories;
  whatsappUrl: string;
};

/**
 * En-tête des boutiques : tout ce qui sert à acheter (changer de boutique, chercher, parcourir les
 * catégories, écrire sur WhatsApp). Les pages de présentation du groupe n'y figurent pas : elles sont dans le pied de page.
 */
export function ShopHeader({ categories, whatsappUrl }: Props) {
  const pathname = usePathname();
  const division = pathname.startsWith("/energy") ? "energy" : pathname.startsWith("/market") ? "market" : null;
  const onSearch = pathname.startsWith("/recherche");
  const base = division ? `/${division}` : null;
  const list = division ? categories[division] : [];

  return (
    <header className="shop-header">
      <div className="shop-bar">
        <Link className="shop-logo" href="/" aria-label="Continental Group, accueil du groupe">
          <Image src={groupLogo} alt="" loading="eager" sizes="150px" />
        </Link>

        <nav className="shop-switch" aria-label="Boutiques">
          <Link href="/market" aria-current={division === "market" ? "page" : undefined}>Market</Link>
          <Link href="/energy" aria-current={division === "energy" ? "page" : undefined}>Energy</Link>
        </nav>

        {!onSearch && (
          <form className="shop-search" role="search" action="/recherche">
            <label htmlFor="shop-q" className="sr-only">Rechercher un produit</label>
            <MagnifyingGlass size={20} aria-hidden />
            <input
              id="shop-q"
              type="search"
              name="q"
              autoComplete="off"
              placeholder={division === "energy" ? "Rechercher une batterie, un onduleur…" : "Rechercher un produit"}
            />
          </form>
        )}
        {!onSearch && (
          <Link className="shop-icon-link" href="/recherche" aria-label="Rechercher un produit">
            <MagnifyingGlass size={22} aria-hidden />
          </Link>
        )}

        <MobileMenu categories={categories} whatsappUrl={whatsappUrl} variant="icon" />

        <a className="button button-sun shop-contact" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp">
          <WhatsappLogo size={20} weight="fill" aria-hidden />
          <span>WhatsApp</span>
        </a>
      </div>

      {base && (
        <nav className="shop-cats" aria-label={`Catégories ${division === "energy" ? "Energy" : "Market"}`}>
          <Link href={base} aria-current={pathname === base ? "page" : undefined}>Tous les produits</Link>
          {list.map((category) => {
            const href = `${base}/category/${category.slug}`;
            return (
              <Link href={href} aria-current={pathname === href ? "page" : undefined} key={category.slug}>
                {category.name}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
