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
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const items = buildPageItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Paginação"
      className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6"
    >
      <span className="font-sans text-[0.78rem] font-light uppercase tracking-[0.08em] text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </Button>

        {items.map((item, index) =>
          item === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 font-sans text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={item}
              type="button"
              variant={item === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ),
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Seguinte
        </Button>
      </div>
    </nav>
  );
}
