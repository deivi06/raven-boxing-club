import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ScheduleTable } from "@/components/schedule-table";
import { CTASection } from "@/components/cta-section";
import { getSchedule } from "@/lib/data/public";
import { GYM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Horarios",
  description: `Horario semanal de clases de ${GYM.name} en Orihuela.`,
};

export default async function SchedulePage() {
  const slots = await getSchedule();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Horarios"
            title="Horario semanal"
            description="Consulta las clases de cada día. El club abre de lunes a viernes; sábado y domingo permanece cerrado."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <ScheduleTable slots={slots} />
        </Reveal>
      </section>
      <CTASection />
    </>
  );
}
