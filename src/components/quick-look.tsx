import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AVAILABILITY_LABEL, pairingFor, type Product } from "@/data/catalog";
import { money } from "@/lib/format";
import { useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { CompareToggle } from "@/components/compare-bar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function QuickLook({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const addItem = useDesk((s) => s.addItem);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!product || !open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[85] grid place-items-center p-4",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn("drawer-veil absolute inset-0 bg-ink/55", open && "is-open")}
        aria-label="Close quick look"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-labelledby="quick-look-title"
        className={cn(
          "relative grid w-full max-w-3xl overflow-hidden bg-parchment shadow-[var(--shadow-lift)] md:grid-cols-2",
          open ? "age-card-in" : "opacity-0",
        )}
      >
        <img
          src={product.image}
          alt=""
          width={product.width}
          height={product.height}
          className="h-64 w-full object-cover md:h-full"
        />
        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.16em] text-gold-deep uppercase">
                {product.brand} · {AVAILABILITY_LABEL[product.availability]}
              </p>
              <h2 id="quick-look-title" className="mt-1 font-serif text-3xl">
                {product.name}
              </h2>
            </div>
            <Button
              variant="outline"
              size="icon"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
          <p className="mt-2 font-serif text-2xl tabular-nums">
            {money(product.price)}{" "}
            <span className="text-sm text-muted">{product.unit}</span>
          </p>
          <p className="mt-3 text-sm text-muted">{product.blurb}</p>
          <p className="mt-3 border-l border-gold pl-3 text-sm">
            {pairingFor(product.id)}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <Button
              onClick={() => {
                if (addItem(product.id)) {
                  toast.success(`${product.name} added to the request list.`);
                  onClose();
                }
              }}
            >
              {product.price ? "Add to request" : "Request allocation"}
            </Button>
            <Button asChild variant="outline" onClick={onClose}>
              <Link to="/product/$id" params={{ id: product.id }}>
                Full box
              </Link>
            </Button>
            <CompareToggle id={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}