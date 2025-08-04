/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDiscoverMovies,
  useGenres,
  useSearchMovies,
} from "@/hooks/useMovieHooks";
import MovieCard from "./MovieCard";
import { useEffect, useMemo } from "react";
import type { FormattedFilters } from "@/stores/useFilterStore";
import { Link } from "react-router";

interface MovieCardsProps {
  currentPage: number;
  setTotalPages: (page: number) => void;
  searchQuery?: string;
  filters?: FormattedFilters | null;
}

export default function MovieCards({
  currentPage,
  setTotalPages,
  searchQuery = "",
  filters = null,
}: MovieCardsProps) {
  const genresData = useGenres();
  const hasSearchQuery = searchQuery.trim().length > 0;

  const discoverParams = useMemo(() => {
    const params: Record<string, any> = {};

    if (searchQuery.trim()) {
      params.query = searchQuery.trim();
    }

    if (filters) {
      if (filters.with_genres) {
        params.with_genres = filters.with_genres;
      }

      if (filters.primary_release_year) {
        params.primary_release_year = filters.primary_release_year;
      }

      if (filters["vote_average.gte"] > 0) {
        params["vote_average.gte"] = filters["vote_average.gte"];
      }

      if (filters.sort_by && filters.sort_by !== "popularity.desc") {
        params.sort_by = filters.sort_by;
      }

      if (filters.with_original_language) {
        params.with_original_language = filters.with_original_language;
      }
    }

    return params;
  }, [searchQuery, filters]);

  const discoverMovies = useDiscoverMovies(discoverParams, currentPage);

  const searchMovies = useSearchMovies(searchQuery, currentPage);

  const dataMovies = hasSearchQuery ? searchMovies.data : discoverMovies.data;

  const isErrorMovies = hasSearchQuery
    ? searchMovies.isError
    : discoverMovies.isError;

  const { data: dataGenres, isError: isErrorGenres } = genresData;

  useEffect(() => {
    if (dataMovies?.total_pages) {
      setTotalPages(dataMovies.total_pages);
    }
  }, [dataMovies?.total_pages, setTotalPages]);

  useEffect(() => {
    if (dataMovies?.total_pages) {
      setTotalPages(dataMovies.total_pages);
    }
  }, [dataMovies?.total_pages, setTotalPages]);

  if (isErrorMovies) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <h1 className="dark:text-mauve-1">Houve um erro ao buscar filmes</h1>
      </div>
    );
  }

  if (isErrorGenres) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <h1 className="dark:text-mauve-1">Houve um erro ao buscar gêneros</h1>
      </div>
    );
  }

  const { results: movies } = dataMovies;
  const { genres } = dataGenres;

  if (movies.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
        <div className="text-mauve-1 mb-2 text-lg">Nenhum filme encontrado</div>
        {(searchQuery || filters) && (
          <div className="text-mauve-9 text-sm">
            Tente ajustar sua busca ou filtros
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {movies.map((Movie) => {
        const movieGenres = Movie.genre_ids
          .map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : "";
          })
          .filter((name) => name !== "");

        const rating = Math.round((Movie.vote_average / 10) * 100);

        return (
          <Link
            key={Movie.id}
            to={`/moviedetail/${Movie.id}`}
            className="inline-block"
          >
            <MovieCard
              key={Movie.id}
              backgroundImage={Movie.poster_path}
              rating={rating}
              title={Movie.title}
              genres={movieGenres}
              className="bg-mauvedark-3 border-mauvedarka-9 h-[281px] w-[183px] rounded-sm border p-4 sm:h-[355px] sm:w-[235px]"
            />
          </Link>
        );
      })}
    </>
  );
}
