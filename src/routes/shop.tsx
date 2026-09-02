import { createFileRoute } from "@tanstack/react-router";
import { filterCatalog } from "@/data/catalog";
import { parseShopSearch, type ShopSearch } from "@/lib/search";
import { ProductCard } from "@/components/product-card";
import { SectionHead } from "@/components/section-head";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => parseShopSearch(s),
  component: ShopPage,
  head: () => ({ meta: [{ title: "Shop — Cigar Concierge" }] }),
});

const CATS: { id: ShopSearch["cat"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "house", label: "House blends" },
  { id: "vault", label: "The Vault" },
];

const STRENGTHS: { id: ShopSearch["strength"]; label: string }[] = [
  { id: "all", label: "Any strength" },
  { id: "Medium", label: "Medium" },
  { id: "Medium-Full", label: "Medium-Full" },
  { id: "Full", label: "Full" },
];

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = filterCatalog(search);

  function setSearch(patch: Partial<ShopSearch>) {
    void navigate({
      search: { ...search, ...patch },
      replace: true,
    });
  }

  return (
    <section className="py-16">
      <div className="container-cc">
        <SectionHead kicker="The humidor" title="Shop cigars">
          <p>
            House blends ship in published bundles. Vault pieces are allocated —
            add them and the desk will price the box.
          </p>
        </SectionHead>
        {search.q ? (
          <p className="mb-6 text-center text-sm text-muted">
            Showing results for “{search.q}”
          </p>
        ) : null}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={cn("chip", search.cat === c.id && "is-on")}
              aria-pressed={search.cat === c.id}
              onClick={() => setSearch({ cat: c.id, q: "" })}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {STRENGTHS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={cn("chip is-gold", search.strength === s.id && "is-on")}
              aria-pressed={search.strength === s.id}
              onClick={() => setSearch({ strength: s.id })}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mb-8 text-center text-xs tracking-[0.16em] text-muted uppercase tabular-nums">
          {list.length} {list.length === 1 ? "cigar" : "cigars"} on the list
        </p>
        {list.length === 0 ? (
          <div className="py-16 text-center">
            <div className="gold-rule is-in mb-5" />
            <p className="text-muted">No cigars match that filter.</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => setSearch({ cat: "all", q: "", strength: "all" })}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div
            key={`${search.cat}-${search.strength}-${search.q}`}
            className="catalog-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
