import { Link } from "@tanstack/react-router";
import { Columns2, X } from "lucide-react";
import { productsByIds } from "@/data/catalog";
import { useDesk } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CompareToggle({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const ids = useDesk((s) => s.compareIds);
  const toggle = useDesk((s) => s.toggleCompare);
  const on = ids.includes(id);

  return (
    <button
      type="button"
      aria-pressed={on}
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors duration-150",
        on ? "text-gold-deep" : "text-muted hover:text-navy",
        className,
      )}
      onClick={() => {
        const was = ids.includes(id);
        if (!toggle(id)) {
          toast.error("The tray holds three. Remove one first.");
          return;
        }
        toast.success(was ? "Removed from compare." : "Pinned for compare.");
      }}
    >
      <Columns2 className="size-3.5" aria-hidden />
      {on ? "In compare" : "Compare"}
    </button>
  );
}

export function CompareBar() {
  const ids = useDesk((s) => s.compareIds);
  const remove = useDesk((s) => s.removeCompare);
  const clear = useDesk((s) => s.clearCompare);
  const products = productsByIds(ids);
  if (!products.length) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[85] px-3 pb-3">
      <div className="pointer-events-auto mx-auto flex max-w-4xl flex-wrap items-center gap-3 border border-gold/40 bg-navy px-4 py-3 text-cream shadow-[var(--shadow-lift)]">
        <p className="text-[11px] tracking-[0.16em] text-gold-bright uppercase">
          Compare {products.length} / 3
        </p>
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 bg-navy-mid pr-1 pl-1"
            >
              <img
                src={p.image}
                alt=""
                width={36}
                height={48}
                className="h-12 w-9 object-cover"
              />
              <span className="hidden max-w-28 truncate font-serif text-sm sm:inline">
                {p.name}
              </span>
              <button
                type="button"
                className="grid size-8 place-items-center text-cream/70 hover:text-gold-bright"
                aria-label={`Remove ${p.name}`}
                onClick={() => remove(p.id)}
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {products.length < 2 ? (
            <Button size="sm" disabled>
              Add one more
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/compare">Open compare</Link>
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}