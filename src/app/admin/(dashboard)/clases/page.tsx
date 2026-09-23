"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { EntityFormDialog } from "@/components/admin/entity-form-dialog";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { useEntityCrud } from "@/components/admin/use-entity-crud";
import { classSchema, type ClassFormValues } from "@/lib/validations/admin";
import type { GymClass } from "@/lib/types";
import { ICON_MAP } from "@/lib/icon-map";

const LEVELS: { value: GymClass["level"]; label: string }[] = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
  { value: "todos", label: "Todos los niveles" },
];

const EMPTY: ClassFormValues = {
  name: "",
  slug: "",
  description: "",
  level: "principiante",
  duration_minutes: 60,
  icon: "GraduationCap",
  active: true,
  sort_order: 0,
};

export default function AdminClassesPage() {
  const { rows, loading, mutatingId, create, update, remove, toggle } =
    useEntityCrud<GymClass>("classes");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GymClass | null>(null);

  const form = useForm<z.input<typeof classSchema>, unknown, ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: EMPTY,
  });

  const openCreate = () => {
    setEditing(null);
    form.reset(EMPTY);
    setOpen(true);
  };

  const openEdit = (item: GymClass) => {
    setEditing(item);
    form.reset({
      name: item.name,
      slug: item.slug,
      description: item.description,
      level: item.level,
      duration_minutes: item.duration_minutes,
      icon: item.icon,
      active: item.active,
      sort_order: item.sort_order,
    });
    setOpen(true);
  };

  const onSubmit = async (values: ClassFormValues) => {
    if (editing) {
      await update(editing.id, values);
    } else {
      await create(values);
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl tracking-wide text-raven-white">Clases</h1>
          <p className="mt-1 text-sm text-raven-gray">
            Gestiona el catálogo de clases del club.
          </p>
        </div>
        <Button onClick={openCreate} className="bg-raven-green text-raven-bg hover:bg-raven-green-dark">
          <Plus className="size-4" />
          Nueva clase
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Nombre</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead>Duración</TableHead>
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
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-raven-gray">
                  No hay clases todavía.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((item) => (
                <TableRow key={item.id} className="border-white/10">
                  <TableCell className="font-medium text-raven-white">{item.name}</TableCell>
                  <TableCell>
                    <Badge className="border-raven-green/30 bg-raven-green/10 text-raven-green">
                      {LEVELS.find((l) => l.value === item.level)?.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-raven-gray">{item.duration_minutes} min</TableCell>
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
                        aria-label={`Editar ${item.name}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        itemLabel={item.name}
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
        title={editing ? "Editar clase" : "Nueva clase"}
        formId="class-form"
        submitting={form.formState.isSubmitting}
      >
        <Form {...form}>
          <form id="class-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="boxeo-principiantes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
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
              <FormField
                control={form.control}
                name="duration_minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duración (min)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icono</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(ICON_MAP).map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
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
                name="sort_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value as number} />
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
