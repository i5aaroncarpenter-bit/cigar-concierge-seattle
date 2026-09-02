import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AgeGate } from "@/components/age-gate";
import { CompareBar } from "@/components/compare-bar";
import { SiteFooter } from "@/components/footer";
import { SiteHeader } from "@/components/header";
import { RequestDrawer } from "@/components/request-drawer";
import { useDesk } from "@/lib/store";

const TICKER = [
  "Demo boutique — no live charges",
  "Requests route to @SeattleCigars on X",
  "21+ · adult signature on delivery",
  "House blends · The Vault · The Dawgfather",
];

export function SiteShell({ children }: { children: ReactNode }) {
  const markHydrated = useDesk((s) => s.markHydrated);
  const hydrated = useDesk((s) => s.hydrated);
  const ageOk = useDesk((s) => s.ageOk);
  const comparing = useDesk((s) => s.compareIds.length);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const result = useDesk.persist.rehydrate();
    void Promise.resolve(result).then(() => {
      useDesk.getState().markHydrated();
    });
  }, [markHydrated]);

  const line = `${TICKER.join("   ·   ")}   ·   `;

  return (
    <div className="flex min-h-screen flex-col bg-parchment text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-age focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <div className="ticker bg-gold text-navy" aria-label={TICKER.join(". ")}>
        <div className="ticker-track">
          <span>{line}</span>
          <span aria-hidden="true">{line}</span>
        </div>
      </div>
      <SiteHeader />
      <main id="main" className={comparing ? "flex-1 pb-28" : "flex-1"}>
        {hydrated && ageOk ? (
          <div key={pathname} className="page-enter">
            {children}
          </div>
        ) : (
          <div className="min-h-[70vh] bg-parchment" />
        )}
      </main>
      <SiteFooter />
      <RequestDrawer />
      <CompareBar />
      <AgeGate />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "border-l-4 border-gold bg-navy text-cream",
        }}
      />
    </div>
  );
}
