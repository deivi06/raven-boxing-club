import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/** Browser Supabase client. Call `isSupabaseConfigured()` before using it. */
export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase no está configurado. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}
