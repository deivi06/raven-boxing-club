"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "raven-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable client-side; this is the initial mount check, not a cascading update.
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Almacenamiento no disponible (p. ej. navegación privada) — no mostramos el aviso.
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Nada que hacer si no se puede persistir; simplemente se ocultará esta visita.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-5 z-50 mx-auto max-w-sm rounded-2xl border border-white/10 bg-raven-bg-alt p-5 shadow-xl shadow-black/40 sm:left-5 sm:right-auto">
      <div className="flex gap-3">
        <Cookie className="mt-0.5 size-5 shrink-0 text-raven-green" />
        <div>
          <p className="text-sm leading-relaxed text-raven-white/90">
            Usamos únicamente cookies técnicas necesarias para el funcionamiento del sitio.
          </p>
          <Link
            href="/politica-privacidad"
            className="mt-1 inline-block text-xs text-raven-gray underline hover:text-raven-green"
          >
            Más información
          </Link>
        </div>
      </div>
      <Button
        onClick={accept}
        className="mt-4 w-full bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark"
      >
        Entendido
      </Button>
    </div>
  );
}
