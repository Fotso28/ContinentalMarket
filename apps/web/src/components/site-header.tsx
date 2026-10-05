"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";

const navigation = [
  { href: "#groupe", label: "Le Groupe" },
  { href: "#metiers", label: "Nos métiers" },
  { href: "/market", label: "Market" },
  { href: "/energy", label: "Energy" },
  { href: "/software", label: "Software" },
  { href: "/pressing", label: "Pressing" },
];

export function SiteHeader({ whatsappUrl }: { whatsappUrl: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`site-header ${open ? "menu-is-open" : ""}`}>
      <Link className="site-logo" href="/" aria-label="Accueil Continental Group">
        <Image src={groupLogo} alt="" priority sizes="180px" />
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Fermer" : "Menu"}
      </button>
      <nav className={`main-navigation ${open ? "is-open" : ""}`} id="main-navigation" aria-label="Navigation principale">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
        ))}
        <a className="button button-primary nav-contact" href={whatsappUrl} target="_blank" rel="noreferrer">Nous écrire</a>
      </nav>
    </header>
  );
}
