"use client";

import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConfirmDeleteDialog({
  itemLabel,
  onConfirm,
  loading,
}: {
  itemLabel: string;
  onConfirm: () => void;
  loading?: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-sm" }),
          "text-raven-gray hover:bg-destructive/10 hover:text-destructive"
        )}
        aria-label={`Eliminar ${itemLabel}`}
      >
        <Trash2 className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent className="border-white/10 bg-raven-bg-alt">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar “{itemLabel}”?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-destructive/90 text-white hover:bg-destructive"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
