import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "@/lib/contact";

/**
 * Produit énergétique : pas de panier ni de prix affiché, la demande part vers un devis.
 * Le message WhatsApp contient la fiche produit ; son aperçu affiche l'image.
 */
export function QuotePanel({
  name,
  productUrl,
  facts,
}: {
  name: string;
  productUrl: string;
  facts: { label: string; value: string }[];
}) {
  const href = whatsappLink(
    [
      `Bonjour, je souhaite un devis pour : ${name}.`,
      `Fiche produit : ${productUrl}`,
      "Pouvez-vous me conseiller sur mon installation ?",
    ].join("\n"),
  );

  return (
    <>
      <p className="price price-quote-lg">Sur devis</p>
      <p className="quote-note">L’installation et la configuration sont établies selon votre site et vos besoins.</p>

      {facts.length > 0 && (
        <dl className="facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="panel-cta">
        <a className="button button-sun" href={href} target="_blank" rel="noreferrer">
          Demander un devis <WhatsappLogo size={19} weight="fill" aria-hidden />
        </a>
        <p className="fine-print">Une demande par WhatsApp, traitée par notre équipe Energy.</p>
      </div>

      <div className="sticky-cta" aria-label="Demander un devis">
        <p className="sticky-total"><span>Prix</span><strong>Sur devis</strong></p>
        <a className="button button-sun" href={href} target="_blank" rel="noreferrer">
          Demander un devis <WhatsappLogo size={19} weight="fill" aria-hidden />
        </a>
      </div>
    </>
  );
}
