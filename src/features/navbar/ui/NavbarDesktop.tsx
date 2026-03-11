"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavbarProps } from "../types";
import { Container } from "@/components/ui/container";
import { NavbarUserMenu } from "@/features/navbar/components/UserMenu";
import { SearchBox } from "@/components/ui/search-box";

export const NavbarDesktop = ({ isAuthenticated, user }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <header className="fixed z-150 hidden w-full border-b border-[#181D27] bg-black md:block">
      <Container size="navbar">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="relative h-9 w-34.25 shrink-0"
          >
            <Image src="/images/logo.svg" alt="socialy" fill />
          </Link>

          <div className="flex flex-1 justify-center px-2">
            <div className="w-full max-w-117.5">
              <SearchBox key={pathname} />
            </div>
          </div>

          {isAuthenticated && user ? (
            <NavbarUserMenu user={user} />
          ) : (
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href="/login"
                className="flex h-9.5 min-w-29 items-center justify-center rounded-full border border-[#252B37] px-8 text-[14px] font-semibold text-white transition hover:border-[#3A4250]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex h-9.5 min-w-36.5 items-center justify-center rounded-full bg-[#7751F9] px-8 text-[14px] font-semibold text-white transition hover:opacity-95"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};