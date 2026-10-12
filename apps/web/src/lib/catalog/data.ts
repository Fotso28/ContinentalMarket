import type { Category, Product } from "./types";

// Photos du site (Market : visuels générés ; Energy : photos fournisseur et dérivés validés).
import marketSmartphones from "../../../public/images/landing/market-smartphones.png";
import marketComputers from "../../../public/images/landing/market-computers.png";
import marketDining from "../../../public/images/landing/market-dining.png";
import energySunluxRange from "../../../public/images/landing/energy-sunlux-range.png";
import energyAuroraInstallation from "../../../public/images/landing/energy-aurora-installation.png";
import auroraVisuel from "../../../public/images/products/energy/aurora-yf-lfp-16kwh-visuel.jpg";
import auroraTrio from "../../../public/images/products/energy/modules-aurora-trio.jpg";
import sunluxStock from "../../../public/images/products/energy/stock-palettes-sunlux.jpg";
import installationOnduleur from "../../../public/images/products/energy/installation-onduleur-mural.jpg";

/**
 * Données d'exemple. Les noms, prix et coloris des produits Market sont fictifs ;
 * les caractéristiques Energy proviennent des visuels fournisseurs (à valider).
 * Remplacer par la lecture du backoffice une fois l'API branchée.
 */

export const categories: Category[] = [
  {
    slug: "telephones",
    name: "Téléphones",
    division: "market",
    intro: "Smartphones et accessoires pour un usage quotidien.",
    image: marketSmartphones,
  },
  {
    slug: "informatique",
    name: "Informatique",
    division: "market",
    intro: "Ordinateurs portables et de bureau pour la maison et le travail.",
    image: marketComputers,
  },
  {
    slug: "maison-mobilier",
    name: "Maison & mobilier",
    division: "market",
    intro: "Mobilier et équipement de la maison, à l’unité comme en quantité.",
    image: marketDining,
  },
  {
    slug: "batteries",
    name: "Batteries de stockage",
    division: "energy",
    intro: "Stockage lithium pour sécuriser l’alimentation de vos installations.",
    image: energySunluxRange,
  },
  {
    slug: "onduleurs",
    name: "Onduleurs hybrides",
    division: "energy",
    intro: "Onduleurs hybrides, pensés pour être associés à un stockage lithium.",
    image: energyAuroraInstallation,
  },
];

export const products: Product[] = [
  // Market — produits généraux
  {
    slug: "smartphone-128-go",
    name: "Smartphone 128 Go",
    division: "market",
    categorySlug: "telephones",
    summary: "Modèle 128 Go, disponible en plusieurs coloris.",
    description:
      "Smartphone 128 Go pour la photo, les messages et les applications de tous les jours. Choisissez votre coloris ; le prix baisse à partir de cinq unités.",
    images: [marketSmartphones],
    attributes: { reference: "TEL-128" },
    price: 85000,
    tiers: [{ minQty: 5, label: "À partir de 5 unités", unitPrice: 82000 }],
    variantLabel: "Couleur",
    variants: [
      { label: "Noir", swatch: "#1d2321", available: true },
      { label: "Vert forêt", swatch: "#073e2d", available: true },
      { label: "Sable", swatch: "#d9c7a7", available: false },
    ],
    availability: "in_stock",
    related: ["smartphone-64-go", "ordinateur-portable-14"],
  },
  {
    slug: "smartphone-64-go",
    name: "Smartphone 64 Go",
    division: "market",
    categorySlug: "telephones",
    summary: "Modèle 64 Go, prix d’entrée de gamme.",
    description: "Smartphone 64 Go, pour un usage simple au quotidien.",
    images: [marketSmartphones],
    attributes: { reference: "TEL-64" },
    price: 58000,
    variantLabel: "Couleur",
    variants: [
      { label: "Noir", swatch: "#1d2321", available: true },
      { label: "Bleu nuit", swatch: "#2a4a6b", available: true },
    ],
    availability: "in_stock",
    related: ["smartphone-128-go"],
  },
  {
    slug: "ordinateur-portable-14",
    name: "Ordinateur portable 14 pouces",
    division: "market",
    categorySlug: "informatique",
    summary: "Écran 14 pouces, pour le travail et les études.",
    description:
      "Ordinateur portable 14 pouces. Le prix baisse à partir de trois unités, pour les achats en quantité.",
    images: [marketComputers],
    attributes: { reference: "PC-14" },
    price: 340000,
    tiers: [{ minQty: 3, label: "À partir de 3 unités", unitPrice: 325000 }],
    availability: "in_stock",
    related: ["ordinateur-bureau-compact", "smartphone-128-go"],
  },
  {
    slug: "ordinateur-bureau-compact",
    name: "Ordinateur de bureau compact",
    division: "market",
    categorySlug: "informatique",
    summary: "Format compact, pour le bureau et l’accueil.",
    description: "Ordinateur de bureau compact, livré sur commande.",
    images: [marketComputers],
    attributes: { reference: "PC-DT" },
    price: 290000,
    availability: "on_order",
    related: ["ordinateur-portable-14"],
  },
  {
    slug: "table-salle-a-manger-bois",
    name: "Table de salle à manger en bois",
    division: "market",
    categorySlug: "maison-mobilier",
    summary: "Plateau en bois pour la salle à manger.",
    description: "Table de salle à manger en bois, avec plateau et pieds assortis.",
    images: [marketDining],
    attributes: { reference: "MOB-TAB", matiere: "Bois", dimensions: "180 × 90 × 75 cm" },
    price: 185000,
    availability: "in_stock",
    related: ["chaises-salle-a-manger-lot-2"],
  },
  {
    slug: "chaises-salle-a-manger-lot-2",
    name: "Chaises de salle à manger, lot de 2",
    division: "market",
    categorySlug: "maison-mobilier",
    summary: "Lot de deux chaises assorties à la table.",
    description: "Lot de deux chaises de salle à manger, en deux coloris.",
    images: [marketDining],
    attributes: { reference: "MOB-CHA-2", matiere: "Bois et tissu" },
    price: 95000,
    variantLabel: "Coloris",
    variants: [
      { label: "Beige", swatch: "#d9c7a7", available: true },
      { label: "Noir", swatch: "#1d2321", available: true },
    ],
    availability: "in_stock",
    related: ["table-salle-a-manger-bois"],
  },

  // Energy — produits énergétiques (sur devis)
  {
    slug: "aurora-yf-lfp-16kwh",
    name: "Batterie lithium YF-LFP-16KWH",
    division: "energy",
    categorySlug: "batteries",
    brand: "Aurora Power",
    summary: "Module de stockage lithium de 16 kWh, en version sur pied.",
    description:
      "Module de stockage lithium de 16 kWh (51,2 V, 314 Ah), en version sur pied. L’installation et la configuration sont établies sur devis, selon votre site.",
    images: [auroraVisuel, auroraTrio],
    attributes: {
      reference: "YF-LFP-16KWH",
      type_appareil: "Batterie lithium",
      capacite_kwh: 16,
      tension_v: 51.2,
      capacite_ah: 314,
      installation: "Module sur pied",
      garantie_ans: 6,
    },
    availability: "in_stock",
    related: ["sunlux-15-kwh", "onduleur-hybride-aurora"],
  },
  {
    slug: "sunlux-15-kwh",
    name: "Batterie lithium Sunlux 15 kWh",
    division: "energy",
    categorySlug: "batteries",
    brand: "Sunlux",
    summary: "Batterie lithium de 15 kWh, 48 V.",
    description:
      "Batterie lithium Sunlux de 15 kWh, 48 V. Le dimensionnement et l’installation sont établis sur devis.",
    images: [energySunluxRange, sunluxStock],
    attributes: {
      reference: "SUNLUX-15",
      type_appareil: "Batterie lithium",
      capacite_kwh: 15,
      tension_v: 48,
    },
    availability: "in_stock",
    related: ["aurora-yf-lfp-16kwh"],
  },
  {
    slug: "onduleur-hybride-aurora",
    name: "Onduleur hybride Aurora Power",
    division: "energy",
    categorySlug: "onduleurs",
    brand: "Aurora Power",
    summary: "Onduleur hybride, à associer à un stockage lithium.",
    description:
      "Onduleur hybride en montage mural, présenté ici avec son stockage lithium. Les caractéristiques électriques détaillées sont données sur devis.",
    images: [energyAuroraInstallation, installationOnduleur],
    attributes: {
      reference: "AURORA-HYB",
      type_appareil: "Onduleur hybride",
      installation: "Montage mural",
    },
    availability: "in_stock",
    related: ["aurora-yf-lfp-16kwh"],
  },
];
