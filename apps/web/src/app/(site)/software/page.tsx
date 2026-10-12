import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SoftwareDemo } from "@/components/software-demo";
import { whatsappLink } from "@/lib/contact";
import portrait from "../../../../public/images/landing/persona-software-desk.png";
import logo from "../../../../public/images/logos/software.png";
import "../../division-pages.css";

export const metadata: Metadata = {
  title: "Continental Software | Des outils pour votre activité",
  description: "Découvrez Continental Software, ses solutions numériques sur mesure et un aperçu illustratif d’une interface de gestion.",
};

const contactUrl = whatsappLink("Bonjour Continental Software, je souhaite échanger sur mon projet numérique.");

export default function SoftwarePage() {
  return (
    <div className="division-page division-software">
      <section className="division-hero software-hero" aria-labelledby="software-title">
        <div className="division-hero-copy">
          <div className="division-brand"><Image src={logo} alt="Continental Software" sizes="156px" /></div>
          <h1 id="software-title">Des outils qui suivent votre activité.</h1>
          <p>Continental Software imagine des solutions numériques adaptées à la façon dont vous travaillez, pour rendre les informations utiles plus simples à voir et à utiliser.</p>
          <div className="division-actions">
            <a className="button button-sun" href={contactUrl} target="_blank" rel="noreferrer">
              Parler de mon projet <WhatsappLogo size={19} weight="fill" aria-hidden />
            </a>
            <a className="division-secondary-link" href="#apercu">Voir un exemple <ArrowDown size={18} aria-hidden /></a>
          </div>
        </div>
        <figure className="division-hero-photo">
          <Image src={portrait} alt="Homme travaillant sur un ordinateur à son bureau" fill priority sizes="(max-width: 767px) 100vw, 48vw" />
        </figure>
      </section>

      <section className="division-intro software-intro" aria-labelledby="software-intro-title">
        <div>
          <h2 id="software-intro-title">Le bon outil commence par votre réalité.</h2>
        </div>
        <p>Une activité ne se résume pas à un modèle unique. L’objectif est de réunir les informations dont vous avez besoin dans une expérience claire, pensée pour vos usages quotidiens.</p>
      </section>

      <section className="software-example" id="apercu" aria-labelledby="software-example-title">
        <div className="division-section-heading">
          <h2 id="software-example-title">Une vue claire sur ce qui se passe.</h2>
          <p>Exemple illustratif d’une interface de gestion de bar&nbsp;: ventes, commandes et stock réunis dans un même espace. Les données affichées sont fictives.</p>
        </div>
        <div className="software-example-stage"><SoftwareDemo /></div>
      </section>

      <section className="division-contact software-contact" aria-labelledby="software-contact-title">
        <div>
          <h2 id="software-contact-title">Parlons de ce que votre outil doit faire.</h2>
          <p>Présentez votre activité et le besoin que vous souhaitez résoudre. Notre équipe pourra échanger avec vous sur la suite.</p>
        </div>
        <a className="button button-sun" href={contactUrl} target="_blank" rel="noreferrer">
          Écrire à Continental Software <ArrowRight size={19} aria-hidden />
        </a>
      </section>
      <nav className="division-back" aria-label="Explorer Continental Group"><Link href="/#metiers">Voir les autres métiers <ArrowRight size={17} aria-hidden /></Link></nav>
    </div>
  );
}
