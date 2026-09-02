import { productsByIds } from "@/data/catalog";
import { useDesk } from "@/lib/store";
import { ProductCard } from "@/components/product-card";
import { SectionHead } from "@/components/section-head";

export function RecentlyViewed({
  excludeId,
  kicker = "The desk remembers",
  title = "Recently opened",
}: {
  excludeId?: string;
  kicker?: string;
  title?: string;
}) {
  const viewedIds = useDesk((s) => s.viewedIds);
  const items = productsByIds(viewedIds.filter((id) => id !== excludeId)).slice(
    0,
    3,
  );
  if (!items.length) return null;

  return (
    <section className="py-16">
      <div className="container-cc">
        <SectionHead kicker={kicker} title={title}>
          <p>Sticks you already opened in this session stay on the desk.</p>
        </SectionHead>
        <div className="catalog-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}