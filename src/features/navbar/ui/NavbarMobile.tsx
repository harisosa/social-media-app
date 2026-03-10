"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { NavbarProps } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { getInitials } from "@/lib/utils";
import { useDebounce } from "@/lib/useDebounce";
import { SearchUsersPanel } from "@/features/user/components";
import { usePathname } from "next/navigation";

export const NavbarMobile = ({ isAuthenticated, user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);
  const shouldOpenSearchPanel = useMemo(
    () => isSearchOpen && debouncedQuery.trim().length > 0,
    [debouncedQuery, isSearchOpen],
  );

    const pathname = usePathname()

  const isProfilePage = pathname.startsWith("/profile")

  if (isProfilePage) {
    return null
  }

  const handleOpenSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="fixed z-50 w-full border-b border-[#181D27] bg-black md:hidden">
      <Container size="navbar">
        {!isSearchOpen ? (
          <>
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                aria-label="Go to homepage"
                className="relative h-9 w-34.25 shrink-0"
              >
                <Image src="/images/logo.svg" alt="socialy" fill />
              </Link>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Open search"
                  onClick={handleOpenSearch}
                  className="inline-flex items-center justify-center text-white cursor-pointer"
                >
                  <Search size={20} strokeWidth={2} />
                </button>

                {isAuthenticated && user ? (
                  <Link
                    href="/profile"
                    aria-label="Open profile"
                    className="inline-flex items-center justify-center"
                  >
                    <Avatar className="size-9">
                      <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="inline-flex items-center justify-center text-white cursor-pointer"
                  >
                    {isMenuOpen ? (
                      <X size={22} strokeWidth={2} />
                    ) : (
                      <Menu size={22} strokeWidth={2} />
                    )}
                  </button>
                )}
              </div>
            </div>

            {!isAuthenticated && isMenuOpen ? (
              <div className="border-t border-[#252B37] px-4 py-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="flex h-9 flex-1 items-center justify-center rounded-full border border-[#252B37] text-[14px] font-semibold text-white"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="flex h-9 flex-1 items-center justify-center rounded-full bg-[#7751F9] text-[14px] font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="relative ">
            <div className="flex h-16 items-center gap-3">
              <label className="relative block flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#717680]"
                  size={18}
                  strokeWidth={1.8}
                />

                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="John Doe"
                  className="h-10.5 w-full rounded-full border border-[#172033] bg-[#040B16] pl-11 pr-10 text-[14px] text-white outline-none placeholder:text-[#717680] focus:border-[#24314D]"
                />

                {query ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F2430] text-[#98A2B3] cursor-pointer"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                ) : null}
              </label>

              <button
                type="button"
                aria-label="Close search"
                onClick={handleCloseSearch}
                className="inline-flex shrink-0 items-center justify-center text-white cursor-pointer" 
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>

            <SearchUsersPanel
              query={debouncedQuery}
              open={shouldOpenSearchPanel}
              mobile
            />
          </div>
        )}
      </Container>
    </header>
  );
};