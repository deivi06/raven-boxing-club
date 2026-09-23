-- Raven Boxing Club — example content
-- Run after schema.sql. Mirrors the local fallback data in src/lib/seed/ so
-- the admin panel isn't empty the first time you log in. Everything here is
-- editable (and safely deletable) from the admin panel.

insert into public.gym_info (id, name, slogan, description, address, phone, whatsapp, email, maps_url, instagram_url, facebook_url, tiktok_url)
values (
  1,
  'Raven Boxing Club',
  'Vuela alto. Golpea fuerte.',
  'Raven Boxing Club es un espacio de entrenamiento moderno en Orihuela (Alicante), pensado para quienes empiezan desde cero y para quienes ya compiten. Instalaciones accesibles, ambiente cercano y programas de boxeo adaptados a cada nivel.',
  'C. Aragón, 5, 03300 Orihuela, Alicante, España',
  '+34 600 08 80 62',
  '34600088062',
  '',
  'https://share.google/8IYmwRL9ZjqzixXu5',
  '',
  '',
  ''
)
on conflict (id) do nothing;

insert into public.classes (name, slug, description, level, duration_minutes, icon, active, sort_order) values
  ('Boxeo para Principiantes', 'boxeo-principiantes', 'Iniciación al boxeo: guardia, desplazamiento, golpeo básico y respiración. Pensada para quien nunca se ha puesto los guantes.', 'principiante', 60, 'GraduationCap', true, 1),
  ('Técnica de Boxeo', 'tecnica-de-boxeo', 'Combinaciones, defensa, contragolpe y trabajo de pies. Perfecciona el gesto técnico con corrección individual.', 'intermedio', 60, 'Target', true, 2),
  ('Preparación Física', 'preparacion-fisica', 'Acondicionamiento cardiovascular y de fuerza específico para boxeo: circuitos, saco y trabajo de core.', 'todos', 60, 'Dumbbell', true, 3),
  ('Cardio Boxing', 'cardio-boxing', 'Sesión de alta intensidad basada en boxeo, sin contacto. Ideal para mejorar resistencia y quemar al máximo.', 'todos', 60, 'Flame', true, 4),
  ('Sparring Dirigido', 'sparring-dirigido', 'Asaltos controlados y supervisados por el entrenador para aplicar estrategia de combate en un entorno seguro.', 'avanzado', 60, 'Swords', true, 5),
  ('Boxeo Avanzado / Competición', 'boxeo-avanzado', 'Entrenamiento de alta intensidad orientado a competición: táctica, ritmo de asalto y trabajo específico de esquina.', 'avanzado', 60, 'Trophy', true, 6)
on conflict (slug) do nothing;

-- Carlos es un entrenador real mencionado en reseñas públicas del club.
-- Edítalo desde /admin/entrenadores.
insert into public.trainers (name, specialty, bio, experience_years, photo_url, active, sort_order) values
  ('Carlos', 'Entrenador principal', 'Entrenador principal de Raven Boxing Club. Varias reseñas del gimnasio destacan su cercanía y su forma de motivar tanto a quienes dan sus primeros pasos como a los boxeadores más avanzados.', 10, '/images/entrenador/foto_carlos_1.png', true, 1)
on conflict do nothing;

insert into public.gallery_images (url, category, caption, active, sort_order) values
  ('', 'instalaciones', 'Sala principal de entrenamiento', true, 1),
  ('', 'instalaciones', 'Zona de sacos y material', true, 2),
  ('', 'entrenamientos', 'Sesión de técnica en pareja', true, 3),
  ('', 'entrenamientos', 'Preparación física en grupo', true, 4),
  ('', 'clases', 'Clase de iniciación', true, 5),
  ('', 'boxeadores', 'Socio del club entrenando', true, 6),
  ('', 'boxeadores', 'Trabajo de guantes', true, 7),
  ('', 'eventos', 'Jornada de puertas abiertas', true, 8)
on conflict do nothing;

insert into public.products (name, slug, description, price, collection, image_url, active, sort_order) values
  ('Conjunto Negro y Verde', 'conjunto-negro-verde', 'Colección RAVEN x PATCH4GI. Camiseta: 35€ · Pantalón: 40€ · Conjunto completo: 70€.', 70, 'RAVEN x PATCH4GI', '/images/ropa/camiseta_raven_negraverde.jpeg', true, 1),
  ('Conjunto Negro y Dorado', 'conjunto-negro-dorado', 'Colección RAVEN x PATCH4GI. Camiseta: 35€ · Pantalón: 40€ · Conjunto completo: 70€.', 70, 'RAVEN x PATCH4GI', '/images/ropa/camiseta_raven_negradorada.jpeg', true, 2),
  ('Conjunto Blanco', 'conjunto-blanco', 'Colección RAVEN x PATCH4GI. Camiseta: 35€ · Pantalón: 40€ · Conjunto completo: 70€.', 70, 'RAVEN x PATCH4GI', '/images/ropa/camiseta_raven_blanca.jpeg', true, 3),
  ('Conjunto Rosa', 'conjunto-rosa', 'Colección RAVEN x PATCH4GI. Camiseta: 35€ · Pantalón: 40€ · Conjunto completo: 70€.', 70, 'RAVEN x PATCH4GI', '/images/ropa/camiseta_raven_rosa.jpeg', true, 4),
  ('Sudadera', 'sudadera', 'Colección RAVEN x PATCH4GI.', 70, 'RAVEN x PATCH4GI', '/images/ropa/sudaderaraven.jpeg', true, 5)
on conflict (slug) do nothing;

insert into public.news (title, content, published_at, active) values
  ('Seminario de técnica con boxeador invitado', 'Próximamente organizamos un seminario especial abierto a socios de todos los niveles. Fecha y ponente a confirmar — sigue nuestro Instagram y el tablón del gimnasio para más detalles.', now() - interval '7 days', true),
  ('Uno de los nuestros sube al ring', 'Un competidor de Raven Boxing Club tiene combate próximamente. Aquí anunciaremos la fecha, el rival y cómo apoyarle — actualiza esta noticia con los detalles reales desde el panel.', now() - interval '21 days', true)
on conflict do nothing;

-- Horario semanal sobre la franja horaria real (L-V 10:00-12:00 y
-- 16:00-21:00): boxeo de lunes a jueves, sparring (nivel avanzado) los
-- viernes en todas las franjas.
with c as (select id, slug from public.classes)
insert into public.schedule_slots (day_of_week, class_id, title, start_time, end_time, level, active)
select * from (values
  (0, null, 'Boxeo', '10:00', '11:00', 'todos', true),
  (0, null, 'Boxeo', '16:00', '17:00', 'todos', true),
  (0, null, 'Boxeo', '17:00', '18:00', 'todos', true),
  (0, null, 'Boxeo', '18:30', '19:30', 'todos', true),
  (1, null, 'Boxeo', '10:00', '11:00', 'todos', true),
  (1, null, 'Boxeo', '17:00', '18:00', 'todos', true),
  (1, null, 'Boxeo', '18:00', '19:00', 'todos', true),
  (1, null, 'Boxeo', '19:30', '20:30', 'todos', true),
  (2, null, 'Boxeo', '10:00', '11:00', 'todos', true),
  (2, null, 'Boxeo', '16:00', '17:00', 'todos', true),
  (2, null, 'Boxeo', '17:00', '18:00', 'todos', true),
  (2, null, 'Boxeo', '18:30', '19:30', 'todos', true),
  (3, null, 'Boxeo', '10:00', '11:00', 'todos', true),
  (3, null, 'Boxeo', '17:00', '18:00', 'todos', true),
  (3, null, 'Boxeo', '18:30', '19:30', 'todos', true),
  (3, null, 'Boxeo', '19:45', '20:45', 'todos', true),
  (4, (select id from c where slug = 'sparring-dirigido'), 'Sparring', '10:00', '11:00', 'avanzado', true),
  (4, (select id from c where slug = 'sparring-dirigido'), 'Sparring', '16:00', '17:00', 'avanzado', true),
  (4, (select id from c where slug = 'sparring-dirigido'), 'Sparring', '17:00', '18:00', 'avanzado', true),
  (4, (select id from c where slug = 'sparring-dirigido'), 'Sparring', '19:30', '20:30', 'avanzado', true)
) as t(day_of_week, class_id, title, start_time, end_time, level, active)
on conflict do nothing;
