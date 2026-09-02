import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getProduct } from "@/data/catalog";
import { money } from "@/lib/format";
import { itemCount, knownSubtotal, useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RequestDrawer() {
  const open = useDesk((s) => s.drawerOpen);
  const items = useDesk((s) => s.items);
  const close = useDesk((s) => s.closeDrawer);
  const removeItem = useDesk((s) => s.removeItem);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-drawer",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn("drawer-veil absolute inset-0 bg-ink/45", open && "is-open")}
        aria-label="Close request list"
        tabIndex={open ? 0 : -1}
        onClick={close}
      />
      <aside
        className={cn(
          "drawer-panel absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-parchment shadow-[var(--shadow-lift)]",
          open && "is-open",
        )}
        role="dialog"
        aria-modal={open}
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="drawer-title" className="font-serif text-2xl">
            Request list
          </h2>
          <Button variant="outline" size="icon" onClick={close} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="gold-rule is-in mb-5" />
              <p className="text-muted">Your request list is empty.</p>
              <Button asChild variant="outline" className="mt-6">
                <Link
                  to="/shop"
                  search={{ cat: "all", q: "", strength: "all" }}
                  onClick={close}
                >
                  Browse the humidor
                </Link>
              </Button>
            </div>
          ) : (
            <ul>
              {items.map((item) => {
                const p = getProduct(item.id);
                if (!p) return null;
                return (
                  <li
                    key={item.id}
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border-b border-cream-deep py-3"
                  >
                    <img
                      src={p.image}
                      alt=""
                      width={64}
                      height={80}
                      className="media-frame h-20 w-16 object-cover"
                    />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted">
                        {item.qty} × {money(p.price)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Remove ${p.name}`}
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-line px-5 py-4">
          <p className="flex justify-between text-sm">
            <span>Items</span>
            <strong className="tabular-nums">{itemCount(items)}</strong>
          </p>
          <p className="mt-2 flex justify-between text-sm">
            <span>Known subtotal</span>
            <strong className="tabular-nums">{money(knownSubtotal(items))}</strong>
          </p>
          <p className="mt-3 text-xs text-muted">
            Vault pieces price on request. Checkout opens a message to the
            Concierge — nothing is charged here.
          </p>
          <Button asChild className="mt-4 w-full">
            <Link to="/cart" onClick={close}>
              Review & request
            </Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
