import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { TrainerCard } from "@/components/trainer-card";
import { CTASection } from "@/components/cta-section";
import { getTrainers } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "Entrenadores",
  description: "Conoce al equipo de entrenadores de Raven Boxing Club.",
};

export default async function TrainersPage() {
  const trainers = await getTrainers();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestro equipo"
            title="Entrenadores"
            description="Cercanos con quienes empiezan, exigentes con quienes compiten."
          />
        </Reveal>
        {trainers.length === 1 ? (
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-sm">
              <Reveal>
                <TrainerCard trainer={trainers[0]} />
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainers.map((trainer, i) => (
              <Reveal key={trainer.id} delay={(i % 3) * 0.08}>
                <TrainerCard trainer={trainer} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <CTASection />
    </>
  );
}
