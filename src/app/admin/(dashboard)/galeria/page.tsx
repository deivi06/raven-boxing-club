"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { Camera } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { EntityFormDialog } from "@/components/admin/entity-form-dialog";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { useEntityCrud } from "@/components/admin/use-entity-crud";
import { galleryImageSchema, type GalleryImageFormValues } from "@/lib/validations/admin";
import type { GalleryImage } from "@/lib/types";

const CATEGORIES: { value: GalleryImage["category"]; label: string }[] = [
  { value: "entrenamientos", label: "Entrenamientos" },
  { value: "boxeadores", label: "Boxeadores" },
  { value: "instalaciones", label: "Instalaciones" },
  { value: "clases", label: "Clases" },
  { value: "eventos", label: "Eventos" },
];

const EMPTY: GalleryImageFormValues = {
  category: "instalaciones",
  caption: "",
  active: true,
  sort_order: 0,
};

export default function AdminGalleryPage() {
  const { rows, loading, mutatingId, create, update, remove, toggle } =
    useEntityCrud<GalleryImage>("gallery_images");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const form = useForm<
    z.input<typeof galleryImageSchema>,
    unknown,
    GalleryImageFormValues
  >({
    resolver: zodResolver(galleryImageSchema),
    defaultValues: EMPTY,
  });

  const openCreate = () => {
    setEditing(null);
    setUrl(null);
    form.reset(EMPTY);
    setOpen(true);
  };

  const openEdit = (item: GalleryImage) => {
    setEditing(item);
    setUrl(item.url || null);
    form.reset({
      category: item.category,
      caption: item.caption,
      active: item.active,
      sort_order: item.sort_order,
    });
    setOpen(true);
  };

  const onSubmit = async (values: GalleryImageFormValues) => {
    const payload = { ...values, url: url ?? "" };
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
          <h1 className="font-heading text-2xl tracking-wide text-raven-white">Galería</h1>
          <p className="mt-1 text-sm text-raven-gray">Sube y organiza las fotos del club.</p>
        </div>
        <Button onClick={openCreate} className="bg-raven-green text-raven-bg hover:bg-raven-green-dark">
          <Plus className="size-4" />
          Nueva imagen
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Foto</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
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
                  No hay imágenes todavía.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((item) => (
                <TableRow key={item.id} className="border-white/10">
                  <TableCell>
                    <div className="relative size-12 overflow-hidden rounded-lg border border-white/10 bg-raven-bg-soft">
                      {item.url ? (
                        <Image src={item.url} alt={item.caption} fill className="object-cover" />
                      ) : (
                        <Camera className="m-auto mt-3 size-5 text-raven-gray" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-raven-white">{item.caption}</TableCell>
                  <TableCell>
                    <Badge className="border-raven-green/30 bg-raven-green/10 text-raven-green">
                      {CATEGORIES.find((c) => c.value === item.category)?.label}
                    </Badge>
                  </TableCell>
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
                        aria-label={`Editar ${item.caption}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <ConfirmDeleteDialog
                        itemLabel={item.caption}
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
        title={editing ? "Editar imagen" : "Nueva imagen"}
        formId="gallery-form"
        submitting={form.formState.isSubmitting}
      >
        <Form {...form}>
          <form id="gallery-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ImageUploadField bucket="gallery" value={url} onChange={setUrl} label="Imagen" />
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
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
