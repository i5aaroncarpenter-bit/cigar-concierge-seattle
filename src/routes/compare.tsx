import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AVAILABILITY_LABEL,
  pairingFor,
  productsByIds,
} from "@/data/catalog";
import { money } from "@/lib/format";
import { useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/section-head";
import { toast } from "sonner";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
  head: () => ({ meta: [{ title: "Compare — Cigar Concierge" }] }),
});

function ComparePage() {
  const ids = useDesk((s) => s.compareIds);
  const remove = useDesk((s) => s.removeCompare);
  const addItem = useDesk((s) => s.addItem);
  const products = productsByIds(ids);

  if (products.length < 2) {
    return (
      <section className="py-16">
        <div className="container-cc text-center">
          <SectionHead kicker="The tray" title="Compare sticks">
            <p>
              {products.length === 1
                ? "Pin one more cigar from the shop."
                : "Pin two or three cigars from the shop to sit them side by side."}
            </p>
          </SectionHead>
          <Button asChild>
            <Link to="/shop" search={{ cat: "all", q: "", strength: "all" }}>
              Browse the humidor
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  const rows: { label: string; value: (id: string) => string }[] = [
    { label: "House", value: (id) => {
      const p = products.find((x) => x.id === id);
      return p?.category === "house" ? "Private label" : "Allocated vault";
    }},
    { label: "Format", value: (id) => products.find((x) => x.id === id)?.format ?? "—" },
    { label: "Wrapper", value: (id) => products.find((x) => x.id === id)?.wrapper ?? "—" },
    { label: "Origin", value: (id) => products.find((x) => x.id === id)?.origin ?? "—" },
    { label: "Strength", value: (id) => products.find((x) => x.id === id)?.strength ?? "—" },
    {
      label: "Availability",
      value: (id) => {
        const p = products.find((x) => x.id === id);
        return p ? AVAILABILITY_LABEL[p.availability] : "—";
      },
    },
    { label: "Price", value: (id) => money(products.find((x) => x.id === id)?.price) },
    { label: "Pairing", value: (id) => pairingFor(id) },
  ];

  return (
    <section className="py-16">
      <div className="container-cc">
        <SectionHead kicker="The tray" title="Side by side">
          <p>House notes against vault notes. Then you request what still exists.</p>
        </SectionHead>
        <div className="surface-static overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="border-b border-cream-deep">
                <th className="w-36 p-4 text-xs tracking-wider text-muted uppercase">
                  Spec
                </th>
                {products.map((p) => (
                  <th key={p.id} className="p-4 align-top">
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="block"
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={160}
                        height={200}
                        className="mb-3 h-40 w-full object-cover"
                      />
                      <span className="font-serif text-2xl">{p.name}</span>
                    </Link>
                    <p className="mt-1 text-xs tracking-wide text-muted uppercase">
                      {p.brand}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-cream-deep">
                  <th className="p-4 text-xs tracking-[0.14em] text-muted uppercase">
                    {row.label}
                  </th>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 text-sm">
                      {row.value(p.id)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th className="p-4" />
                {products.map((p) => (
                  <td key={p.id} className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          if (addItem(p.id)) {
                            toast.success(`${p.name} added to the request list.`);
                          }
                        }}
                      >
                        {p.price ? "Add" : "Request"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => remove(p.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}