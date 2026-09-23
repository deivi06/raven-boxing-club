/**
 * Real, publicly verifiable data for Raven Boxing Club (Orihuela, Alicante).
 * Sourced from the club's Google Maps listing. Fields marked as unavailable
 * are intentionally left empty rather than invented, and are editable from
 * /admin once Supabase is connected (see gym_info table).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ravenboxingclub.example.com";

export const GYM = {
  name: "Raven Boxing Club",
  legalCity: "Orihuela",
  slogan: "Vuela alto. Golpea fuerte.",
  sloganSecondary:
    "Club de boxeo en Orihuela para todos los niveles, desde tu primer directo hasta el sparring.",
  description:
    "Raven Boxing Club es un espacio de entrenamiento moderno en Orihuela (Alicante), pensado para quienes empiezan desde cero y para quienes ya compiten. Instalaciones accesibles, ambiente cercano y programas de boxeo adaptados a cada nivel.",
  addressLine: "C. Aragón, 5",
  addressCity: "03300 Orihuela, Alicante, España",
  fullAddress: "C. Aragón, 5, 03300 Orihuela, Alicante, España",
  phoneDisplay: "600 08 80 62",
  phoneIntl: "+34 600 08 80 62",
  phoneTel: "tel:+34600088062",
  whatsappNumber: "34600088062",
  email: "", // No hay email público disponible en la ficha de Google — editable desde el panel.
  instagramUrl: "https://www.instagram.com/ravenboxingclub/",
  facebookUrl: "",
  tiktokUrl: "",
  googleMapsShareUrl: "https://share.google/8IYmwRL9ZjqzixXu5",
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=C.+Arag%C3%B3n+5+03300+Orihuela+Alicante+Espa%C3%B1a&output=embed",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=C.+Arag%C3%B3n+5+03300+Orihuela+Alicante+Espa%C3%B1a",
  ratingValue: 5,
  ratingCount: 88,
} as const;

export type Testimonial = {
  author: string;
  quote: string;
};

/** Reseñas reales de Google (fuente pública), citadas literalmente. */
export const TESTIMONIALS: Testimonial[] = [
  {
    author: "J. Muñoz",
    quote: "Un club de Boxeo moderno y con un equipamiento de primera... 100% recomendable.",
  },
  {
    author: "Alfredo Marín",
    quote: "Carlos me está enseñando el noble arte del boxeo desde cero y me estoy enamorando.",
  },
];

export const WHATSAPP_URL = `https://wa.me/${GYM.whatsappNumber}?text=${encodeURIComponent(
  "Hola Raven Boxing Club, me gustaría más información sobre las clases."
)}`;

export type ScheduleRow = {
  day: string;
  hours: string;
  note?: string;
};

/** Horario general del club (fuente: ficha pública de Google Maps). */
export const GENERAL_HOURS: ScheduleRow[] = [
  { day: "Lunes", hours: "10:00–12:00 · 16:00–21:00" },
  { day: "Martes", hours: "10:00–12:00 · 16:00–21:00" },
  { day: "Miércoles", hours: "10:00–12:00 · 16:00–21:00" },
  { day: "Jueves", hours: "10:00–12:00 · 16:00–21:00" },
  { day: "Viernes", hours: "10:00–12:00 · 16:00–21:00" },
  { day: "Sábado", hours: "Cerrado" },
  { day: "Domingo", hours: "Cerrado" },
];

export type Tariff = {
  price: number;
  daysPerWeek: number;
  title: string;
  description: string;
  note?: string;
  highlighted?: boolean;
};

export const TARIFFS: Tariff[] = [
  {
    price: 60,
    daysPerWeek: 3,
    title: "3 días / semana",
    description: "Eliges 3 días a la semana para entrenar.",
    note: "Los 3 días deben ser siempre los mismos días y a la misma hora durante todo el mes, para poder organizar mejor los grupos.",
  },
  {
    price: 70,
    daysPerWeek: 5,
    title: "5 días / semana",
    description: "Acceso de lunes a viernes, todos los días que el club abre.",
    highlighted: true,
  },
];

export const FAQS = [
  {
    question: "¿Necesito experiencia previa para apuntarme?",
    answer:
      "No. Tenemos clases de iniciación pensadas para quien nunca se ha puesto los guantes, además de niveles intermedio y avanzado para quien ya entrena.",
  },
  {
    question: "¿Tenéis boxeo para niños?",
    answer:
      "Sí, los martes y jueves de 18:00 a 19:00 hay boxeo infantil dentro del horario general del club.",
  },
  {
    question: "¿Cómo funcionan las tarifas?",
    answer:
      "Dos opciones mensuales, sin permanencia: 60€ (3 días/semana, siempre los mismos días y a la misma hora) o 70€ (5 días/semana, de lunes a viernes).",
  },
  {
    question: "¿Qué debo llevar a mi primera clase?",
    answer:
      "Ropa deportiva cómoda. Escríbenos antes de tu primera clase y te decimos qué material necesitas llevar.",
  },
  {
    question: "¿Puedo visitar el gimnasio antes de apuntarme?",
    answer:
      "Sí, llámanos o escríbenos por WhatsApp y te contamos cómo conocer las instalaciones antes de decidirte.",
  },
] as const;

export const NAV_LINKS = [
  { href: "/nosotros", label: "Conócenos" },
  { href: "/clases", label: "Clases" },
  { href: "/horarios", label: "Horarios" },
  { href: "/entrenadores", label: "Entrenadores" },
  { href: "/galeria", label: "Galería" },
  { href: "/productos", label: "Productos" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Prefills a WhatsApp message to buy a specific product (no checkout system yet). */
export function productWhatsappUrl(productName: string, price: number) {
  return `https://wa.me/${GYM.whatsappNumber}?text=${encodeURIComponent(
    `Hola Raven Boxing Club, quiero comprar: ${productName} (${price}€).`
  )}`;
}

export const BENEFITS = [
  {
    title: "Entrenadores con experiencia real",
    description:
      "Instrucción personalizada, tanto si das tu primer golpe como si ya compites.",
  },
  {
    title: "Ambiente cercano y motivador",
    description:
      "Un club pequeño donde se te conoce por tu nombre, no por un número de socio.",
  },
  {
    title: "Instalaciones accesibles",
    description:
      "Espacio con acceso adaptado, vestuarios y wifi gratuito para todos los socios.",
  },
  {
    title: "Progresión a tu ritmo",
    description:
      "De la técnica básica al sparring: cada clase tiene un nivel claro para que avances con seguridad.",
  },
] as const;
