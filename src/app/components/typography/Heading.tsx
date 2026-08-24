import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../ui/utils";

export type HeadingVariant =
  | "display"
  | "page-title"
  | "article-title"
  | "feature-title"
  | "card-title"
  | "card-title-sm";

const VARIANT_CLASSES: Record<HeadingVariant, string> = {
  display:
    "font-sans font-light text-[2.45rem] md:text-[3.35rem] leading-[0.98] tracking-[-0.035em]",
  "page-title":
    "font-sans font-normal text-[1.6rem] md:text-[2rem] leading-[1.04] tracking-[-0.03em]",
  "article-title":
    "font-sans font-normal text-[1.5rem] md:text-[1.82rem] leading-[1.08] tracking-[-0.028em]",
  "feature-title":
    "font-sans font-normal text-[1.06rem] md:text-[1.2rem] leading-[1.22] tracking-[-0.018em]",
  "card-title":
    "font-sans font-normal text-[0.95rem] md:text-[1rem] leading-[1.38] tracking-[-0.012em]",
  "card-title-sm":
    "font-sans font-normal text-[0.88rem] md:text-[0.94rem] leading-[1.44]",
};

type HeadingTag = "h1" | "h2" | "h3" | "h4";

type HeadingProps = {
  as?: HeadingTag;
  variant: HeadingVariant;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"h1">, "children">;

export function Heading({
  as = "h2",
  variant,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = as as ElementType;
  return (
    <Tag className={cn(VARIANT_CLASSES[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
