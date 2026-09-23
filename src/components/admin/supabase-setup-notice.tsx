import Link from "next/link";
import { DatabaseZap } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

export function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-raven-bg px-4 text-center">
      <LogoMark size={56} showWordmark={false} />
      <DatabaseZap className="mt-8 size-10 text-raven-green" />
      <h1 className="mt-4 font-heading text-2xl tracking-wide text-raven-white">
        Conecta Supabase para activar el panel
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-raven-gray">
        El sitio público ya funciona con datos de ejemplo, pero el panel de
        administración necesita una base de datos real para poder iniciar
        sesión y guardar cambios. Sigue las instrucciones del{" "}
        <code className="rounded bg-raven-bg-alt px-1.5 py-0.5 text-raven-green">
          README.md
        </code>{" "}
        del proyecto: crea un proyecto en Supabase, ejecuta{" "}
        <code className="rounded bg-raven-bg-alt px-1.5 py-0.5 text-raven-green">
          supabase/schema.sql
        </code>{" "}
        y añade las claves a{" "}
        <code className="rounded bg-raven-bg-alt px-1.5 py-0.5 text-raven-green">
          .env.local
        </code>
        .
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-raven-green hover:underline"
      >
        Volver al sitio público
      </Link>
    </div>
  );
}
