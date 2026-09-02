import { useState, type CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/section-head";
import {
  getMatchPicks,
  OCCASIONS,
  ROOM_CHOICES,
  STRENGTH_CHOICES,
  type MatchAnswers,
  type OccasionId,
  type RoomId,
  type StrengthId,
} from "@/lib/match";
import { useDesk } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/match")({
  component: MatchPage,
  head: () => ({ meta: [{ title: "Match Desk — Cigar Concierge" }] }),
});

type Step = 1 | 2 | 3 | 4;

function MatchPage() {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Partial<MatchAnswers>>({});
  const picks =
    answers.occasion && answers.strength && answers.room
      ? getMatchPicks(answers as MatchAnswers)
      : [];
  const addItem = useDesk((s) => s.addItem);
  const progress = step === 4 ? 100 : ((step - 1) / 3) * 100;

  function reset() {
    setStep(1);
    setAnswers({});
  }

  return (
    <>
      <section className="bg-navy py-16 text-cream">
        <div className="container-cc max-w-3xl">
          <p
            className="hero-line text-xs tracking-[0.28em] text-gold-bright uppercase"
            style={{ "--d": "40ms" } as CSSProperties}
          >
            The desk
          </p>
          <h1
            className="hero-line mt-2 font-serif text-5xl md:text-6xl"
            style={{ "--d": "110ms" } as CSSProperties}
          >
            What should you smoke.
          </h1>
          <p
            className="hero-line mt-4 max-w-xl text-cream/75"
            style={{ "--d": "200ms" } as CSSProperties}
          >
            Three questions. Three sticks. Then you request — the Concierge
            confirms what’s actually left.
          </p>
          <div className="mt-8 h-px bg-gold/25">
            <div
              className="h-px bg-gold transition-[width] duration-300 ease-[var(--ease-out-quart)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-[11px] tracking-[0.16em] text-gold-bright uppercase tabular-nums">
            {step === 4 ? "Your three" : `Question ${step} of 3`}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-cc max-w-3xl">
          {step === 1 ? (
            <Question
              kicker="01"
              title="What’s the night."
              options={OCCASIONS.map((o) => ({
                id: o.id,
                label: o.label,
                hint: o.hint,
              }))}
              value={answers.occasion}
              onPick={(id) => {
                setAnswers((a) => ({ ...a, occasion: id as OccasionId }));
                setStep(2);
              }}
            />
          ) : null}
          {step === 2 ? (
            <Question
              kicker="02"
              title="How much strength."
              options={STRENGTH_CHOICES.map((o) => ({
                id: o.id,
                label: o.label,
              }))}
              value={answers.strength}
              onPick={(id) => {
                setAnswers((a) => ({ ...a, strength: id as StrengthId }));
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          ) : null}
          {step === 3 ? (
            <Question
              kicker="03"
              title="House factory or the vault."
              options={ROOM_CHOICES.map((o) => ({
                id: o.id,
                label: o.label,
              }))}
              value={answers.room}
              onPick={(id) => {
                setAnswers((a) => ({ ...a, room: id as RoomId }));
                setStep(4);
              }}
              onBack={() => setStep(2)}
            />
          ) : null}
          {step === 4 ? (
            <div>
              <Kicker>The three</Kicker>
              <h2 className="mt-2 font-serif text-4xl">Ring the bell with these.</h2>
              <p className="mt-3 text-muted">
                Opinionated, not official. Inventory still moves on X.
              </p>
              <div className="catalog-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {picks.map((pick) => (
                  <div key={pick.product.id}>
                    <p className="mb-3 border-l border-gold pl-3 text-sm text-muted">
                      {pick.why}
                    </p>
                    <ProductCard product={pick.product} />
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    let n = 0;
                    for (const pick of picks) {
                      if (addItem(pick.product.id)) n += 1;
                    }
                    if (n) toast.success(`${n} sticks added to the request list.`);
                  }}
                >
                  Add all three
                </Button>
                <Button variant="outline" onClick={reset}>
                  Ask again
                </Button>
                <Button asChild variant="outline">
                  <Link to="/shop" search={{ cat: "all", q: "", strength: "all" }}>
                    Browse the humidor
                  </Link>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function Question({
  kicker,
  title,
  options,
  value,
  onPick,
  onBack,
}: {
  kicker: string;
  title: string;
  options: { id: string; label: string; hint?: string }[];
  value?: string;
  onPick: (id: string) => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-2 font-serif text-4xl">{title}</h2>
      <div className="mt-8 grid gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            className={cn(
              "min-h-14 border px-5 py-4 text-left transition-[background-color,border-color,color] duration-150",
              value === o.id
                ? "border-navy bg-navy text-cream"
                : "border-line bg-white hover:border-navy",
            )}
            onClick={() => onPick(o.id)}
          >
            <span className="block font-serif text-2xl leading-none">{o.label}</span>
            {o.hint ? (
              <span
                className={cn(
                  "mt-2 block text-sm",
                  value === o.id ? "text-cream/70" : "text-muted",
                )}
              >
                {o.hint}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      {onBack ? (
        <button
          type="button"
          className="mt-6 text-xs tracking-[0.14em] text-muted uppercase hover:text-navy"
          onClick={onBack}
        >
          Back
        </button>
      ) : null}
    </div>
  );
}