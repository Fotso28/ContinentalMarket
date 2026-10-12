import type { StaticImageData } from "next/image";

/** Deux divisions e-commerce : Market (produits généraux) et Energy (produits énergétiques). */
export type Division = "market" | "energy";

/** Groupe d'affichage d'un attribut dans la fiche technique. */
export type AttributeGroup = "general" | "electrique" | "installation" | "garantie" | "dimensions";

/**
 * Définition d'un attribut, côté backoffice : nom, unité, groupe et périmètre.
 * `scope` indique pour quelle division l'attribut s'affiche (`all` : les deux).
 */
export type AttributeDef = {
  key: string;
  label: string;
  group: AttributeGroup;
  scope: Division | "all";
  unit?: string;
};

export type AttributeValue = string | number;

export type Category = {
  slug: string;
  name: string;
  division: Division;
  intro: string;
  image: StaticImageData;
};

/** Variante d'un produit général (couleur, par exemple). */
export type Variant = {
  label: string;
  swatch?: string;
  available: boolean;
};

/** Palier tarifaire : `unitPrice` s'applique à partir de `minQty` unités. */
export type PriceTier = {
  minQty: number;
  label: string;
  unitPrice: number;
};

export type Product = {
  slug: string;
  name: string;
  division: Division;
  categorySlug: string;
  brand?: string;
  summary: string;
  description: string;
  images: StaticImageData[];
  attributes: Record<string, AttributeValue>;
  /** Prix de base en FCFA. Absent pour les produits énergétiques : ils se vendent sur devis. */
  price?: number;
  tiers?: PriceTier[];
  variantLabel?: string;
  variants?: Variant[];
  availability: "in_stock" | "on_order";
  related: string[];
};

export type SpecRow = { label: string; value: string };

export type SpecGroup = { group: AttributeGroup; title: string; rows: SpecRow[] };
