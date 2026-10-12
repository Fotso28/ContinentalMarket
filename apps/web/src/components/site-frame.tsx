import { MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TabBar } from "@/components/commerce/tab-bar";
import { whatsappDisplay, whatsappLink } from "@/lib/contact";

const defaultMessage = "Bonjour Continental Group, je souhaite échanger avec votre équipe.";

/** Cadre unique du site : bandeau, en-tête, contenu, barre mobile et pied de page. */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  const whatsappUrl = whatsappLink(defaultMessage);

  return (
    <div className="page-shell">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <div className="utility-bar">
        <span><MapPin size={16} weight="regular" aria-hidden /> Douala, Logpom, derrière Papirus</span>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsappLogo size={16} weight="fill" aria-hidden /> WhatsApp&nbsp;: {whatsappDisplay}
        </a>
      </div>

      <SiteHeader whatsappUrl={whatsappUrl} />

      <main id="contenu">{children}</main>

      <TabBar />
      <SiteFooter />
    </div>
  );
}
