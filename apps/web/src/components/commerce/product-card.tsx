import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { formatPrice, startingPrice } from "@/lib/catalog/format";
import { getKeyFacts } from "@/lib/catalog/queries";
import type { Product } from "@/lib/catalog/types";

/** Carte produit : marché affiche le prix à partir de, énergie affiche ses chiffres clés et « Sur devis ». */
export function ProductCard({ product }: { product: Product }) {
  const href = `/${product.division}/product/${product.slug}`;
  const from = startingPrice(product);
  const facts = product.division === "energy" ? getKeyFacts(product) : [];

  return (
    <article className="product-card">
      <Link href={href} className="product-card-media" aria-label={product.name}>
        <Image src={product.images[0]} alt="" fill sizes="(max-width: 767px) 48vw, (max-width: 1050px) 30vw, 22vw" />
      </Link>
      <div className="product-card-body">
        <div className="product-card-text">
          <h3><Link href={href}>{product.name}</Link></h3>
          {product.brand && <p className="product-card-brand">{product.brand}</p>}
          {facts.length > 0 && (
            <ul className="fact-chips">
              {facts.map((fact) => <li key={fact.label}>{fact.value}</li>)}
            </ul>
          )}
        </div>
        <div className="product-card-foot">
          {from !== undefined ? (
            <p className="price">
              <span className="price-from">À partir de</span> {formatPrice(from)}
            </p>
          ) : (
            <p className="price price-quote">Sur devis</p>
          )}
          <Link href={href} className="add-round" aria-label={`Voir ${product.name}`}>
            <ArrowRight size={18} weight="bold" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
