"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlaceholderMedia } from "@/components/placeholder-media";
import type { GalleryCategory, GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: GalleryCategory | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "entrenamientos", label: "Entrenamientos" },
  { value: "boxeadores", label: "Boxeadores" },
  { value: "instalaciones", label: "Instalaciones" },
  { value: "clases", label: "Clases" },
  { value: "eventos", label: "Eventos" },
];

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "todas">("todas");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "todas" ? images : images.filter((img) => img.category === filter)),
    [images, filter]
  );

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  const go = (delta: number) => {
    if (activeIndex === null) return;
    const next = (activeIndex + delta + filtered.length) % filtered.length;
    setActiveIndex(next);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === cat.value
                ? "border-raven-green bg-raven-green text-raven-bg"
                : "border-white/15 text-raven-gray hover:border-raven-green/50 hover:text-raven-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-raven-gray">
          No hay imágenes en esta categoría todavía.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 focus-visible:outline-2 focus-visible:outline-raven-green"
            >
              {img.url ? (
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <PlaceholderMedia icon={Camera} label={img.caption} />
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-3xl border-white/10 bg-raven-bg-alt p-0 sm:max-w-3xl sm:rounded-2xl"
        >
          <DialogTitle className="sr-only">{active?.caption ?? "Imagen"}</DialogTitle>
          {active ? (
            <div className="relative">
              <div className="relative aspect-[4/3] w-full">
                {active.url ? (
                  <Image src={active.url} alt={active.caption} fill className="object-cover" />
                ) : (
                  <PlaceholderMedia icon={Camera} label={active.caption} className="rounded-t-2xl" />
                )}
              </div>
              <div className="flex items-center justify-between p-4">
                <p className="text-sm text-raven-white">{active.caption}</p>
                <button
                  onClick={() => setActiveIndex(null)}
                  className="rounded-full p-1.5 text-raven-gray hover:bg-raven-bg-soft hover:text-raven-white"
                  aria-label="Cerrar"
                >
                  <X className="size-4" />
                </button>
              </div>
              {filtered.length > 1 ? (
                <>
                  <button
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
