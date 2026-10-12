import { MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { ShopHeader } from "@/components/shop-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/catalog/queries";
import { whatsappDisplay, whatsappLink } from "@/lib/contact";

const defaultMessage = "Bonjour Continental Group, je souhaite échanger avec votre équipe.";

/**
 * Cadre des boutiques Market et Energy. Un client qui achète n'a pas besoin des pages de présentation du groupe :
 * l'en-tête ne propose que l'achat, et le pied de page garde l'accès au groupe, à Software et à Pressing.
 */
export function ShopFrame({ children }: { children: React.ReactNode }) {
  const whatsappUrl = whatsappLink(defaultMessage);
  const categories = {
    market: getCategories("market").map(({ slug, name }) => ({ slug, name })),
    energy: getCategories("energy").map(({ slug, name }) => ({ slug, name })),
  };

  return (
    <div className="page-shell shop-shell">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <div className="utility-bar">
        <span><MapPin size={16} weight="regular" aria-hidden /> Douala, Logpom, derrière Papirus</span>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsappLogo size={16} weight="fill" aria-hidden /> WhatsApp&nbsp;: {whatsappDisplay}
        </a>
      </div>

      <ShopHeader categories={categories} whatsappUrl={whatsappUrl} />

      <main id="contenu">{children}</main>

      <SiteFooter />
    </div>
  );
}
