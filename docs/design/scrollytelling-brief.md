# Propositions de scrollytelling pour Continental Group

Statut : exploration ; aucune direction approuvée.
Date : 2026-10-04.

## Brief

Repenser la page principale de Continental Group pour lui donner une identité propre et une narration au défilement. Le visiteur doit comprendre le lien entre Market, Energy, Software et Pressing, puis pouvoir rejoindre un métier ou prendre contact. Le cadre de cette étape est la proposition de trois directions visuelles, avant modification de l'application.

## Règles communes

- Une narration courte en quatre métiers, avec une ouverture et une conclusion.
- Navigation directe vers les métiers et contact disponibles sans parcourir toute l'histoire.
- Défilement vertical natif. Les sections fixées sont limitées et libèrent normalement le document.
- Sur mobile : séquence verticale simplifiée, texte lisible et visuels chargés progressivement.
- Avec réduction des animations : mêmes contenus dans le même ordre, sans transformations nécessaires à leur lecture.
- Les scènes des maquettes sont des intentions photographiques, pas une preuve de réalisations ou de véritables collaborateurs.
- Le rendu premium doit venir de la composition, de la qualité des images, du texte et du rythme ; chaque mouvement doit expliquer une transition.

## Les gestes qui comptent

### Intention

Un film de métiers piloté par le défilement. La qualité se voit dans les gestes, les matériaux et les détails. Le premier écran donne le ton avec une grande image d'un geste de travail, les quatre verbes « Équiper. Alimenter. Piloter. Soigner. », un accès aux quatre divisions et un contact visible.

### Système visuel

Vert très profond, blanc net et accent jaune issu du logo. Typographie sans empattements, précise et expressive par ses proportions. Photographies en gros plan : mains, outils, équipements et textiles, lumière latérale, matière visible. Éviter les portraits posés et le décor de banque d'images. Une grande scène domine chaque moment ; l'interface est discrète mais lisible.

### Défilement

Une séquence fixée de quatre scènes. Une main qui équipe une commande Market conduit au branchement d'une installation Energy ; le geste suivant accompagne le suivi d'activité Software ; le dernier montre le soin textile Pressing. Une forme ou une direction de geste commune assure le raccord visuel. À chaque scène, le verbe actif, une phrase concrète et le lien vers le métier changent ensemble. La séquence libère ensuite une section de contact normale.

Sur téléphone, les scènes deviennent quatre sections verticales ; la narration reste entière. Pas de film lourd obligatoire : des images fixes bien composées et des transitions maîtrisées peuvent porter la première version.

### Atout et exigence

La direction la plus forte pour montrer la qualité du travail. Son résultat dépend de prises de vue cohérentes : les maquettes n'établissent aucune preuve de gestes ou de réalisations réels de Continental.

## Une journée à Douala

### Intention

Un reportage situé dans la ville où le groupe est présent. Le visiteur suit des besoins du quotidien et découvre comment les métiers y répondent. La journée est un fil narratif proposé, pas une promesse d'horaires ni la description d'un parcours client réel.

### Système visuel

Fond blanc, images documentaires larges, contrastes naturels, couleurs de marque réservées aux repères et aux actions. Typographie de reportage contemporain, titres courts, texte concret et espace pour regarder les images. Les photographies montrent la ville, les espaces de travail et les personnes en action.

### Défilement

L'ouverture sur Douala s'élargit avec le premier défilement. Market introduit l'équipement du quotidien, Energy la continuité de l'activité, Software son pilotage et Pressing le soin des vêtements. Le texte passe à côté d'une image temporairement fixe ; celle-ci change lorsque le récit rejoint le métier suivant. Des passages calmes entre les chapitres évitent une animation constante. Le récit se termine par l'adresse et le contact.

### Atout et exigence

La piste la plus ancrée dans le territoire et la vie des clients. Elle nécessite des photos authentiques et reconnaissables du contexte local. Une banque d'images interchangeable affaiblirait son intention.

## Le fil Continental

### Intention

Une signature graphique relie les quatre métiers. Le visiteur suit un fil de marque et peut rejoindre directement n'importe quel chapitre. L'inspiration de reliure visible sert à rendre la relation entre les chapitres tangible ; elle ne devient pas un décor de faux livre.

### Système visuel

Composition de doubles pages contemporaines, marges structurées et axe de liaison visible. Blanc minéral, vert Continental et fil jaune discret. Typographie sobre, légendes utiles et photos de formats volontairement différents. Les quatre métiers héritent du même système sans être enfermés dans quatre cartes identiques.

### Défilement

Le fil démarre près du logo, accompagne l'ouverture puis progresse le long des quatre chapitres. Les noms des métiers forment une navigation persistante ; celui du chapitre courant est signalé. Chaque passage ouvre une nouvelle composition photographique et textuelle. Le fil termine sa course au contact, où toutes les entrées restent directement accessibles.

Sur mobile, le fil devient un repère latéral fin et les compositions se lisent sur une seule colonne. La version sans animation affiche le fil et tous les contenus dans leur état final.

### Atout et exigence

La piste la plus adaptée à une identité durable de groupe, réutilisable sur les pages des divisions. Le fil doit expliquer les relations et la progression ; un tracé purement décoratif serait insuffisant.

## Choix recommandé

Pour une expérience de scrollytelling marquante : « Les gestes qui comptent ». Pour mettre en avant l'ancrage local : « Une journée à Douala ». Pour construire une signature graphique commune aux quatre divisions : « Le fil Continental ».

Trois maquettes indépendantes ont été générées avec l'outil ImageGen intégré et présentées dans cet ordre :

1. `mockups/scrollytelling/les-gestes-qui-comptent.png`
2. `mockups/scrollytelling/une-journee-a-douala.png`
3. `mockups/scrollytelling/le-fil-continental.png`

Chaque image possède un fichier `.png.json` contenant son prompt exact, ses références, son ordre d'affichage et `approved: false`. Les photographies sont générées pour exprimer la direction artistique ; elles ne constituent pas des photographies réelles de l'entreprise. Le choix reste ouvert. Aucun de ces concepts n'est encore implémenté dans l'application.

## Sources et outils

- Impeccable 4.5.0 installé dans `.agents/skills/impeccable/` depuis le dépôt officiel `pbakaus/impeccable`, chemin `.agents/skills/impeccable`.
- Moteur Impeccable initialisé ; aucun hook automatique ajouté.
- Product Design et ImageGen pour proposer trois maquettes indépendantes.
- Mobbin : écarté à la demande de l'utilisateur. Aucune référence Mobbin n'a été utilisée ; poursuivre avec les ressources du projet et les références publiques utiles.
- Outils de réalisation : voir `toolkit.md` pour Product Design, les skills GSAP et Playwright.

## Décisions ouvertes

- Direction visuelle à choisir après présentation des maquettes.
- Choix des photographies documentaires réelles à utiliser au moment de la réalisation.
