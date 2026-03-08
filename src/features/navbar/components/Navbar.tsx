"use client";
import {
  selectAuthUser,
  selectIsAuthenticated,
} from "@/features/auth/store/auth.selectors";
import { NavbarDesktop, NavbarMobile } from "@/features/navbar/ui";
import { useAppSelector } from "@/lib/hook";

export const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthUser);

  return (
    <>
      <NavbarDesktop isAuthenticated={isAuthenticated} user={user} />
      <NavbarMobile isAuthenticated={isAuthenticated} user={user} />
    </>
  );
};