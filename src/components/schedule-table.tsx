"use client";

import { useMemo } from "react";
import { Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DAY_LABELS } from "@/lib/seed";
import type { ScheduleSlot } from "@/lib/types";
import { cn } from "@/lib/utils";

const LEVEL_LABEL: Record<ScheduleSlot["level"], string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
  todos: "Todos",
};

function SlotChip({ slot }: { slot: ScheduleSlot }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-raven-green/25 bg-raven-green/10 px-3 py-2.5">
      <div>
        <p className="text-sm font-semibold text-raven-white">{slot.title}</p>
        <p className="text-xs text-raven-gray">{LEVEL_LABEL[slot.level]}</p>
      </div>
      <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-raven-green">
        <Clock className="size-3.5" />
        {slot.start_time}–{slot.end_time}
      </span>
    </div>
  );
}

export function ScheduleTable({ slots }: { slots: ScheduleSlot[] }) {
  const byDay = useMemo(() => {
    const grouped = new Map<number, ScheduleSlot[]>();
    for (let d = 0; d < 7; d++) grouped.set(d, []);
    for (const slot of slots) {
      grouped.get(slot.day_of_week)?.push(slot);
    }
    for (const list of grouped.values()) {
      list.sort((a, b) => a.start_time.localeCompare(b.start_time));
    }
    return grouped;
  }, [slots]);

  const todayIndex = (new Date().getDay() + 6) % 7; // JS: 0=domingo -> convert to 0=lunes

  return (
    <>
      {/* Desktop / tablet: weekly grid */}
      <div className="hidden gap-3 lg:grid lg:grid-cols-7">
        {DAY_LABELS.map((label, index) => {
          const daySlots = byDay.get(index) ?? [];
          const isToday = index === todayIndex;
          return (
            <div
              key={label}
              className={cn(
                "flex flex-col gap-2 rounded-xl border p-3",
                isToday
                  ? "border-raven-green/50 bg-raven-green/5"
                  : "border-white/10 bg-raven-bg-alt"
              )}
            >
              <h3
                className={cn(
                  "font-heading text-sm tracking-widest",
                  isToday ? "text-raven-green" : "text-raven-white"
                )}
              >
                {label.toUpperCase()}
              </h3>
              <div className="flex flex-1 flex-col gap-2">
                {daySlots.length === 0 ? (
                  <p className="py-4 text-center text-xs text-raven-gray">Cerrado</p>
                ) : (
                  daySlots.map((slot) => <SlotChip key={slot.id} slot={slot} />)
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: accordion per day */}
      <Accordion defaultValue={[DAY_LABELS[todayIndex]]} className="lg:hidden">
        {DAY_LABELS.map((label, index) => {
          const daySlots = byDay.get(index) ?? [];
          const isToday = index === todayIndex;
          return (
            <AccordionItem key={label} value={label} className="border-white/10">
              <AccordionTrigger className="font-heading text-base tracking-wide hover:no-underline">
                <span className={cn(isToday && "text-raven-green")}>
                  {label}
                  {isToday ? (
                    <span className="ml-2 text-[10px] font-sans uppercase tracking-widest text-raven-green/70">
                      Hoy
                    </span>
                  ) : null}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {daySlots.length === 0 ? (
                  <p className="py-2 text-sm text-raven-gray">Cerrado</p>
                ) : (
                  daySlots.map((slot) => <SlotChip key={slot.id} slot={slot} />)
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
