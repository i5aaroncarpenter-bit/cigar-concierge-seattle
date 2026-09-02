import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { AVAILABILITY_LABEL, type Product } from "@/data/catalog";
import { money } from "@/lib/format";
import { useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { CompareToggle } from "@/components/compare-bar";
import { QuickLook } from "@/components/quick-look";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useDesk((s) => s.addItem);
  const [look, setLook] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden bg-white shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]">
      <div className="relative">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="relative block aspect-4/5 overflow-hidden bg-cream-deep"
        >
          <img
            src={product.image}
            alt={product.name}
            width={product.width}
            height={product.height}
            loading="lazy"
            decoding="async"
            className="media-frame size-full object-cover transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20" />
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1.5 text-[10px] tracking-[0.14em] uppercase",
              product.badge === "vault"
                ? "bg-danger text-cream"
                : "bg-gold text-navy",
            )}
          >
            {product.tag}
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-navy/85 via-navy/25 to-transparent px-4 pt-16 pb-3 text-[11px] tracking-[0.16em] text-cream uppercase opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-quart)] group-hover:translate-y-0 group-hover:opacity-100">
            Open the box
          </span>
        </Link>
        <button
          type="button"
          className="absolute right-3 bottom-3 z-10 inline-flex min-h-10 items-center gap-1.5 bg-parchment/95 px-3 text-[11px] tracking-[0.12em] text-navy uppercase shadow-[var(--shadow-border)] transition-colors duration-150 hover:bg-gold"
          onClick={() => setLook(true)}
        >
          <Eye className="size-3.5" aria-hidden />
          Quick look
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4.5">
        <p className="text-[11px] tracking-[0.16em] text-muted uppercase">
          {product.brand}
        </p>
        <h3 className="font-serif text-2xl leading-none">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="transition-colors duration-150 hover:text-gold-deep"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted">{product.format}</p>
        <p className="text-xs tracking-wide text-gold-deep uppercase">
          {AVAILABILITY_LABEL[product.availability]}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-3">
          <span className="font-serif text-2xl text-navy tabular-nums">
            {money(product.price)}
          </span>
          <Button
            size="sm"
            variant="navy"
            onClick={() => {
              if (addItem(product.id)) {
                toast.success(`${product.name} added to the request list.`);
              }
            }}
          >
            {product.price ? "Add" : "Request"}
          </Button>
        </div>
        <CompareToggle id={product.id} className="mt-1 self-start" />
      </div>
      <QuickLook product={product} open={look} onClose={() => setLook(false)} />
    </article>
  );
}