"use client";

import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useLogout } from "@/features/auth/hooks";

type NavbarUserMenuProps = {
  user: {
    name: string;
    username: string;
    avatarUrl?: string | null;
  };
};

export const NavbarUserMenu = ({ user }: NavbarUserMenuProps) => {
  const logoutMutation = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="flex shrink-0 items-center gap-3 rounded-full outline-none transition hover:opacity-90"
        >
          <Avatar className="size-9">
            <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>

          <span className="text-md font-semibold leading-none text-white">
            {user.name}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="z-200 w-[256px] overflow-hidden rounded-2xl border border-[#252B37] p-0 text-white shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
      >
        <div className="px-5 py-4">
          <p className="text-[16px] font-semibold leading-6 text-white">
            {user.name}
          </p>
          <p className="mt-1 text-[14px] leading-5 text-[#98A2B3]">
            @{user.username}
          </p>
        </div>

        <DropdownMenuSeparator className="m-0 bg-[#252B37]" />

        <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-[#1D2432]">
          <Link
            href="/profile"
            className="flex h-16 w-full items-center gap-3 px-5 text-[#D0D5DD]"
          >
            <UserIcon size={18} className="text-[#98A2B3]" />
            <span className="text-[16px] font-medium">Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="m-0 bg-[#252B37]" />

        <DropdownMenuItem
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="h-16 cursor-pointer px-5 text-[#F04438] focus:bg-[#1D2432] focus:text-[#F04438] cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} className="text-[#98A2B3]" />
            <span className="text-[16px] font-medium text-[#F04438]">
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};