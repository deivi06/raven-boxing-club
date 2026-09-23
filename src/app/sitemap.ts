import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES = [
  "",
  "/nosotros",
  "/clases",
  "/horarios",
  "/entrenadores",
  "/galeria",
  "/productos",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
