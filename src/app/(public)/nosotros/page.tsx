import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { getGymInfo } from "@/lib/data/public";
import { BENEFITS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Conócenos",
  description:
    "Descubre Raven Boxing Club, un club de boxeo en Orihuela para todos los niveles.",
};

export default async function AboutPage() {
  const gymInfo = await getGymInfo();

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Conócenos"
            title={gymInfo.name}
            description={gymInfo.slogan}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-center text-base leading-relaxed text-raven-gray sm:text-lg">
            {gymInfo.description}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-raven-bg-alt py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Nuestra filosofía" title="Disciplina, cercanía y progreso" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="flex gap-3 rounded-xl border border-white/10 bg-raven-bg p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-raven-green" />
                  <div>
                    <h3 className="font-heading text-base tracking-wide text-raven-white">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm text-raven-gray">{b.description}</p>
                  </div>
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
