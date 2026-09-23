"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Calendar,
  Dumbbell,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/logo-mark";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/gimnasio", label: "Gimnasio", icon: Building2 },
  { href: "/admin/horarios", label: "Horarios", icon: Calendar },
  { href: "/admin/clases", label: "Clases", icon: Dumbbell },
  { href: "/admin/entrenadores", label: "Entrenadores", icon: GraduationCap },
  { href: "/admin/galeria", label: "Galería", icon: ImageIcon },
  { href: "/admin/productos", label: "Productos", icon: ShoppingBag },
  { href: "/admin/noticias", label: "Noticias", icon: Newspaper },
  { href: "/admin/contactos", label: "Mensajes", icon: Mail },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-raven-green/10 text-raven-green"
                : "text-raven-white/75 hover:bg-white/5 hover:text-raven-white"
            )}
          >
            <Icon className="size-4.5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-raven-gray transition-colors hover:bg-white/5 hover:text-raven-white",
        className
      )}
    >
      <LogOut className="size-4.5" />
      Cerrar sesión
    </button>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#06080a] lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <LogoMark size={34} />
        </div>
        <NavLinks pathname={pathname} />
        <div className="border-t border-white/10 p-3">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#06080a] px-4 py-3 lg:hidden">
        <LogoMark size={30} />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-raven-white")}
            aria-label="Abrir menú de administración"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-white/10 bg-[#06080a] p-0 text-raven-white">
            <SheetTitle className="sr-only">Menú de administración</SheetTitle>
            <div className="border-b border-white/10 px-5 py-5">
              <LogoMark size={30} />
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <div className="border-t border-white/10 p-3">
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
