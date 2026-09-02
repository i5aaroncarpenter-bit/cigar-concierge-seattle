import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { journalVideos, tweetEmbeds } from "@/data/catalog";
import { SectionHead } from "@/components/section-head";
import { VideoBlock } from "@/components/video-block";
import { xStatusUrl } from "@/lib/x";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({ meta: [{ title: "Journal — Cigar Concierge" }] }),
});

function JournalPage() {
  const [featured, ...rest] = journalVideos;
  return (
    <>
      <section className="py-16">
        <div className="container-cc">
          <SectionHead kicker="From the timeline" title="Cigar films">
            <p>
              Every cigar video isolated from @SeattleCigars — hosted here, with
              a path back to the original post. Click to play; nothing autoplays.
            </p>
          </SectionHead>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {featured ? (
              <article>
                <VideoBlock
                  src={featured.src}
                  poster={featured.poster}
                  title={featured.title}
                  className="max-h-96"
                />
                <div className="pt-4">
                  <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">
                    From the X desk
                  </p>
                  <h3 className="mt-2 font-serif text-3xl">{featured.title}</h3>
                  <p className="mt-2 text-muted">{featured.copy}</p>
                  {featured.productId ? (
                    <Link
                      to="/product/$id"
                      params={{ id: featured.productId }}
                      className="text-link mt-3 inline-block text-sm"
                    >
                      View the cigar
                    </Link>
                  ) : null}
                </div>
              </article>
            ) : null}
            <div className="catalog-grid grid gap-4">
              {rest.map((v) => (
                <article key={v.id} className="surface-static overflow-hidden">
                  <VideoBlock src={v.src} poster={v.poster} title={v.title} />
                  <div className="p-4">
                    <strong className="font-serif text-xl">{v.title}</strong>
                    <p className="mt-1 text-sm text-muted">{v.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="container-cc">
          <SectionHead kicker="Original posts" title="On X" />
          <ul className="catalog-grid grid gap-4 sm:grid-cols-2">
            {tweetEmbeds.map((e) => (
              <li key={e.id}>
                <a
                  href={xStatusUrl(e.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface group block p-5"
                >
                  <p className="text-xs tracking-[0.16em] text-gold-deep uppercase">
                    @SeattleCigars
                  </p>
                  <p className="mt-2 font-serif text-2xl">{e.title}</p>
                  <p className="mt-2 flex items-center gap-1 text-sm text-muted">
                    Open original post
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
