import { MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/catalog/queries";
import { whatsappDisplay, whatsappLink } from "@/lib/contact";

const defaultMessage = "Bonjour Continental Group, je souhaite échanger avec votre équipe.";

/** Cadre de la vitrine du groupe : bandeau, en-tête, contenu et pied de page. */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  const whatsappUrl = whatsappLink(defaultMessage);
  const categories = {
    market: getCategories("market").map(({ slug, name }) => ({ slug, name })),
    energy: getCategories("energy").map(({ slug, name }) => ({ slug, name })),
  };

  return (
    <div className="page-shell">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <div className="utility-bar">
        <span><MapPin size={16} weight="regular" aria-hidden /> Douala, Logpom, derrière Papirus</span>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsappLogo size={16} weight="fill" aria-hidden /> WhatsApp&nbsp;: {whatsappDisplay}
        </a>
      </div>

      <SiteHeader whatsappUrl={whatsappUrl} categories={categories} />

      <main id="contenu">{children}</main>

      <SiteFooter />
    </div>
  );
}
