"use client";

import Image from "next/image";
import Link from "next/link";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";
import { MobileMenu, type MenuCategories } from "./mobile-menu";

/** Navigation de bureau : les deux boutiques d'abord, puis les divisions vitrine et le groupe. Sur mobile, le menu coulissant la remplace. */
const navigation = [
  { href: "/market", label: "Market" },
  { href: "/energy", label: "Energy" },
  { href: "/software", label: "Software" },
  { href: "/pressing", label: "Pressing" },
  { href: "/#groupe", label: "Le groupe" },
];

export function SiteHeader({ whatsappUrl, categories }: { whatsappUrl: string; categories: MenuCategories }) {
  return (
    <header className="site-header">
      <Link className="site-logo" href="/" aria-label="Accueil Continental Group">
        <Image src={groupLogo} alt="" loading="eager" sizes="194px" />
      </Link>
      <MobileMenu categories={categories} whatsappUrl={whatsappUrl} variant="pill" />
      <nav className="main-navigation" id="main-navigation" aria-label="Navigation principale">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <a className="button button-sun nav-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
          Nous écrire
        </a>
      </nav>
    </header>
  );
}
