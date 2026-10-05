# Design QA — Continental Group homepage v2

## Evidence

- Selected visual target: `../../docs/design/mockups/continental-group-merchora-fraunces.png`
- Final desktop capture: `output/playwright/continental-v2-final-desktop.png`
- Full-width desktop correction: `output/playwright/continental-v2-full-width.png`
- Animated hero states: `output/playwright/hero-animation-scene-1.png`, `output/playwright/hero-animation-scene-2.png`
- Extended editorial structure: `output/playwright/continental-editorial-full.png`
- Product showcase desktop: `output/playwright/continental-energy-showcase.png`
- Product showcase mobile: `output/playwright/continental-energy-showcase-mobile.png`
- Market, Software and Pressing desktop: `output/playwright/market-showcase-desktop.png`, `output/playwright/software-showcase-desktop.png`, `output/playwright/pressing-showcase-desktop.png`
- Market, Software and Pressing mobile: `output/playwright/market-showcase-mobile.png`, `output/playwright/software-showcase-mobile.png`, `output/playwright/pressing-showcase-mobile.png`
- Final mobile capture: `output/playwright/continental-v2-final-mobile.png`
- Final desktop full page: `output/playwright/continental-v2-final-desktop-full.png`
- Final mobile full page: `output/playwright/continental-v2-final-mobile-full.png`
- Same-frame visual comparison: `output/playwright/qa-v2-final-comparison.png`
- Desktop viewport: 1440 × 1024
- Mobile viewport: 390 × 844
- State: homepage at rest; mobile navigation tested in open and closed states

## Comparison history

### Pass 1

- P1: the supplied transparent logo retained excessive transparent canvas and rendered too small in the header.
- P2: the first implementation was less compact than the selected reference, pushing all business cards below the desktop viewport.
- P2: eager loading on several collage images produced unnecessary development preload warnings.

Fixes: cropped only the transparent canvas around the official logo, tightened header/hero/value-strip dimensions, brought the four cards into the 1440 × 1024 composition, and limited eager loading to the principal hero portrait.

### Pass 2

- The final build closely preserves the selected hierarchy, density, split hero, collage rhythm, compact proof strip and four-card business grid.
- Fraunces gives the hero and section headings the approved distinctive editorial character; Manrope keeps navigation and body copy clear.
- The implementation uses the transparent official Group logo and real project photography without placeholders.
- Desktop and 390 px mobile are intentionally recomposed. Touch targets, focus states and reduced motion are handled.
- Main navigation and WhatsApp conversion links work. The mobile menu opens and closes correctly.
- Browser verification reports zero console errors. ESLint, strict TypeScript and the optimized Next.js production build pass.
- The outer mockup presentation frame was removed after review: the production page now uses the full viewport width with no decorative margin, external radius or canvas shadow.
- The hero cycles through three coordinated portrait compositions with professional crossfades, staggered depth movement, hover pause and reduced-motion support.
- The extended page adds a reason-for-being statement, shared vision and three grounded commitments without fabricated statistics, testimonials or news.
- Six supplied Continental Energy product references were reviewed. Two non-destructive premium derivatives now support the Energy card and a responsive product showcase; promotional overlays were removed and no technical specification was invented.
- Market now uses an infinite, hover-pausable product reel; Software simulates live bar-management data; Pressing presents a coherent wash, finish and delivery narrative using three generated African editorial photographs.

## Remaining polish

- P3: the generated mockup combines some portrait edges more seamlessly than the browser layout; the implementation keeps individual responsive image assets to preserve quality and accessibility across viewports.

final result: passed
