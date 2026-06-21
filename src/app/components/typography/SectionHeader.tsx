import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "../ui/utils";

const TITLE_CLASSES =
  "font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-foreground";

type HeadingTag = "h2" | "h3" | "h4";

export function SectionHeader({
  as = "h2",
  children,
  action,
  className,
}: {
  as?: HeadingTag;
  children: ReactNode;
  action?: { label: string; to: string };
  className?: string;
}) {
  const Tag = as;
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 mb-6 pb-3 border-b border-border",
        className,
      )}
    >
      <Tag className={TITLE_CLASSES}>{children}</Tag>
      {action && (
        <Link
          to={action.to}
          className="font-sans font-medium text-xs md:text-sm text-primary hover:underline whitespace-nowrap"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
