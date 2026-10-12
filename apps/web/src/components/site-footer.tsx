import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { getCategories } from "@/lib/catalog/queries";
import { whatsappDisplay, whatsappLink } from "@/lib/contact";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";

/**
 * Pied de page commun : il donne accès aux boutiques (avec leurs catégories), au groupe et aux coordonnées.
 * Les pages de vitrine ne figurent plus dans le menu mobile du client : elles sont dans le menu, pas dans la barre basse.
 */
export function SiteFooter() {
  const market = getCategories("market");
  const energy = getCategories("energy");

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand footer-wide">
          <Image src={groupLogo} alt="Continental Group" sizes="200px" />
          <p>Un groupe. Quatre expertises. Une même exigence.</p>
        </div>

        <nav className="footer-col" aria-labelledby="footer-shops">
          <h2 id="footer-shops">Boutiques</h2>
          <ul>
            <li><Link href="/market">Continental Market</Link></li>
            {market.map((category) => (
              <li key={category.slug}><Link href={`/market/category/${category.slug}`}>{category.name}</Link></li>
            ))}
            <li><Link href="/energy">Continental Energy</Link></li>
            {energy.map((category) => (
              <li key={category.slug}><Link href={`/energy/category/${category.slug}`}>{category.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="footer-group">
          <h2 id="footer-group">Groupe</h2>
          <ul>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/#groupe">Le groupe</Link></li>
            <li><Link href="/software">Continental Software</Link></li>
            <li><Link href="/pressing">Continental Pressing</Link></li>
          </ul>
        </nav>

        <address className="footer-col footer-contact footer-wide">
          <h2>Contact</h2>
          <p><MapPin size={18} weight="regular" aria-hidden /> Douala, Logpom, derrière Papirus</p>
          <a href="tel:+237671275495" aria-label="Appeler le +237 671 27 54 95">
            <Phone size={18} weight="regular" aria-hidden /> +237 671 27 54 95
          </a>
          <a href={whatsappLink("Bonjour Continental Group, je souhaite échanger avec votre équipe.")} target="_blank" rel="noreferrer" aria-label={`Écrire sur WhatsApp au ${whatsappDisplay}`}>
            <WhatsappLogo size={18} weight="regular" aria-hidden /> {whatsappDisplay}
          </a>
        </address>
      </div>
      <small>© 2026 Continental Group</small>
    </footer>
  );
}
