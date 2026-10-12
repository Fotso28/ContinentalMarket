import { catalogIsDemo } from "@/lib/catalog/format";
import { whatsappLink } from "@/lib/contact";

/**
 * Note affichée tant que le catalogue est fictif : elle dit pourquoi la commande est indisponible
 * et propose une voie réelle, l'échange avec l'équipe. Visible sur tous les écrans, hors du bloc d'achat masqué sur mobile.
 */
export function DemoNotice({ id, action }: { id: string; action: string }) {
  if (!catalogIsDemo) return null;

  return (
    <p className="demo-notice" id={id}>
      Ces produits et ces prix sont des exemples. {action} ouvrira avec le catalogue réel.{" "}
      <a href={whatsappLink("Bonjour Continental Group, je souhaite échanger avec votre équipe.")} target="_blank" rel="noreferrer">
        Écrire à l’équipe
      </a>
    </p>
  );
}
