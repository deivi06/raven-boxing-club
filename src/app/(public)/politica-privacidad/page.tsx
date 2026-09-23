import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { GYM } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Legal" title="Política de Privacidad" align="left" />

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-raven-gray [&_h2]:mb-2 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:tracking-wide [&_h2]:text-raven-white [&_p]:mb-3 [&_li]:mb-1.5">
        <div>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong className="text-raven-white/90">{GYM.name}</strong>, con domicilio en{" "}
            {GYM.fullAddress}, es el responsable del tratamiento de los datos personales que
            nos facilitas a través del formulario de contacto de este sitio web. Puedes
            contactar con nosotros en el teléfono {GYM.phoneIntl}.
          </p>
        </div>

        <div>
          <h2>2. Qué datos tratamos y con qué finalidad</h2>
          <p>
            Cuando usas el formulario de contacto, tratamos el nombre, email, teléfono
            (opcional) y mensaje que nos facilitas, con la única finalidad de responder a tu
            consulta sobre el club, las clases o las tarifas.
          </p>
        </div>

        <div>
          <h2>3. Legitimación</h2>
          <p>
            La base legal para el tratamiento de tus datos es tu consentimiento, expresado al
            rellenar y enviar voluntariamente el formulario de contacto.
          </p>
        </div>

        <div>
          <h2>4. Destinatarios y encargados del tratamiento</h2>
          <p>
            No cedemos tus datos a terceros, salvo obligación legal. Utilizamos Supabase
            (proveedor de base de datos y alojamiento) como encargado del tratamiento para
            almacenar de forma segura los mensajes recibidos.
          </p>
        </div>

        <div>
          <h2>5. Conservación de los datos</h2>
          <p>
            Conservamos los datos del formulario durante el tiempo necesario para atender tu
            consulta y, posteriormente, hasta que solicites su supresión.
          </p>
        </div>

        <div>
          <h2>6. Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
            limitación del tratamiento y portabilidad escribiéndonos por WhatsApp o
            llamándonos al {GYM.phoneIntl}.
          </p>
        </div>

        <div>
          <h2>7. Cookies</h2>
          <p>
            Este sitio web utiliza únicamente cookies técnicas necesarias (por ejemplo, para
            mantener la sesión del panel de administración). No utilizamos cookies de
            analítica ni de publicidad de terceros.
          </p>
        </div>

        <p className="border-t border-white/10 pt-6 text-xs text-raven-gray/70">
          Este texto es una plantilla estándar de referencia (RGPD/LOPDGDD). Antes de
          publicar el sitio, revísalo o hazlo revisar por un profesional para adaptarlo
          exactamente a tu situación.
        </p>
      </div>
    </section>
  );
}
