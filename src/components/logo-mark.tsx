"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GYM } from "@/lib/constants";

/**
 * Renders the real club logo from /public/images/logo.png. Until that file
 * is placed there (see README), falls back to a wordmark built from the
 * brand colors so the header never looks broken.
 */
export function LogoMark({
  size = 40,
  showWordmark = true,
  className,
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {imageFailed ? (
        <span
          className="flex items-center justify-center rounded-full border-2 border-raven-green bg-raven-bg-alt font-heading text-raven-green"
          style={{ width: size, height: size, fontSize: size * 0.45 }}
        >
          R
        </span>
      ) : (
        <Image
          src="/images/logo.png"
          alt={`${GYM.name} logo`}
          width={size}
          height={size}
          className="rounded-full object-contain"
          style={{ width: size, height: size }}
          priority
          onError={() => setImageFailed(true)}
        />
      )}
      {showWordmark ? (
        <span className="font-heading text-xl leading-none tracking-wide text-raven-white">
          RAVEN <span className="text-raven-green">BOXING CLUB</span>
        </span>
      ) : null}
    </span>
  );
}
