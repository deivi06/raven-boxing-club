"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

/** Uploads to a Supabase Storage bucket and returns its public URL. */
export function ImageUploadField({
  bucket,
  value,
  onChange,
  label = "Imagen",
}: {
  bucket: "gallery" | "trainers" | "classes" | "news" | "products";
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        upsert: true,
      });
      if (error) throw error;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch {
      toast.error("No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-raven-white">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-raven-bg-soft">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" />
          ) : (
            <ImagePlus className="size-6 text-raven-gray" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            {value ? "Cambiar" : "Subir imagen"}
          </Button>
          {value ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-raven-gray"
              onClick={() => onChange(null)}
            >
              <X className="size-4" />
              Quitar
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
