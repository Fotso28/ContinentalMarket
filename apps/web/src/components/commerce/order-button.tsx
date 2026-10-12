import { catalogIsDemo } from "@/lib/catalog/format";

/**
 * Bouton de commande. Tant que le catalogue est fictif (`catalogIsDemo`), il est désactivé
 * et renvoie à la note qui explique pourquoi : aucune conversation ne part pour un produit inexistant.
 */
export function OrderButton({
  href,
  disabledLabel,
  describedBy,
  children,
}: {
  href: string;
  disabledLabel: string;
  describedBy: string;
  children: React.ReactNode;
}) {
  if (!catalogIsDemo) {
    return (
      <a className="button button-sun" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" className="button button-sun" disabled aria-describedby={describedBy}>
      {disabledLabel}
    </button>
  );
}
