import type { Metadata } from "next";
import { Info } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ClassCard } from "@/components/class-card";
import { CTASection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { getClasses } from "@/lib/data/public";
import { TARIFFS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Clases",
  description:
    "Boxeo para principiantes, técnica, preparación física, sparring y competición en Raven Boxing Club.",
};

export default async function ClassesPage() {
  const classes = await getClasses();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Clases"
            title="Un programa para cada nivel"
            description="Desde tu primera guardia hasta el sparring dirigido. Elige tu clase y consulta el horario completo en la sección de Horarios."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 0.08}>
              <ClassCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tarifas */}
      <section className="border-t border-white/10 bg-raven-bg-alt py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Tarifas"
              title="Cuotas mensuales"
              description="Sin permanencia. Consulta disponibilidad y date de alta llamando o escribiendo por WhatsApp."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {TARIFFS.map((tariff, i) => (
              <Reveal key={tariff.title} delay={i * 0.08}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-6 sm:p-8",
                    tariff.highlighted
                      ? "border-raven-green bg-raven-green/5"
                      : "border-white/10 bg-raven-bg"
                  )}
                >
                  {tariff.highlighted ? (
                    <Badge className="mb-4 w-fit border-raven-green/30 bg-raven-green/10 text-raven-green hover:bg-raven-green/10">
                      Más flexible
                    </Badge>
                  ) : null}
                  <p className="font-heading text-4xl text-raven-white">
                    {tariff.price}€
                    <span className="font-sans text-base font-normal text-raven-gray">
                      /mes
                    </span>
                  </p>
                  <h3 className="mt-2 font-heading text-xl tracking-wide text-raven-white">
                    {tariff.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-raven-gray">
                    {tariff.description}
                  </p>
                  {tariff.note ? (
                    <div className="mt-5 flex gap-2.5 rounded-lg border border-raven-green/25 bg-raven-green/5 p-3.5">
                      <Info className="mt-0.5 size-4 shrink-0 text-raven-green" />
                      <p className="text-xs leading-relaxed text-raven-gray">
                        {tariff.note}
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
