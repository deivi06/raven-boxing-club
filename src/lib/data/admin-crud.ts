import { createClient } from "@/lib/supabase/client";

/**
 * Thin, generic wrapper around the repeated list/create/update/delete/toggle
 * pattern used by every entity in the admin panel (classes, trainers,
 * gallery, schedule, news). Requires Supabase to be configured and the
 * caller to be authenticated — RLS enforces the latter server-side.
 */

export async function listRows<T>(table: string, orderColumn = "sort_order") {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(orderColumn, { ascending: true });
  if (error) throw error;
  return data as T[];
}

export async function insertRow<T extends Record<string, unknown>>(
  table: string,
  values: T
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .insert(values)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateRow<T extends Record<string, unknown>>(
  table: string,
  id: string,
  values: Partial<T>
) {
  const supabase = createClient();
  // The Supabase client isn't wired to generated Database types, so its
  // update() overload can't verify the row shape — this cast is intentional.
  const { data, error } = await supabase
    .from(table)
    .update(values as never)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table: string, id: string) {
  const supabase = createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

export async function toggleActive(table: string, id: string, active: boolean) {
  return updateRow(table, id, { active });
}
