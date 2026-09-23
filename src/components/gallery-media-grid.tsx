"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VideoFeature } from "@/components/video-feature";

type MediaItem = { type: "photo" | "video"; src: string };

export function GalleryMediaGrid({ items }: { items: MediaItem[] }) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {items.map((item) =>
        item.type === "video" ? (
          <div key={item.src} className="mb-5 break-inside-avoid">
            <VideoFeature src={item.src} className="max-w-none" />
          </div>
        ) : (
          <button
            key={item.src}
            onClick={() => setActivePhoto(item.src)}
            className="mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-raven-bg-alt focus-visible:outline-2 focus-visible:outline-raven-green"
          >
            <Image
              src={item.src}
              alt=""
              width={900}
              height={900}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
            />
          </button>
        )
      )}

      <Dialog open={activePhoto !== null} onOpenChange={(open) => !open && setActivePhoto(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-3xl border-white/10 bg-raven-bg-alt p-0 sm:max-w-3xl"
        >
          <DialogTitle className="sr-only">Foto de la galería</DialogTitle>
          {activePhoto ? (
            <div className="relative">
              <Image
                src={activePhoto}
                alt=""
                width={1600}
                height={1600}
                className="h-auto max-h-[85vh] w-full object-contain"
              />
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                aria-label="Cerrar"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
