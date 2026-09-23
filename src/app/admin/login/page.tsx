"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LogoMark } from "@/components/logo-mark";
import { SupabaseSetupNotice } from "@/components/admin/supabase-setup-notice";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const loginSchema = z.object({
  email: z.string().trim().email("Email no válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [configured] = useState(isSupabaseConfigured());

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  if (!configured) return <SupabaseSetupNotice />;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword(values);
      if (error) throw error;
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("Credenciales incorrectas.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-raven-bg px-4">
      <LogoMark size={56} showWordmark={false} />
      <h1 className="mt-6 font-heading text-2xl tracking-wide text-raven-white">
        Panel de administración
      </h1>
      <p className="mt-1 text-sm text-raven-gray">Raven Boxing Club</p>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-white/10 bg-raven-bg-alt p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="admin@ravenboxingclub.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Lock className="size-4" />
              )}
              Iniciar sesión
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
