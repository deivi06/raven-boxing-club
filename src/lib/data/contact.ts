import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { ContactMessage } from "@/lib/types";

export async function submitContactMessage(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "El gimnasio todavía no ha conectado su base de datos. Llama o escribe por WhatsApp mientras tanto."
    );
  }
  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message,
  });
  if (error) throw error;
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as ContactMessage[];
}

export async function markContactMessageRead(id: string, read: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ read })
    .eq("id", id);
  if (error) throw error;
}
