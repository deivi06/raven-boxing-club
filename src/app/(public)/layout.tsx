import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp-floating-button";
import { CookieBanner } from "@/components/cookie-banner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-raven-bg">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <CookieBanner />
    </div>
  );
}
