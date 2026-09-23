import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { GYM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: false },
};

export default function LegalNoticePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Legal" title="Aviso Legal" align="left" />

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-raven-gray [&_h2]:mb-2 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:tracking-wide [&_h2]:text-raven-white [&_p]:mb-3">
        <div>
          <h2>1. Datos identificativos</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de
            la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de
            los siguientes datos: el presente sitio web es propiedad de{" "}
            <strong className="text-raven-white/90">{GYM.name}</strong>, con domicilio en{" "}
            {GYM.fullAddress}, y teléfono de contacto {GYM.phoneIntl}.
          </p>
          <p>
            <em>
              Pendiente de completar por el titular: NIF/CIF y, en su caso, datos de
              inscripción registral.
            </em>
          </p>
        </div>

        <div>
          <h2>2. Objeto</h2>
          <p>
            Este sitio web tiene carácter informativo y comercial: presenta las
            instalaciones, clases, horarios, entrenadores, productos y datos de contacto de{" "}
            {GYM.name}, y permite a los usuarios ponerse en contacto con el club a través de
            un formulario.
          </p>
        </div>

        <div>
          <h2>3. Condiciones de uso</h2>
          <p>
            El acceso a este sitio web es gratuito y no requiere registro previo. El usuario
            se compromete a hacer un uso adecuado y lícito del sitio web, de acuerdo con la
            legislación aplicable, la buena fe y el orden público.
          </p>
        </div>

        <div>
          <h2>4. Propiedad intelectual e industrial</h2>
          <p>
            Los contenidos de este sitio web (textos, imágenes, vídeos, logotipo y diseño)
            son propiedad de {GYM.name} o se utilizan con la debida autorización, y están
            protegidos por la normativa de propiedad intelectual e industrial. Queda
            prohibida su reproducción o distribución sin autorización expresa.
          </p>
        </div>

        <div>
          <h2>5. Responsabilidad</h2>
          <p>
            {GYM.name} no se hace responsable de los daños derivados de un uso inadecuado de
            este sitio web ni de la información contenida en enlaces a sitios de terceros
            (por ejemplo, Google Maps, WhatsApp o Instagram).
          </p>
        </div>

        <div>
          <h2>6. Legislación aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española. Para cualquier
            controversia derivada del uso de este sitio web, las partes se someten a los
            juzgados y tribunales que correspondan conforme a la ley.
          </p>
        </div>

        <p className="border-t border-white/10 pt-6 text-xs text-raven-gray/70">
          Este texto es una plantilla estándar de referencia. Antes de publicar el sitio,
          revísalo (o hazlo revisar por un profesional) y completa los datos identificativos
          pendientes.
        </p>
      </div>
    </section>
  );
}
