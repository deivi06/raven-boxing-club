import Link from "next/link";
import {
  Building2,
  Calendar,
  Dumbbell,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  Newspaper,
  ShoppingBag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function countRows(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  filter?: Record<string, unknown>
) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  if (filter) {
    for (const [key, value] of Object.entries(filter)) {
      query = query.eq(key, value);
    }
  }
  const { count } = await query;
  return count ?? 0;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [classes, trainers, gallery, products, news, unreadMessages, upcomingSlots] =
    await Promise.all([
      countRows(supabase, "classes", { active: true }),
      countRows(supabase, "trainers", { active: true }),
      countRows(supabase, "gallery_images", { active: true }),
      countRows(supabase, "products", { active: true }),
      countRows(supabase, "news", { active: true }),
      countRows(supabase, "contact_messages", { read: false }),
      countRows(supabase, "schedule_slots", { active: true }),
    ]);

  const cards = [
    { label: "Clases activas", value: classes, icon: Dumbbell, href: "/admin/clases" },
    { label: "Entrenadores activos", value: trainers, icon: GraduationCap, href: "/admin/entrenadores" },
    { label: "Franjas de horario", value: upcomingSlots, icon: Calendar, href: "/admin/horarios" },
    { label: "Fotos en galería", value: gallery, icon: ImageIcon, href: "/admin/galeria" },
    { label: "Productos activos", value: products, icon: ShoppingBag, href: "/admin/productos" },
    { label: "Noticias publicadas", value: news, icon: Newspaper, href: "/admin/noticias" },
    { label: "Mensajes sin leer", value: unreadMessages, icon: Mail, href: "/admin/contactos" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-wide text-raven-white">Panel</h1>
      <p className="mt-1 text-sm text-raven-gray">
        Resumen del contenido publicado en el sitio.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-white/10 bg-raven-bg-alt p-5 transition-colors hover:border-raven-green/40"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-6 text-raven-green" />
                <span className="font-heading text-3xl text-raven-white">{card.value}</span>
              </div>
              <p className="mt-3 text-sm text-raven-gray">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <Link
        href="/admin/gimnasio"
        className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-raven-bg-alt p-5 transition-colors hover:border-raven-green/40"
      >
        <Building2 className="size-6 text-raven-green" />
        <div>
          <p className="text-sm font-medium text-raven-white">
            Información del gimnasio
          </p>
          <p className="text-xs text-raven-gray">
            Edita dirección, teléfono, horario general y redes sociales.
          </p>
        </div>
      </Link>
    </div>
  );
}
