"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Pencil, Plus, ShoppingBag } from "lucide-react";
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
import { productSchema, type ProductFormValues } from "@/lib/validations/admin";
import type { Product } from "@/lib/types";

const EMPTY: ProductFormValues = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  collection: "RAVEN x PATCH4GI",
  active: true,
  sort_order: 0,
};

export default function AdminProductsPage() {
  const { rows, loading, mutatingId, create, update, remove, toggle } =
    useEntityCrud<Product>("products");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.input<typeof productSchema>, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: EMPTY,
  });

  const openCreate = () => {
    setEditing(null);
    setImageUrl(null);
    form.reset(EMPTY);
    setOpen(true);
  };

  const openEdit = (item: Product) => {
    setEditing(item);
    setImageUrl(item.image_url);
    form.reset({
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      collection: item.collection,
      active: item.active,
      sort_order: item.sort_order,
    });
    setOpen(true);
  };

  const onSubmit = async (values: ProductFormValues) => {
    const payload = { ...values, image_url: imageUrl };
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
          <h1 className="font-heading text-2xl tracking-wide text-raven-white">Productos</h1>
          <p className="mt-1 text-sm text-raven-gray">Gestiona la ropa y merchandising del club.</p>
        </div>
        <Button onClick={openCreate} className="bg-raven-green text-raven-bg hover:bg-raven-green-dark">
          <Plus className="size-4" />
          Nuevo producto
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead>Foto</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Colección</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-raven-gray">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-raven-gray">
                  No hay productos todavía.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((item) => (
                <TableRow key={item.id} className="border-white/10">
                  <TableCell>
                    <div className="relative size-10 overflow-hidden rounded-lg border border-white/10 bg-raven-bg-soft">
                      {item.image_url ? (
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      ) : (
                        <ShoppingBag className="m-auto mt-2.5 size-5 text-raven-gray" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-raven-white">{item.name}</TableCell>
                  <TableCell className="text-raven-gray">{item.collection}</TableCell>
                  <TableCell className="text-raven-white">{item.price} €</TableCell>
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
        title={editing ? "Editar producto" : "Nuevo producto"}
        formId="product-form"
        submitting={form.formState.isSubmitting}
      >
        <Form {...form}>
          <form id="product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ImageUploadField bucket="products" value={imageUrl} onChange={setImageUrl} label="Foto" />
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
                    <Input placeholder="camiseta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colección</FormLabel>
                  <FormControl>
                    <Input placeholder="RAVEN x PATCH4GI" {...field} />
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
                  <FormLabel>Descripción (opcional)</FormLabel>
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} value={field.value as number} />
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
