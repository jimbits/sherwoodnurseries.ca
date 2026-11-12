// src/icons/social/index.ts
import Facebook from "./facebook.svg";
import YouTube from "./youtube.svg";
import Instagram from "./instagram.svg";
import Pinterest from "./pinterest.svg";

export const socialIcons = {
  facebook: Facebook,
  youtube: YouTube,
  instagram: Instagram,
  pinterest: Pinterest,
} as const;

export type SocialIcon = keyof typeof socialIcons;
