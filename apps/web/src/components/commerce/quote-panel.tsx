"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useId, useState } from "react";
import { whatsappLink } from "@/lib/contact";
import { DemoNotice } from "@/components/commerce/demo-notice";
import { OrderButton } from "@/components/commerce/order-button";

const projects = ["Maison", "Commerce", "Installation professionnelle"] as const;

/**
 * Produit énergétique : pas de panier ni de prix affiché, la demande part vers un devis.
 * Le client précise son projet ; le message WhatsApp est rédigé avec la fiche produit, dont l'aperçu affiche l'image.
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
  const id = useId();
  const [project, setProject] = useState("");
  const [need, setNeed] = useState("");

  const href = whatsappLink(
    [
      `Bonjour, je souhaite un devis pour : ${name}.`,
      project ? `Projet : ${project}` : null,
      need.trim() ? `Précisions : ${need.trim()}` : null,
      `Fiche produit : ${productUrl}`,
      "Pouvez-vous me conseiller sur mon installation ?",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return (
    <>
      {facts.length > 0 && (
        <dl className="facts-grid">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="price-block">
        <p className="price-now price-now-quote">Prix sur devis</p>
        <p className="quote-note">L’installation et la configuration sont établies selon votre site et vos besoins.</p>
      </div>

      <div className="option-group">
        <p className="option-label" id={`${id}-project`}>Votre projet <span>(facultatif)</span></p>
        <div className="variant-list" role="group" aria-labelledby={`${id}-project`}>
          {projects.map((item) => (
            <button
              type="button"
              className="variant-chip"
              aria-pressed={project === item}
              onClick={() => setProject(project === item ? "" : item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="field">
          <span>Précisions</span>
          <textarea
            rows={2}
            value={need}
            maxLength={300}
            onChange={(event) => setNeed(event.target.value)}
            placeholder="Appareils à alimenter, durée de secours souhaitée…"
          />
        </label>
      </div>

      <DemoNotice id="quote-note" action="La demande de devis" />

      <div className="panel-cta">
        <OrderButton href={href} disabledLabel="Devis bientôt disponible" describedBy="quote-note">
          Demander un devis sur WhatsApp <WhatsappLogo size={20} weight="fill" aria-hidden />
        </OrderButton>
        <p className="fine-print">Votre demande est traitée par notre équipe Energy.</p>
      </div>

      <div className="sticky-cta" aria-label="Demander un devis">
        <p className="sticky-total"><span>Prix</span><strong>Sur devis</strong></p>
        <OrderButton href={href} disabledLabel="Bientôt disponible" describedBy="quote-note">
          Devis <WhatsappLogo size={20} weight="fill" aria-hidden />
        </OrderButton>
      </div>
    </>
  );
}
