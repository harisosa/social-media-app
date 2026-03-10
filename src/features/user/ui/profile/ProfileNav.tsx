import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/features/user/types";
import { getInitials } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import React from "react";

type ProfileNavProps = {
    onBack?: () => void;
    profile?: User
}

export const ProfileNav: React.FC<ProfileNavProps> = ({ onBack, profile }) => {
    if(!profile) return;
    return (
        <div className="border-b border-white/10 px-5 py-4 lg:hidden">
            <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    {onBack ? (
                        <Button
                            size="icon"
                            onClick={onBack}
                            className="flex size-8 items-center bg-transparent justify-center rounded-full hover:bg-white/5"
                        >
                            <ArrowLeft className="size-5 text-white" />
                        </Button>
                    ) : null}

                    <p className="truncate text-xl font-semibold text-white">
                        {profile.name}
                    </p>
                </div>

                <Avatar className="size-10 border border-white/10">
                    <AvatarImage src={profile.avatarUrl ?? undefined} />
                    <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}