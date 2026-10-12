import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <section className="catalog-intro not-found" aria-labelledby="not-found-title">
      <p className="not-found-code">Erreur 404</p>
      <h1 id="not-found-title">Cette page n’existe pas, ou plus.</h1>
      <p>Le lien est peut-être ancien. Vous pouvez repartir de l’accueil ou aller directement vers une boutique.</p>
      <div className="not-found-links">
        <Link className="button button-primary" href="/">Accueil <ArrowRight size={18} weight="bold" aria-hidden /></Link>
        <Link className="button button-primary" href="/market">Continental Market <ArrowRight size={18} weight="bold" aria-hidden /></Link>
        <Link className="button button-primary" href="/energy">Continental Energy <ArrowRight size={18} weight="bold" aria-hidden /></Link>
      </div>
    </section>
  );
}
