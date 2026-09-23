import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { resolveIcon } from "@/lib/icon-map";
import type { GymClass } from "@/lib/types";

const LEVEL_LABEL: Record<GymClass["level"], string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
  todos: "Todos los niveles",
};

export function ClassCard({ item }: { item: GymClass }) {
  const Icon = resolveIcon(item.icon);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-raven-bg-alt transition-colors hover:border-raven-green/40">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-raven-bg-soft bg-ring-texture">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // eslint-disable-next-line react-hooks/static-components -- Icon is a stable reference looked up from the static ICON_MAP, never newly created.
          <Icon
            className="size-12 text-raven-green transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-xl tracking-wide text-raven-white">
            {item.name}
          </h3>
          <Badge className="shrink-0 border-raven-green/30 bg-raven-green/10 text-raven-green hover:bg-raven-green/10">
            {LEVEL_LABEL[item.level]}
          </Badge>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-raven-gray">
          {item.description}
        </p>
        <div className="flex items-center gap-1.5 border-t border-white/10 pt-3 text-xs text-raven-gray">
          <Clock className="size-3.5 text-raven-green" />
          {item.duration_minutes} min
        </div>
      </div>
    </div>
  );
}
