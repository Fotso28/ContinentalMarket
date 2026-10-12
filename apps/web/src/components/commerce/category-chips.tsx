import Link from "next/link";
import type { Category, Division } from "@/lib/catalog/types";

/** Filtres de catégorie en ligne, défilables au doigt sur mobile. */
export function CategoryChips({
  division,
  categories,
  activeSlug,
}: {
  division: Division;
  categories: Category[];
  activeSlug?: string;
}) {
  const base = `/${division}`;
  return (
    <nav className="chips" aria-label="Catégories">
      <Link href={base} className="chip-link" aria-current={activeSlug === undefined ? "page" : undefined}>
        Tous
      </Link>
      {categories.map((category) => (
        <Link
          href={`${base}/category/${category.slug}`}
          className="chip-link"
          aria-current={activeSlug === category.slug ? "page" : undefined}
          key={category.slug}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
