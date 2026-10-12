import type { StaticImageData } from "next/image";

/** Ce dont une carte produit a besoin : calculé côté serveur, sérialisable pour les listes filtrables. */
export type CardData = {
  slug: string;
  href: string;
  name: string;
  brand?: string;
  image: StaticImageData;
  division: "market" | "energy";
  divisionLabel: string;
  facts: string[];
  /** Prix unitaire en FCFA ; absent pour un produit sur devis. */
  price?: number;
  /** Prix dégressif : « dès 5 : 82 000 FCFA ». */
  tierHint?: string;
  inStock: boolean;
  /** Capacité en kWh, pour trier les produits énergétiques. */
  capacityKwh?: number;
};
