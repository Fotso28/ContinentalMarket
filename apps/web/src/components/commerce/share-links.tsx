import { FacebookLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

/** Partage d'une fiche produit : l'aperçu (image, titre) vient des balises Open Graph de la page. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="share" role="group" aria-label="Partager cette fiche">
      <span className="share-label">Partager</span>
      <a href={whatsapp} target="_blank" rel="noreferrer">
        <WhatsappLogo size={18} weight="fill" aria-hidden /> WhatsApp
      </a>
      <a href={facebook} target="_blank" rel="noreferrer">
        <FacebookLogo size={18} weight="fill" aria-hidden /> Facebook
      </a>
    </div>
  );
}
