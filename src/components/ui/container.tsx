import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = PropsWithChildren<{
  size?: "navbar" | "timeline" | "profile" | "form" | "bottomNavbar";
  className?: string;
}>;

const paddingMap = {
  navbar: `
    px-4 sm:px-6 md:px-10 lg:px-20 xl:px-30 2xl:px-36 3xl:px-44
  `,
  timeline: `
    px-4 sm:px-6 md:px-12 lg:px-20 xl:px-105 2xl:px-120 3xl:px-140
  `,
  profile: `
    px-4 sm:px-6 md:px-10 lg:px-16 xl:px-79 2xl:px-96 3xl:px-110
  `,
  form: `
    px-[18px] sm:px-6 md:px-10 lg:px-20 xl:px-124 2xl:px-140 3xl:px-160
  `,
  bottomNavbar: `
    px-6 sm:px-50 md:px-70 lg:px-100 xl:px-135 2xl:px-135 3xl:px-135
    `,
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "timeline",
  className,
}) => {
  return (
    <div className={cn("w-full", paddingMap[size], className)}>
      {children}
    </div>
  );
};