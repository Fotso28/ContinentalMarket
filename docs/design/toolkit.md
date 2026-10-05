# Outils de réalisation du design

## Répartition des rôles

| Outil | Rôle | Emplacement |
| --- | --- | --- |
| Impeccable | Direction artistique, composition, typographie et revue du design | `.agents/skills/impeccable` |
| Product Design — Image-to-code | Traduction d'une maquette choisie en interface responsive | Plugin Product Design déjà disponible dans Codex |
| GSAP | Animation et scrollytelling dans React/Next.js | Skills dans `.agents/skills/gsap-*`, bibliothèques dans `apps/web` |
| Playwright | Inspection dans un navigateur, captures et vérification des interactions | Skill Playwright disponible dans Codex, CLI locale dans `apps/web` |

Les trois maquettes et leurs prompts sont dans `mockups/scrollytelling/`. Le récit et le comportement mobile envisagés sont décrits dans `scrollytelling-brief.md`. Aucune direction n'est sélectionnée à ce stade.

## GSAP

Skills officiels installés depuis `https://github.com/greensock/gsap-skills` :

- `gsap-core`
- `gsap-timeline`
- `gsap-scrolltrigger`
- `gsap-react`
- `gsap-performance`

Bibliothèques ajoutées au projet : `gsap` et `@gsap/react`. Les versions résolues sont consignées dans `apps/web/pnpm-lock.yaml`.

Lors de l'implémentation, utiliser `useGSAP` dans un composant client, limiter les sélecteurs au composant, nettoyer les animations au démontage et prévoir une lecture complète lorsque les mouvements sont réduits.

## Playwright sous Windows

La CLI est une dépendance de développement locale, lancée depuis `apps/web`. Elle utilise Chrome déjà installé, un profil isolé et le mode sans fenêtre. La configuration est dans `.playwright/cli.config.json` ; les captures et journaux vont dans `output/playwright/`.

```powershell
# Démarrer l'application dans un terminal.
corepack.cmd pnpm dev

# Ouvrir une session indépendante dans un autre terminal.
.\node_modules\.bin\playwright-cli.cmd -s=continental-design open http://127.0.0.1:3000
.\node_modules\.bin\playwright-cli.cmd -s=continental-design snapshot
.\node_modules\.bin\playwright-cli.cmd -s=continental-design screenshot --filename=output/playwright/desktop.png

# Examiner le même site à une largeur mobile.
.\node_modules\.bin\playwright-cli.cmd -s=continental-design resize 390 844
.\node_modules\.bin\playwright-cli.cmd -s=continental-design screenshot --filename=output/playwright/mobile.png
.\node_modules\.bin\playwright-cli.cmd -s=continental-design close
```

Ces commandes vérifient la mise en page dans Chrome ; une réduction de la largeur ne simule pas à elle seule un véritable navigateur mobile tactile.

Vérification effectuée le 2026-10-04 : la page répond, la capture de bureau est dans `apps/web/output/playwright/toolkit-check-desktop.png` et une session distincte ouverte avec `--mobile` a produit `apps/web/output/playwright/toolkit-check-mobile.png`. Les deux fichiers ont été inspectés. La console de la session mobile ne contient que les messages de développement React et Next.js.

## Product Design

Le plugin et son skill `image-to-code` sont déjà installés dans l'environnement Codex. Ils utilisent les ressources locales du projet ; aucun abonnement Mobbin n'est nécessaire.

Cette préparation installe les outils. La réalisation visuelle commencera à partir de la maquette choisie.
