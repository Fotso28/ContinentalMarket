const steps = {
  market: {
    title: "Comment commander",
    items: [
      "Choisissez le produit, le coloris et la quantité.",
      "Envoyez votre commande sur WhatsApp : le message est déjà rédigé.",
      "Confirmez le paiement et la livraison avec notre équipe.",
    ],
  },
  energy: {
    title: "Comment obtenir un devis",
    items: [
      "Choisissez un produit, ou décrivez-nous votre besoin.",
      "Envoyez votre demande sur WhatsApp : le message est déjà rédigé.",
      "Notre équipe étudie votre site et chiffre l’installation.",
    ],
  },
} as const;

/** Parcours d'achat en trois temps, en pied de liste : rassure sans détourner de la vente. */
export function OrderSteps({ division }: { division: "market" | "energy" }) {
  const { title, items } = steps[division];
  return (
    <section className="order-steps" aria-labelledby={`steps-${division}`}>
      <h2 id={`steps-${division}`}>{title}</h2>
      <ol>
        {items.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ol>
    </section>
  );
}
