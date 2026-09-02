import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchSuggest } from "@/components/search-suggest";
import { itemCount, useDesk } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/match", label: "Match" },
  { to: "/concierge", label: "Concierge" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useDesk((s) => itemCount(s.items));
  const openDrawer = useDesk((s) => s.openDrawer);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const searchInput =
    "h-10 w-48 rounded-full border border-gold/30 bg-cream/10 pr-4 pl-9 text-sm text-cream outline-none placeholder:text-cream/50 transition-[border-color,box-shadow] duration-200 focus-visible:border-gold focus-visible:shadow-[0_0_0_3px_rgb(201_162_39/0.22)]";

  return (
    <header
      className={cn(
        "sticky top-0 z-header border-b border-gold/35 bg-navy/95 backdrop-blur-lg transition-[box-shadow] duration-200 ease-[var(--ease-out-quart)]",
        scrolled && "shadow-[0_12px_32px_rgb(11_31_58/0.38)]",
      )}
    >
      <div className="container-cc flex h-20 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-3 text-cream">
          <img
            src="/brand/crest-tight.jpg"
            alt=""
            width={58}
            height={58}
            className="size-14 rounded-full object-cover outline outline-1 outline-gold transition-[outline-color,scale] duration-200 group-hover:scale-[1.04] group-hover:outline-gold-bright"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-wide text-gold-bright">
              Cigar Concierge
            </span>
            <span className="mt-1 text-[11px] tracking-[0.22em] text-cream/80 uppercase">
              Seattle · private list
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "nav-link text-[13px] tracking-[0.14em] text-cream/85 uppercase transition-colors duration-150 hover:text-gold-bright",
                  active && "is-active text-gold-bright",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SearchSuggest
            id="site-search"
            className="hidden md:block"
            inputClassName={searchInput}
          />
          <Button
            variant="outlineGold"
            size="icon"
            aria-label={`Request list, ${count} items`}
            onClick={openDrawer}
            className="relative"
          >
            <ShoppingBag className="size-4" />
            <span
              key={count}
              className={cn(
                "absolute -top-1.5 -right-1.5 grid min-w-4.5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-navy tabular-nums",
                count > 0 && "badge-pop",
              )}
            >
              {count}
            </span>
          </Button>
          <Button
            variant="outlineGold"
            size="icon"
            className="relative xl:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <span className="relative grid size-4 place-items-center">
              <span
                className={cn(
                  "absolute inset-0 grid place-items-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                  menu ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]",
                )}
              >
                <X className="size-4" />
              </span>
              <span
                className={cn(
                  "grid place-items-center transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                  menu ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none",
                )}
              >
                <Menu className="size-4" />
              </span>
            </span>
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "grid xl:hidden",
          "transition-[grid-template-rows] duration-300 ease-[var(--ease-out-quart)]",
          menu ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav
          className={cn("mobile-nav overflow-hidden", menu && "is-open")}
          aria-label="Mobile"
          aria-hidden={!menu}
        >
          <div className="flex flex-col gap-4 border-t border-gold/25 px-6 py-5">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-stagger nav-link w-fit text-sm tracking-[0.14em] text-cream uppercase"
                tabIndex={menu ? 0 : -1}
              >
                {item.label}
              </Link>
            ))}
            <SearchSuggest
              id="mobile-search"
              className="nav-stagger md:hidden"
              tabIndex={menu ? 0 : -1}
              inputClassName="h-11 w-full border border-gold/30 bg-cream/10 px-3 pl-9 text-cream outline-none"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}