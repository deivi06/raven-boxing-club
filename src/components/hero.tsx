"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { GYM } from "@/lib/constants";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { href: "/nosotros", label: "Conócenos" },
  { href: "/horarios", label: "Horarios" },
  { href: "/clases", label: "Clases" },
  { href: "/contacto", label: "Contacto" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-raven-bg">
      <div className="absolute inset-0 bg-ring-texture opacity-60" />
      <div
        className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--raven-green), transparent 70%)" }}
      />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoMark size={96} showWordmark={false} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-8 text-balance font-heading text-5xl leading-[0.95] tracking-wide text-raven-white sm:text-6xl lg:text-7xl"
        >
          RAVEN <span className="text-raven-green">BOXING CLUB</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-5 text-balance text-xl font-medium text-raven-green sm:text-2xl"
        >
          {GYM.slogan}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="mt-4 max-w-xl text-balance text-raven-gray"
        >
          {GYM.sloganSecondary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-raven-gray"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-4 fill-raven-green text-raven-green" />
            {GYM.ratingValue}/5 en Google ({GYM.ratingCount} reseñas)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 text-raven-green" />
            {GYM.legalCity}, Alicante
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {QUICK_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants(),
                i === 0
                  ? "h-12 rounded-full bg-raven-green px-6 text-base font-semibold text-raven-bg hover:bg-raven-green-dark"
                  : "h-12 rounded-full border border-white/15 bg-transparent px-6 text-base text-raven-white hover:bg-raven-bg-soft"
              )}
            >
              {link.label}
              {i === 0 ? <ArrowRight className="size-4" /> : null}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
