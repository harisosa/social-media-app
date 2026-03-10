"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { NavbarProps } from "../types";
import { Container } from "@/components/ui/container";
import { useDebounce } from "@/lib/useDebounce";
import { SearchUsersPanel } from "@/features/user/components";
import { NavbarUserMenu } from "@/features/navbar/components/UserMenu";


export const NavbarDesktop = ({ isAuthenticated, user }: NavbarProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const shouldOpenSearch = useMemo(
    () => debouncedQuery.trim().length > 0,
    [debouncedQuery],
  );

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
            <div className="relative w-full max-w-117.5">
              <label className="relative block w-full">
                <Search
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#717680]"
                  size={18}
                  strokeWidth={1.8}
                />

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  className="h-10.5 w-full rounded-full border border-[#172033] bg-[#040B16] pl-12 pr-10 text-[14px] text-white outline-none placeholder:text-[#717680] focus:border-[#24314D]"
                />

                {query ? (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F2430] text-[#98A2B3] transition hover:text-white"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                ) : null}
              </label>

              <SearchUsersPanel
                query={debouncedQuery}
                open={shouldOpenSearch}
                className="top-[calc(100%+10px)]"
              />
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