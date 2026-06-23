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
    <div className="flex flex-col items-center text-center px-6 py-16 md:py-20 border border-dashed border-border rounded-lg bg-secondary/50">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
        <Icon size={24} className="" />
      </div>
      <Heading
        as="h2"
        variant="feature-title"
        className="text-foreground mb-2"
      >
        {title}
      </Heading>
      {message && (
        <p className="font-sans text-base text-muted-foreground max-w-md leading-relaxed">
          {message}
        </p>
      )}
      {cta && (
        <Link
          to={cta.to}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-sans font-medium text-sm no-underline transition-opacity hover:opacity-90"
        >
          {cta.label}
        </Link>
      )}
      {children}
    </div>
  );
}
