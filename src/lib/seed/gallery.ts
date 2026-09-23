import type { GalleryImage } from "@/lib/types";

/**
 * Contenido de ejemplo — sustituye estas entradas por fotos reales del club
 * subiéndolas desde /admin/galeria (se guardan en Supabase Storage).
 */
export const SEED_GALLERY: GalleryImage[] = [
  {
    id: "gallery-1",
    url: "",
    category: "instalaciones",
    caption: "Sala principal de entrenamiento",
    active: true,
    sort_order: 1,
  },
  {
    id: "gallery-2",
    url: "",
    category: "instalaciones",
    caption: "Zona de sacos y material",
    active: true,
    sort_order: 2,
  },
  {
    id: "gallery-3",
    url: "",
    category: "entrenamientos",
    caption: "Sesión de técnica en pareja",
    active: true,
    sort_order: 3,
  },
  {
    id: "gallery-4",
    url: "",
    category: "entrenamientos",
    caption: "Preparación física en grupo",
    active: true,
    sort_order: 4,
  },
  {
    id: "gallery-5",
    url: "",
    category: "clases",
    caption: "Clase de iniciación",
    active: true,
    sort_order: 5,
  },
  {
    id: "gallery-6",
    url: "",
    category: "boxeadores",
    caption: "Socio del club entrenando",
    active: true,
    sort_order: 6,
  },
  {
    id: "gallery-7",
    url: "",
    category: "boxeadores",
    caption: "Trabajo de guantes",
    active: true,
    sort_order: 7,
  },
  {
    id: "gallery-8",
    url: "",
    category: "eventos",
    caption: "Jornada de puertas abiertas",
    active: true,
    sort_order: 8,
  },
];
