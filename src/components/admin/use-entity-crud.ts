"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  deleteRow,
  insertRow,
  listRows,
  toggleActive,
  updateRow,
} from "@/lib/data/admin-crud";

type WithId = { id: string };

/** Shared list/create/update/delete/toggle state for one admin CRUD screen. */
export function useEntityCrud<T extends WithId>(table: string, orderColumn = "sort_order") {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutatingId, setMutatingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listRows<T>(table, orderColumn);
      setRows(data);
    } catch {
      toast.error("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }, [table, orderColumn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch-on-mount; refresh's setState calls run after the awaited request, not synchronously.
    refresh();
  }, [refresh]);

  const create = useCallback(
    async (values: Record<string, unknown>) => {
      await insertRow(table, values);
      toast.success("Creado correctamente.");
      await refresh();
    },
    [table, refresh]
  );

  const update = useCallback(
    async (id: string, values: Record<string, unknown>) => {
      await updateRow(table, id, values);
      toast.success("Guardado correctamente.");
      await refresh();
    },
    [table, refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      setMutatingId(id);
      try {
        await deleteRow(table, id);
        toast.success("Eliminado.");
        await refresh();
      } catch {
        toast.error("No se pudo eliminar.");
      } finally {
        setMutatingId(null);
      }
    },
    [table, refresh]
  );

  const toggle = useCallback(
    async (id: string, active: boolean) => {
      setMutatingId(id);
      try {
        await toggleActive(table, id, active);
        setRows((prev) =>
          prev.map((r) => (r.id === id ? { ...r, active } : r))
        );
      } catch {
        toast.error("No se pudo actualizar.");
      } finally {
        setMutatingId(null);
      }
    },
    [table]
  );

  return { rows, loading, mutatingId, refresh, create, update, remove, toggle };
}
