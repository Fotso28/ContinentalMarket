"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";

const navigation = [
  { href: "/#groupe", label: "Le Groupe" },
  { href: "/#metiers", label: "Nos métiers" },
  { href: "/market", label: "Market" },
  { href: "/energy", label: "Energy" },
  { href: "/software", label: "Software" },
  { href: "/pressing", label: "Pressing" },
];

export function SiteHeader({ whatsappUrl }: { whatsappUrl: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header ${open ? "menu-is-open" : ""}`}>
      <Link className="site-logo" href="/" aria-label="Accueil Continental Group">
        <Image src={groupLogo} alt="" loading="eager" sizes="194px" />
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
        {navigation.map((item, index) => (
          <Link
            href={item.href}
            key={item.href}
            style={{ "--i": index } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <a
          className="button button-sun nav-contact"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          style={{ "--i": navigation.length } as CSSProperties}
        >
          Nous écrire
        </a>
      </nav>
    </header>
  );
}
