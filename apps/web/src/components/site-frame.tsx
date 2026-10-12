import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { whatsappDisplay, whatsappLink } from "@/lib/contact";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";

const defaultMessage = "Bonjour Continental Group, je souhaite échanger avec votre équipe.";

/** Cadre commun des pages de catalogue : bandeau, en-tête, contenu et pied de page. */
export function SiteFrame({
  children,
  message = defaultMessage,
  withTabBar = false,
}: {
  children: React.ReactNode;
  message?: string;
  withTabBar?: boolean;
}) {
  const whatsappUrl = whatsappLink(message);

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

      <main id="contenu" className={withTabBar ? "has-tabbar" : undefined}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <Image src={groupLogo} alt="Continental Group" sizes="200px" />
          <p>Un groupe. Quatre expertises. Une même exigence.</p>
        </div>
        <address className="footer-contact">
          <p><MapPin size={18} weight="regular" aria-hidden /> Douala, Logpom, derrière Papirus</p>
          <a href="tel:+237671275495" aria-label="Appeler le +237 671 27 54 95">
            <Phone size={18} weight="regular" aria-hidden /> +237 671 27 54 95
          </a>
          <Link href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp au +237 698 57 98 65">
            <WhatsappLogo size={18} weight="regular" aria-hidden /> +237 698 57 98 65
          </Link>
        </address>
        <small>© 2026 Continental Group</small>
      </footer>
    </div>
  );
}
