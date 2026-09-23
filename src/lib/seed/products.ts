import type { Product } from "@/lib/types";

const COLLECTION = "RAVEN x PATCH4GI";
const SET_PRICES =
  "Camiseta: 35€ · Pantalón: 40€ · Conjunto completo: 70€.";

export const SEED_PRODUCTS: Product[] = [
  {
    id: "product-negroverde",
    name: "Conjunto Negro y Verde",
    slug: "conjunto-negro-verde",
    description: `Colección ${COLLECTION}. ${SET_PRICES}`,
    price: 70,
    collection: COLLECTION,
    image_url: "/images/ropa/camiseta_raven_negraverde.jpeg",
    active: true,
    sort_order: 1,
  },
  {
    id: "product-negrodorado",
    name: "Conjunto Negro y Dorado",
    slug: "conjunto-negro-dorado",
    description: `Colección ${COLLECTION}. ${SET_PRICES}`,
    price: 70,
    collection: COLLECTION,
    image_url: "/images/ropa/camiseta_raven_negradorada.jpeg",
    active: true,
    sort_order: 2,
  },
  {
    id: "product-blanco",
    name: "Conjunto Blanco",
    slug: "conjunto-blanco",
    description: `Colección ${COLLECTION}. ${SET_PRICES}`,
    price: 70,
    collection: COLLECTION,
    image_url: "/images/ropa/camiseta_raven_blanca.jpeg",
    active: true,
    sort_order: 3,
  },
  {
    id: "product-rosa",
    name: "Conjunto Rosa",
    slug: "conjunto-rosa",
    description: `Colección ${COLLECTION}. ${SET_PRICES}`,
    price: 70,
    collection: COLLECTION,
    image_url: "/images/ropa/camiseta_raven_rosa.jpeg",
    active: true,
    sort_order: 4,
  },
  {
    id: "product-sudadera",
    name: "Sudadera",
    slug: "sudadera",
    description: `Colección ${COLLECTION}.`,
    price: 70,
    collection: COLLECTION,
    image_url: "/images/ropa/sudaderaraven.jpeg",
    active: true,
    sort_order: 5,
  },
];
