import type { ScheduleSlot } from "@/lib/types";

/**
 * Horario semanal: una franja por cada hora completa dentro del horario real
 * del club (L-V 10:00–12:00 y 16:00–21:00). Editable desde /admin/horarios.
 */
const HOURLY_RANGES: [string, string][] = [
  ["10:00", "11:00"],
  ["11:00", "12:00"],
  ["16:00", "17:00"],
  ["17:00", "18:00"],
  ["18:00", "19:00"],
  ["19:00", "20:00"],
  ["20:00", "21:00"],
];

function buildDay(
  day: 0 | 1 | 2 | 3 | 4,
  dayCode: string,
  overrides: Partial<Record<string, Pick<ScheduleSlot, "title" | "level" | "class_id">>> = {},
  base: Pick<ScheduleSlot, "title" | "level" | "class_id"> = {
    title: "Boxeo",
    level: "todos",
    class_id: null,
  }
): ScheduleSlot[] {
  return HOURLY_RANGES.map(([start, end], index) => {
    const slot = overrides[start] ?? base;
    return {
      id: `s-${dayCode}-${index + 1}`,
      day_of_week: day,
      class_id: slot.class_id,
      title: slot.title,
      start_time: start,
      end_time: end,
      level: slot.level,
      active: true,
    };
  });
}

export const SEED_SCHEDULE: ScheduleSlot[] = [
  ...buildDay(0, "lu"),
  ...buildDay(1, "ma", {
    "18:00": { title: "Boxeo Infantil", level: "todos", class_id: null },
  }),
  ...buildDay(2, "mi"),
  ...buildDay(3, "ju", {
    "18:00": { title: "Boxeo Infantil", level: "todos", class_id: null },
  }),
  ...buildDay(4, "vi", {}, { title: "Sparring", level: "avanzado", class_id: "class-sparring" }),
  // Sábado y domingo: cerrado — sin franjas.
];

export const DAY_LABELS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
] as const;
