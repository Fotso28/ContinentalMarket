"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CaretDown, List, WhatsappLogo, X } from "@phosphor-icons/react";

export type MenuCategories = {
  market: { slug: string; name: string }[];
  energy: { slug: string; name: string }[];
};

type Props = {
  categories: MenuCategories;
  whatsappUrl: string;
  /** « pill » : bouton « Menu » de la vitrine ; « icon » : bouton rond de l'en-tête boutique. */
  variant?: "pill" | "icon";
};

const subscribeNothing = () => () => {};

const shops = [
  { key: "market", label: "Market", base: "/market" },
  { key: "energy", label: "Energy", base: "/energy" },
] as const;

/** Pages de présentation du groupe : après les boutiques, sans « Accueil » (le logo ramène à l'accueil). */
const groupLinks = [
  { href: "/software", label: "Software" },
  { href: "/pressing", label: "Pressing" },
  { href: "/#groupe", label: "Le groupe" },
];

/**
 * Menu coulissant : Market d'abord, avec ses catégories en sous-menu, puis Energy, puis le reste du groupe.
 * Rendu dans `body` pour échapper aux filtres de l'en-tête qui piégeraient sa position fixe.
 */
export function MobileMenu({ categories, whatsappUrl, variant = "pill" }: Props) {
  const pathname = usePathname();
  const id = useId();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const [lastPath, setLastPath] = useState(pathname);
  const [expanded, setExpanded] = useState<string>(pathname.startsWith("/energy") ? "energy" : "market");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // À chaque changement de page, le menu se ferme et le sous-menu de la boutique visitée s'ouvre (Market par défaut).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded(pathname.startsWith("/energy") ? "energy" : "market");
  }

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = (
    <div className={`drawer ${open ? "is-open" : ""}`} inert={!open}>
      <div className="drawer-scrim" onClick={close} aria-hidden />
      <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu" id={`${id}-panel`}>
        <div className="drawer-head">
          <p>Menu</p>
          <button type="button" className="drawer-close" ref={closeRef} onClick={close} aria-label="Fermer le menu">
            <X size={22} aria-hidden />
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Menu principal">
          <ul className="drawer-shops">
            {shops.map((shop) => {
              const isOpen = expanded === shop.key;
              const subId = `${id}-${shop.key}`;
              return (
                <li key={shop.key}>
                  <div className="drawer-row">
                    <Link href={shop.base} aria-current={pathname === shop.base ? "page" : undefined} onClick={close}>
                      {shop.label}
                    </Link>
                    <button
                      type="button"
                      className="drawer-toggle"
                      aria-expanded={isOpen}
                      aria-controls={subId}
                      aria-label={`Catégories ${shop.label}`}
                      onClick={() => setExpanded(isOpen ? "" : shop.key)}
                    >
                      <CaretDown size={20} aria-hidden />
                    </button>
                  </div>
                  <div className={`drawer-sub ${isOpen ? "is-open" : ""}`} id={subId} inert={!isOpen}>
                    <ul>
                      <li>
                        <Link href={shop.base} onClick={close} aria-current={pathname === shop.base ? "page" : undefined}>
                          Tous les produits
                        </Link>
                      </li>
                      {categories[shop.key].map((category) => {
                        const href = `${shop.base}/category/${category.slug}`;
                        return (
                          <li key={category.slug}>
                            <Link href={href} onClick={close} aria-current={pathname === href ? "page" : undefined}>
                              {category.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="drawer-group">
            {groupLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} aria-current={pathname === link.href ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className="button button-sun drawer-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsappLogo size={20} weight="fill" aria-hidden /> Nous écrire sur WhatsApp
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        className={`menu-trigger menu-trigger-${variant}`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-haspopup="dialog"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
      >
        {variant === "icon" ? <List size={24} aria-hidden /> : "Menu"}
      </button>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
