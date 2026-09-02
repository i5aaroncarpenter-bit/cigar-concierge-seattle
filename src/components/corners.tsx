import { cn } from "@/lib/utils";

export function Corners({
  className,
  insetClass = "inset-3",
}: {
  className?: string;
  insetClass?: string;
}) {
  return (
    <span
      className={cn("pointer-events-none absolute", insetClass, className)}
      aria-hidden
    >
      <span className="absolute top-0 left-0 h-3.5 w-3.5 border-t border-l border-gold" />
      <span className="absolute top-0 right-0 h-3.5 w-3.5 border-t border-r border-gold" />
      <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-gold" />
      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-gold" />
    </span>
  );
}
