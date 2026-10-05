"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

const navigation = [
  { href: "#groupe", label: "Le groupe" },
  { href: "#metiers", label: "Nos métiers" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({ whatsappUrl }: { whatsappUrl: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={"site-header " + (open ? "menu-is-open" : "")}>
      <Link className="site-logo" href="/#haut" aria-label="Accueil Continental Group" onClick={() => setOpen(false)}>
        <span className="site-logo-mark">C<span>G</span></span>
        <span className="site-logo-type">CONTINENTAL<small>GROUP</small></span>
      </Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? "Fermer" : "Menu"}<span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
      <nav className={"main-navigation " + (open ? "is-open" : "")} id="main-navigation" aria-label="Navigation principale">
        {navigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <a className="nav-contact" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Nous écrire <ArrowUpRight size={18} aria-hidden /></a>
      </nav>
    </header>
  );
}

