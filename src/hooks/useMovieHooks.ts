import type {
  MovieDetail,
  MovieFilters,
  MovieVideosResponse,
  TMDBResponse,
} from "@/interfaces/Movies.interface";
import { apiBase } from "@/services/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";

export const useDiscoverMovies = (
  filters: MovieFilters = {},
  page: number = 1,
) => {
  return useSuspenseQuery({
    queryKey: ["movies", "discover", filters, page],
    queryFn: async (): Promise<TMDBResponse> => {
      const response = await apiBase.get<AxiosResponse<TMDBResponse>>(
        "/discover/movie?language=pt-BR",
        {
          params: {
            page,
            ...filters,
          },
        },
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useSuspenseQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: async (): Promise<TMDBResponse> => {
      const response = await apiBase.get<AxiosResponse<TMDBResponse>>(
        "/search/movie?language=pt-BR",
        {
          params: {
            page,
            query,
          },
        },
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useMovieDetails = (movieId: string) => {
  return useSuspenseQuery({
    queryKey: ["movie", "details", movieId],
    queryFn: async () => {
      const response = await apiBase.get<AxiosResponse<MovieDetail>>(
        `/movie/${movieId}?language=pt-BR`,
      );
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useGenres = () => {
  return useSuspenseQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await apiBase.get<
        AxiosResponse<{
          genres: { id: number; name: string }[];
        }>
      >("/genre/movie/list?language=pt");
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useMovieVideo = (movieId: string) => {
  return useSuspenseQuery({
    queryKey: ["movieVideo", movieId],
    queryFn: async () => {
      const ptBrResponse = await apiBase.get<
        AxiosResponse<MovieVideosResponse>
      >(`/movie/${movieId}/videos?language=pt-BR`);
      if (ptBrResponse.data.results && ptBrResponse.data.results.length > 0) {
        return ptBrResponse.data;
      }
      const fallbackResponse = await apiBase.get<
        AxiosResponse<MovieVideosResponse>
      >(`/movie/${movieId}/videos`);

      return fallbackResponse.data;
    },
    staleTime: 24 * 60 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
