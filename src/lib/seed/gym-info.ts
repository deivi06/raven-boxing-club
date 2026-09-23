import { GYM } from "@/lib/constants";
import type { GymInfo } from "@/lib/types";

/** Refleja los datos reales conocidos del club; campos vacíos = sin dato público. */
export const SEED_GYM_INFO: GymInfo = {
  name: GYM.name,
  slogan: GYM.slogan,
  description: GYM.description,
  address: GYM.fullAddress,
  phone: GYM.phoneIntl,
  whatsapp: GYM.whatsappNumber,
  email: GYM.email,
  maps_url: GYM.googleMapsShareUrl,
  instagram_url: GYM.instagramUrl,
  facebook_url: GYM.facebookUrl,
  tiktok_url: GYM.tiktokUrl,
};
