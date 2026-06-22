import { Link } from "@tanstack/react-router";
import { FaChevronRight } from "react-icons/fa6";
import { Fragment } from "react";

export type Crumb = {
  label: string;
  to?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="font-sans text-[13px] text-muted-foreground"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li className="flex items-center">
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="text-muted-foreground no-underline transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <FaChevronRight
                  size={13}
                  className="text-muted-foreground opacity-60"
                />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
