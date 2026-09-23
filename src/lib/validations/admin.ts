import { z } from "zod";

export const classSchema = z.object({
  name: z.string().trim().min(2, "Obligatorio").max(80),
  slug: z
    .string()
    .trim()
    .min(2, "Obligatorio")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones."),
  description: z.string().trim().min(10, "Añade una descripción.").max(1000),
  level: z.enum(["principiante", "intermedio", "avanzado", "todos"]),
  duration_minutes: z.coerce.number().int().min(10).max(240),
  icon: z.string().trim().min(1, "Obligatorio"),
  active: z.boolean(),
  sort_order: z.coerce.number().int().min(0),
});
export type ClassFormValues = z.infer<typeof classSchema>;

export const trainerSchema = z.object({
  name: z.string().trim().min(2, "Obligatorio").max(80),
  specialty: z.string().trim().min(2, "Obligatorio").max(120),
  bio: z.string().trim().min(10, "Añade una biografía.").max(1000),
  experience_years: z.coerce.number().int().min(0).max(60),
  active: z.boolean(),
  sort_order: z.coerce.number().int().min(0),
});
export type TrainerFormValues = z.infer<typeof trainerSchema>;

export const galleryImageSchema = z.object({
  category: z.enum([
    "entrenamientos",
    "boxeadores",
    "instalaciones",
    "clases",
    "eventos",
  ]),
  caption: z.string().trim().min(2, "Obligatorio").max(160),
  active: z.boolean(),
  sort_order: z.coerce.number().int().min(0),
});
export type GalleryImageFormValues = z.infer<typeof galleryImageSchema>;

export const scheduleSlotSchema = z.object({
  day_of_week: z.coerce.number().int().min(0).max(6),
  class_id: z.string().trim(),
  title: z.string().trim().min(2, "Obligatorio").max(80),
  start_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato HH:mm"),
  end_time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato HH:mm"),
  level: z.enum(["principiante", "intermedio", "avanzado", "todos"]),
  active: z.boolean(),
});
export type ScheduleSlotFormValues = z.infer<typeof scheduleSlotSchema>;

export const newsSchema = z.object({
  title: z.string().trim().min(2, "Obligatorio").max(150),
  content: z.string().trim().min(10, "Añade contenido.").max(4000),
  published_at: z.string().min(1, "Obligatorio"),
  active: z.boolean(),
});
export type NewsFormValues = z.infer<typeof newsSchema>;

export const productSchema = z.object({
  name: z.string().trim().min(2, "Obligatorio").max(80),
  slug: z
    .string()
    .trim()
    .min(2, "Obligatorio")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Solo minúsculas, números y guiones."),
  description: z.string().trim().max(1000),
  price: z.coerce.number().min(0).max(10000),
  collection: z.string().trim().max(120),
  active: z.boolean(),
  sort_order: z.coerce.number().int().min(0),
});
export type ProductFormValues = z.infer<typeof productSchema>;

const optionalEmail = z
  .string()
  .trim()
  .max(200)
  .refine((val) => val === "" || z.email().safeParse(val).success, {
    message: "Email no válido",
  });

export const gymInfoSchema = z.object({
  name: z.string().trim().min(2).max(120),
  slogan: z.string().trim().max(160),
  description: z.string().trim().max(2000),
  address: z.string().trim().max(240),
  phone: z.string().trim().max(30),
  whatsapp: z.string().trim().max(30),
  email: optionalEmail,
  maps_url: z.string().trim().max(300),
  instagram_url: z.string().trim().max(300),
  facebook_url: z.string().trim().max(300),
  tiktok_url: z.string().trim().max(300),
});
export type GymInfoFormValues = z.infer<typeof gymInfoSchema>;
