import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/reveal";
import { Kicker } from "@/components/section-head";
import { xProfileUrl } from "@/lib/x";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — Cigar Concierge" }] }),
});

function AboutPage() {
  return (
    <>
      <section className="py-16">
        <div className="container-cc grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="media-zoom relative">
              <img
                src="/catalog/house-bands.jpg"
                alt="Cigar Concierge house bands"
                width={900}
                height={1200}
                className="media-frame h-96 w-full object-cover"
              />
              <Corners />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <Kicker>The house</Kicker>
              <h1 className="mt-2 font-serif text-5xl">
                A concierge, not a warehouse.
              </h1>
              <div className="gold-rule gold-rule-left my-4" />
              <p className="mt-4">
                Cigar Concierge™ is the private list behind @SeattleCigars — a
                former UW quarterback / tight end and Rose Bowl champion who built
                a Dominican factory relationship and a reputation for cigars other
                shops cannot find.
              </p>
              <p className="mt-3 text-muted">
                The gold bell on the band is the mark. Purple, blue, and orange
                house bands for the private blends. Capitol bands for The 250.
                Purple Reign lids for The Dawgfather. A SpaceMob band for the
                people who asked for their own stick.
              </p>
              <p className="mt-3">
                Football talk stays on the timeline. The humidor stays serious.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-navy py-16 text-cream">
        <div className="container-cc">
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <Kicker className="text-gold-bright">What we actually sell</Kicker>
            <h2 className="mt-2 text-4xl text-cream">Two rooms</h2>
            <div className="gold-rule is-in my-4" />
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "House factory",
                d: "Aged Dominican filler and binder, Habano and Maduro wrappers, pigtail toros and Churchills. Bundles of 10 at $160 or boxes of 10 at $185, as posted.",
              },
              {
                n: "02",
                t: "Allocated vault",
                d: "Fuente Opus X — 25th, Shark 77, Forbidden Phantom, Power of the Dream. Davidoff anniversary pieces with yellowed bands. Padrón 1964 boxes that have been sleeping since 1999.",
              },
              {
                n: "03",
                t: "The method",
                d: "Inventory is announced on X with photos and a video when it matters. You DM. He confirms. No fake “in cart” theater for a box that already sold.",
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
        </div>
      </section>
      <section className="py-16">
        <div className="container-cc max-w-3xl">
          <Reveal>
            <Kicker>Note on this demo</Kicker>
            <h2 className="mt-2 font-serif text-4xl">Built from the public timeline</h2>
            <div className="gold-rule gold-rule-left my-4" />
            <p className="mt-4">
              Every product, price, and film on this site was isolated from public
              posts by @SeattleCigars. House creed, blend notes, and drop language
              are his. This boutique exists so the catalog can be browsed as a
              store instead of a scroll.
            </p>
            <p className="mt-3 text-muted">
              It is not an official transaction site. To buy, message the man who
              owns the list.
            </p>
            <Button asChild className="mt-6">
              <a href={xProfileUrl} target="_blank" rel="noopener noreferrer">
                Follow @SeattleCigars
              </a>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
