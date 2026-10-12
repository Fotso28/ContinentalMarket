import { whatsappDisplay, whatsappLink } from "@/lib/contact";

/**
 * Mode maintenance : toutes les pages répondent par une page « en cours de maintenance »
 * avec un statut 503, pour que les moteurs de recherche ne l'indexent pas à la place du site.
 * Activé par défaut ; définir MAINTENANCE_MODE=off sur l'hébergement pour rouvrir le site.
 */
const maintenanceEnabled = process.env.MAINTENANCE_MODE !== "off";

const whatsappUrl = whatsappLink("Bonjour Continental Group, je souhaite échanger avec votre équipe.");

const maintenancePage = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#fffdf8">
<title>Continental Group — Site en maintenance</title>
<link rel="icon" href="/favicon.ico">
<style>
  :root { --forest-deep: #03291f; --forest: #073e2d; --paper: #fffdf8; --ink-soft: #4d5853; --sun: #fdb813; }
  * { box-sizing: border-box; margin: 0; }
  body {
    min-height: 100vh; display: grid; place-items: center; padding: 32px 16px;
    background: var(--paper); color: var(--forest-deep);
    font: 400 1rem/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  main { width: 100%; max-width: 560px; text-align: center; }
  img { width: min(220px, 60vw); height: auto; margin: 0 auto 40px; display: block; }
  .tag { display: inline-block; margin-bottom: 20px; color: var(--forest); font-size: .8rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
  h1 { font: 500 clamp(2rem, 6vw, 3rem)/1.1 Georgia, "Times New Roman", serif; margin-bottom: 20px; }
  p { color: var(--ink-soft); }
  a.cta {
    display: inline-block; margin-top: 32px; padding: 14px 24px; border-radius: 10px;
    background: var(--forest); color: var(--paper); font-weight: 600; text-decoration: none;
  }
  a.cta:hover, a.cta:focus-visible { background: var(--forest-deep); }
  a.cta:focus-visible { outline: 2px solid var(--sun); outline-offset: 3px; }
  .phone { margin-top: 16px; font-size: .9rem; }
  .phone a { color: var(--forest-deep); }
</style>
</head>
<body>
<main>
  <img src="/images/landing/logo-group-transparent-cropped.png" alt="Continental Group">
  <span class="tag">Maintenance</span>
  <h1>Nous sommes en cours de maintenance</h1>
  <p>Notre site est momentanément indisponible le temps de quelques améliorations. Merci de votre patience, nous revenons très vite.</p>
  <a class="cta" href="${whatsappUrl}" target="_blank" rel="noreferrer">Nous écrire sur WhatsApp</a>
  <p class="phone">Ou appelez le <a href="tel:+237671275495">+237 671 27 54 95</a> · WhatsApp ${whatsappDisplay}</p>
</main>
</body>
</html>`;

export function proxy() {
  if (!maintenanceEnabled) return;
  return new Response(maintenancePage, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
    },
  });
}

export const config = {
  // Laisse passer les fichiers techniques et les images nécessaires à la page de maintenance.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
