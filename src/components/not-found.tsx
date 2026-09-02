import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-navy text-cream">
      <img
        src="/catalog/seattle-skyline.jpg"
        alt=""
        width={1500}
        height={499}
        className="hero-still absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/70 to-navy/30" />
      <div className="container-cc relative py-20">
        <p
          className="hero-line text-xs tracking-[0.28em] text-gold-bright uppercase"
          style={{ "--d": "40ms" } as CSSProperties}
        >
          404
        </p>
        <h1
          className="hero-line mt-3 max-w-xl font-serif text-6xl"
          style={{ "--d": "120ms" } as CSSProperties}
        >
          That box already shipped.
        </h1>
        <p
          className="hero-line mt-4 max-w-md text-cream/80"
          style={{ "--d": "220ms" } as CSSProperties}
        >
          The page is gone. The humidor is not.
        </p>
        <div className="hero-line mt-8" style={{ "--d": "320ms" } as CSSProperties}>
          <Button asChild>
            <Link to="/">Back to the house</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
