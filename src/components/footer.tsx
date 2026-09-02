import { Link } from "@tanstack/react-router";
import { xProfileUrl } from "@/lib/x";

const linkClass =
  "foot-link mt-2 text-sm text-cream/75 transition-colors duration-150 hover:text-gold-bright";

export function SiteFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-navy pt-14 pb-6 text-cream before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-gold before:to-transparent">
      <img
        src="/brand/crest-tight.jpg"
        alt=""
        aria-hidden
        width={256}
        height={256}
        className="pointer-events-none absolute right-[-3rem] bottom-[-3rem] size-48 rounded-full object-cover opacity-[0.08] md:size-64"
      />
      <div className="container-cc relative grid gap-8 md:grid-cols-4">
        <div>
          <h2 className="font-serif text-2xl text-gold-bright">
            Cigar Concierge™
          </h2>
          <p className="mt-3 max-w-xs text-cream/70">
            Private-label Dominican cigars and an allocated vault of Fuente,
            Davidoff, and Padrón. Ring the bell. DM to order.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-xl text-gold-bright">Shop</h3>
          <Link
            to="/shop"
            search={{ cat: "house", q: "", strength: "all" }}
            className={linkClass}
          >
            House blends
          </Link>
          <Link
            to="/shop"
            search={{ cat: "vault", q: "", strength: "all" }}
            className={linkClass}
          >
            The Vault
          </Link>
          <Link
            to="/product/$id"
            params={{ id: "dawgfather" }}
            className={linkClass}
          >
            The Dawgfather
          </Link>
          <Link
            to="/product/$id"
            params={{ id: "blockbuster" }}
            className={linkClass}
          >
            Blockbuster
          </Link>
        </div>
        <div>
          <h3 className="font-serif text-xl text-gold-bright">House</h3>
          <Link to="/about" className={linkClass}>
            The Concierge
          </Link>
          <Link to="/concierge" className={linkClass}>
            How allocation works
          </Link>
          <Link to="/match" className={linkClass}>
            Match desk
          </Link>
          <Link to="/journal" className={linkClass}>
            Video journal
          </Link>
          <Link to="/compare" className={linkClass}>
            Compare sticks
          </Link>
          <Link to="/contact" className={linkClass}>
            Request a stick
          </Link>
        </div>
        <div>
          <h3 className="font-serif text-xl text-gold-bright">Connect</h3>
          <a
            className={linkClass}
            href={xProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            @SeattleCigars
          </a>
          <Link to="/cart" className={linkClass}>
            Request list
          </Link>
          <Link to="/contact" className={linkClass}>
            Concierge desk
          </Link>
        </div>
      </div>
      <div className="container-cc relative mt-8 border-t border-gold/20 pt-4 text-xs leading-relaxed text-cream/55">
        Must be 21+ to browse or request tobacco. Adult signature required on
        delivery. We do not auto-confirm shipments to Alaska, Hawaii,
        Massachusetts, or Utah. This is a design demo assembled from public
        @SeattleCigars posts — not an official storefront. Smoking cigars can
        cause cancer, heart disease, and other serious health conditions. SURGEON
        GENERAL WARNING: Cigar Smoking Can Cause Cancers Of The Mouth And Throat,
        Even If You Do Not Inhale. Prices shown are those published on X at time
        of capture.
      </div>
    </footer>
  );
}
