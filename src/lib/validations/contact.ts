import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Introduce tu nombre completo.")
    .max(100),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Introduce un email válido."),
  phone: z.string().trim().max(30),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
