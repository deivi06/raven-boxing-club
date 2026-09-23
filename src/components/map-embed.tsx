import { ExternalLink, Navigation } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GYM } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <iframe
          title={`Mapa de ${GYM.name}`}
          src={GYM.googleMapsEmbedSrc}
          width="100%"
          height="360"
          style={{ border: 0, filter: "grayscale(0.15) invert(0.92) contrast(0.9)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={GYM.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), "bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark")}
        >
          <Navigation className="size-4" />
          Cómo llegar
        </a>
        <a
          href={GYM.googleMapsShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-white/15 text-raven-white hover:bg-raven-bg-soft"
          )}
        >
          <ExternalLink className="size-4" />
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
}
