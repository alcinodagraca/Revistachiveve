import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "../ui/utils";

const TITLE_CLASSES =
  "font-sans text-[1.18rem] font-medium uppercase leading-none tracking-[0.01em] text-primary md:text-[1.28rem]";

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
        "mb-6 flex items-end justify-between gap-4 border-b border-primary/28 pb-2.5",
        className,
      )}
    >
      <Tag className={TITLE_CLASSES}>{children}</Tag>
      {action && (
        <Link
          to={action.to}
          className="whitespace-nowrap font-sans text-[0.78rem] font-medium uppercase tracking-[0.08em] text-primary hover:underline md:text-[0.82rem]"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
