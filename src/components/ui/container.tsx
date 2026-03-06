import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `
        w-full
        px-4        
        sm:px-6       
        md:px-10     
        lg:px-16   
        xl:px-30   
        2xl:px-40 
        `,
        className
      )}
    >
      {children}
    </div>
  );
};