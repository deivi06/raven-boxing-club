import type { NewsItem } from "@/lib/types";

/**
 * Contenido de ejemplo — gestiónalo desde /admin/noticias. Pensado para
 * anunciar seminarios con boxeadores invitados o combates de competidores
 * del club.
 */
export const SEED_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "Seminario de técnica con boxeador invitado",
    content:
      "Próximamente organizamos un seminario especial abierto a socios de todos los niveles. Fecha y ponente a confirmar — sigue nuestro Instagram y el tablón del gimnasio para más detalles.",
    cover_image_url: null,
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    active: true,
  },
  {
    id: "news-2",
    title: "Uno de los nuestros sube al ring",
    content:
      "Un competidor de Raven Boxing Club tiene combate próximamente. Aquí anunciaremos la fecha, el rival y cómo apoyarle — actualiza esta noticia con los detalles reales desde el panel.",
    cover_image_url: null,
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    active: true,
  },
];
