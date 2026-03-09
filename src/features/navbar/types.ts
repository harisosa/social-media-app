
import { User } from "@/features/user/types";
import { StaticImageData } from "next/image";

export type NavbarUser = {
  name: string;
  avatarUrl: string;
  lastActiveLabel?: string;
};

export type NavbarProps = {
  isAuthenticated: boolean;
  user?: User | null;
};

export type NavItem = {
  key: "home" | "create" | "profile"
  label: string
  href: string
  icon: StaticImageData
}
