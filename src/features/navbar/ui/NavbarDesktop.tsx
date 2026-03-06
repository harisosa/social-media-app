"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import type { NavbarProps } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export const NavbarDesktop = ({ isAuthenticated, user }: NavbarProps) => {
    return (
        <header className="fixed z-150 w-full hidden border-b border-[#181D27] bg-black md:block">
            <Container>
                <div className="flex h-20 items-center justify-between gap-6">
                    <Link href="/" aria-label="Go to homepage" className="relative shrink-0 w-34.25 h-9">
                        <Image src='/images/logo.svg' alt="socialy" fill />
                    </Link>
                    <div className="flex flex-1 justify-center px-2">
                        <label className="relative w-full max-w-117.5">
                            <Search
                                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#717680]"
                                size={18}
                                strokeWidth={1.8}
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                className="h-10.5 w-full rounded-full border border-[#172033] bg-[#040B16] pl-12 pr-4 text-[14px] text-white outline-none placeholder:text-[#717680] focus:border-[#24314D]"
                            />
                        </label>
                    </div>

                    {isAuthenticated && user ? (
                        <Link
                            href="/profile"
                            className="flex shrink-0 items-center gap-3"
                            aria-label="Open profile"
                        >
                            <Avatar className="size-9">
                                <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                                <AvatarFallback>
                                    {user.name?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <span className="text-[18px] font-semibold leading-none text-white">
                                {user.name}
                            </span>
                        </Link>
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