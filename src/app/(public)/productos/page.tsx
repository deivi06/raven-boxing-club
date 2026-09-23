import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { CTASection } from "@/components/cta-section";
import { getProducts } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "Productos",
  description: "Ropa oficial de Raven Boxing Club — colección RAVEN x PATCH4GI.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Tienda"
            title="Ropa del club"
            description="Colección RAVEN x PATCH4GI. Consulta disponibilidad y compra escribiéndonos por WhatsApp."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 0.07}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
