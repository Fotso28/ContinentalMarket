import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CoatHanger,
  Lightning,
  Monitor,
  ShoppingCart,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { HeroCollage } from "@/components/hero-collage";
import { SoftwareDemo } from "@/components/software-demo";

import groupOffice from "../../../public/images/landing/persona-group-office.png";
import marketManager from "../../../public/images/landing/market-manager.png";
import softwareDesk from "../../../public/images/landing/persona-software-desk.png";
import pressingSpecialist from "../../../public/images/landing/pressing-specialist.png";
import energyAuroraInstallation from "../../../public/images/landing/energy-aurora-installation.png";
import energySunluxRange from "../../../public/images/landing/energy-sunlux-range.png";
import pressingWashCare from "../../../public/images/landing/pressing-wash-care.png";
import pressingIroning from "../../../public/images/landing/persona-pressing-ironing.png";
import pressingFinishedStyle from "../../../public/images/landing/persona-pressing-style.png";
import marketSmartphones from "../../../public/images/landing/market-smartphones.png";
import marketComputers from "../../../public/images/landing/market-computers.png";
import marketDining from "../../../public/images/landing/market-dining.png";

const whatsappUrl =
  "https://wa.me/237698579865?text=Bonjour%20Continental%20Group%2C%20je%20souhaite%20%C3%A9changer%20avec%20votre%20%C3%A9quipe.";

type Division = {
  name: string;
  description: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

const divisions: Division[] = [
  {
    name: "Continental Market",
    description: "Des produits essentiels, accessibles à l’unité comme en quantité.",
    href: "/market",
    image: marketManager,
    imageAlt: "Responsable africaine dans un commerce contemporain",
  },
  {
    name: "Continental Energy",
    description: "L’énergie juste, pensée pour un avenir durable.",
    href: "/energy",
    image: energyAuroraInstallation,
    imageAlt: "Installation de stockage et d’onduleur Aurora Power",
  },
  {
    name: "Continental Software",
    description: "Des solutions numériques sur mesure pour faire progresser vos activités.",
    href: "/software",
    image: softwareDesk,
    imageAlt: "Homme travaillant sur un ordinateur dans un bureau",
  },
  {
    name: "Continental Pressing",
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

const marketShelves = [
  { image: marketSmartphones, alt: "Sélection de smartphones", label: "Téléphones" },
  { image: marketComputers, alt: "Sélection d’ordinateurs", label: "Informatique" },
  { image: marketDining, alt: "Mobilier de salle à manger", label: "Maison & mobilier" },
];

const pressingSteps = [
  { image: pressingWashCare, alt: "Professionnelle africaine préparant une machine à laver", label: "Lavage maîtrisé" },
  { image: pressingIroning, alt: "Homme repassant une veste dans un pressing", label: "Finition précise" },
  { image: pressingFinishedStyle, alt: "Homme quittant un pressing en tenue soignée", label: "Élégance retrouvée" },
];

const commitments = [
  {
    title: "Utile par conception",
    text: "Partir des besoins réels pour construire des produits et des services qui simplifient véritablement le quotidien.",
  },
  {
    title: "Proche par conviction",
    text: "Rester accessible, à l’écoute et ancré dans les usages des familles, des commerces et des entreprises.",
  },
  {
    title: "Durable par exigence",
    text: "Privilégier la qualité, la maîtrise opérationnelle et des solutions capables d’accompagner les ambitions dans le temps.",
  },
];

export default function Home() {
  return (
    <>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Bâtir, servir et faire avancer le quotidien.</h1>
            <p className="section-note hero-note">Un groupe. Quatre expertises.</p>
            <p className="hero-intro">
              Continental Group réunit quatre expertises complémentaires pour répondre
              aux besoins essentiels des entreprises, des institutions et des familles en Afrique centrale.
            </p>
            <a className="button button-primary button-down" href="#metiers">
              Découvrir nos métiers <ArrowDown size={18} weight="bold" aria-hidden />
            </a>
          </div>

          <HeroCollage />
        </section>

        <section className="strengths" aria-label="Les expertises du groupe">
          {strengths.map(({ title, text, Icon }) => (
            <article className="strength" key={title}>
              <Icon size={30} weight="regular" aria-hidden />
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="businesses" id="metiers" aria-labelledby="businesses-title">
          <div className="section-head">
            <h2 id="businesses-title">Nos métiers</h2>
            <div className="section-aside">
              <p className="section-note">Un écosystème, quatre savoir-faire</p>
              <a href="#groupe" className="text-link">
                Découvrir le Groupe <ArrowRight size={17} weight="bold" aria-hidden />
              </a>
            </div>
          </div>

          <div className="business-grid">
            {divisions.map((division) => (
              <article className="business-card" key={division.name}>
                <div className="business-image frame settle">
                  <Image
                    src={division.image}
                    alt={division.imageAlt}
                    fill
                    sizes="(max-width: 767px) 34vw, (max-width: 1050px) 45vw, 22vw"
                  />
                </div>
                <div className="business-copy">
                  <h3><Link href={division.href}>{division.name}</Link></h3>
                  <p>{division.description}</p>
                  <span className="text-link" aria-hidden="true">
                    En savoir plus <ArrowRight size={16} weight="bold" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="market-showcase" id="market" aria-labelledby="market-showcase-title">
          <div className="section-head">
            <h2 id="market-showcase-title">Du quotidien aux grands projets.</h2>
            <div className="section-aside">
              <p className="section-note">Continental Market</p>
              <p>Téléphonie, informatique et équipement de la maison&nbsp;: une sélection pensée pour acheter à l’unité comme en quantité.</p>
            </div>
          </div>
          <div className="market-marquee" role="group" aria-label="Sélection Continental Market">
            <div className="market-track">
              {[0, 1].map((copy) => (
                <div className="market-set" aria-hidden={copy === 1} key={copy}>
                  {marketShelves.map((shelf) => (
                    <figure className="frame" key={shelf.label}>
                      <Image src={shelf.image} alt={copy ? "" : shelf.alt} fill sizes="(max-width: 767px) 80vw, 41vw" />
                      <figcaption className="photo-tag">{shelf.label}</figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="section-cta">
            <Link href="/market" className="button button-primary">
              Explorer Continental Market <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
          </div>
        </section>

        <section className="energy-showcase" id="energy" aria-labelledby="energy-showcase-title">
          <div className="section-head">
            <h2 id="energy-showcase-title">L’énergie pensée comme une infrastructure.</h2>
            <div className="section-aside">
              <p className="section-note">Continental Energy</p>
              <p>
                Des équipements sélectionnés pour répondre aux besoins des foyers,
                des commerces et des installations professionnelles.
              </p>
            </div>
          </div>
          <div className="energy-showcase-grid">
            <article className="energy-feature energy-feature-large">
              <div className="energy-feature-image frame settle">
                <Image src={energyAuroraInstallation} alt="Installation Aurora Power dans un espace contemporain" fill sizes="(max-width: 767px) 100vw, 58vw" />
                <span className="photo-tag">Installation intégrée</span>
              </div>
              <div className="energy-feature-copy">
                <h3>Stockage et gestion de l’énergie</h3>
                <p>Une intégration propre, lisible et adaptée au contexte du projet.</p>
              </div>
            </article>
            <article className="energy-feature">
              <div className="energy-feature-image frame settle">
                <Image src={energySunluxRange} alt="Gamme de batteries lithium Sunlux en environnement professionnel" fill sizes="(max-width: 767px) 100vw, 30vw" />
                <span className="photo-tag">Solutions professionnelles</span>
              </div>
              <div className="energy-feature-copy">
                <h3>Une gamme pour plusieurs échelles</h3>
                <Link href="/energy" className="text-link">
                  Découvrir Energy <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="software-showcase" id="software" aria-labelledby="software-showcase-title">
          <div className="software-showcase-copy">
            <h2 id="software-showcase-title">Piloter un établissement, en temps réel.</h2>
            <p className="section-note">Continental Software</p>
            <p>La démonstration simule le suivi des ventes, des commandes et du stock d’un bar depuis une seule interface de gestion.</p>
            <Link href="/software" className="button button-light">
              Découvrir nos logiciels <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
          </div>
          <SoftwareDemo />
        </section>

        <section className="pressing-showcase" id="pressing" aria-labelledby="pressing-showcase-title">
          <div className="section-head">
            <h2 id="pressing-showcase-title">Le soin se voit dans chaque détail.</h2>
            <div className="section-aside">
              <p className="section-note">Continental Pressing</p>
              <p>Un parcours maîtrisé, du traitement du textile jusqu’à la finition qui redonne confiance à chaque tenue.</p>
            </div>
          </div>
          <ol className="pressing-grid">
            {pressingSteps.map((step, index) => (
              <li className="pressing-card" key={step.label}>
                <div className="pressing-image frame settle">
                  <Image src={step.image} alt={step.alt} fill sizes="(max-width: 767px) 120vw, 52vw" quality={90} />
                </div>
                <p><span aria-hidden="true">0{index + 1}</span>{step.label}</p>
              </li>
            ))}
          </ol>
          <div className="section-cta">
            <Link href="/pressing" className="button button-primary">
              Découvrir Continental Pressing <ArrowRight size={18} weight="bold" aria-hidden />
            </Link>
          </div>
        </section>

        <section className="purpose" aria-labelledby="purpose-title">
          <h2 id="purpose-title"><span>Faciliter le quotidien.</span> <span>Équiper les ambitions.</span></h2>
          <div className="purpose-copy">
            <p className="section-note">Notre raison d’être</p>
            <p>
              Continental Group construit un écosystème de solutions utiles&nbsp;: mieux acheter,
              mieux s’équiper, mieux travailler et mieux prendre soin de ce qui compte.
            </p>
            <p>
              Nos divisions avancent ensemble pour proposer une expérience cohérente,
              accessible et adaptée aux réalités des particuliers comme des professionnels.
            </p>
          </div>
        </section>

        <section className="group-story" id="groupe" aria-labelledby="group-title">
          <div className="group-story-image frame settle">
            <Image src={groupOffice} alt="Homme assis à son bureau" fill sizes="(max-width: 767px) 150vw, 70vw" quality={90} />
          </div>
          <div className="group-story-copy">
            <h2 id="group-title"><span>Des métiers différents.</span> <span>Une vision commune.</span></h2>
            <p className="section-note">Une même exigence</p>
            <p>
              Nous mutualisons nos compétences, nos outils et notre culture de service afin
              d’apporter des réponses concrètes, durables et proches des réalités de l’Afrique centrale.
            </p>
            <a className="button button-sun" href={whatsappUrl} target="_blank" rel="noreferrer">
              Parlons de votre besoin <WhatsappLogo size={19} weight="fill" aria-hidden />
            </a>
          </div>
        </section>

        <section className="commitments" aria-labelledby="commitments-title">
          <div className="section-head">
            <h2 id="commitments-title">Nos engagements</h2>
            <div className="section-aside">
              <p className="section-note">Ce qui nous rassemble</p>
            </div>
          </div>
          <div className="commitments-grid">
            {commitments.map((commitment) => (
              <article key={commitment.title}>
                <h3>{commitment.title}</h3>
                <p>{commitment.text}</p>
              </article>
            ))}
          </div>
        </section>
    </>
  );
}
