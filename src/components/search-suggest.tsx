import { FormEvent, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { suggestProducts, type Product } from "@/data/catalog";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";

export function SearchSuggest({
  id,
  className,
  inputClassName,
  tabIndex,
}: {
  id?: string;
  className?: string;
  inputClassName?: string;
  tabIndex?: number;
}) {
  const navigate = useNavigate();
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-list`;
  const wrapRef = useRef<HTMLFormElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const hits = suggestProducts(q);

  useEffect(() => {
    setActive(0);
  }, [q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function goShop(query: string) {
    setOpen(false);
    void navigate({
      to: "/shop",
      search: { cat: "all", q: query.trim(), strength: "all" },
    });
  }

  function goProduct(p: Product) {
    setOpen(false);
    setQ("");
    void navigate({ to: "/product/$id", params: { id: p.id } });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (open && hits[active]) {
      goProduct(hits[active]);
      return;
    }
    goShop(q);
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (!hits.length) {
      if (e.key === "Escape") setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((n) => (n + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((n) => (n - 1 + hits.length) % hits.length);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const show = open && hits.length > 0;

  return (
    <form
      ref={wrapRef}
      onSubmit={onSubmit}
      className={cn("relative", className)}
      role="search"
    >
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gold"
        aria-hidden
      />
      <label className="sr-only" htmlFor={inputId}>
        Search cigars
      </label>
      <input
        id={inputId}
        type="search"
        value={q}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={show}
        aria-controls={listId}
        tabIndex={tabIndex}
        placeholder="Search cigars"
        className={inputClassName}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
      />
      {show ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-72 overflow-hidden border border-gold/35 bg-navy py-1 text-cream shadow-[var(--shadow-lift)]"
        >
          {hits.map((p, i) => (
            <li key={p.id} role="option" aria-selected={i === active}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors duration-150",
                  i === active ? "bg-navy-mid" : "hover:bg-navy-mid/70",
                )}
                onMouseEnter={() => setActive(i)}
                onClick={() => goProduct(p)}
              >
                <img
                  src={p.image}
                  alt=""
                  width={36}
                  height={48}
                  className="h-12 w-9 object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-serif text-base leading-tight">
                    {p.name}
                  </span>
                  <span className="block text-[11px] tracking-wide text-cream/60 uppercase">
                    {p.brand}
                  </span>
                </span>
                <span className="font-serif text-sm text-gold-bright tabular-nums">
                  {money(p.price)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}