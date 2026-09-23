import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { MapEmbed } from "@/components/map-embed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS, GENERAL_HOURS, GYM, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Contacta con ${GYM.name} en ${GYM.addressCity}. Teléfono, WhatsApp, ubicación y formulario de contacto.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos"
          description="Llámanos, escríbenos por WhatsApp o pásate a conocer las instalaciones."
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-6">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-raven-bg-alt p-6">
              <a
                href={GYM.phoneTel}
                className="flex items-center gap-3 text-raven-white transition-colors hover:text-raven-green"
              >
                <Phone className="size-5 shrink-0 text-raven-green" />
                {GYM.phoneDisplay}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-raven-white transition-colors hover:text-raven-green"
              >
                <MessageCircle className="size-5 shrink-0 text-raven-green" />
                WhatsApp
              </a>
              {GYM.email ? (
                <a
                  href={`mailto:${GYM.email}`}
                  className="flex items-center gap-3 text-raven-white transition-colors hover:text-raven-green"
                >
                  <Mail className="size-5 shrink-0 text-raven-green" />
                  {GYM.email}
                </a>
              ) : (
                <div className="flex items-center gap-3 text-raven-gray">
                  <Mail className="size-5 shrink-0 text-raven-green" />
                  Email no disponible públicamente todavía
                </div>
              )}
              <div className="flex items-start gap-3 text-raven-white">
                <MapPin className="mt-0.5 size-5 shrink-0 text-raven-green" />
                {GYM.fullAddress}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-raven-bg-alt p-6">
              <h3 className="mb-4 flex items-center gap-2 font-heading text-lg tracking-wide text-raven-white">
                <Clock className="size-4 text-raven-green" />
                Horario
              </h3>
              <ul className="space-y-2 text-sm">
                {GENERAL_HOURS.map((row) => (
                  <li key={row.day} className="flex justify-between text-raven-gray">
                    <span className="text-raven-white/90">{row.day}</span>
                    <span>{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MapEmbed />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-raven-bg-alt p-6 sm:p-8">
            <h3 className="mb-6 font-heading text-xl tracking-wide text-raven-white">
              Envíanos un mensaje
            </h3>
            <ContactForm />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mx-auto mt-20 max-w-3xl">
        <SectionHeading
          eyebrow="Dudas frecuentes"
          title="Antes de escribirnos"
          align="left"
        />
        <Accordion className="mt-8">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-white/10">
              <AccordionTrigger className="font-heading text-base tracking-wide hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-raven-gray">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
