import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function ShopNotFound() {
  return (
    <section className="shop-page not-found" aria-labelledby="not-found-title">
      <p className="not-found-code">Produit ou page introuvable</p>
      <h1 id="not-found-title">Ce produit n’est plus au catalogue.</h1>
      <p>Le lien est peut-être ancien. Retrouvez nos produits dans l’une des deux boutiques.</p>
      <div className="not-found-links">
        <Link className="button button-primary" href="/market">Market <ArrowRight size={18} weight="bold" aria-hidden /></Link>
        <Link className="button button-primary" href="/energy">Energy <ArrowRight size={18} weight="bold" aria-hidden /></Link>
      </div>
    </section>
  );
}
