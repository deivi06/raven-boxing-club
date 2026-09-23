import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { GalleryMediaGrid } from "@/components/gallery-media-grid";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos y vídeos del día a día en Raven Boxing Club.",
};

const GALLERY_DIR = "/images/galeria";

const VIDEOS = [
  "igexport-C__XUSENAcL.mp4",
  "igexport-DMyPJqPNLMj.mp4",
  "igexport-DOmH7XZDZbm.mp4",
  "igexport-DRc_qijDTJq.mp4",
  "igexport-DaQ0UqyNmuo.mp4",
];

const PHOTOS = [
  "igexport-DQ-LWXEDYMk.jpg",
  "igexport-DQ-LWXEDYMk-2.jpg",
  "igexport-DQ-LWXEDYMk-3.jpg",
  "igexport-DQ-LWXEDYMk-4.jpg",
  "igexport-DQ-LWXEDYMk-5.jpg",
  "igexport-DQ-LWXEDYMk-6.jpg",
  "igexport-DQ-LWXEDYMk-7.jpg",
  "igexport-DQ-LWXEDYMk-8.jpg",
  "igexport-DQ-LWXEDYMk-9.jpg",
  "igexport-DXuq_YpDfWI.jpg",
  "igexport-DXuq_YpDfWI-2.jpg",
  "igexport-DXuq_YpDfWI-3.jpg",
  "igexport-DXuq_YpDfWI-4.jpg",
  "igexport-DXuq_YpDfWI-5.jpg",
  "igexport-DXuq_YpDfWI-6.jpg",
  "igexport-DXuq_YpDfWI-7.jpg",
  "igexport-DXuq_YpDfWI-8.jpg",
  "igexport-DYKWPIbjf0k.jpg",
  "igexport-DYKWPIbjf0k-2.jpg",
  "igexport-DYKWPIbjf0k-3.jpg",
  "igexport-DYKWPIbjf0k-4.jpg",
  "igexport-DYKWPIbjf0k-5.jpg",
  "igexport-DYKWPIbjf0k-6.jpg",
  "igexport-DYKWPIbjf0k-7.jpg",
  "igexport-DYKWPIbjf0k-8.jpg",
  "igexport-DYNhG2ijfVn.jpg",
  "igexport-DYNhG2ijfVn-2.jpg",
  "igexport-DYNhG2ijfVn-3.jpg",
  "igexport-DYNhG2ijfVn-4.jpg",
  "igexport-DYNhG2ijfVn-5.jpg",
  "igexport-DYNhG2ijfVn-6.jpg",
  "igexport-DYNhG2ijfVn-7.jpg",
  "igexport-DYNhG2ijfVn-8.jpg",
];

type MediaItem = { type: "photo" | "video"; src: string };

/** Spreads the (few) videos evenly through the (many) photos instead of grouping them. */
function interleave(photos: string[], videos: string[]): MediaItem[] {
  const result: MediaItem[] = [];
  let vi = 0;
  photos.forEach((photo, pi) => {
    result.push({ type: "photo", src: `${GALLERY_DIR}/${photo}` });
    const videoSlot = Math.round(((vi + 1) * photos.length) / (videos.length + 1));
    if (vi < videos.length && pi + 1 >= videoSlot) {
      result.push({ type: "video", src: `${GALLERY_DIR}/${videos[vi]}` });
      vi += 1;
    }
  });
  while (vi < videos.length) {
    result.push({ type: "video", src: `${GALLERY_DIR}/${videos[vi]}` });
    vi += 1;
  }
  return result;
}

export default function GalleryPage() {
  const items = interleave(PHOTOS, VIDEOS);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Galería"
          title="La vida en el club"
          description="Así se vive el día a día en Raven Boxing Club."
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <GalleryMediaGrid items={items} />
      </Reveal>
    </section>
  );
}
