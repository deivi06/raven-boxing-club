import type { GymClass } from "@/lib/types";

/**
 * Contenido de ejemplo — no proviene de la ficha de Google Maps.
 * Editable por completo desde /admin/clases una vez conectado Supabase.
 */
export const SEED_CLASSES: GymClass[] = [
  {
    id: "class-principiantes",
    name: "Boxeo para Principiantes",
    slug: "boxeo-principiantes",
    description:
      "Iniciación al boxeo: guardia, desplazamiento, golpeo básico y respiración. Pensada para quien nunca se ha puesto los guantes.",
    level: "principiante",
    duration_minutes: 60,
    icon: "GraduationCap",
    image_url: "/images/clases/clase_principiantes.jpeg",
    active: true,
    sort_order: 1,
  },
  {
    id: "class-tecnica",
    name: "Técnica de Boxeo",
    slug: "tecnica-de-boxeo",
    description:
      "Combinaciones, defensa, contragolpe y trabajo de pies. Perfecciona el gesto técnico con corrección individual.",
    level: "intermedio",
    duration_minutes: 60,
    icon: "Target",
    image_url: "/images/clases/clase_tecnica.jpeg",
    active: true,
    sort_order: 2,
  },
  {
    id: "class-fisico",
    name: "Preparación Física",
    slug: "preparacion-fisica",
    description:
      "Acondicionamiento cardiovascular y de fuerza específico para boxeo: circuitos, saco y trabajo de core.",
    level: "todos",
    duration_minutes: 60,
    icon: "Dumbbell",
    image_url: "/images/clases/clase_fisico.jpeg",
    active: true,
    sort_order: 3,
  },
  {
    id: "class-cardio",
    name: "Cardio Boxing",
    slug: "cardio-boxing",
    description:
      "Sesión de alta intensidad basada en boxeo, sin contacto. Ideal para mejorar resistencia y quemar al máximo.",
    level: "todos",
    duration_minutes: 60,
    icon: "Flame",
    image_url: "/images/clases/clase_cardio.jpeg",
    active: true,
    sort_order: 4,
  },
  {
    id: "class-sparring",
    name: "Sparring Dirigido",
    slug: "sparring-dirigido",
    description:
      "Asaltos controlados y supervisados por el entrenador para aplicar estrategia de combate en un entorno seguro.",
    level: "avanzado",
    duration_minutes: 60,
    icon: "Swords",
    image_url: "/images/clases/clase_sparring.jpeg",
    active: true,
    sort_order: 5,
  },
  {
    id: "class-avanzado",
    name: "Boxeo Avanzado / Competición",
    slug: "boxeo-avanzado",
    description:
      "Entrenamiento de alta intensidad orientado a competición: táctica, ritmo de asalto y trabajo específico de esquina.",
    level: "avanzado",
    duration_minutes: 60,
    icon: "Trophy",
    image_url: "/images/clases/clase_avanzado.jpeg",
    active: true,
    sort_order: 6,
  },
];
