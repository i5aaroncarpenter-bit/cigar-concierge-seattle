import { useEffect, useState, type CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AVAILABILITY_LABEL,
  getProduct,
  pairingFor,
  relatedProducts,
} from "@/data/catalog";
import { money } from "@/lib/format";
import { useDesk } from "@/lib/store";
import { xProfileUrl, xStatusUrl } from "@/lib/x";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "@/components/not-found";
import { ProductCard } from "@/components/product-card";
import { QtyStepper } from "@/components/qty-stepper";
import { RecentlyViewed } from "@/components/recently-viewed";
import { CompareToggle } from "@/components/compare-bar";
import { SectionHead } from "@/components/section-head";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [{ title: p ? `${p.name} — Cigar Concierge` : "Cigar Concierge" }],
    };
  },
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const addItem = useDesk((s) => s.addItem);
  const markViewed = useDesk((s) => s.markViewed);
  const [qty, setQty] = useState(1);
  const [media, setMedia] = useState<"video" | string>(
    product?.video ? "video" : (product?.image ?? ""),
  );

  useEffect(() => {
    if (!product) return;
    setQty(1);
    setMedia(product.video ? "video" : product.image);
    markViewed(product.id);
  }, [product, markViewed]);

  if (!product) return <NotFoundPage />;

  const related = relatedProducts(product);
  const showVideo = media === "video" && product.video;

  return (
    <>
      <section className="py-12">
        <div className="container-cc grid items-start gap-12 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            {showVideo ? (
              <video
                key="video"
                className="media-frame media-swap aspect-4/5 w-full bg-cream-deep object-cover"
                controls
                playsInline
                preload="metadata"
                poster={product.poster ?? product.image}
                src={product.video}
              >
                <track kind="captions" />
              </video>
            ) : (
              <div className="media-zoom">
                <img
                  key={media}
                  src={media === "video" ? product.image : media}
                  alt={product.name}
                  width={product.width}
                  height={product.height}
                  className="media-frame media-swap aspect-4/5 w-full bg-cream-deep object-cover"
                />
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {product.gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setMedia(src)}
                  className={cn(
                    "size-16 overflow-hidden shadow-[var(--shadow-border)] transition-[box-shadow,scale] duration-150 ease-[var(--ease-out-quart)] hover:scale-[1.04]",
                    media === src && "shadow-[var(--shadow-border-hover)] outline outline-1 outline-gold",
                  )}
                  aria-label="View photo"
                  aria-pressed={media === src}
                >
                  <img src={src} alt="" width={74} height={74} className="size-full object-cover" />
                </button>
              ))}
              {product.video ? (
                <button
                  type="button"
                  onClick={() => setMedia("video")}
                  className={cn(
                    "size-16 overflow-hidden shadow-[var(--shadow-border)] transition-[box-shadow,scale] duration-150 ease-[var(--ease-out-quart)] hover:scale-[1.04]",
                    media === "video" && "shadow-[var(--shadow-border-hover)] outline outline-1 outline-gold",
                  )}
                  aria-label="Play product film"
                  aria-pressed={media === "video"}
                >
                  <img
                    src={product.poster ?? product.image}
                    alt=""
                    className="size-full object-cover"
                  />
                </button>
              ) : null}
            </div>
          </div>
          <div>
            <p
              className="hero-line text-xs tracking-[0.28em] text-gold-deep uppercase"
              style={{ "--d": "40ms" } as CSSProperties}
            >
              {product.brand} · {product.tag}
            </p>
            <h1
              className="hero-line mt-2 font-serif text-5xl"
              style={{ "--d": "110ms" } as CSSProperties}
            >
              {product.name}
            </h1>
            <p
              className="hero-line mt-3 font-serif text-3xl"
              style={{ "--d": "180ms" } as CSSProperties}
            >
              {money(product.price)}{" "}
              <span className="text-base text-muted">{product.unit}</span>
            </p>
            <p className="mt-4">{product.story}</p>
            <p className="mt-3 text-muted">{product.notes}</p>
            <p className="mt-5 border-l border-gold pl-4">
              <span className="block text-[11px] tracking-[0.16em] text-gold-deep uppercase">
                Tonight’s pairing
              </span>
              <span className="mt-1 block font-serif text-xl leading-snug">
                {pairingFor(product.id)}
              </span>
            </p>
            <dl className="mt-6">
              <Spec label="Format" value={product.format} />
              <Spec label="Wrapper" value={product.wrapper} />
              <Spec label="Origin" value={product.origin} />
              <Spec label="Strength" value={product.strength} />
              <Spec
                label="Availability"
                value={AVAILABILITY_LABEL[product.availability]}
              />
              <Spec
                label="House"
                value={
                  product.category === "house" ? "Private label" : "Allocated vault"
                }
              />
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <QtyStepper
                value={qty}
                onChange={setQty}
                label={product.name}
                allowInput
              />
              <Button
                onClick={() => {
                  if (addItem(product.id, qty)) {
                    toast.success(`${product.name} added to the request list.`);
                  }
                }}
              >
                {product.price ? "Add to request list" : "Request allocation"}
              </Button>
              <CompareToggle id={product.id} />
            </div>
            <a
              className="mt-4 inline-flex min-h-11 items-center border border-navy px-5 text-xs font-semibold tracking-[0.12em] uppercase transition-[background-color,color] duration-150 hover:bg-navy hover:text-cream"
              href={xProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message @SeattleCigars
            </a>
            {product.tweet ? (
              <p className="mt-4 text-sm text-muted">
                Originally offered on{" "}
                <a
                  className="text-link"
                  href={xStatusUrl(product.tweet)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this X post
                </a>
                .
              </p>
            ) : null}
          </div>
        </div>
      </section>
      {related.length ? (
        <section className="pb-16">
          <div className="container-cc">
            <SectionHead kicker="Also on the list" title="Related cigars" />
            <div className="catalog-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <RecentlyViewed excludeId={product.id} title="Opened before this" />
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="spec-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
