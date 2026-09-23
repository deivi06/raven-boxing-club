import type { Trainer } from "@/lib/types";

/**
 * Carlos es un entrenador real de Raven Boxing Club (varias reseñas públicas
 * de Google lo mencionan por su cercanía). Sus datos concretos (años de
 * experiencia, foto, bio detallada) no están disponibles públicamente, así
 * que se marcan como contenido de ejemplo — edítalos desde /admin/entrenadores.
 */
export const SEED_TRAINERS: Trainer[] = [
  {
    id: "trainer-carlos",
    name: "Carlos",
    specialty: "Entrenador principal",
    bio: "Entrenador principal de Raven Boxing Club. Varias reseñas del gimnasio destacan su cercanía y su forma de motivar tanto a quienes dan sus primeros pasos como a los boxeadores más avanzados.",
    experience_years: 10,
    photo_url: "/images/entrenador/foto_carlos_1.png",
    active: true,
    sort_order: 1,
    is_example: true,
  },
];
