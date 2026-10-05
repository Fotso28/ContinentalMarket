# Proposition « Le comptoir » — page d'accueil Continental Group

Date : 2026-10-05. Statut : proposition visuelle, en attente de validation. Aucun code de `apps/web` n'est modifié.

Fichiers : `index.html` (maquette HTML autonome), `comp-desktop.png` (1440 px, pleine page), `comp-mobile.png` (390 px, pleine page), `assets/` (photos et logos réels du projet).

## Résumé

La page présente Continental Group comme ce qu'il est : quatre enseignes à la même adresse de Logpom, jointes par un même numéro WhatsApp. Elle sert d'abord le visiteur qui cherche vite un métier et un contact, sur téléphone, en pleine journée.

Action principale : écrire sur WhatsApp à l'enseigne concernée.

## Direction

- **Stratégie couleur : engagée.** Le vert profond du logo porte le héros, le comptoir Market et les fonds forts ; le blanc et un gris teinté de vert portent le reste ; l'or du logo est réservé à deux signaux, le bouton WhatsApp et le bloc contact. Pas de fond crème ni ivoire.
- **Phrase de scène :** un gérant de boutique à Logpom ouvre le site sur son téléphone à 13 h, devant son magasin, pour savoir si Continental a une batterie 15 kWh et à qui écrire. D'où le thème clair, le contraste élevé, les grands corps et le numéro visible partout.
- **Références nommées :** le panneau d'enseignes peint à l'entrée d'un centre d'affaires de Douala (le « tableau » des quatre métiers) ; le catalogue papier d'un grossiste (listes concrètes, références, pas de slogans).
- **Typographie :** une seule famille, Archivo (fonte variable, axes graisse et chasse). Chasse élargie et graisse 800 pour les titres, chasse normale pour le texte, chasse réduite pour les petites étiquettes. Fraunces, Manrope, Inter et DM Sans sont écartées : ce sont les réflexes des générateurs.
- **Le geste mémorable :** le tableau des quatre enseignes, en grandes lignes réglées, avec les vrais logos et une action par ligne. Le reste de la page reste calme.

## Ce que la maquette évite volontairement

- Les trios de verbes décoratifs, les slogans en deux phrases à point, l'accent coloré sur un mot du titre.
- Les étiquettes capitales au-dessus de chaque section et les numéros 01 / 02 / 03.
- Les grilles de cartes identiques et les portraits générés.
- Les points médians, les flèches en fin de lien, le texte en dégradé.

## Contenu et preuves

Tout le contenu vient du projet : textes de la page actuelle, slogan du logo Market (« l'univers du gros à petit prix »), mention « Express » du logo Pressing, photos WhatsApp d'installations Continental Energy dans `images/produits`, visuels fournisseurs Sunlux et Aurora Power, contenu de la simulation `software-demo.tsx`.

À valider avant toute mise en ligne :

- Les caractéristiques des batteries (Sunlux 48 V 15 kWh ; Aurora Power 16 kWh, 51,2 V, 314 Ah, garantie 6 ans) sont lues sur les visuels fournisseurs, pas confirmées par Continental.
- Les trois photos d'installation portent l'autocollant WhatsApp « Continental Energy » ; il faudra les originaux sans texte, ou de nouvelles prises de vue.
- La photo du héros montre un stock de batteries Sunlux, pas les locaux de Continental ; la légende le dit.
- Aucune photo réelle n'existe pour Market, Software et Pressing : la maquette les traite par le texte et les logos. Des photos de la boutique, du pressing et d'un écran client renforceraient fortement la page.
- Adresse, numéros et horaires restent à confirmer.

## Suite proposée

1. Valider ou corriger la direction sur la base des deux images.
2. Transformer la maquette en page Next.js dans `apps/web` avec `/impeccable craft`, en conservant les composants existants utiles (`software-demo.tsx`, `site-header.tsx`).
3. Remplacer les visuels de transition par des photos réelles de chaque enseigne.
