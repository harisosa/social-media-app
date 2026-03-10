import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = PropsWithChildren<{
  size?: "navbar" | "timeline" | "profile" | "form" | "bottomNavbar";
  className?: string;
}>;

const paddingMap = {
  navbar: `
    px-4 sm:px-6 md:px-10 xl:px-30 2xl:px-36 3xl:px-44
  `,
  timeline: `
    px-4 max-w-max mx-auto max-w-2xl flex justify-center
  `,
  profile: `
     mx-auto max-w-[812px] px-4 
  `,
  form: `
    px-[18px] sm:px-6 md:px-10 lg:px-20 xl:px-124 2xl:px-140 3xl:px-160
  `,
  bottomNavbar: `
    px-6 max-w-max mx-auto max-w-2xl flex justify-center
    `,
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "timeline",
  className,
}) => {
  return (
    <div className={cn("w-full ", paddingMap[size], className)}>
      {children}
    </div>
  );
};