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
    "font-serif font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight",
  "page-title":
    "font-serif font-semibold text-3xl md:text-5xl leading-tight tracking-tight",
  "article-title":
    "font-serif font-semibold text-2xl md:text-4xl leading-tight tracking-tight",
  "feature-title":
    "font-serif font-semibold text-xl md:text-2xl leading-snug",
  "card-title":
    "font-serif font-semibold text-base md:text-lg leading-snug",
  "card-title-sm":
    "font-serif font-semibold text-sm md:text-base leading-snug",
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
