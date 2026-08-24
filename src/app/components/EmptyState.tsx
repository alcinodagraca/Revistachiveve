import type { ComponentType, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { FaFileLines } from "react-icons/fa6";
import { Heading } from "./typography";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export function EmptyState({
  icon: Icon = FaFileLines,
  title,
  message,
  cta,
  children,
}: {
  icon?: IconComponent;
  title: string;
  message?: ReactNode;
  cta?: { label: string; to: string };
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center border border-dashed border-border bg-secondary/35 px-6 py-16 text-center md:py-20">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
        <Icon size={24} className="" />
      </div>
      <Heading
        as="h2"
        variant="feature-title"
        className="mb-2 text-foreground"
      >
        {title}
      </Heading>
      {message && (
        <p className="max-w-md font-sans text-[0.96rem] font-light leading-[1.72] text-muted-foreground">
          {message}
        </p>
      )}
      {cta && (
        <Link
          to={cta.to}
          className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-sans text-[0.88rem] font-medium text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          {cta.label}
        </Link>
      )}
      {children}
    </div>
  );
}
