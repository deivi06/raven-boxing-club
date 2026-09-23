import {
  Dumbbell,
  Flame,
  GraduationCap,
  ImageIcon,
  Swords,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/** Explicit map so class icon names stored as strings stay tree-shakeable. */
export const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Target,
  Dumbbell,
  Flame,
  Swords,
  Trophy,
};

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? ImageIcon;
}
