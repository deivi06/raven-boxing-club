"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
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
import { createClient } from "@/lib/supabase/client";
import { SEED_GYM_INFO } from "@/lib/seed";
import { gymInfoSchema, type GymInfoFormValues } from "@/lib/validations/admin";

export default function AdminGymInfoPage() {
  const [loading, setLoading] = useState(true);

  const form = useForm<GymInfoFormValues>({
    resolver: zodResolver(gymInfoSchema),
    defaultValues: SEED_GYM_INFO,
  });

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.from("gym_info").select("*").maybeSingle();
      if (data) form.reset(data as GymInfoFormValues);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: GymInfoFormValues) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("gym_info")
        .upsert({ id: 1, ...values }, { onConflict: "id" });
      if (error) throw error;
      toast.success("Información guardada.");
    } catch {
      toast.error("No se pudo guardar.");
    }
  };

  if (loading) {
    return <Loader2 className="size-6 animate-spin text-raven-green" />;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl tracking-wide text-raven-white">
        Información del gimnasio
      </h1>
      <p className="mt-1 text-sm text-raven-gray">
        Estos datos alimentan la cabecera, el pie de página y la página de contacto del sitio público.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slogan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eslogan</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp (solo dígitos con prefijo país)</FormLabel>
                  <FormControl>
                    <Input placeholder="34600088062" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maps_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enlace de Google Maps</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="instagram_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Guardar cambios
          </Button>
        </form>
      </Form>
    </div>
  );
}
