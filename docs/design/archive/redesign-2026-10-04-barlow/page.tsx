import Image from "next/image";
import { ArrowDownRight, ArrowRight, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/site-header";
import { StoryNav } from "@/components/story-nav";
import energyProducts from "../../public/images/energy-products.jpg";
import groupLogo from "../../public/images/landing/logo-group-transparent-cropped.png";

const whatsappUrl = "https://wa.me/237698579865?text=Bonjour%20Continental%20Group%2C%20je%20souhaite%20%C3%A9changer%20avec%20votre%20%C3%A9quipe.";
const chapters = [
  { id: "market", name: "Market", subject: "Commerce" },
  { id: "energy", name: "Energy", subject: "Énergie" },
  { id: "software", name: "Software", subject: "Logiciels" },
  { id: "pressing", name: "Pressing", subject: "Soin textile" },
];

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader whatsappUrl={whatsappUrl} />
      <section className="opening" id="haut" aria-labelledby="opening-title">
        <div className="opening-topline"><span>Continental Group</span><span>Douala · Cameroun</span></div>
        <h1 id="opening-title">CONTINENTAL<span>GROUP</span></h1>
        <div className="opening-bottom">
          <p className="opening-statement">Quatre métiers.<br />Des réponses concrètes.</p>
          <div className="opening-aside">
            <p>Commerce, énergie, logiciels et soin textile : des activités différentes, pensées pour les besoins du quotidien.</p>
            <a href="#metiers" className="text-action">Découvrir nos métiers <ArrowDownRight size={23} weight="regular" aria-hidden /></a>
          </div>
        </div>
        <div className="opening-route" aria-label="Accès direct aux métiers">
          {chapters.map((chapter) => <a key={chapter.id} href={"#" + chapter.id}><span>{chapter.subject}</span><ArrowDownRight size={19} weight="regular" aria-hidden /></a>)}
        </div>
      </section>

      <div className="editorial-line" aria-hidden="true"><span>Continental Group</span><span>Des métiers ancrés dans le réel</span></div>

      <section className="story" id="metiers" aria-labelledby="story-title">
        <div className="story-heading">
          <h2 id="story-title">Un groupe.<br /><em>Quatre terrains.</em></h2>
          <p>Choisissez le métier qui répond à votre besoin, ou laissez-vous guider au fil de la page.</p>
        </div>
        <div className="story-layout">
          <StoryNav chapters={chapters} />
          <div className="story-chapters">
            <article className="story-chapter market-chapter" id="market" data-story-chapter="market">
              <div className="chapter-top"><span>Continental Market</span><span>Commerce</span></div>
              <div className="chapter-main">
                <h3>Ce qu’il vous faut.<br />Sans détour.</h3>
                <p>Téléphonie, informatique et équipement de la maison : Continental Market rassemble des produits pour les achats du quotidien comme pour les besoins en quantité.</p>
                <div className="chapter-tags" aria-label="Univers de Continental Market"><span>Téléphonie</span><span>Informatique</span><span>Maison</span></div>
                <a className="chapter-action" href={whatsappUrl} target="_blank" rel="noreferrer">Parler de votre besoin Market <ArrowRight size={20} aria-hidden /></a>
              </div>
              <div className="market-type" aria-hidden="true"><span>CHOISIR</span><span>ÉQUIPER</span><span>AVANCER</span></div>
            </article>

            <article className="story-chapter energy-chapter" id="energy" data-story-chapter="energy">
              <div className="chapter-top"><span>Continental Energy</span><span>Énergie</span></div>
              <div className="chapter-main">
                <h3>Pour que l’activité<br />continue.</h3>
                <p>Stockage et équipements énergétiques pour les foyers, les commerces et les installations professionnelles. Une réponse à construire selon chaque usage.</p>
                <a className="chapter-action" href={whatsappUrl} target="_blank" rel="noreferrer">Échanger sur un projet Energy <ArrowRight size={20} aria-hidden /></a>
              </div>
              <figure className="energy-photo">
                <Image src={energyProducts} alt="Équipements énergétiques Sunlux présentés en entrepôt" fill loading="eager" sizes="(max-width: 900px) 100vw, 55vw" />
                <figcaption>Équipements de la gamme proposée par Continental Energy.</figcaption>
              </figure>
            </article>

            <article className="story-chapter software-chapter" id="software" data-story-chapter="software">
              <div className="chapter-top"><span>Continental Software</span><span>Logiciels</span></div>
              <div className="chapter-main">
                <h3>Des outils qui suivent<br />votre façon de travailler.</h3>
                <p>Des solutions numériques pour organiser l’activité, suivre les opérations et mieux piloter le travail au quotidien.</p>
                <a className="chapter-action" href={whatsappUrl} target="_blank" rel="noreferrer">Discuter d’un besoin logiciel <ArrowRight size={20} aria-hidden /></a>
              </div>
              <div className="software-notation" aria-label="Organiser, suivre, décider">
                <div><span>Organiser</span><b>→</b></div><div><span>Suivre</span><b>→</b></div><div><span>Décider</span><b>↗</b></div>
              </div>
            </article>

            <article className="story-chapter pressing-chapter" id="pressing" data-story-chapter="pressing">
              <div className="chapter-top"><span>Continental Pressing</span><span>Soin textile</span></div>
              <div className="chapter-main">
                <h3>Le soin se reconnaît<br />au premier regard.</h3>
                <p>Du lavage à la finition, Continental Pressing prend soin des vêtements qui accompagnent vos journées.</p>
                <a className="chapter-action" href={whatsappUrl} target="_blank" rel="noreferrer">Contacter le pressing <ArrowRight size={20} aria-hidden /></a>
              </div>
              <div className="pressing-detail" aria-hidden="true"><span>LAVÉ</span><span>REPASSÉ</span><span>PRÊT</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="group-note" id="groupe" aria-labelledby="group-note-title">
        <div className="group-note-marker">CG<span>DOUALA</span></div>
        <div><h2 id="group-note-title">Différents métiers.<br />Une même attention à l’utile.</h2>
          <p>Continental Group réunit Market, Energy, Software et Pressing. Pour les particuliers comme pour les professionnels, le point de départ reste le même : comprendre le besoin et trouver une réponse adaptée.</p></div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-lead"><h2 id="contact-title">Parlons de ce<br />qu’il vous faut.</h2>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">Écrire à Continental Group <ArrowRight size={30} aria-hidden /></a></div>
        <div className="contact-details">
          <p><MapPin size={19} aria-hidden /> Douala — Logpom, derrière Papirus</p>
          <a href="tel:+237671275495">+237 671 27 54 95</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsappLogo size={19} aria-hidden /> WhatsApp : +237 698 57 98 65</a>
        </div>
      </section>
      <footer className="site-footer">
        <a href="#haut" className="footer-logo" aria-label="Retour en haut de la page"><Image src={groupLogo} alt="Continental Group" sizes="180px" /></a>
        <span>© {new Date().getFullYear()} Continental Group</span><a href="#haut">Retour en haut ↑</a>
      </footer>
    </main>
  );
}

