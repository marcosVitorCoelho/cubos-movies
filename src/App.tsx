import { lazy, Suspense, useState, useCallback } from "react";
import { Input } from "./components/ui/input";
import { Toggle } from "./components/ui/toggle";
import { FilterIcon } from "./components/icons/FilterIcon";
import LoadingMovieCards from "./components/LoadingMovieCards";
import PaginationComponent from "./components/PaginationComponent";
import CardsContainer from "./components/CardsContainer";
import FiltersComponent from "./components/FilterComponent";
import {
  useFiltersStore,
  type FormattedFilters,
} from "@/stores/useFilterStore";

const MovieCards = lazy(() => import("./components/MovieCards"));

export default function App() {
  const [isFilterTogglePressed, setIsFilterTogglePressed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { clearFilters, hasActiveFilters, getAppliedFiltersCount } =
    useFiltersStore();

  const [appliedFilters, setAppliedFilters] = useState<FormattedFilters | null>(
    null,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSetTotalPages = (page: number) => {
    setTotalPages(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleApplyFilters = useCallback((filters: FormattedFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setIsFilterTogglePressed(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    clearFilters();
    setAppliedFilters(null);
    setCurrentPage(1);
  }, [clearFilters]);

  const handleFilterToggle = (pressed: boolean) => {
    setIsFilterTogglePressed(pressed);
  };

  return (
    <>
      <div className="relative z-10 flex content-center items-center justify-center gap-2 p-4">
        <Input
          className="bg-mauvedark-2 focus:ring-purple-9 focus:ring-offset-purple-1 dark:focus:ring-offset-purpledark-1 border-mauvedarka-9 text-mauve-1 h-14 max-w-[488px] rounded-sm border"
          placeholder="Pesquise por um filme"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <div className="relative">
          <Toggle
            className="data-[state=on]:bg-purpledark-9 data-[state=off]:bg-purpledark-3 dark:data-[state=off]:bg-purpledarka-2 data-[state=on]:hover:bg-purpledark-8 data-[state=off]:hover:bg-purpledark-10 h-14 w-14 rounded-sm transition-all duration-200 ease-out"
            pressed={isFilterTogglePressed}
            onPressedChange={handleFilterToggle}
          >
            <FilterIcon className="text-mauvedark-12 size-6" />
          </Toggle>

          {hasActiveFilters() && (
            <div className="bg-purple-9 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white">
              {getAppliedFiltersCount()}
            </div>
          )}
        </div>
      </div>

      {appliedFilters && hasActiveFilters() && (
        <div className="relative z-10 flex justify-center px-4 pb-2">
          <div className="bg-purpledark-3 text-mauve-1 flex items-center gap-2 rounded-full px-3 py-1 text-sm">
            <span>{getAppliedFiltersCount()} filtro(s) aplicado(s)</span>
            <button
              onClick={handleClearFilters}
              className="hover:bg-purpledark-5 flex h-5 w-5 items-center justify-center rounded-full transition-colors"
              title="Limpar filtros"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <FiltersComponent
          isPressed={isFilterTogglePressed}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        <CardsContainer>
          <Suspense fallback={<LoadingMovieCards />}>
            <MovieCards
              currentPage={currentPage}
              setTotalPages={handleSetTotalPages}
              searchQuery={searchQuery}
              filters={appliedFilters}
            />
          </Suspense>
        </CardsContainer>

        <PaginationComponent
          className="my-4"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </div>
    </>
  );
}
