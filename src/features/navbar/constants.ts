import { NavItem } from "@/features/navbar/types";
import HomeIcon from '@/../public/icons/Home.svg';
import PlusIcon from '@/../public/icons/plus.svg';
import ProfileIcon from '@/../public/icons/profile.svg';

export const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    key: "create",
    label: "",
    href: "/post/create",
    icon: PlusIcon,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/profile",
    icon: ProfileIcon,
  },
]
