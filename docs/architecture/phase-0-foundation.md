# Continental Group — Architecture de référence

Statut : proposition d'architecture, avant implémentation  
Version : 0.1  
Date : 2026-08-26  
Timezone métier par défaut : `Africa/Douala`  
Devise par défaut : `XAF`

## 1. Compréhension du produit

Continental Group est un écosystème de marque porté par une plateforme transactionnelle commune à Market et Energy. La page Continental Group présente la marque mère et oriente vers ses divisions. Software et Pressing sont, dans le périmètre actuel, des landing pages éditoriales administrables destinées à présenter l'offre et à générer des prises de contact. Elles ne disposent pas encore de moteur SaaS, de licences, de réservation ou de workflow opérationnel. Market porte le commerce omnicanal ; Energy réutilise ce moteur et ajoute le dimensionnement solaire.

Principes directeurs :

- monolithe modulaire au lancement, conçu pour extraire des services seulement si la charge ou l'organisation le justifie ;
- frontend unique Next.js avec univers de marque cohérents ;
- API NestJS seule autorité sur les prix, stocks, permissions et transitions d'état ;
- MySQL comme source de vérité transactionnelle ; Redis comme accélérateur et infrastructure asynchrone ;
- événements métier internes pour découpler notifications, analytics et traitements différés de Market et Energy ;
- configuration administrable pour les contenus, tarifs, coefficients et parcours variables.

## 2. Architecture globale

```text
Clients Web/PWA
      |
      v
Next.js Web (SSR/SSG/ISR, BFF léger sans logique métier sensible)
      |
      v
NestJS REST API /api/v1
      |
      +--> Modules métier et services applicatifs
      +--> Prisma --> MySQL 8 (source de vérité)
      +--> Redis (cache, rate limit, locks, BullMQ)
      +--> S3/R2/MinIO (objets et médias)
      +--> PaymentProvider / MailProvider / NotificationProvider
      +--> Workers BullMQ
```

Choix structurant : un monolithe modulaire déployable en une API et un worker. Les frontières de modules et événements sont explicites, sans coût opérationnel prématuré de microservices.

## 3. Monorepo

```text
apps/
  web/                 # Next.js App Router
  api/                 # NestJS REST API
  worker/              # Bootstrap NestJS/BullMQ optionnel dès que requis
packages/
  ui/                  # design system React sans logique métier
  contracts/           # types générés depuis OpenAPI
  shared/              # utilitaires purs et constants non sensibles
  eslint-config/
  typescript-config/
docker/
docs/
  architecture/
  adr/
  api/
.github/workflows/
```

`packages/shared` ne devient pas un dépôt de logique métier. Les règles métier restent dans les modules NestJS et, lorsque nécessaire, dans des fonctions de domaine testables proches du module propriétaire.

## 4. Architecture frontend

```text
apps/web/src/
  app/
    (group)/
    market/
    energy/
    software/
    pressing/
    (commerce)/cart/
    (commerce)/checkout/
    account/
    admin/
    api/                # endpoints Next strictement nécessaires (PWA/auth proxy)
  features/
    auth/ catalog/ search/ cart/ checkout/ account/
    energy/ landing-pages/ lead-capture/ admin/
  components/
  lib/
    api/ i18n/ analytics/ auth/ seo/ pwa/
  hooks/
  styles/
```

- Server Components par défaut pour lecture, SEO et composition.
- Client Components limités aux interactions, formulaires et états locaux.
- TanStack Query pour données serveur interactives ; Zustand uniquement pour état UI global ou panier invité si nécessaire.
- React Hook Form + Zod pour l'expérience de saisie ; le backend revalide systématiquement.
- Client API centralisé, erreurs normalisées et types issus d'OpenAPI.
- Dictionnaires `fr` séparés des composants, architecture prête pour `en`.
- Routes admin protégées côté serveur et permissions confirmées par l'API.

## 5. Architecture backend NestJS

```text
src/
  auth/ users/ access-control/
  divisions/ cms/ media/
  catalog/ pricing/ search/
  inventory/ carts/ checkout/ orders/
  payments/ promotions/
  energy/ leads/
  notifications/ analytics/ audit/
  health/ admin/ common/
```

Chaque module contient ses couches `domain`, `application`, `infrastructure` et `presentation` lorsque la complexité le justifie. Les controllers traduisent HTTP ; les services applicatifs orchestrent ; les repositories masquent Prisma sur les agrégats critiques. Les transactions restent au niveau du cas d'usage.

Conventions API :

- version URI `/api/v1` ;
- succès `{ "data": ..., "meta": ... }` ;
- erreurs avec `statusCode`, `code`, `message`, `errors`, `requestId` ;
- pagination offset pour catalogues classiques, curseur pour journaux et flux volumineux ;
- Swagger exposé seulement dans les environnements autorisés ;
- idempotency key obligatoire pour checkout, ordre de paiement et webhooks.

## 6. Diagramme des modules

```text
Identity/Auth ----> Access Control ----> Audit
      |                   |
      v                   v
Account <----------- Admin/CMS/Media
      |
      +------> Cart --> Checkout --> Order --> Payment --> Shipment
                    |         |          |
Catalog --> Pricing-+     Inventory -----+----> Notifications
   |                                      \
   +--> Market                              -> Analytics events
   +--> Energy --> Solar Configurator --> Quote

CMS --> Group Landing
    +--> Software Landing --> Lead
    +--> Pressing Landing --> Lead
```

Market et Energy partagent `catalog`, `pricing`, `inventory`, `cart`, `order` et `payment`. Les données spécialisées Energy étendent les produits communs au lieu de dupliquer le moteur commercial. Group, Software et Pressing consomment le CMS et le module générique de leads ; ils ne constituent pas des domaines transactionnels dans cette version.

## 7. Modèle MySQL initial

### Identité et organisation

- `User`, `UserSession`, `EmailVerificationToken`, `PasswordResetToken`
- `Role`, `Permission`, `UserRole`, `RolePermission`
- `Address`, `Division`

### Catalogue et commerce

- `Category` hiérarchique, rattachable à une ou plusieurs divisions
- `Brand`, `Product`, `ProductDivision`, `ProductVariant`
- `ProductImage`, `ProductAttribute`, `AttributeValue`, `VariantAttributeValue`
- `ProductPrice`, `ProductPriceTier`, `Promotion`, `PromotionRule`, `Coupon`
- `Warehouse`, `Inventory`, `InventoryMovement`, `StockReservation`
- `Cart`, `CartItem`, `Wishlist`, `WishlistItem`
- `Order`, `OrderItem`, `OrderAddress`, `OrderStatusHistory`
- `Payment`, `PaymentTransaction`, `Shipment`

### Energy

- `EnergyAppliance`, `EnergyConfiguratorSetting`
- `SolarConfiguration`, `SolarConfigurationItem`
- `SolarRecommendation`, `EnergyQuoteRequest`

### Plateforme

- `CmsEntry`, `CmsRevision`, `Media`
- `Lead` avec origine (`GROUP`, `SOFTWARE`, `PRESSING`, `ENERGY`) et consentements explicites
- `Notification`, `NotificationPreference`
- `AuditLog`, `IdempotencyKey`, `OutboxEvent`

Règles importantes :

- identifiants internes `BigInt` ou UUID/ULID à trancher par ADR ; identifiants publics non séquentiels obligatoires ;
- montants stockés en unités monétaires entières (`BIGINT`), jamais en flottants ;
- snapshots de nom, SKU, quantité et prix dans `OrderItem` ; une commande ne dépend pas du catalogue courant ;
- contrainte unique sur `(warehouseId, variantId)` dans `Inventory` ;
- contraintes de tiers empêchant les quantités invalides, avec détection applicative des plages qui se chevauchent ;
- réservations de stock expirables et mouvements immuables ;
- dates persistées en UTC ; conversion à la présentation ;
- JSON limité aux snapshots, payloads fournisseurs sécurisés et règles variables ; relations normales pour le cœur métier ;
- suppression physique interdite pour commandes, transactions, mouvements et audits.

## 8. Stratégie d'authentification et d'autorisation

- mot de passe Argon2id avec paramètres calibrés par environnement ;
- access token JWT court ; refresh token opaque ou JWT rotatif en cookie `HttpOnly`, `Secure`, `SameSite` ;
- seul le hash du refresh token est persisté par session ; détection de réutilisation et révocation de la famille ;
- protection CSRF pour requêtes authentifiées par cookie ; CORS avec allowlist stricte ;
- vérification email, réinitialisation à usage unique, throttling et protection brute-force ;
- RBAC par permissions atomiques et portée de division ; contrôles dans les guards et services ;
- journalisation des changements sensibles sans secrets ni données de paiement complètes ;
- suppression de compte conforme aux obligations de conservation à confirmer.

## 9. Stratégie paiement

`PaymentProvider` expose une interface stable : création d'intention, vérification de statut, remboursement, validation de webhook. Chaque adaptateur fournisseur traduit ses statuts vers le modèle interne.

Flux :

1. l'API recalcule prix, promotions, livraison et stock ;
2. une transaction crée commande, snapshots, réservations et paiement `PENDING` ;
3. le provider est appelé avec une référence idempotente ;
4. le webhook signé est enregistré, dédupliqué puis traité ;
5. la transaction de paiement et l'état de commande évoluent atomiquement ;
6. les effets secondaires passent par l'outbox et BullMQ.

Aucun credential ni format de signature n'est supposé. Les contrats MTN MoMo, Orange Money, carte, virement et paiement à la livraison sont **À VALIDER AVEC CONTINENTAL GROUP ET LES FOURNISSEURS**.

## 10. Architecture PWA

- manifest web, jeux d'icônes et métadonnées d'installation ;
- service worker versionné et stratégie explicite par ressource ;
- cache-first pour assets immuables et polices ; stale-while-revalidate pour images publiques ; network-first pour pages publiques ;
- aucune mise en cache persistante de tokens, checkout, compte, admin, paiements ou réponses personnalisées sensibles ;
- page offline dédiée avec reprise claire ;
- queue offline limitée aux actions non critiques ; jamais de soumission différée opaque de paiement ou commande ;
- notifications push uniquement après consentement et lorsque le provider est choisi.

## 11. Déploiement

### Développement

Docker Compose : `mysql`, `redis`, `minio`, `api`, `worker` ; le web peut tourner dans Docker ou localement pour une boucle rapide.

### Production cible

```text
CDN/WAF
  +--> Next.js Web (autoscaling)
  +--> NestJS API (containers, >= 2 replicas)
           +--> Worker BullMQ
           +--> MySQL managé + backups/PITR
           +--> Redis managé
           +--> S3/R2
           +--> observabilité et secrets manager
```

- environnements séparés : development, staging, production ;
- migrations exécutées comme job contrôlé avant rollout compatible ;
- health/readiness probes, logs JSON, request IDs, métriques et alertes ;
- CI : install, lint, typecheck, unit/integration, build, e2e, scans, deploy ;
- stratégie d'hébergement, région, RPO/RTO et budget : **À VALIDER AVEC CONTINENTAL GROUP**.

## 12. Sitemap initial

```text
/
/market
/market/search
/market/category/[slug]
/market/product/[slug]
/energy
/energy/category/[slug]
/energy/product/[slug]
/energy/configurator
/energy/quote
/software
/software/[slug]
/pressing
/cart
/checkout
/order/[publicId]
/auth/login
/auth/register
/auth/forgot-password
/account/*
/admin/*
/[editorial-slug]
```

Les slugs éditoriaux sont gérés par le CMS avec réservations de routes système et redirections versionnées.

## 13. Principaux user flows

### Achat Market/Energy

Découverte/recherche → fiche produit → variante/quantité → tier tarifaire visible → panier invité ou connecté → fusion éventuelle → adresse → livraison → paiement → confirmation → suivi.

### Configurateur solaire

Introduction → équipements/puissances/heures → résumé énergétique → hypothèses et marge → recommandations de kits → ajustements → panier ou demande d'étude.

### Landing Continental Group

Découverte de la marque mère → compréhension des quatre divisions → orientation vers Market, Energy, Software ou Pressing.

### Landing Software

Proposition de valeur → solutions présentées par le CMS → bénéfices et capacités vérifiables → prise de contact. Aucun plan tarifaire, abonnement ou achat n'est supposé dans cette version.

### Landing Pressing

Présentation du service → prestations et zones publiées par le CMS → fonctionnement → prise de contact. Aucun parcours de réservation ou suivi de commande n'est inclus dans cette version.

### Administration

Connexion renforcée → périmètre de division → tableau de bord → opération autorisée → validation → audit → notification/traitement asynchrone.

## 14. Roadmap verticale

### Phase 0 — Décisions et fondations

Architecture, ADR, monorepo, conventions, environnements, CI, observabilité minimale et modèle initial.

### Phase 1 — Identité et design system

Auth, compte, RBAC, tokens visuels, composants fondamentaux, layouts, i18n et accessibilité de base.

### Phase 2 — Market discovery

CMS de homepage, catalogue, catégories, produits, tiers tarifaires, recherche, SEO et admin catalogue.

### Phase 3 — Commerce transactionnel

Panier, fusion invité, stock/réservations, checkout, commandes, abstraction paiement, webhooks et admin opérations.

### Phase 4 — Energy

Catalogue partagé, configurateur paramétrable, recommandations, devis et back-office.

### Phase 5 — Landing pages de marque

Continental Group, Software et Pressing : narration, CMS, SEO, médias, formulaires de contact et mesure de conversion.

### Phase 6 — Administration élargie

KPIs fiables, utilisateurs, rôles, contenus, promotions, exports et audit.

### Phase 7 — Durcissement et lancement

E2E critiques, charge, sécurité, WCAG 2.2 AA, Core Web Vitals, reprise après incident, SEO et recette métier.

Chaque phase livre une tranche utilisable et testée ; aucune division n'est développée intégralement avant que les fondations transverses soient stables.

## 15. Informations manquantes et incohérences à résoudre

Priorité bloquante avant checkout ou production :

1. entité légale, pays d'opération, fiscalité, facturation et obligations de conservation ;
2. zones desservies, méthodes et grilles de livraison, points de retrait ;
3. fournisseurs de paiement, contrats, frais, remboursements et mécanismes de rapprochement ;
4. définition d'une unité, d'un lot et d'un carton par variante ; gestion des unités fractionnables ;
5. politique de stock négatif, durée de réservation, retours et annulations ;
6. règles de calcul solaire, pertes, autonomie, profondeur de décharge, données climatiques et validation par un expert ;
7. objectif exact et destinataires des formulaires Software et Pressing ; contenus, offres et preuves autorisées ;
8. fonctionnalités futures de Software et Pressing à ne pas bloquer, sans les implémenter prématurément ;
9. identité graphique, logos, typographies licenciées et contenus officiels ;
10. rôles internes réels, séparation des responsabilités et éventuelle MFA obligatoire ;
11. politique de confidentialité, CGV, retours, garantie, suppression de compte et consentements marketing ;
12. choix d'hébergement, budget, SLA, RPO/RTO et propriété des comptes cloud.

Clarifications d'architecture :

- `ProductPrice` et `ProductPriceTier` doivent coexister : le premier porte la base/contextes, le second les paliers ;
- `ProductStock` est remplacé par `Inventory` + mouvements + réservations afin d'éviter deux sources de vérité ;
- `Payment` représente l'obligation financière et `PaymentTransaction` chaque tentative/événement fournisseur ;
- `Order` sert Market et Energy avec un champ division ; Software et Pressing ne créent aucune commande dans le périmètre actuel ;
- les textes marketing sont CMS-driven, mais le code conserve des fallbacks de sécurité et libellés système traduits.

## 16. Décisions à consigner en ADR avant implémentation

- ADR-001 : monolithe modulaire et frontières de domaines ;
- ADR-002 : stratégie d'identifiants internes/publics ;
- ADR-003 : authentification cookie, CSRF et rotation de session ;
- ADR-004 : modèle de prix et représentation monétaire ;
- ADR-005 : stock, réservation et concurrence ;
- ADR-006 : outbox transactionnelle et jobs ;
- ADR-007 : stratégie PWA et données exclues du cache ;
- ADR-008 : hébergement et topologie de production.
