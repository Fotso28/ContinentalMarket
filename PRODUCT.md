# Continental Group

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

La page principale présente Continental Group et oriente vers ses quatre métiers : Continental Market, Continental Energy, Continental Software et Continental Pressing. Elle permet aussi de contacter le groupe.

## Users

Le contenu existant s'adresse aux entreprises, aux institutions et aux familles. La priorité entre ces publics reste ouverte ; les propositions de refonte doivent permettre de découvrir les quatre métiers sans présumer d'un public exclusif.

## Operating Context

Le site existant indique Douala, Logpom, derrière Papirus, et propose une prise de contact WhatsApp. Ces informations proviennent du code et devront être revalidées avant une éventuelle publication.

## Capabilities and Constraints

- Projet existant : Next.js, React, TypeScript et CSS/Tailwind, dans `apps/web`.
- La demande actuelle porte sur des propositions pour la page d'accueil, avec du scrollytelling. Aucune direction n'est encore choisie.
- Les fonctionnalités futures décrites dans `docs/architecture/phase-0-foundation.md` constituent une proposition d'architecture, pas une preuve de fonctionnalités livrées.
- Ne pas inventer de chiffres, témoignages, clients, réalisations, certifications, délais ou caractéristiques techniques.

## Brand Commitments

- Conserver le nom Continental Group et les noms de ses quatre divisions.
- Les logos fournis dans `images/` et `apps/web/public/images/landing/` sont les références de marque.
- Demande explicite : une esthétique premium, singulière, qui évite l'apparence générique des sites produits par IA.
- La présentation existante est une référence de contenu et un point de comparaison ; sa composition et sa palette ne sont pas imposées à la refonte.

## Evidence on Hand

- `apps/web/src/app/page.tsx` : contenu et actions actuellement implémentés.
- `images/` : logos et photographies de produits fournies au projet.
- `apps/web/output/playwright/` : anciennes captures utilisables pour comprendre les propositions précédentes ; ce ne sont pas des captures fraîches.
- `apps/web/public/images/landing/` : médias existants. Certaines images sont générées selon `apps/web/design-qa.md` ; ne pas les présenter comme des photographies documentaires des véritables équipes.

## Product Principles

- Permettre de comprendre l'activité de chaque division et de la rejoindre directement.
- Donner des preuves et des informations concrètes plutôt que des promesses interchangeables.
- Relier les quatre métiers par une narration lisible sans retarder l'accès aux offres ni au contact.
- Faire fonctionner le parcours avec le défilement natif, sur mobile et lorsque les animations sont réduites.
