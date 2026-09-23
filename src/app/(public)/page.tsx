import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { VideoFeature } from "@/components/video-feature";
import { InstagramGlyph } from "@/components/social-glyphs";
import { NewsCard } from "@/components/news-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getClasses, getGymInfo, getNews } from "@/lib/data/public";
import { GENERAL_HOURS, GYM, TESTIMONIALS } from "@/lib/constants";
import { BENEFITS } from "@/lib/constants";
import { resolveIcon } from "@/lib/icon-map";

export default async function HomePage() {
  const [classes, gymInfo, news] = await Promise.all([
    getClasses(),
    getGymInfo(),
    getNews(),
  ]);
  const featured = classes.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Presentación breve */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Un club, no un gimnasio de paso"
            description={gymInfo.description}
          />
        </Reveal>
      </section>

      {/* Vídeo destacado */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Así entrenamos"
            title="Carlos preparando a Antonio Barrul"
            description="Nuestro entrenador principal poniendo manoplas a un boxeador profesional reconocido en España."
          />
          <div className="mt-10">
            <VideoFeature src="/images/videos/video_antonio_barrul.mp4" />
          </div>
        </Reveal>
      </section>

      {/* Beneficios */}
      <section className="border-t border-white/10 bg-raven-bg-alt py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Por qué entrenar aquí"
              title="Lo que te vas a encontrar"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-raven-bg p-6">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-raven-green/10 font-heading text-raven-green">
                    {i + 1}
                  </div>
                  <h3 className="font-heading text-lg tracking-wide text-raven-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-raven-gray">
                    {b.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias y eventos */}
      {latestNews.length > 0 ? (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Noticias"
              title="Seminarios y combates"
              description="Próximos seminarios con boxeadores invitados y combates de nuestros competidores."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* Clases destacadas */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Entrena" title="Nuestras clases" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <Reveal key={item.id} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-raven-bg-alt p-6">
                  <Icon className="size-8 text-raven-green" strokeWidth={1.5} />
                  <h3 className="font-heading text-xl tracking-wide text-raven-white">
                    {item.name}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-raven-gray">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/clases"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-full border-white/15 px-6 text-raven-white hover:bg-raven-bg-soft"
            )}
          >
            Ver todas las clases
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Horario destacado */}
      <section className="border-t border-white/10 bg-raven-bg-alt py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Horario" title="Cuándo puedes venir" />
            <div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
              {GENERAL_HOURS.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between gap-4 bg-raven-bg px-5 py-4"
                >
                  <span className="font-medium text-raven-white">{row.day}</span>
                  <span
                    className={
                      row.hours === "Cerrado"
                        ? "text-sm text-raven-gray"
                        : "inline-flex items-center gap-1.5 text-sm font-medium text-raven-green"
                    }
                  >
                    <Clock className="size-3.5" />
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/horarios"
                className={cn(
                  buttonVariants(),
                  "h-11 rounded-full bg-raven-green px-6 font-semibold text-raven-bg hover:bg-raven-green-dark"
                )}
              >
                Ver horario completo de clases
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reseñas */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Reseñas"
            title="Lo que dicen nuestros socios"
            description={`${GYM.ratingValue}/5 en Google, con ${GYM.ratingCount} reseñas.`}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-raven-bg-alt p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="size-4 fill-raven-green text-raven-green" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-raven-white/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-medium text-raven-gray">{t.author}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={GYM.googleMapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-raven-green hover:underline"
          >
            Ver todas las reseñas en Google
          </a>
          {GYM.instagramUrl ? (
            <a
              href={GYM.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-raven-gray hover:text-raven-green"
            >
              <InstagramGlyph className="size-4" />
              Síguenos en Instagram
            </a>
          ) : null}
        </div>
      </section>

      <CTASection />
    </>
  );
}

export const metadata = {
  title: `${GYM.name} — Club de boxeo en Orihuela`,
};
