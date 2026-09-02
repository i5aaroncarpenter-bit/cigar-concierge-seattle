import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoBlock({
  src,
  poster,
  title,
  className,
  autoPlay = false,
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(autoPlay);

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className={cn(
          "group relative block w-full overflow-hidden bg-navy text-left",
          className,
        )}
        aria-label={`Play ${title}`}
      >
        <img
          src={poster}
          alt=""
          width={720}
          height={1280}
          loading="lazy"
          decoding="async"
          className="aspect-9/16 max-h-96 w-full object-cover transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-105 md:aspect-video md:max-h-none"
        />
        <span className="absolute inset-0 bg-navy/30 transition-colors duration-300 group-hover:bg-navy/15" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="play-ring grid size-16 place-items-center rounded-full border border-gold bg-navy/70 text-gold-bright transition-[scale,background-color] duration-200 ease-[var(--ease-out-quart)] group-hover:scale-105 group-hover:bg-navy/85">
            <Play className="ml-0.5 size-6 fill-current" aria-hidden />
          </span>
        </span>
      </button>
    );
  }

  return (
    <video
      className={cn("media-frame media-swap w-full bg-ink", className)}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      autoPlay
      src={src}
    >
      <track kind="captions" />
    </video>
  );
}
