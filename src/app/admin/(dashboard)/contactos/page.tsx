"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import {
  listContactMessages,
  markContactMessageRead,
} from "@/lib/data/contact";
import { deleteRow } from "@/lib/data/admin-crud";
import type { ContactMessage } from "@/lib/types";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      setMessages(await listContactMessages());
    } catch {
      toast.error("No se pudieron cargar los mensajes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch-on-mount; setState runs after the awaited request, not synchronously.
    refresh();
  }, []);

  const toggleRead = async (msg: ContactMessage) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m))
    );
    try {
      await markContactMessageRead(msg.id, !msg.read);
    } catch {
      toast.error("No se pudo actualizar.");
      refresh();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRow("contact_messages", id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mensaje eliminado.");
    } catch {
      toast.error("No se pudo eliminar.");
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-wide text-raven-white">Mensajes</h1>
      <p className="mt-1 text-sm text-raven-gray">
        Mensajes recibidos desde el formulario de contacto del sitio público.
      </p>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="py-8 text-center text-raven-gray">Cargando...</p>
        ) : messages.length === 0 ? (
          <p className="py-8 text-center text-raven-gray">
            No has recibido mensajes todavía.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-white/10 bg-raven-bg-alt p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-raven-white">{msg.name}</p>
                    {!msg.read ? (
                      <Badge className="border-raven-green/30 bg-raven-green/10 text-raven-green">
                        Nuevo
                      </Badge>
                    ) : null}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-raven-gray hover:text-raven-green"
                  >
                    {msg.email}
                  </a>
                  {msg.phone ? (
                    <span className="ml-2 text-sm text-raven-gray">· {msg.phone}</span>
                  ) : null}
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-2 text-xs text-raven-gray">
                    {format(new Date(msg.created_at), "dd/MM/yyyy HH:mm")}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => toggleRead(msg)}
                    aria-label={msg.read ? "Marcar como no leído" : "Marcar como leído"}
                  >
                    {msg.read ? <Mail className="size-4" /> : <MailOpen className="size-4" />}
                  </Button>
                  <ConfirmDeleteDialog
                    itemLabel={msg.name}
                    onConfirm={() => handleDelete(msg.id)}
                  />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-raven-white/90">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
