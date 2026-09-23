"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoMark } from "@/components/logo-mark";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-raven-bg/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <LogoMark size={38} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-raven-green"
                    : "text-raven-white/80 hover:text-raven-green"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contacto"
          className={cn(
            buttonVariants(),
            "hidden bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark lg:inline-flex"
          )}
        >
          Apúntate ahora
        </Link>

        <Sheet>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "text-raven-white hover:bg-raven-bg-soft lg:hidden"
            )}
            aria-label="Abrir menú"
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85vw] max-w-sm border-white/10 bg-raven-bg p-0 text-raven-white sm:max-w-sm"
          >
            <SheetHeader className="border-b border-white/10 px-6 py-5">
              <SheetTitle className="text-left">
                <LogoMark size={34} />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-raven-green/10 text-raven-green"
                          : "text-raven-white/85 hover:bg-raven-bg-soft"
                      )}
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/contacto"
                    className={cn(
                      buttonVariants(),
                      "mt-3 bg-raven-green text-raven-bg font-semibold hover:bg-raven-green-dark"
                    )}
                  />
                }
              >
                Apúntate ahora
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
