import Image from "next/image";
import { Award, User } from "lucide-react";
import { PlaceholderMedia } from "@/components/placeholder-media";
import type { Trainer } from "@/lib/types";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-raven-bg-alt transition-colors hover:border-raven-green/40">
      <div className="relative aspect-[4/5] w-full">
        {trainer.photo_url ? (
          <Image
            src={trainer.photo_url}
            alt={trainer.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PlaceholderMedia icon={User} label={trainer.name} />
        )}
      </div>
      <div className="space-y-2.5 p-5">
        <div>
          <h3 className="font-heading text-xl tracking-wide text-raven-white">
            {trainer.name}
          </h3>
          <p className="text-sm font-medium text-raven-green">{trainer.specialty}</p>
        </div>
        <p className="text-sm leading-relaxed text-raven-gray">{trainer.bio}</p>
        <div className="flex items-center gap-1.5 pt-1 text-xs text-raven-gray">
          <Award className="size-3.5 text-raven-green" />
          {trainer.experience_years} años de experiencia
        </div>
      </div>
    </div>
  );
}
