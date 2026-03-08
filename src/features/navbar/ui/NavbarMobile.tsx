"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

import type { NavbarProps } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";


export const NavbarMobile = ({ isAuthenticated, user }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (

        <header className="fixed w-full z-50 border-b border-[#181D27] bg-black md:hidden">
            <Container size="navbar">


                <div className="flex h-16 items-center justify-between">
                    <Link href="/" aria-label="Go to homepage" className="relative shrink-0 w-34.25 h-9">
                        <Image src='/images/logo.svg' alt="socialy" fill />
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            aria-label="Search"
                            className="inline-flex items-center justify-center text-white"
                        >
                            <Search size={20} strokeWidth={2} />
                        </button>

                        {isAuthenticated && user ? (
                            <Link
                                href="/profile"
                                aria-label="Open profile"
                                className="relative size-9 overflow-hidden rounded-full"
                            >
                                <Avatar className="size-11">
                                    <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
                                    <AvatarFallback>
                                        {user.name?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        ) : (
                            <button
                                type="button"
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className="inline-flex items-center justify-center text-white"
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
            </Container>
        </header>
    );
};