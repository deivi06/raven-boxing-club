"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { format } from "date-fns";
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
import { newsSchema, type NewsFormValues } from "@/lib/validations/admin";
import type { NewsItem } from "@/lib/types";

const EMPTY: NewsFormValues = {
  title: "",
  content: "",
  published_at: format(new Date(), "yyyy-MM-dd"),
  active: true,
};

export default function AdminNewsPage() {
  const { rows, loading, mutatingId, create, update, remove, toggle } =
    useEntityCrud<NewsItem>("news", "published_at");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: EMPTY,
  });

  const openCreate = () => {
    setEditing(null);
    setCoverUrl(null);
    form.reset(EMPTY);
    setOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditing(item);
    setCoverUrl(item.cover_image_url);
    form.reset({
      title: item.title,
      content: item.content,
      published_at: format(new Date(item.published_at), "yyyy-MM-dd"),
      active: item.active,
    });
    setOpen(true);
  };

  const onSubmit = async (values: NewsFormValues) => {
    const payload = {
      ...values,
      published_at: new Date(values.published_at).toISOString(),
      cover_image_url: coverUrl,
    };
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
          <h1 className="font-heading text-2xl tracking-wide text-raven-white">Noticias</h1>
          <p className="mt-1 text-sm text-raven-gray">Publica novedades y eventos del club.</p>
        </div>
        <Button onClick={openCreate} className="bg-raven-green text-raven-bg hover:bg-raven-green-dark">
          <Plus className="size-4" />
          Nueva noticia
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Publicada</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-raven-gray">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-raven-gray">
                  No hay noticias todavía.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((item) => (
                <TableRow key={item.id} className="border-white/10">
                  <TableCell className="font-medium text-raven-white">{item.title}</TableCell>
                  <TableCell className="text-raven-gray">
                    {format(new Date(item.published_at), "dd/MM/yyyy")}
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
        title={editing ? "Editar noticia" : "Nueva noticia"}
        formId="news-form"
        submitting={form.formState.isSubmitting}
      >
        <Form {...form}>
          <form id="news-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ImageUploadField bucket="news" value={coverUrl} onChange={setCoverUrl} label="Imagen de portada" />
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de publicación</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                  <FormLabel className="mb-0">Publicada</FormLabel>
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
