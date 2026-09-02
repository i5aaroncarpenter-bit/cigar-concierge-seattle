import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[12px] font-medium uppercase tracking-[0.22em] text-gold-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  children,
  invert = false,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
  invert?: boolean;
}) {
  return (
    <Reveal>
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <Kicker className={invert ? "text-gold-bright" : undefined}>{kicker}</Kicker>
        <h2 className={cn("mt-2 text-4xl md:text-5xl", invert ? "text-cream" : "text-ink")}>
          {title}
        </h2>
        <div className="gold-rule my-4" />
        {children ? (
          <div className={cn("text-muted", invert && "text-cream/75")}>{children}</div>
        ) : null}
      </header>
    </Reveal>
  );
}
