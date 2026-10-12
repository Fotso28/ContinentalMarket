import type { AttributeDef, AttributeGroup } from "./types";

/**
 * Attributs du catalogue. Ils décrivent ce qui distingue un produit général d'un produit
 * énergétique : la fiche technique affiche les attributs du périmètre de la division.
 * À aligner sur les attributs réellement saisis dans le backoffice.
 */
export const attributeDefs: AttributeDef[] = [
  { key: "marque", label: "Marque", group: "general", scope: "all" },
  { key: "reference", label: "Référence", group: "general", scope: "all" },
  { key: "matiere", label: "Matière", group: "general", scope: "market" },
  { key: "dimensions", label: "Dimensions", group: "dimensions", scope: "market" },
  { key: "type_appareil", label: "Type", group: "general", scope: "energy" },
  { key: "capacite_kwh", label: "Capacité", unit: "kWh", group: "electrique", scope: "energy" },
  { key: "tension_v", label: "Tension nominale", unit: "V", group: "electrique", scope: "energy" },
  { key: "capacite_ah", label: "Ampères-heures", unit: "Ah", group: "electrique", scope: "energy" },
  { key: "installation", label: "Mode d'installation", group: "installation", scope: "energy" },
  { key: "garantie_ans", label: "Garantie", unit: "ans", group: "garantie", scope: "energy" },
];

export const attributeGroupTitles: Record<AttributeGroup, string> = {
  general: "Informations générales",
  dimensions: "Dimensions",
  electrique: "Caractéristiques électriques",
  installation: "Installation",
  garantie: "Garantie",
};

/** Ordre d'affichage des groupes dans la fiche technique. */
export const attributeGroupOrder: AttributeGroup[] = ["general", "electrique", "installation", "garantie", "dimensions"];
