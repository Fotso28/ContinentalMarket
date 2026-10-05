# Direction visuelle — références Dribbble

Date d'analyse : 2026-08-26

## Sources

- Promotional Products Ecommerce Website Design — Ascent Innovate Software
  - https://dribbble.com/shots/27654313-Promotional-Products-Ecommerce-Website-Design
  - capture source : 3200 × 2400
- Drinks Ecommerce Website — tubik
  - https://dribbble.com/shots/15504157-Drinks-Ecommerce-Website
  - animation source : boucle MP4 de 7,3 s, 1600 × 1200

Les références servent à étudier la composition et le motion design. Le branding, les textes, les médias et les actifs des auteurs ne seront pas reproduits dans Continental Group.

## Ce que reprend Continental

### Composition

- header compact et lisible ;
- hero à deux registres : proposition de valeur forte et montage visuel premium ;
- hiérarchie typographique éditoriale ;
- transition immédiate vers les divisions après le hero ;
- grands aplats calmes et espacements généreux ;
- sections peu nombreuses, chacune avec une fonction claire ;
- réassurance sobre, sans faux chiffres ni faux témoignages.

### Traduction de la structure

| Référence e-commerce | Continental Group |
| --- | --- |
| Produits promotionnels du hero | Montage de professionnels africains et expertises du groupe |
| Marques clientes | Logos des divisions |
| Bénéfices commerciaux | Exigence, proximité, fiabilité, durabilité |
| Catégories produits | Market, Energy, Software, Pressing |
| CTA d'achat | CTA WhatsApp et accès aux divisions |

### Direction photographique

- personnes africaines exclusivement dans les scènes humaines ;
- lumière naturelle éditoriale ;
- Douala et environnement urbain/tropical crédibles ;
- vêtements, décors et postures contemporains ;
- montages rectangulaires précis, sans blobs ni masques décoratifs gratuits ;
- aucun logo inventé sur les uniformes ou bâtiments.

## Système visuel Continental

- fond principal : ivoire chaud ;
- surface forte : vert forêt profond ;
- texte : vert presque noir ou ivoire ;
- contrôles : vert profond uniquement ;
- or : accent de filet ou repère éditorial, jamais un bouton principal ;
- typographie : serif éditoriale pour les messages de marque, sans-serif neutre pour l'interface ;
- bordures fines, rayons faibles, ombres rares.

## Motion design cible

Le niveau de finition s'inspire de la référence tubik, mais le langage devient plus calme et institutionnel.

### Intro du hero

1. logo et navigation : fondu + translation verticale de 8 px, 300 ms ;
2. titre : révélation par lignes, décalage de 70 ms, 600–750 ms ;
3. montage photo : masque révélateur et translation de 20 px, 700–900 ms ;
4. CTA : apparition après la proposition de valeur, 250 ms.

### Scroll

- images : léger différentiel vertical de 4 à 12 px maximum ;
- sections : révélation à l'entrée avec opacité et translation de 16 px ;
- divisions : image et texte entrent avec un décalage de 80 ms ;
- aucun scroll-jacking ;
- aucune animation qui retarde l'accès au contenu.

### Bandeau des logos

- desktop/tablette paysage : cinq identités statiques, chacune visible une seule fois ;
- mobile : boucle horizontale infinie, vitesse lente et constante ;
- pause lorsque l'onglet est masqué ;
- pause ou version statique avec `prefers-reduced-motion: reduce` ;
- logos officiels non déformés et sans recoloration arbitraire.

### Interactions

- boutons : transition couleur/contraste de 160–200 ms ;
- liens : filet ou flèche qui progresse, sans rebond ;
- menu mobile : panneau plat, ouverture 280–340 ms ;
- montage du hero : déplacement très léger au pointeur uniquement sur appareils compatibles ;
- aucune animation décorative permanente hors marquee mobile.

## Garde-fous performance et accessibilité

- animations CSS pour les micro-interactions ; Motion uniquement pour orchestration complexe ;
- `transform` et `opacity` privilégiés ;
- aucune vidéo lourde en autoplay dans le hero initial ;
- images AVIF/WebP via `next/image` ;
- stabilité de mise en page garantie par dimensions explicites ;
- version sans mouvement complète ;
- texte et CTA toujours utilisables avant la fin des animations.

## Décision de design

La page Continental ne sera pas une copie littérale. Elle reprendra la discipline du premier design et le niveau de chorégraphie du second, tout en conservant l'identité Continental : luxe sobre, personnes africaines, Douala, vert forêt, ivoire et interactions maîtrisées.
