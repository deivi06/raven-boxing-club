import Image from "next/image";
import { CalendarDays, Newspaper } from "lucide-react";
import { PlaceholderMedia } from "@/components/placeholder-media";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.published_at).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-raven-bg-alt">
      <div className="relative aspect-[16/9] w-full">
        {item.cover_image_url ? (
          <Image src={item.cover_image_url} alt={item.title} fill className="object-cover" />
        ) : (
          <PlaceholderMedia icon={Newspaper} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-raven-green">
          <CalendarDays className="size-3.5" />
          {date}
        </span>
        <h3 className="font-heading text-xl tracking-wide text-raven-white">{item.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-raven-gray">{item.content}</p>
      </div>
    </div>
  );
}
