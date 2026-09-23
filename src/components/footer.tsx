import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { FacebookGlyph, InstagramGlyph } from "@/components/social-glyphs";
import { GYM, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-raven-bg-alt">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <LogoMark size={40} />
          <p className="max-w-sm text-sm leading-relaxed text-raven-gray">
            {GYM.description}
          </p>
          <div className="flex items-center gap-3 pt-1">
            {GYM.instagramUrl ? (
              <Link
                href={GYM.instagramUrl}
                target="_blank"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-raven-white/80 transition-colors hover:border-raven-green hover:text-raven-green"
                aria-label="Instagram"
              >
                <InstagramGlyph className="size-4" />
              </Link>
            ) : null}
            {GYM.facebookUrl ? (
              <Link
                href={GYM.facebookUrl}
                target="_blank"
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-raven-white/80 transition-colors hover:border-raven-green hover:text-raven-green"
                aria-label="Facebook"
              >
                <FacebookGlyph className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg tracking-wide text-raven-white">
            Navegación
          </h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-raven-gray transition-colors hover:text-raven-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg tracking-wide text-raven-white">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-raven-gray">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-raven-green" />
              <span>{GYM.fullAddress}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-raven-green" />
              <a href={GYM.phoneTel} className="hover:text-raven-green">
                {GYM.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center text-xs text-raven-gray sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {GYM.name}. Todos los derechos reservados.
          </span>
          <div className="flex gap-4">
            <Link href="/aviso-legal" className="hover:text-raven-green">
              Aviso legal
            </Link>
            <Link href="/politica-privacidad" className="hover:text-raven-green">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
