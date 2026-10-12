import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Fil d’Ariane">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href && index < items.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
