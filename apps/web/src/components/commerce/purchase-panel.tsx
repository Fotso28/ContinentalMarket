"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { formatPrice, tierFor } from "@/lib/catalog/format";
import type { PriceTier, Variant } from "@/lib/catalog/types";
import { whatsappLink } from "@/lib/contact";

type Props = {
  name: string;
  productUrl: string;
  basePrice: number;
  tiers: PriceTier[];
  variantLabel?: string;
  variants?: Variant[];
  available: boolean;
};

/**
 * Achat d'un produit général : coloris, quantité et palier de prix.
 * La commande passe par WhatsApp : le message contient la fiche produit, dont l'aperçu montre l'image.
 */
export function PurchasePanel({ name, productUrl, basePrice, tiers, variantLabel, variants, available }: Props) {
  const firstAvailable = variants ? Math.max(0, variants.findIndex((v) => v.available)) : 0;
  const [variantIndex, setVariantIndex] = useState(firstAvailable);
  const [quantity, setQuantity] = useState(1);

  const variant = variants?.[variantIndex];
  const unit = tierFor(quantity, tiers, basePrice);
  const total = unit * quantity;
  const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
  const activeTier = [{ minQty: 1, label: "À l’unité", unitPrice: basePrice }, ...sorted].filter((t) => quantity >= t.minQty).pop();

  const message = [
    `Bonjour, je souhaite commander : ${name}`,
    variant ? `${variantLabel ?? "Coloris"} : ${variant.label}` : null,
    `Quantité : ${quantity}`,
    `Total estimé : ${formatPrice(total)}`,
    `Fiche produit : ${productUrl}`,
  ]
    .filter(Boolean)
    .join("\n");
  const orderHref = whatsappLink(message);

  return (
    <>
      {variants && variants.length > 0 && (
        <div className="option-group">
          <p className="option-label">{variantLabel ?? "Coloris"} : <strong>{variant?.label}</strong></p>
          <div className="variant-list">
            {variants.map((v, i) => (
              <button
                type="button"
                className="variant-chip"
                aria-pressed={i === variantIndex}
                disabled={!v.available}
                aria-label={v.available ? v.label : `${v.label} (indisponible)`}
                onClick={() => setVariantIndex(i)}
                key={v.label}
              >
                {v.swatch && <span className="swatch" style={{ background: v.swatch }} aria-hidden />}
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="price-block">
        <p className="price-now">{formatPrice(unit)} <span>par unité</span></p>
        {sorted.length > 0 && (
          <ul className="tiers" aria-label="Prix selon la quantité">
            <li aria-current={activeTier?.minQty === 1 ? "true" : undefined}>
              <span>À l’unité</span><span>{formatPrice(basePrice)}</span>
            </li>
            {sorted.map((tier) => (
              <li aria-current={activeTier?.minQty === tier.minQty ? "true" : undefined} key={tier.minQty}>
                <span>{tier.label}</span><span>{formatPrice(tier.unitPrice)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="option-group">
        <p className="option-label">Quantité</p>
        <div className="qty-row">
          <div className="qty" role="group" aria-label="Quantité">
            <button type="button" aria-label="Retirer une unité" disabled={quantity <= 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
            <output aria-live="polite">{quantity}</output>
            <button type="button" aria-label="Ajouter une unité" disabled={quantity >= 99} onClick={() => setQuantity((q) => Math.min(99, q + 1))}>+</button>
          </div>
          <p className="total">Total estimé <strong>{formatPrice(total)}</strong></p>
        </div>
      </div>

      <p className={`availability ${available ? "is-in" : "is-order"}`}>
        {available ? "En stock" : "Disponible sur commande"}
      </p>

      <div className="panel-cta">
        <a className="button button-sun" href={orderHref} target="_blank" rel="noreferrer">
          Commander sur WhatsApp <WhatsappLogo size={19} weight="fill" aria-hidden />
        </a>
        <p className="fine-print">Le paiement et la livraison se confirment avec notre équipe.</p>
      </div>

      <div className="sticky-cta" aria-label="Commander">
        <p className="sticky-total"><span>Total estimé</span><strong>{formatPrice(total)}</strong></p>
        <a className="button button-sun" href={orderHref} target="_blank" rel="noreferrer">
          Commander <WhatsappLogo size={19} weight="fill" aria-hidden />
        </a>
      </div>
    </>
  );
}
