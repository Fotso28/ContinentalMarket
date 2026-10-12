import Link from "next/link";
import { House, Lightning, Storefront, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "@/lib/contact";

type Tab = "accueil" | "market" | "energy";

/** Barre de navigation basse, visible sur mobile uniquement (inspirée des applications de commerce). */
export function TabBar({ active }: { active: Tab }) {
  return (
    <nav className="tabbar" aria-label="Navigation mobile">
      <Link href="/" aria-current={active === "accueil" ? "page" : undefined}>
        <span className="tab-icon"><House size={20} weight={active === "accueil" ? "fill" : "regular"} aria-hidden /></span>
        Accueil
      </Link>
      <Link href="/market" aria-current={active === "market" ? "page" : undefined}>
        <span className="tab-icon"><Storefront size={20} weight={active === "market" ? "fill" : "regular"} aria-hidden /></span>
        Market
      </Link>
      <Link href="/energy" aria-current={active === "energy" ? "page" : undefined}>
        <span className="tab-icon"><Lightning size={20} weight={active === "energy" ? "fill" : "regular"} aria-hidden /></span>
        Energy
      </Link>
      <a href={whatsappLink("Bonjour Continental Group, je souhaite échanger avec votre équipe.")} target="_blank" rel="noreferrer">
        <span className="tab-icon"><WhatsappLogo size={20} weight="regular" aria-hidden /></span>
        Contact
      </a>
    </nav>
  );
}
