"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-play video card. No autoplay, no preloading the full file.
 * Sizes itself to the video's own aspect ratio (many phone-shot clips are
 * vertical) instead of forcing a 16:9 crop that would cut off the subject.
 */
export function VideoFeature({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black",
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        controls={playing}
        preload="metadata"
        playsInline
        className="block max-h-[75vh] w-full"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing ? (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
          aria-label="Reproducir vídeo"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-raven-green text-raven-bg shadow-lg shadow-black/40 transition-transform hover:scale-110 sm:size-20">
            <Play className="size-7 translate-x-0.5 sm:size-8" fill="currentColor" />
          </span>
        </button>
      ) : null}
    </div>
  );
}
