import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  SEED_CLASSES,
  SEED_GALLERY,
  SEED_GYM_INFO,
  SEED_NEWS,
  SEED_PRODUCTS,
  SEED_SCHEDULE,
  SEED_TRAINERS,
} from "@/lib/seed";
import type {
  GalleryImage,
  GymClass,
  GymInfo,
  NewsItem,
  Product,
  ScheduleSlot,
  Trainer,
} from "@/lib/types";

/**
 * Read access for the public site. Reads from Supabase when the owner has
 * connected a project; otherwise falls back to the local seed data so the
 * site is fully browsable from the very first `npm run dev`.
 */

export async function getGymInfo(): Promise<GymInfo> {
  if (!isSupabaseConfigured()) return SEED_GYM_INFO;
  const supabase = await createClient();
  const { data } = await supabase.from("gym_info").select("*").maybeSingle();
  return (data as GymInfo | null) ?? SEED_GYM_INFO;
}

export async function getClasses(): Promise<GymClass[]> {
  if (!isSupabaseConfigured()) {
    return SEED_CLASSES.filter((c) => c.active).sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("classes")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as GymClass[] | null) ?? [];
}

export async function getTrainers(): Promise<Trainer[]> {
  if (!isSupabaseConfigured()) {
    return SEED_TRAINERS.filter((t) => t.active).sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("trainers")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as Trainer[] | null) ?? [];
}

export async function getSchedule(): Promise<ScheduleSlot[]> {
  if (!isSupabaseConfigured()) {
    return SEED_SCHEDULE.filter((s) => s.active);
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("schedule_slots")
    .select("*")
    .eq("active", true)
    .order("start_time", { ascending: true });
  return (data as ScheduleSlot[] | null) ?? [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured()) {
    return SEED_GALLERY.filter((g) => g.active).sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as GalleryImage[] | null) ?? [];
}

export async function getNews(): Promise<NewsItem[]> {
  if (!isSupabaseConfigured()) {
    return SEED_NEWS.filter((n) => n.active).sort(
      (a, b) => +new Date(b.published_at) - +new Date(a.published_at)
    );
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("active", true)
    .order("published_at", { ascending: false });
  return (data as NewsItem[] | null) ?? [];
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return SEED_PRODUCTS.filter((p) => p.active).sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  return (data as Product[] | null) ?? [];
}
