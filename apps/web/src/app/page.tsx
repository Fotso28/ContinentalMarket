import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CoatHanger,
  Lightning,
  MapPin,
  Monitor,
  ShoppingCart,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { HeroCollage } from "@/components/hero-collage";
import { SoftwareDemo } from "@/components/software-demo";

import groupLeadership from "../../public/images/landing/group-leadership.png";
import marketManager from "../../public/images/landing/market-manager.png";
import softwareArchitect from "../../public/images/landing/software-architect.png";
import pressingSpecialist from "../../public/images/landing/pressing-specialist.png";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";
import energyAuroraInstallation from "../../public/images/landing/energy-aurora-installation.png";
import energySunluxRange from "../../public/images/landing/energy-sunlux-range.png";
import pressingWashCare from "../../public/images/landing/pressing-wash-care.png";
import pressingIroningCraft from "../../public/images/landing/pressing-ironing-craft.png";
import pressingFinishedStyle from "../../public/images/landing/pressing-finished-style.png";
import marketSmartphones from "../../public/images/landing/market-smartphones.png";
import marketComputers from "../../public/images/landing/market-computers.png";
import marketDining from "../../public/images/landing/market-dining.png";

const whatsappUrl =
  "https://wa.me/237698579865?text=Bonjour%20Continental%20Group%2C%20je%20souhaite%20%C3%A9changer%20avec%20votre%20%C3%A9quipe.";

type Division = {
  name: string;
  shortName: string;
  description: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

const divisions: Division[] = [
  {
    name: "Continental Market",
    shortName: "Market",
    description: "Des produits essentiels, accessibles à l’unité comme en quantité.",
    href: "/market",
    image: marketManager,
    imageAlt: "Responsable africaine dans un commerce contemporain",
  },
  {
    name: "Continental Energy",
    shortName: "Energy",
    description: "L’énergie juste, pensée pour un avenir durable.",
    href: "/energy",
    image: energyAuroraInstallation,
    imageAlt: "Installation de stockage et d’onduleur Aurora Power",
  },
  {
    name: "Continental Software",
    shortName: "Software",
    description: "Des solutions numériques sur mesure pour faire progresser vos activités.",
    href: "/software",
    image: softwareArchitect,
    imageAlt: "Architecte logiciel africain dans un studio technologique",
  },
  {
    name: "Continental Pressing",
    shortName: "Pressing",
    description: "L’excellence du soin textile au service de votre image.",
    href: "/pressing",
    image: pressingSpecialist,
    imageAlt: "Professionnelle africaine du soin textile",
  },
];

const strengths = [
  {
    title: "Commerce accessible",
    text: "Des produits essentiels disponibles partout, au juste prix.",
    Icon: ShoppingCart,
  },
  {
    title: "Énergie maîtrisée",
    text: "Des solutions fiables pour alimenter les ambitions d’aujourd’hui.",
    Icon: Lightning,
  },
  {
    title: "Solutions numériques",
    text: "Des outils professionnels qui simplifient et font progresser.",
    Icon: Monitor,
  },
  {
    title: "Soin textile",
    text: "Un service précis, attentif et digne de confiance.",
    Icon: CoatHanger,
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="utility-bar">
        <span><MapPin size={14} weight="regular" /> Douala, Logpom, derrière Papirus</span>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <WhatsappLogo size={14} weight="fill" /> WhatsApp : +237 698 57 98 65
        </a>
      </div>

      <SiteHeader whatsappUrl={whatsappUrl} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">Un groupe. Quatre expertises.</p>
          <h1 id="hero-title">Bâtir, servir et faire avancer le quotidien.</h1>
          <p className="hero-intro">
            Continental Group réunit quatre expertises complémentaires pour répondre
            aux besoins essentiels des entreprises, des institutions et des familles en Afrique centrale.
          </p>
          <a className="button button-primary" href="#metiers">
            Découvrir nos métiers <ArrowRight size={18} weight="bold" />
          </a>
        </div>

        <HeroCollage />
      </section>

      <section className="strengths" aria-label="Les expertises du groupe">
        {strengths.map(({ title, text, Icon }) => (
          <article className="strength" key={title}>
            <Icon size={42} weight="thin" aria-hidden />
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="businesses" id="metiers" aria-labelledby="businesses-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Un écosystème, quatre savoir-faire</p>
            <h2 id="businesses-title">Nos métiers</h2>
          </div>
          <a href="#groupe" className="section-link">Découvrir le Groupe <ArrowRight size={17} weight="bold" /></a>
        </div>

        <div className="business-grid">
          {divisions.map((division, index) => (
            <Reveal className="business-card" delay={index * 70} key={division.name}>
              <Link className="business-image" href={division.href} aria-label={`Découvrir ${division.name}`}>
                <Image src={division.image} alt={division.imageAlt} fill sizes="(max-width: 767px) 100vw, 25vw" />
              </Link>
              <div className="business-copy">
                <span>0{index + 1}</span>
                <h3>{division.name}</h3>
                <p>{division.description}</p>
                <Link href={division.href} className="card-link">
                  En savoir plus <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="market-showcase" aria-labelledby="market-showcase-title">
        <div className="market-showcase-heading">
          <div><p className="section-kicker">Continental Market</p><h2 id="market-showcase-title">Du quotidien aux grands projets.</h2></div>
          <p>Téléphonie, informatique et équipement de la maison : une sélection pensée pour acheter à l’unité comme en quantité.</p>
        </div>
        <div className="market-marquee">
          <div className="market-track">
            {[0, 1].map((copy) => (
              <div className="market-set" aria-hidden={copy === 1} key={copy}>
                <article><Image src={marketSmartphones} alt={copy ? "" : "Sélection de smartphones"} fill sizes="(max-width: 767px) 82vw, 38vw" /><span>Téléphones</span></article>
                <article><Image src={marketComputers} alt={copy ? "" : "Sélection d’ordinateurs"} fill sizes="(max-width: 767px) 82vw, 38vw" /><span>Informatique</span></article>
                <article><Image src={marketDining} alt={copy ? "" : "Mobilier de salle à manger"} fill sizes="(max-width: 767px) 82vw, 38vw" /><span>Maison &amp; mobilier</span></article>
              </div>
            ))}
          </div>
        </div>
        <Link href="/market" className="button button-primary">Explorer Continental Market <ArrowRight size={18} weight="bold" /></Link>
      </section>

      <section className="energy-showcase" aria-labelledby="energy-showcase-title">
        <div className="energy-showcase-heading">
          <div>
            <p className="section-kicker">Continental Energy</p>
            <h2 id="energy-showcase-title">L’énergie pensée comme une infrastructure.</h2>
          </div>
          <p>
            Des équipements sélectionnés pour répondre aux besoins des foyers,
            des commerces et des installations professionnelles.
          </p>
        </div>
        <div className="energy-showcase-grid">
          <Reveal className="energy-feature energy-feature-large">
            <div className="energy-feature-image">
              <Image src={energyAuroraInstallation} alt="Installation Aurora Power dans un espace contemporain" fill sizes="(max-width: 767px) 100vw, 62vw" />
            </div>
            <div className="energy-feature-copy">
              <span>Installation intégrée</span>
              <h3>Stockage et gestion de l’énergie</h3>
              <p>Une intégration propre, lisible et adaptée au contexte du projet.</p>
            </div>
          </Reveal>
          <Reveal className="energy-feature" delay={120}>
            <div className="energy-feature-image">
              <Image src={energySunluxRange} alt="Gamme de batteries lithium Sunlux en environnement professionnel" fill sizes="(max-width: 767px) 100vw, 38vw" />
            </div>
            <div className="energy-feature-copy">
              <span>Solutions professionnelles</span>
              <h3>Une gamme pour plusieurs échelles</h3>
              <Link href="/energy" className="card-link">Découvrir Energy <ArrowRight size={16} weight="bold" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="software-showcase" aria-labelledby="software-showcase-title">
        <div className="software-showcase-copy">
          <p className="section-kicker">Continental Software</p>
          <h2 id="software-showcase-title">Piloter un établissement, en temps réel.</h2>
          <p>La démonstration simule le suivi des ventes, des commandes et du stock d’un bar depuis une seule interface de gestion.</p>
          <Link href="/software" className="button button-primary">Découvrir nos logiciels <ArrowRight size={18} weight="bold" /></Link>
        </div>
        <SoftwareDemo />
      </section>

      <section className="pressing-showcase" aria-labelledby="pressing-showcase-title">
        <div className="pressing-showcase-heading">
          <div><p className="section-kicker">Continental Pressing</p><h2 id="pressing-showcase-title">Le soin se voit dans chaque détail.</h2></div>
          <p>Un parcours maîtrisé, du traitement du textile jusqu’à la finition qui redonne confiance à chaque tenue.</p>
        </div>
        <div className="pressing-grid">
          <Reveal className="pressing-card"><div><Image src={pressingWashCare} alt="Professionnelle africaine préparant une machine à laver" fill sizes="(max-width: 767px) 100vw, 34vw" /></div><span>01 — Lavage maîtrisé</span></Reveal>
          <Reveal className="pressing-card" delay={90}><div><Image src={pressingIroningCraft} alt="Professionnel africain repassant une veste" fill sizes="(max-width: 767px) 100vw, 34vw" /></div><span>02 — Finition précise</span></Reveal>
          <Reveal className="pressing-card" delay={180}><div><Image src={pressingFinishedStyle} alt="Client africain portant une tenue impeccablement repassée" fill sizes="(max-width: 767px) 100vw, 34vw" /></div><span>03 — Élégance retrouvée</span></Reveal>
        </div>
        <Link href="/pressing" className="button button-primary">Découvrir Continental Pressing <ArrowRight size={18} weight="bold" /></Link>
      </section>

      <section className="purpose" aria-labelledby="purpose-title">
        <Reveal className="purpose-heading">
          <p className="section-kicker">Notre raison d’être</p>
          <h2 id="purpose-title">Faciliter le quotidien. Équiper les ambitions.</h2>
        </Reveal>
        <Reveal className="purpose-copy" delay={100}>
          <p>
            Continental Group construit un écosystème de solutions utiles : mieux acheter,
            mieux s’équiper, mieux travailler et mieux prendre soin de ce qui compte.
          </p>
          <p>
            Nos divisions avancent ensemble pour proposer une expérience cohérente,
            accessible et adaptée aux réalités des particuliers comme des professionnels.
          </p>
        </Reveal>
      </section>

      <section className="group-story" id="groupe" aria-labelledby="group-title">
        <Reveal className="group-story-image">
          <Image src={groupLeadership} alt="Direction Continental Group à Douala" fill sizes="(max-width: 767px) 100vw, 48vw" />
        </Reveal>
        <Reveal className="group-story-copy" delay={100}>
          <p className="section-kicker">Une même exigence</p>
          <h2 id="group-title">Des métiers différents. Une vision commune.</h2>
          <p>
            Nous mutualisons nos compétences, nos outils et notre culture de service afin
            d’apporter des réponses concrètes, durables et proches des réalités de l’Afrique centrale.
          </p>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Parlons de votre besoin <WhatsappLogo size={18} weight="fill" />
          </a>
        </Reveal>
      </section>

      <section className="commitments" aria-labelledby="commitments-title">
        <div className="commitments-heading">
          <p className="section-kicker">Ce qui nous rassemble</p>
          <h2 id="commitments-title">Nos engagements</h2>
        </div>
        <div className="commitments-grid">
          <article>
            <span>01</span>
            <h3>Utile par conception</h3>
            <p>Partir des besoins réels pour construire des produits et des services qui simplifient véritablement le quotidien.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Proche par conviction</h3>
            <p>Rester accessible, à l’écoute et ancré dans les usages des familles, des commerces et des entreprises.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Durable par exigence</h3>
            <p>Privilégier la qualité, la maîtrise opérationnelle et des solutions capables d’accompagner les ambitions dans le temps.</p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <Image src={groupLogo} alt="Continental Group" sizes="180px" />
          <p>Un groupe. Quatre expertises. Une même exigence.</p>
        </div>
        <div className="footer-contact">
          <p>Douala — Logpom, derrière Papirus</p>
          <a href="tel:+237671275495">+237 671 27 54 95</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">+237 698 57 98 65</a>
        </div>
        <small>© 2026 Continental Group</small>
      </footer>
    </main>
  );
}
