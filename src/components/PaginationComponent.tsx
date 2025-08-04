import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { cn } from "@/lib/utils";

interface PaginationComponentProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

export default function PaginationComponent({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  maxVisiblePages = 5,
  className = "",
}: PaginationComponentProps) {
  const breakpoint = useBreakpoint();
  const getMaxVisiblePages = () => {
    switch (breakpoint) {
      case "mobile":
        return 3;
      case "sm":
        return 4;
      case "md":
        return 5;
      default:
        return maxVisiblePages;
    }
  };

  const adaptiveMaxVisible = getMaxVisiblePages();
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(adaptiveMaxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    if (endPage - startPage + 1 < adaptiveMaxVisible) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + adaptiveMaxVisible - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - adaptiveMaxVisible + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showLeftEllipsis = visiblePages[0] > 1;
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={cn(
        `scrollbar-hide flex w-full justify-center overflow-x-auto ${breakpoint === "mobile" ? "mx-auto max-w-full" : "max-w-none"}`,
        className,
      )}
    >
      <Pagination className="flex-shrink-0 justify-center px-2">
        <PaginationContent
          className={`gap-1 ${breakpoint === "mobile" ? "gap-0.5" : "gap-1"} ${breakpoint === "mobile" ? "min-w-0" : ""} `}
        >
          <PaginationItem className="flex-shrink-0">
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={`cursor-pointer transition-all duration-200 select-none ${breakpoint === "mobile" ? "h-8 min-w-[28px] px-1.5 text-xs" : "px-3"} ${
                currentPage === 1
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "hover:bg-purple-9 hover:text-white"
              } bg-mauvedark-3 border-mauvedark-7 text-mauve-1`}
              aria-disabled={currentPage === 1}
            >
              {breakpoint === "mobile" ? "‹" : undefined}
            </PaginationPrevious>
          </PaginationItem>
          {showLeftEllipsis && breakpoint !== "mobile" && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(1)}
                  className="bg-mauvedark-3 border-mauvedark-7 text-mauve-1 hover:bg-purple-9 cursor-pointer transition-all duration-200 hover:text-white"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {visiblePages[0] > 2 && (
                <PaginationItem className="h-11 w-11">
                  <PaginationEllipsis className="text-mauve-9" />
                </PaginationItem>
              )}
            </>
          )}

          {/* No mobile, se tem ellipsis à esquerda, mostra apenas o ellipsis */}
          {showLeftEllipsis &&
            breakpoint === "mobile" &&
            visiblePages[0] > 2 && (
              <PaginationItem className="flex-shrink-0">
                <PaginationEllipsis className="text-mauve-9 flex h-8 min-w-[24px] items-center justify-center px-0.5" />
              </PaginationItem>
            )}

          {/* Páginas visíveis */}
          {visiblePages.map((page) => (
            <PaginationItem key={page} className="flex-shrink-0">
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
                className={`cursor-pointer transition-all duration-200 select-none ${
                  breakpoint === "mobile"
                    ? "flex h-8 min-w-[28px] items-center justify-center px-1.5 text-xs"
                    : "px-3"
                } ${
                  page === currentPage
                    ? "bg-purple-9 border-purple-9 hover:bg-purple-10 text-white"
                    : "bg-mauvedark-3 border-mauvedark-7 text-mauve-1 hover:bg-purple-9 hover:text-white"
                } `}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* No mobile, se tem ellipsis à direita, mostra apenas o ellipsis */}
          {showRightEllipsis &&
            breakpoint === "mobile" &&
            visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <PaginationItem className="flex-shrink-0">
                <PaginationEllipsis className="text-mauve-9 flex h-8 min-w-[24px] items-center justify-center px-0.5" />
              </PaginationItem>
            )}

          {/* Botão Próximo */}
          <PaginationItem className="flex-shrink-0">
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={`cursor-pointer transition-all duration-200 select-none ${breakpoint === "mobile" ? "h-8 min-w-[28px] px-1.5 text-xs" : "px-3"} ${
                currentPage === totalPages
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "hover:bg-purple-9 hover:text-white"
              } bg-mauvedark-3 border-mauvedark-7 text-mauve-1`}
              aria-disabled={currentPage === totalPages}
            >
              {breakpoint === "mobile" ? "›" : undefined}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
