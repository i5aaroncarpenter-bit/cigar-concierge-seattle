import { createFileRoute, Link } from "@tanstack/react-router";
import { featuredProducts, getProduct } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { RecentlyViewed } from "@/components/recently-viewed";
import { Reveal } from "@/components/reveal";
import { Corners } from "@/components/corners";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/section-head";
import type { CSSProperties } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "Cigar Concierge — Seattle" }],
  }),
});

function Home() {
  const dawg = getProduct("dawgfather");
  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-navy text-cream">
        <img
          src="/catalog/seattle-skyline.jpg"
          alt="Seattle skyline at dusk"
          width={1500}
          height={499}
          fetchPriority="high"
          decoding="async"
          className="hero-still absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/30 via-navy/55 to-navy/92" />
        <div className="container-cc relative py-20">
          <p
            className="hero-line mb-3 text-xs tracking-[0.28em] text-gold-bright uppercase"
            style={{ "--d": "40ms" } as CSSProperties}
          >
            Cigar Concierge ™ · Seattle
          </p>
          <h1
            className="hero-line max-w-xl font-serif text-6xl leading-[0.92] md:text-8xl"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            Life’s too short to smoke bullshit cigars.
          </h1>
          <p
            className="hero-line mt-5 max-w-xl text-lg text-cream/85"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            House blends from a Dominican factory. A vault of aged Fuente,
            Davidoff, and Padrón. One bell. One list. DM to order.
          </p>
          <div
            className="hero-line mt-8 flex flex-wrap gap-3"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <Button asChild>
              <Link
                to="/shop"
                search={{ cat: "all", q: "", strength: "all" }}
              >
                Browse the humidor
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/concierge">How the desk works</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/match">Find my cigar</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-cc">
          <Reveal>
            <header className="mx-auto mb-10 max-w-2xl text-center">
              <Kicker>Now on the list</Kicker>
              <h2 className="mt-2 text-4xl md:text-5xl">House blends & the vault</h2>
              <div className="gold-rule my-4" />
              <p className="text-muted">
                Prices and allocations as published by @SeattleCigars. Vault pieces
                price on request.
              </p>
            </header>
          </Reveal>
          <div className="catalog-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts().map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <p className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/shop" search={{ cat: "all", q: "", strength: "all" }}>
                View full catalog
              </Link>
            </Button>
          </p>
        </div>
      </section>

      <section className="bg-navy py-20 text-cream">
        <div className="container-cc grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Private label",
              d: "The 250, Blockbuster, Dawgfather, SpaceMob, and Pigtail Toro — aged Dominican leaf, rolled at the house factory, banded with the gold concierge bell.",
            },
            {
              n: "02",
              t: "The vault",
              d: "Opus X 25th, 2009 Forbidden Phantom, 1999 Padrón 1964 Imperiales, Davidoff 100th Diadema Fina. Aged boxes, not catalog screenshots.",
            },
            {
              n: "03",
              t: "The desk",
              d: "No shopping cart theater. You request. The Concierge confirms what’s real, what’s left, and how it ships. Ring the bell on X.",
            },
          ].map((item, i) => (
            <Reveal key={item.n} delay={i * 90}>
              <article className="border-t border-gold/40 pt-6">
                <p className="text-xs tracking-[0.22em] text-gold-bright uppercase">
                  {item.n}
                </p>
                <h3 className="mt-2 font-serif text-3xl text-gold-bright">
                  {item.t}
                </h3>
                <p className="mt-3 text-cream/75">{item.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24 text-center text-cream">
        <img
          src="/catalog/house-bands.jpg"
          alt=""
          width={900}
          height={1200}
          className="hero-still absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <Reveal>
          <div className="container-cc relative py-6">
            <Corners insetClass="inset-0 md:inset-x-[18%] md:inset-y-0" />
            <Kicker className="text-gold-bright">House creed</Kicker>
            <blockquote className="mx-auto mt-4 max-w-xl font-serif text-4xl md:text-5xl">
              “Life’s too short to smoke bullshit cigars.”
            </blockquote>
            <div className="gold-rule my-5 bg-gold-bright" />
            <cite className="mt-4 block text-xs tracking-[0.16em] text-gold-bright not-italic uppercase">
              @SeattleCigars · Cigar Concierge
            </cite>
          </div>
        </Reveal>
      </section>

      {dawg ? (
        <section className="py-20">
          <div className="container-cc grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <div className="media-zoom relative">
                <img
                  src="/catalog/dawgfather-box.jpg"
                  alt="The Dawgfather box"
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="media-frame h-96 w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <Kicker>Limited drop</Kicker>
                <h2 className="mt-2 font-serif text-5xl">The Dawgfather</h2>
                <p className="mt-4 text-muted">
                  Highly aged Dominican filler and binder under a smooth Maduro
                  wrapper. Rolled pigtail toro. Purple Reign box. $185 for ten —
                  very limited for Husky nation.
                </p>
                <p className="mt-3">Say who. Say what. Then DM.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/product/$id" params={{ id: "dawgfather" }}>
                      View the box
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/journal">Watch the drop video</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}
      <RecentlyViewed />
    </>
  );
}
