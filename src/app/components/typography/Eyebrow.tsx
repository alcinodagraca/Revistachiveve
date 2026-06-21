import type { CSSProperties, ReactNode } from "react";
import { cn } from "../ui/utils";

export function Eyebrow({
  children,
  className,
  style,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "p" | "div";
}) {
  return (
    <Tag
      className={cn(
        "font-sans font-bold text-[11px] md:text-xs uppercase tracking-[0.14em] text-primary",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
