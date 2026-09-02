import { FormEvent, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/catalog";
import { isRestrictedShipTo, US_STATES } from "@/data/shipping";
import { money } from "@/lib/format";
import { itemCount, knownSubtotal, useDesk } from "@/lib/store";
import { buildDeskMessage, xDmUrl } from "@/lib/x";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/qty-stepper";
import { SectionHead } from "@/components/section-head";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Request List — Cigar Concierge" }] }),
});

function CartPage() {
  const items = useDesk((s) => s.items);
  const setQty = useDesk((s) => s.setQty);
  const removeItem = useDesk((s) => s.removeItem);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function fail(msg: string) {
    setError(msg);
    const el = formRef.current;
    if (!el) return;
    el.classList.remove("field-shake");
    void el.offsetWidth;
    el.classList.add("field-shake");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const handle = String(fd.get("handle") ?? "").trim();
    const state = String(fd.get("state") ?? "");
    const notes = String(fd.get("notes") ?? "");
    const age = fd.get("age") === "on";
    if (name.length < 2) {
      fail("Name is required.");
      return;
    }
    if (!age) {
      fail("Confirm you are 21 or older.");
      return;
    }
    if (isRestrictedShipTo(state)) {
      fail(
        "The desk does not auto-confirm tobacco to this state. Message @SeattleCigars directly.",
      );
      return;
    }
    setError(null);
    const lines = items.map((i) => {
      const p = getProduct(i.id);
      if (!p) return "";
      return `${i.qty}× ${p.name} (${p.price ? money(p.price) : "inquire"})`;
    });
    const text = buildDeskMessage({ name, handle, state, lines, notes });
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Request copied. Opening X…");
    } catch {
      toast.error("Could not copy. The X window will still open.");
    }
    window.open(xDmUrl, "_blank", "noopener,noreferrer");
  }

  if (!items.length) {
    return (
      <section className="py-16">
        <div className="container-cc text-center">
          <SectionHead kicker="Desk" title="Your request list">
            <p>Nothing on the list yet.</p>
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

  return (
    <section className="py-16">
      <div className="container-cc">
        <SectionHead kicker="Desk" title="Your request list">
          <p>
            Demo checkout. Nothing is charged. Send the list to @SeattleCigars
            to make it real.
          </p>
        </SectionHead>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
          <div className="surface-static overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-cream-deep text-xs tracking-wider uppercase">
                  <th className="p-4">Cigar</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Line</th>
                  <th className="p-4">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const p = getProduct(item.id);
                  if (!p) return null;
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-cream-deep transition-colors duration-150 hover:bg-cream/70"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            width={72}
                            height={90}
                            className="media-frame h-24 w-16 object-cover"
                          />
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-sm text-muted">{p.format}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 tabular-nums">{money(p.price)}</td>
                      <td className="p-4">
                        <QtyStepper
                          value={item.qty}
                          onChange={(n) => setQty(item.id, n)}
                          label={p.name}
                        />
                      </td>
                      <td className="p-4 tabular-nums">
                        {p.price ? money(p.price * item.qty) : "TBD"}
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <aside className="relative h-fit bg-navy p-7 text-cream shadow-[var(--shadow-lift)]">
            <h3 className="font-serif text-3xl text-gold-bright">Request desk</h3>
            <div className="gold-rule gold-rule-left is-in my-4 bg-gold-bright" />
            <p className="mt-4 flex justify-between text-sm">
              <span>Items</span>
              <strong className="tabular-nums">{itemCount(items)}</strong>
            </p>
            <p className="mt-2 flex justify-between text-sm">
              <span>Known subtotal</span>
              <strong className="tabular-nums">
                {money(knownSubtotal(items))}
              </strong>
            </p>
            <p className="mt-2 flex justify-between text-sm text-cream/70">
              <span>Vault pieces</span>
              <span>Priced on reply</span>
            </p>
            <hr className="my-4 border-gold/30" />
            <form ref={formRef} className="grid gap-3" onSubmit={onSubmit} noValidate>
              <label className="grid gap-1 text-xs tracking-wider uppercase">
                Name
                <input
                  name="name"
                  required
                  className="h-11 border border-gold/30 bg-navy-mid px-3 text-sm text-cream normal-case outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-gold focus-visible:shadow-[0_0_0_3px_rgb(201_162_39/0.22)]"
                />
              </label>
              <label className="grid gap-1 text-xs tracking-wider uppercase">
                X handle
                <input
                  name="handle"
                  className="h-11 border border-gold/30 bg-navy-mid px-3 text-sm text-cream normal-case outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-gold focus-visible:shadow-[0_0_0_3px_rgb(201_162_39/0.22)]"
                  placeholder="@handle"
                />
              </label>
              <label className="grid gap-1 text-xs tracking-wider uppercase">
                Ship-to state
                <select
                  name="state"
                  defaultValue="WA"
                  className="h-11 border border-gold/30 bg-navy-mid px-3 text-sm text-cream normal-case outline-none transition-[border-color] duration-150 focus-visible:border-gold"
                >
                  {US_STATES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs tracking-wider uppercase">
                Notes
                <textarea
                  name="notes"
                  rows={3}
                  className="border border-gold/30 bg-navy-mid px-3 py-2 text-sm text-cream normal-case outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-gold focus-visible:shadow-[0_0_0_3px_rgb(201_162_39/0.22)]"
                />
              </label>
              <label className="flex items-start gap-2 text-xs font-normal tracking-normal normal-case">
                <input type="checkbox" name="age" className="mt-0.5 accent-gold" required />
                I am 21+ and accept adult-signature shipping.
              </label>
              {error ? (
                <p className="text-sm text-gold-bright" role="alert">
                  {error}
                </p>
              ) : null}
              <p className="text-xs text-cream/70">
                This demo does not process payments. Copy the list, then confirm
                allocation, shipping, and payment with the Concierge.
              </p>
              <Button type="submit" className="w-full">
                Copy request & open X
              </Button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}
