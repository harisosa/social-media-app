"use client";
import {
  selectIsAuthenticated,
} from "@/features/auth/store/auth.selectors";
import { NavbarDesktop, NavbarMobile } from "@/features/navbar/ui";
import { useMyProfile } from "@/features/user/hooks";

import { useAppSelector } from "@/lib/hook";

export const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const {data : profile} =  useMyProfile();

  const user = profile?.profile;

  return (
    <>
      <NavbarDesktop isAuthenticated={isAuthenticated} user={user} />
      <NavbarMobile isAuthenticated={isAuthenticated} user={user} />
    </>
  );
};