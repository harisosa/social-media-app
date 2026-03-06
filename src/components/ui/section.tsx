import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
  contentClassName?: string;
}>;

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  className,
  contentClassName,
}) => {
  return (
    <section
      className={
        className}
    >
      <Container>
        <div className={cn(
          "flex flex-col gap-6 lg:gap-10"
          ,contentClassName
        )}>
          {title && (<h2 className="text-display-xs lg:text-display-lg font-bold text-neutral-950">{title}</h2>)}
          {children}
          </div>
      </Container>
    </section>
  );
};

