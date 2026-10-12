"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";

/**
 * Retour depuis une fiche produit. Quand le visiteur vient d'une page du site, on revient exactement là
 * (tri, filtre et défilement de la liste conservés) ; sinon le lien mène à la catégorie du produit.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <Link
      className="back-link"
      href={href}
      onClick={(event) => {
        try {
          const cameFromSite = document.referrer !== "" && new URL(document.referrer).origin === window.location.origin;
          if (cameFromSite && window.history.length > 1) {
            event.preventDefault();
            router.back();
          }
        } catch {
          /* lien de repli */
        }
      }}
    >
      <CaretLeft size={20} weight="bold" aria-hidden />
      <span>Retour</span>
      <span className="back-link-where">{label}</span>
    </Link>
  );
}
