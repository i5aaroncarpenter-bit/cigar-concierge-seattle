import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/reveal";
import { Kicker, SectionHead } from "@/components/section-head";
import { xDmUrl } from "@/lib/x";

export const Route = createFileRoute("/concierge")({
  component: ConciergePage,
  head: () => ({ meta: [{ title: "Concierge Desk — Cigar Concierge" }] }),
});

const STEPS = [
  {
    n: "01",
    t: "Browse",
    d: "House blends have posted prices. Vault pieces are inquire-only because the box may already be spoken for.",
  },
  {
    n: "02",
    t: "Request",
    d: "Add sticks to the list and send it on X. Name the cigar, the format, and how many you want.",
  },
  {
    n: "03",
    t: "Confirm",
    d: "The Concierge replies with what’s left, the real number, and ship-to details. Vault pricing is quoted then, not guessed here.",
  },
  {
    n: "04",
    t: "Smoke",
    d: "Aged Dominican house blends for Tuesdays. Opus and Davidoff for the nights that deserve them.",
  },
];

const SERVICES = [
  {
    n: "01",
    t: "Private label",
    d: "House factory in the Dominican Republic. Custom bands exist — SpaceMob already proved the point. Serious quantity only.",
  },
  {
    n: "02",
    t: "Rare sourcing",
    d: "Tell him the year and the vitola. Forbidden X, anniversary Davidoffs, sleeping Padrón boxes — the vault turns over quietly.",
  },
  {
    n: "03",
    t: "Events & lists",
    d: "Drops land on the timeline first. If you want the next Dawgfather-style LE, be someone who already bought the last one.",
  },
];

function ConciergePage() {
  return (
    <>
      <section className="py-16">
        <div className="container-cc">
          <SectionHead kicker="The desk" title="How allocation actually works">
            <p>
              Cigar Concierge is a person with a factory, a vault, and a DM inbox
              — not a shopping-cart app. This page is the protocol.
            </p>
          </SectionHead>
          <div className="relative">
            <div className="step-rail" />
            <div className="catalog-grid relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <article
                  key={s.n}
                  className="border-t-4 border-gold bg-white px-5 py-6 shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-quart)] hover:-translate-y-1 hover:shadow-[var(--shadow-border-hover)]"
                >
                  <b className="text-xs tracking-[0.16em] text-gold-deep uppercase">
                    {s.n}
                  </b>
                  <h3 className="mt-2 font-serif text-2xl">{s.t}</h3>
                  <p className="mt-2 text-muted">{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-navy py-16 text-cream">
        <div className="container-cc grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <Kicker className="text-gold-bright">What to ask for</Kicker>
              <h2 className="mt-2 font-serif text-4xl">A good first message</h2>
              <p className="mt-4 text-cream/75">
                Keep it short. He posts the inventory in public; he does not need a
                novel.
              </p>
              <p className="mt-4 border-l border-gold/50 pl-4 italic">
                “Need a box of Blockbuster and a bundle of The 250. Ship to Seattle.
                Also — any 25th Opus left?”
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={xDmUrl} target="_blank" rel="noopener noreferrer">
                    Open a message
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/match">Find my cigar</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link to="/cart">Build a request list</Link>
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="media-zoom relative">
              <img
                src="/catalog/the-250-bundles.jpg"
                alt="The 250 bundles"
                width={1200}
                height={900}
                loading="lazy"
                className="media-frame h-96 w-full object-cover"
              />
              <Corners />
            </div>
          </Reveal>
        </div>
      </section>
      <section className="py-16">
        <div className="container-cc">
          <SectionHead kicker="Services" title="Beyond the bundle" />
          <div className="catalog-grid grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.n} className="surface p-6">
                <p className="text-xs tracking-[0.16em] text-gold-deep uppercase">
                  {s.n}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-navy">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
