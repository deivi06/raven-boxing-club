import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stand-in visual used wherever example content has no real photo yet. Makes
 * placeholder content visually obvious rather than pretending to be a real
 * photo, per the brief's requirement that provisional content be clearly
 * identifiable.
 */
export function PlaceholderMedia({
  label,
  icon: Icon = ImageIcon,
  className,
}: {
  label?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-raven-bg-alt text-raven-gray",
        "bg-ring-texture",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-raven-green/10 via-transparent to-transparent" />
      <Icon className="relative size-8 text-raven-green/70" strokeWidth={1.5} />
      {label ? (
        <span className="relative px-3 text-center text-xs font-medium text-raven-gray">
          {label}
        </span>
      ) : null}
      <span className="relative rounded-full border border-raven-green/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-raven-green/80">
        Imagen de ejemplo
      </span>
    </div>
  );
}
