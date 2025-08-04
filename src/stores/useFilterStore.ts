import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface FilterValues {
  genre: string;
  year: string;
  rating: number[];
  sortBy: string;
  language: string;
}

export interface FormattedFilters {
  with_genres: string;
  primary_release_year: string;
  "vote_average.gte": number;
  sort_by: string;
  with_original_language: string;
}

interface FiltersStore {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  clearFilters: () => void;
  updateFilter: <K extends keyof FilterValues>(
    key: K,
    value: FilterValues[K],
  ) => void;
  getFormattedFilters: () => FormattedFilters;
  hasActiveFilters: () => boolean;
  getAppliedFiltersCount: () => number;
}

const defaultFilters: FilterValues = {
  genre: "",
  year: "",
  rating: [0],
  sortBy: "popularity.desc",
  language: "",
};

const formatFilters = (filters: FilterValues): FormattedFilters => ({
  with_genres: filters.genre,
  primary_release_year: filters.year,
  "vote_average.gte": filters.rating[0],
  sort_by: filters.sortBy,
  with_original_language: filters.language,
});

export const useFiltersStore = create<FiltersStore>()(
  devtools(
    (set, get) => ({
      filters: defaultFilters,

      setFilters: (filters) =>
        set({ filters: { ...filters } }, false, "setFilters"),

      clearFilters: () =>
        set({ filters: { ...defaultFilters } }, false, "clearFilters"),

      updateFilter: (key, value) => {
        const currentFilters = get().filters;
        set(
          { filters: { ...currentFilters, [key]: value } },
          false,
          `updateFilter:${key}`,
        );
      },

      getFormattedFilters: () => {
        const { filters } = get();
        return formatFilters(filters);
      },

      hasActiveFilters: () => {
        const { filters } = get();
        return (
          filters.genre !== "" ||
          filters.year !== "" ||
          filters.rating[0] > 0 ||
          filters.sortBy !== "popularity.desc" ||
          filters.language !== ""
        );
      },

      getAppliedFiltersCount: () => {
        const { filters } = get();
        let count = 0;
        if (filters.genre) count++;
        if (filters.year) count++;
        if (filters.rating[0] > 0) count++;
        if (filters.sortBy !== "popularity.desc") count++;
        if (filters.language) count++;
        return count;
      },
    }),
    {
      name: "filters-store",
    },
  ),
);
