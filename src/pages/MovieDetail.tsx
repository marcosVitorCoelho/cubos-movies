import { CircularProgress } from "@/components/CircularProgress";
import { useMovieDetails, useMovieVideo } from "@/hooks/useMovieHooks";
import { useParams } from "react-router";

export default function MovieDetail() {
  const { movieId } = useParams() as { movieId: string };

  const { data: movieDetail, isError } = useMovieDetails(movieId);
  const { data: movieVideoData, isError: isErrorMovieVideo } =
    useMovieVideo(movieId);

  if (isError || isErrorMovieVideo) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <h1 className="dark:text-mauve-1">Houve um erro ao buscar filme</h1>
      </div>
    );
  }

  const {
    backdrop_path,
    poster_path,
    vote_average,
    tagline,
    title,
    genres,
    overview,
    original_title,
    popularity,
    vote_count,
    release_date,
    revenue,
    runtime,
    budget,
    original_language,
  } = movieDetail;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "";
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
    : "";
  const rating = Math.round(vote_average * 10);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const movieTrailer = movieVideoData.results.filter(
    (video) => video.type === "Trailer",
  );
  const profit = revenue - budget;

  return (
    <div className="relative z-10 flex content-center items-center justify-center gap-2 rounded-sm p-4">
      <div className="bg-background relative min-h-screen overflow-hidden rounded-sm">
        {backdropUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        <div className="bg-mauvea-12 absolute inset-0" />

        <div className="relative z-10 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                {posterUrl && (
                  <img
                    src={posterUrl}
                    alt={title}
                    className="mx-auto w-full max-w-md rounded-sm shadow-2xl"
                  />
                )}
              </div>
              <div className="space-y-6 lg:col-span-2">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h1 className="text-mauve-1 mb-2 text-4xl font-bold lg:text-5xl">
                      {title}
                    </h1>
                    {original_title && original_title !== title && (
                      <p className="text-mauvedark-11 text-lg">
                        Título original: {original_title}
                      </p>
                    )}
                    {tagline && (
                      <p className="text-mauve-1 mt-2 font-light italic">
                        {tagline}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <CircularProgress
                      value={rating}
                      size={100}
                      strokeWidth={8}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                    <p className="text-mauvedark-11 text-sm">POPULARIDADE</p>
                    <p className="text-lg font-bold text-white">
                      {popularity.toFixed(0)}
                    </p>
                  </div>

                  <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                    <p className="text-mauvedark-11 text-sm">VOTOS</p>
                    <p className="text-lg font-bold text-white">{vote_count}</p>
                  </div>

                  <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                    <p className="text-mauvedark-11 text-sm">LANÇAMENTO</p>
                    <p className="text-lg font-bold text-white">
                      {formatDate(release_date)}
                    </p>
                  </div>

                  {runtime && (
                    <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                      <p className="text-mauvedark-11 text-sm">DURAÇÃO</p>
                      <p className="text-lg font-bold text-white">
                        {formatRuntime(runtime)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                    <p className="text-mauvedark-11 text-sm">SITUAÇÃO</p>
                    <p className="font-bold text-white">Lançado</p>
                  </div>

                  <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                    <p className="text-mauvedark-11 text-sm">IDIOMA</p>
                    <p className="font-bold text-white">
                      {original_language.toUpperCase()}
                    </p>
                  </div>

                  {budget && budget > 0 && (
                    <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                      <p className="text-mauvedark-11 text-sm">ORÇAMENTO</p>
                      <p className="font-bold text-white">
                        {formatCurrency(budget)}
                      </p>
                    </div>
                  )}

                  {revenue && revenue > 0 && (
                    <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                      <p className="text-mauvedark-11 text-sm">RECEITA</p>
                      <p className="font-bold text-white">
                        {formatCurrency(revenue)}
                      </p>
                    </div>
                  )}
                  {profit && profit > 0 && (
                    <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                      <p className="text-mauvedark-11 text-sm">LUCRO</p>
                      <p className="font-bold text-white">
                        {formatCurrency(profit)}
                      </p>
                    </div>
                  )}
                </div>
                <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                  <h2 className="mb-3 text-xl font-bold text-white">SINOPSE</h2>
                  <p className="leading-relaxed text-white/90">{overview}</p>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-bold text-white">Gêneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-purpledarka-3 text-mauve-1 rounded-sm p-3 text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-white">Trailers</h2>
              {movieTrailer.map((MovieTrailer) => (
                <div className="bg-mauvedarka-3 rounded-sm p-4 backdrop-blur-sm">
                  <div className="bg-mauvedarka-3 flex aspect-video items-center justify-center rounded-sm backdrop-blur-sm">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${MovieTrailer.key}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
