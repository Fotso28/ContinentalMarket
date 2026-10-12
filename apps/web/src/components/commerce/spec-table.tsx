import type { SpecGroup } from "@/lib/catalog/types";

/** Fiche technique regroupée par thème ; un groupe vide n'est pas affiché. */
export function SpecTable({ groups }: { groups: SpecGroup[] }) {
  if (groups.length === 0) return null;
  return (
    <div className="spec-groups">
      {groups.map((group) => (
        <section className="spec-group" key={group.group} aria-labelledby={`spec-${group.group}`}>
          <h3 id={`spec-${group.group}`}>{group.title}</h3>
          <dl>
            {group.rows.map((row, index) => (
              <div key={`${row.label}-${index}`}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
