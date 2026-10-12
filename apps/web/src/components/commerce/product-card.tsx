import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog/format";
import type { CardData } from "@/lib/catalog/view";

/** Carte produit : image, nom, prix lisible d'un coup d'œil, disponibilité. Toute la carte est le lien. */
export function ProductCard({ product, showDivision = false }: { product: CardData; showDivision?: boolean }) {
  const quote = product.price === undefined;

  return (
    <article className="product-card">
      <Link href={product.href} className="product-card-media" aria-hidden tabIndex={-1}>
        <Image src={product.image} alt="" fill sizes="(max-width: 767px) 48vw, (max-width: 1050px) 30vw, 22vw" />
        {!product.inStock && <span className="card-badge">Sur commande</span>}
      </Link>
      <div className="product-card-body">
        {(product.brand || showDivision) && (
          <p className="product-card-brand">{[showDivision ? product.divisionLabel : null, product.brand].filter(Boolean).join(" · ")}</p>
        )}
        <h3><Link href={product.href}>{product.name}</Link></h3>
        {product.facts.length > 0 && (
          <ul className="fact-chips" aria-label="Caractéristiques clés">
            {product.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        )}
        <div className="product-card-foot">
          {quote ? (
            <p className="price price-quote">Prix sur devis</p>
          ) : (
            <p className="price">
              {formatPrice(product.price!)}
              <span className="price-hint">{product.tierHint}</span>
            </p>
          )}
          <p className={`card-status ${product.inStock ? "" : "is-order"}`}>{product.inStock ? "En stock" : "Sur commande"}</p>
        </div>
      </div>
    </article>
  );
}
