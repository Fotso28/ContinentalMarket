"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { formatPrice, tierFor } from "@/lib/catalog/format";
import type { PriceTier, Variant } from "@/lib/catalog/types";
import { whatsappLink } from "@/lib/contact";
import { DemoNotice } from "@/components/commerce/demo-notice";
import { OrderButton } from "@/components/commerce/order-button";

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
 * Achat d'un produit général : prix, coloris, quantité, palier. Un palier de prix se choisit d'un geste.
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
  const rows = [{ minQty: 1, label: "À l’unité", unitPrice: basePrice }, ...sorted];
  const activeTier = rows.filter((t) => quantity >= t.minQty).pop();
  const nextTier = sorted.find((t) => quantity < t.minQty);

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
      <div className="price-block">
        <p className="price-now">{formatPrice(unit)} <span>par unité</span></p>
        <p className={`availability ${available ? "is-in" : "is-order"}`}>
          {available ? "En stock" : "Disponible sur commande"}
        </p>
      </div>

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

        {sorted.length > 0 && (
          <>
            <ul className="tiers" aria-label="Prix selon la quantité">
              {rows.map((tier) => (
                <li key={tier.minQty}>
                  <button type="button" aria-pressed={activeTier?.minQty === tier.minQty} onClick={() => setQuantity(tier.minQty)}>
                    <span>{tier.label}</span>
                    <span>{formatPrice(tier.unitPrice)}</span>
                  </button>
                </li>
              ))}
            </ul>
            {nextTier && (
              <p className="tier-nudge">
                Encore {nextTier.minQty - quantity} {nextTier.minQty - quantity > 1 ? "unités" : "unité"} pour passer à {formatPrice(nextTier.unitPrice)} l’unité.
              </p>
            )}
          </>
        )}
      </div>

      <DemoNotice id="order-note" action="La commande" />

      <div className="panel-cta">
        <OrderButton href={orderHref} disabledLabel="Commande bientôt disponible" describedBy="order-note">
          Commander sur WhatsApp <WhatsappLogo size={20} weight="fill" aria-hidden />
        </OrderButton>
        <p className="fine-print">Le paiement et la livraison se confirment avec notre équipe.</p>
      </div>

      <div className="sticky-cta" aria-label="Commander">
        <p className="sticky-total"><span>Total estimé</span><strong>{formatPrice(total)}</strong></p>
        <OrderButton href={orderHref} disabledLabel="Bientôt disponible" describedBy="order-note">
          Commander <WhatsappLogo size={20} weight="fill" aria-hidden />
        </OrderButton>
      </div>
    </>
  );
}
