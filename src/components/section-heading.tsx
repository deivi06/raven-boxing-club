import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-raven-green/30 bg-raven-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-raven-green">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl text-raven-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-balance text-base leading-relaxed text-raven-gray sm:text-lg",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
