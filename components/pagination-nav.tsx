import Link from "next/link";

type PaginationNavProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  paramName?: string;
};

function getPageHref(basePath: string, paramName: string, page: number) {
  if (page <= 1) {
    return basePath;
  }

  const searchParams = new URLSearchParams({
    [paramName]: String(page),
  });

  return `${basePath}?${searchParams.toString()}`;
}

export function PaginationNav({
  basePath,
  currentPage,
  totalPages,
  paramName = "page",
}: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-12 flex items-center justify-between gap-4" aria-label="Paginacion">
      <div className="text-sm text-zinc-500">
        Pagina {currentPage} de {totalPages}
      </div>

      <div className="flex items-center gap-3">
        {currentPage > 1 ? (
          <Link
            href={getPageHref(basePath, paramName, currentPage - 1)}
            className="button-secondary inline-flex"
          >
            <span>Anterior</span>
          </Link>
        ) : (
          <span className="button-secondary pointer-events-none inline-flex opacity-50">
            <span>Anterior</span>
          </span>
        )}

        {currentPage < totalPages ? (
          <Link
            href={getPageHref(basePath, paramName, currentPage + 1)}
            className="button-secondary inline-flex"
          >
            <span>Siguiente</span>
          </Link>
        ) : (
          <span className="button-secondary pointer-events-none inline-flex opacity-50">
            <span>Siguiente</span>
          </span>
        )}
      </div>
    </nav>
  );
}
