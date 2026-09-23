-- Raven Boxing Club — database schema
-- Run this once in the Supabase SQL editor (or `supabase db push`) after
-- creating your project. Safe to re-run: every statement is idempotent.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- gym_info: a single row holding the club's public info (address, phone...)
-- ---------------------------------------------------------------------------
create table if not exists public.gym_info (
  id integer primary key default 1,
  name text not null default 'Raven Boxing Club',
  slogan text not null default '',
  description text not null default '',
  address text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  maps_url text not null default '',
  instagram_url text not null default '',
  facebook_url text not null default '',
  tiktok_url text not null default '',
  updated_at timestamptz not null default now(),
  constraint gym_info_singleton check (id = 1)
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  level text not null default 'todos'
    check (level in ('principiante', 'intermedio', 'avanzado', 'todos')),
  duration_minutes integer not null default 60,
  icon text not null default 'Dumbbell',
  image_url text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text not null default '',
  bio text not null default '',
  experience_years integer not null default 0,
  photo_url text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.schedule_slots (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0 = lunes
  class_id uuid references public.classes(id) on delete set null,
  title text not null,
  start_time text not null,
  end_time text not null,
  level text not null default 'todos'
    check (level in ('principiante', 'intermedio', 'avanzado', 'todos')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null default '',
  category text not null default 'instalaciones'
    check (category in ('entrenamientos', 'boxeadores', 'instalaciones', 'clases', 'eventos')),
  caption text not null default '',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  cover_image_url text,
  published_at timestamptz not null default now(),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(10, 2) not null default 0,
  collection text not null default '',
  image_url text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Public (anon) visitors can only read *active* rows. Only authenticated
-- admins (the club owner, once logged in) can write. Anyone can submit a
-- contact message, but only admins can read/update/delete them.
-- ---------------------------------------------------------------------------

alter table public.gym_info enable row level security;
alter table public.classes enable row level security;
alter table public.trainers enable row level security;
alter table public.schedule_slots enable row level security;
alter table public.gallery_images enable row level security;
alter table public.news enable row level security;
alter table public.products enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "gym_info public read" on public.gym_info;
create policy "gym_info public read" on public.gym_info for select using (true);
drop policy if exists "gym_info admin write" on public.gym_info;
create policy "gym_info admin write" on public.gym_info for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "classes public read" on public.classes;
create policy "classes public read" on public.classes for select using (active = true);
drop policy if exists "classes admin read all" on public.classes;
create policy "classes admin read all" on public.classes for select
  using (auth.role() = 'authenticated');
drop policy if exists "classes admin write" on public.classes;
create policy "classes admin write" on public.classes for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "trainers public read" on public.trainers;
create policy "trainers public read" on public.trainers for select using (active = true);
drop policy if exists "trainers admin read all" on public.trainers;
create policy "trainers admin read all" on public.trainers for select
  using (auth.role() = 'authenticated');
drop policy if exists "trainers admin write" on public.trainers;
create policy "trainers admin write" on public.trainers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "schedule public read" on public.schedule_slots;
create policy "schedule public read" on public.schedule_slots for select using (active = true);
drop policy if exists "schedule admin read all" on public.schedule_slots;
create policy "schedule admin read all" on public.schedule_slots for select
  using (auth.role() = 'authenticated');
drop policy if exists "schedule admin write" on public.schedule_slots;
create policy "schedule admin write" on public.schedule_slots for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "gallery public read" on public.gallery_images;
create policy "gallery public read" on public.gallery_images for select using (active = true);
drop policy if exists "gallery admin read all" on public.gallery_images;
create policy "gallery admin read all" on public.gallery_images for select
  using (auth.role() = 'authenticated');
drop policy if exists "gallery admin write" on public.gallery_images;
create policy "gallery admin write" on public.gallery_images for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "news public read" on public.news;
create policy "news public read" on public.news for select using (active = true);
drop policy if exists "news admin read all" on public.news;
create policy "news admin read all" on public.news for select
  using (auth.role() = 'authenticated');
drop policy if exists "news admin write" on public.news;
create policy "news admin write" on public.news for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products for select using (active = true);
drop policy if exists "products admin read all" on public.products;
create policy "products admin read all" on public.products for select
  using (auth.role() = 'authenticated');
drop policy if exists "products admin write" on public.products;
create policy "products admin write" on public.products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "contact insert public" on public.contact_messages;
create policy "contact insert public" on public.contact_messages for insert
  with check (true);
drop policy if exists "contact admin read" on public.contact_messages;
create policy "contact admin read" on public.contact_messages for select
  using (auth.role() = 'authenticated');
drop policy if exists "contact admin update" on public.contact_messages;
create policy "contact admin update" on public.contact_messages for update
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "contact admin delete" on public.contact_messages;
create policy "contact admin delete" on public.contact_messages for delete
  using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- Storage buckets for images uploaded from the admin panel
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true), ('trainers', 'trainers', true),
       ('classes', 'classes', true), ('news', 'news', true),
       ('products', 'products', true)
on conflict (id) do nothing;

drop policy if exists "public read storage" on storage.objects;
create policy "public read storage" on storage.objects for select
  using (bucket_id in ('gallery', 'trainers', 'classes', 'news', 'products'));

drop policy if exists "admin write storage" on storage.objects;
create policy "admin write storage" on storage.objects for all
  using (bucket_id in ('gallery', 'trainers', 'classes', 'news', 'products') and auth.role() = 'authenticated')
  with check (bucket_id in ('gallery', 'trainers', 'classes', 'news', 'products') and auth.role() = 'authenticated');
