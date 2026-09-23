import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { PlaceholderMedia } from "@/components/placeholder-media";
import { productWhatsappUrl } from "@/lib/constants";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-raven-bg-alt transition-colors hover:border-raven-green/40">
      <div className="relative aspect-square w-full">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PlaceholderMedia icon={ShoppingBag} label={product.name} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.collection ? (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-raven-green">
            {product.collection}
          </span>
        ) : null}
        <h3 className="font-heading text-lg tracking-wide text-raven-white">
          {product.name}
        </h3>
        {product.description ? (
          <p className="flex-1 text-sm leading-relaxed text-raven-gray">
            {product.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="font-heading text-xl text-raven-white">
            {product.price}&nbsp;€
          </span>
          <a
            href={productWhatsappUrl(product.name, product.price)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-raven-green px-4 py-2 text-xs font-semibold text-raven-bg transition-colors hover:bg-raven-green-dark"
          >
            <ShoppingBag className="size-3.5" />
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
}
