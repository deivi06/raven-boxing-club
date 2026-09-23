import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { GYM, WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-raven-bg-alt py-20">
      <div className="absolute inset-0 bg-ring-texture opacity-40" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-balance text-3xl text-raven-white sm:text-4xl">
            ¿Listo para dar tu primer <span className="text-raven-green">golpe</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-raven-gray">
            Escríbenos o pásate por {GYM.addressCity.split(",")[0]} y prueba una clase.
            Sin compromiso, con la guía de nuestros entrenadores desde el primer día.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className={cn(
                buttonVariants(),
                "h-12 rounded-full bg-raven-green px-6 text-base font-semibold text-raven-bg hover:bg-raven-green-dark"
              )}
            >
              Contactar ahora
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-white/15 px-6 text-base text-raven-white hover:bg-raven-bg-soft"
              )}
            >
              Escribir por WhatsApp
            </a>
            <a
              href={GYM.phoneTel}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 rounded-full px-6 text-base text-raven-white hover:bg-raven-bg-soft"
              )}
            >
              <Phone className="size-4" />
              {GYM.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
