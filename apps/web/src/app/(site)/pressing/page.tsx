import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "@/lib/contact";
import comptoir from "../../../../public/images/pressing/comptoir-continental.jpg";
import accueil from "../../../../public/images/pressing/accueil-continental.jpg";
import logo from "../../../../public/images/logos/pressing.jpg";
import "../../division-pages.css";

export const metadata: Metadata = {
  title: "Continental Pressing | Le soin de vos vêtements à Douala",
  description: "Découvrez Continental Pressing à Logpom, Douala, et contactez l’équipe pour le soin de vos vêtements.",
};

const contactUrl = whatsappLink("Bonjour Continental Pressing, je souhaite me renseigner sur la prise en charge de mes vêtements.");

export default function PressingPage() {
  return (
    <div className="division-page division-pressing">
      <section className="division-hero pressing-hero" aria-labelledby="pressing-title">
        <div className="division-hero-copy">
          <div className="division-brand"><Image src={logo} alt="Continental Pressing Express" sizes="166px" /></div>
          <h1 id="pressing-title">Vos vêtements, entre de bonnes mains.</h1>
          <p>Un lieu de proximité à Logpom pour confier vos pièces, poser vos questions et retrouver le plaisir de les porter.</p>
          <div className="division-actions">
            <a className="button pressing-button" href={contactUrl} target="_blank" rel="noreferrer">
              Contacter le pressing <WhatsappLogo size={19} weight="fill" aria-hidden />
            </a>
            <a className="division-secondary-link" href="#comptoir">Découvrir le comptoir <ArrowDown size={18} aria-hidden /></a>
          </div>
        </div>
        <figure className="division-hero-photo">
          <Image src={comptoir} alt="Comptoir et équipe de Continental Pressing à Logpom" fill priority sizes="(max-width: 767px) 100vw, 52vw" />
          <figcaption>Continental Pressing · Logpom, Douala</figcaption>
        </figure>
      </section>

      <section className="division-intro pressing-intro" aria-labelledby="pressing-intro-title">
        <div><h2 id="pressing-intro-title">Le soin commence dès l’accueil.</h2></div>
        <p>Au comptoir, notre équipe vous accueille et échange avec vous sur les pièces à confier. Un service proche de vous, dans un espace dédié au soin textile.</p>
      </section>

      <section className="pressing-place" id="comptoir" aria-labelledby="pressing-place-title">
        <div className="pressing-place-photo">
          <Image src={accueil} alt="Vue du comptoir, des vêtements protégés et de l’espace d’accueil" fill sizes="(max-width: 767px) 100vw, 58vw" />
        </div>
        <div className="pressing-place-copy">
          <h2 id="pressing-place-title">Un comptoir à votre écoute.</h2>
          <p>Une question sur une pièce, son entretien ou sa prise en charge&nbsp;? Contactez directement l’équipe avant de vous déplacer.</p>
          <a href={contactUrl} target="_blank" rel="noreferrer" className="pressing-text-link">Poser une question sur WhatsApp <ArrowRight size={18} aria-hidden /></a>
        </div>
      </section>

      <section className="division-contact pressing-contact" aria-labelledby="pressing-contact-title">
        <div>
          <h2 id="pressing-contact-title">Passez nous voir à Logpom.</h2>
          <p><MapPin size={20} aria-hidden /> Douala, Logpom, derrière Papirus</p>
        </div>
        <a className="button pressing-button" href={contactUrl} target="_blank" rel="noreferrer">
          Écrire à Continental Pressing <ArrowRight size={19} aria-hidden />
        </a>
      </section>
      <nav className="division-back" aria-label="Explorer Continental Group"><Link href="/#metiers">Voir les autres métiers <ArrowRight size={17} aria-hidden /></Link></nav>
    </div>
  );
}
