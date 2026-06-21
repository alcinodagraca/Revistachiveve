import type { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-chiveve max-w-[680px] mx-auto font-sans text-base md:text-lg leading-relaxed text-foreground">
      {children}
    </div>
  );
}
