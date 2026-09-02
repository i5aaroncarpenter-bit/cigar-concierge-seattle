import { useEffect, useRef, type CSSProperties } from "react";
import { useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Corners } from "@/components/corners";

export function AgeGate() {
  const hydrated = useDesk((s) => s.hydrated);
  const ageOk = useDesk((s) => s.ageOk);
  const confirmAge = useDesk((s) => s.confirmAge);
  const first = useRef<HTMLButtonElement>(null);

  const open = hydrated && !ageOk;

  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="age-veil fixed inset-0 z-age grid place-items-center bg-navy/95 p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
      aria-describedby="age-copy"
    >
      <div className="age-card-in relative w-full max-w-md border border-gold bg-parchment px-8 py-10 text-center shadow-[var(--shadow-lift)]">
        <Corners />
        <img
          src="/brand/crest-tight.jpg"
          alt=""
          width={120}
          height={120}
          className="mx-auto mb-5 size-24 rounded-full object-cover outline outline-1 -outline-offset-1 outline-gold ring-4 ring-gold/20"
        />
        <div className="gold-rule is-in my-0 mb-4" />
        <h2
          id="age-title"
          className="hero-line font-serif text-4xl text-ink"
          style={{ "--d": "80ms" } as CSSProperties}
        >
          Ring the bell.
        </h2>
        <p
          id="age-copy"
          className="hero-line mt-3 mb-6 text-muted"
          style={{ "--d": "160ms" } as CSSProperties}
        >
          Cigar Concierge is a 21+ tobacco boutique. Confirm you are of legal
          smoking age in your jurisdiction. This confirmation is stored on this
          device for 30 days.
        </p>
        <div
          className="hero-line flex flex-wrap justify-center gap-3"
          style={{ "--d": "240ms" } as CSSProperties}
        >
          <Button ref={first} onClick={confirmAge}>
            I am 21+
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "https://www.google.com";
            }}
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
