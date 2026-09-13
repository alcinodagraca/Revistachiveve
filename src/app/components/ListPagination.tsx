import { Button } from "./ui/button";

function buildPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages] as const;
}

export function ListPagination({
  currentPage,
  totalPages,
  getPageHref,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  getPageHref?: (page: number) => string;
  onPageChange?: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const items = buildPageItems(currentPage, totalPages);

  const pageControl = (
    page: number,
    label: string | number,
    options?: { disabled?: boolean; rel?: "prev" | "next" },
  ) => {
    const isCurrent = page === currentPage && typeof label === "number";
    const variant = isCurrent ? "default" : "outline";

    if (options?.disabled) {
      return (
        <Button type="button" variant="outline" size="sm" disabled>
          {label}
        </Button>
      );
    }

    if (onPageChange) {
      return (
        <Button
          type="button"
          variant={variant}
          size="sm"
          aria-current={isCurrent ? "page" : undefined}
          aria-label={typeof label === "number" ? `Página ${page}` : undefined}
          onClick={() => onPageChange(page)}
        >
          {label}
        </Button>
      );
    }

    if (!getPageHref) return null;
    return (
      <Button asChild variant={variant} size="sm">
        <a
          href={getPageHref(page)}
          rel={options?.rel}
          aria-current={isCurrent ? "page" : undefined}
          aria-label={typeof label === "number" ? `Página ${page}` : undefined}
        >
          {label}
        </a>
      </Button>
    );
  };

  return (
    <nav
      aria-label="Paginação"
      className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6"
    >
      <span
        className="font-sans text-[0.78rem] font-light uppercase tracking-[0.08em] text-muted-foreground"
        aria-live="polite"
      >
        Página {currentPage} de {totalPages}
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {pageControl(currentPage - 1, "Anterior", {
          disabled: currentPage === 1,
          rel: "prev",
        })}

        {items.map((item, index) =>
          item === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 font-sans text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <span key={item}>{pageControl(item, item)}</span>
          ),
        )}

        {pageControl(currentPage + 1, "Seguinte", {
          disabled: currentPage === totalPages,
          rel: "next",
        })}
      </div>
    </nav>
  );
}
