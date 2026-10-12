import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CategoryChips } from "@/components/commerce/category-chips";
import { ProductCard } from "@/components/commerce/product-card";
import { getCategories, getProducts } from "@/lib/catalog/queries";
import { whatsappLink } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";
import auroraTrio from "../../../../public/images/products/energy/modules-aurora-trio.jpg";
import installationModule from "../../../../public/images/products/energy/installation-module-mural.jpg";

export const metadata: Metadata = buildMetadata({
  title: "Continental Energy — stockage et onduleurs",
  description: "Batteries lithium et onduleurs hybrides, sur devis, pour les foyers, les commerces et les installations professionnelles.",
  path: "/energy",
  image: auroraTrio,
});

export default function EnergyPage() {
  const categories = getCategories("energy");
  const featured = getProducts("energy");

  return (
    <>
      <section className="catalog-intro energy-intro">
        <div className="energy-intro-copy">
          <h1>L’énergie pensée comme une infrastructure.</h1>
          <p>Des équipements sélectionnés pour répondre aux besoins des foyers, des commerces et des installations professionnelles.</p>
          <a className="button button-primary" href="#produits">
            Voir les produits <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
        </div>
        <div className="energy-intro-media frame">
          <Image src={auroraTrio} alt="Modules de stockage Aurora Power alignés dans une pièce" fill preload sizes="(max-width: 767px) 100vw, 46vw" />
        </div>
      </section>

      <CategoryChips division="energy" categories={categories} />

      <section className="section-block" aria-labelledby="energy-categories-title">
        <div className="section-head">
          <h2 id="energy-categories-title">Par catégorie</h2>
        </div>
        <div className="tile-grid tile-grid-2">
          {categories.map((category) => (
            <Link href={`/energy/category/${category.slug}`} className="tile" key={category.slug}>
              <Image src={category.image} alt="" fill sizes="(max-width: 767px) 88vw, 40vw" />
              <span className="tile-label">
                <strong>{category.name}</strong>
                <ArrowRight size={18} weight="bold" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="produits" className="section-block" aria-labelledby="energy-featured-title">
        <div className="section-head">
          <h2 id="energy-featured-title">Produits en vedette</h2>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>

      <section className="install-band" aria-labelledby="install-title">
        <div className="install-band-media frame">
          <Image src={installationModule} alt="Module de stockage installé contre un mur" fill sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div className="install-band-copy">
          <h2 id="install-title">Installation intégrée</h2>
          <p>Une intégration propre, lisible et adaptée au contexte du projet. Chaque installation se chiffre après une étude de votre site.</p>
          <a className="button button-sun" href={whatsappLink("Bonjour Continental Energy, je souhaite un devis d’installation.")} target="_blank" rel="noreferrer">
            Demander un devis <WhatsappLogo size={19} weight="fill" aria-hidden />
          </a>
        </div>
      </section>

    </>
  );
}
