"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitContactMessage } from "@/lib/data/contact";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitContactMessage(values);
      setSent(true);
      form.reset();
      toast.success("Mensaje enviado. Te responderemos lo antes posible.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "No se pudo enviar el mensaje. Inténtalo de nuevo."
      );
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-raven-green/30 bg-raven-green/5 p-8 text-center">
        <p className="font-heading text-2xl text-raven-green">¡Gracias!</p>
        <p className="mt-2 text-raven-gray">
          Hemos recibido tu mensaje. Te contactaremos lo antes posible.
        </p>
        <Button
          variant="link"
          className="mt-2 text-raven-green"
          onClick={() => setSent(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {!isSupabaseConfigured() ? (
          <p className="rounded-lg border border-raven-green/25 bg-raven-green/5 px-4 py-3 text-sm text-raven-gray">
            El formulario está listo pero el gimnasio aún no ha conectado su base
            de datos. Mientras tanto, llama o escribe por WhatsApp.
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="600 00 00 00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntanos qué te gustaría saber..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark sm:w-auto"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Enviar mensaje
        </Button>
      </form>
    </Form>
  );
}
