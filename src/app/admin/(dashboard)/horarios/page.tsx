"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EntityFormDialog } from "@/components/admin/entity-form-dialog";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { useEntityCrud } from "@/components/admin/use-entity-crud";
import { scheduleSlotSchema, type ScheduleSlotFormValues } from "@/lib/validations/admin";
import type { GymClass, ScheduleSlot } from "@/lib/types";
import { DAY_LABELS } from "@/lib/seed";

const LEVELS: { value: ScheduleSlot["level"]; label: string }[] = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
  { value: "todos", label: "Todos" },
];

const EMPTY: ScheduleSlotFormValues = {
  day_of_week: 0,
  class_id: "",
  title: "",
  start_time: "10:00",
  end_time: "11:00",
  level: "todos",
  active: true,
};

export default function AdminSchedulePage() {
  const { rows, loading, mutatingId, create, update, remove, toggle } =
    useEntityCrud<ScheduleSlot>("schedule_slots", "start_time");
  const { rows: classes } = useEntityCrud<GymClass>("classes");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ScheduleSlot | null>(null);

  const form = useForm<
    z.input<typeof scheduleSlotSchema>,
    unknown,
    ScheduleSlotFormValues
  >({
    resolver: zodResolver(scheduleSlotSchema),
    defaultValues: EMPTY,
  });

  const openCreate = () => {
    setEditing(null);
    form.reset(EMPTY);
    setOpen(true);
  };

  const openEdit = (item: ScheduleSlot) => {
    setEditing(item);
    form.reset({
      day_of_week: item.day_of_week,
      class_id: item.class_id ?? "",
      title: item.title,
      start_time: item.start_time,
      end_time: item.end_time,
      level: item.level,
      active: item.active,
    });
    setOpen(true);
  };

  const onSubmit = async (values: ScheduleSlotFormValues) => {
    const payload = { ...values, class_id: values.class_id || null };
    if (editing) {
      await update(editing.id, payload);
    } else {
      await create(payload);
    }
    setOpen(false);
  };

  const sorted = [...rows].sort((a, b) =>
    a.day_of_week === b.day_of_week
      ? a.start_time.localeCompare(b.start_time)
      : a.day_of_week - b.day_of_week
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl tracking-wide text-raven-white">Horarios</h1>
          <p className="mt-1 text-sm text-raven-gray">Gestiona las franjas semanales de clases.</p>
        </div>
        <Button onClick={openCreate} className="bg-raven-green text-raven-bg hover:bg-raven-green-dark">
          <Plus className="size-4" />
          Nueva franja
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Día</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Clase</TableHead>
              <TableHead>Activa</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-raven-gray">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : sorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-raven-gray">
                  No hay franjas todavía.
                </TableCell>
              </TableRow>
            ) : (
              sorted.map((item) => (
                <TableRow key={item.id} className="border-white/10">
                  <TableCell className="font-medium text-raven-white">
                    {DAY_LABELS[item.day_of_week]}
                  </TableCell>
                  <TableCell className="text-raven-gray">
                    {item.start_time}–{item.end_time}
                  </TableCell>
                  <TableCell className="text-raven-white">{item.title}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.active}
                      disabled={mutatingId === item.id}
                      onCheckedChange={(checked) => toggle(item.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEdit(item)}
                        aria-label={`Editar ${item.title}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        itemLabel={item.title}
                        loading={mutatingId === item.id}
                        onConfirm={() => remove(item.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EntityFormDialog
        open={open}
        onOpenChange={setOpen}
        title={editing ? "Editar franja" : "Nueva franja"}
        formId="schedule-form"
        submitting={form.formState.isSubmitting}
      >
        <Form {...form}>
          <form id="schedule-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="class_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clase asociada (opcional)</FormLabel>
                  <Select value={field.value || "none"} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Sin clase asociada</SelectItem>
                      {classes.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="day_of_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Día</FormLabel>
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DAY_LABELS.map((label, index) => (
                          <SelectItem key={label} value={String(index)}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEVELS.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora inicio</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora fin</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-3">
                  <FormLabel className="mb-0">Visible en el sitio público</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </EntityFormDialog>
    </div>
  );
}
