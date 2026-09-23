export type ClassLevel = "principiante" | "intermedio" | "avanzado" | "todos";

export type GymClass = {
  id: string;
  name: string;
  slug: string;
  description: string;
  level: ClassLevel;
  duration_minutes: number;
  icon: string;
  image_url: string | null;
  active: boolean;
  sort_order: number;
};

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = lunes

export type ScheduleSlot = {
  id: string;
  day_of_week: DayOfWeek;
  class_id: string | null;
  title: string;
  start_time: string; // "HH:mm"
  end_time: string; // "HH:mm"
  level: ClassLevel;
  active: boolean;
};

export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experience_years: number;
  photo_url: string | null;
  active: boolean;
  sort_order: number;
  is_example?: boolean;
};

export type GalleryCategory =
  | "entrenamientos"
  | "boxeadores"
  | "instalaciones"
  | "clases"
  | "eventos";

export type GalleryImage = {
  id: string;
  url: string;
  category: GalleryCategory;
  caption: string;
  active: boolean;
  sort_order: number;
};

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  published_at: string;
  active: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  read: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  collection: string;
  image_url: string | null;
  active: boolean;
  sort_order: number;
};

export type GymInfo = {
  name: string;
  slogan: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  maps_url: string;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
};
