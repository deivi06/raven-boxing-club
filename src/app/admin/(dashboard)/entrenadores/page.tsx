"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { useEntityCrud } from "@/components/admin/use-entity-crud";
import { trainerSchema, type TrainerFormValues } from "@/lib/validations/admin";
import type { Trainer } from "@/lib/types";
import { User } from "lucide-react";

const EMPTY: TrainerFormValues = {
  name: "",
  specialty: "",
  bio: "",
  experience_years: 0,
  active: true,
  sort_order: 0,
};

export default function AdminTrainersPage() {
  const { rows, loading, mutatingId, create, update, remove, toggle } =
    useEntityCrud<Trainer>("trainers");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Trainer | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const form = useForm<z.input<typeof trainerSchema>, unknown, TrainerFormValues>({
    resolver: zodResolver(trainerSchema),
    defaultValues: EMPTY,
  });

  const openCreate = () => {
    setEditing(null);
    setPhotoUrl(null);
    form.reset(EMPTY);
    setOpen(true);
  };

  const openEdit = (item: Trainer) => {
    setEditing(item);
    setPhotoUrl(item.photo_url);
    form.reset({
      name: item.name,
      specialty: item.specialty,
      bio: item.bio,
      experience_years: item.experience_years,
      active: item.active,
      sort_order: item.sort_order,
    });
    setOpen(true);
  };

  const onSubmit = async (values: TrainerFormValues) => {
    const payload = { ...values, photo_url: photoUrl };
    if (editing) {
      await update(editing.id, payload);
    } else {
      await create(payload);
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl tracking-wide text-raven-white">Entrenadores</h1>
          <p className="mt-1 text-sm text-raven-gray">Gestiona el equipo del club.</p>
        </div>
        <Button onClick={openCreate} className="bg-raven-green text-raven-bg hover:bg-raven-green-dark">
          <Plus className="size-4" />
          Nuevo entrenador
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Foto</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Activo</TableHead>
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
                  No hay entrenadores todavía.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((item) => (
                <TableRow key={item.id} className="border-white/10">
                  <TableCell>
                    <div className="relative size-10 overflow-hidden rounded-full border border-white/10 bg-raven-bg-soft">
                      {item.photo_url ? (
                        <Image src={item.photo_url} alt={item.name} fill className="object-cover" />
                      ) : (
                        <User className="m-auto mt-2.5 size-5 text-raven-gray" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-raven-white">{item.name}</TableCell>
                  <TableCell className="text-raven-gray">{item.specialty}</TableCell>
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
        title={editing ? "Editar entrenador" : "Nuevo entrenador"}
        formId="trainer-form"
        submitting={form.formState.isSubmitting}
      >
        <Form {...form}>
          <form id="trainer-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ImageUploadField bucket="trainers" value={photoUrl} onChange={setPhotoUrl} label="Foto" />
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
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especialidad</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biografía</FormLabel>
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
                name="experience_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Años de experiencia</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value as number} />
                    </FormControl>
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
