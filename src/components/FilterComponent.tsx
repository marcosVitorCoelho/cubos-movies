import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGenres } from "@/hooks/useMovieHooks";
import { useEffect, useCallback, useMemo } from "react";
import {
  useFiltersStore,
  type FilterValues,
  type FormattedFilters,
} from "@/stores/useFilterStore";

interface FiltersComponentProps {
  isPressed: boolean;
  onApplyFilters: (filters: FormattedFilters) => void;
  onClearFilters: () => void;
}

export default function FiltersComponent({
  isPressed,
  onApplyFilters,
  onClearFilters,
}: FiltersComponentProps) {
  const genresData = useGenres();
  const { filters, setFilters, clearFilters, getFormattedFilters } =
    useFiltersStore();

  const {
    control,
    handleSubmit,
    reset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { isDirty },
  } = useForm<FilterValues>({
    defaultValues: filters,
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const sortOptions = useMemo(
    () => [
      { value: "popularity.desc", label: "Mais Populares" },
      { value: "vote_average.desc", label: "Melhor Avaliados" },
      { value: "release_date.desc", label: "Mais Recentes" },
      { value: "revenue.desc", label: "Maior Bilheteria" },
    ],
    [],
  );

  const languages = useMemo(
    () => [
      { value: "pt", label: "Português" },
      { value: "en", label: "Inglês" },
      { value: "es", label: "Espanhol" },
      { value: "fr", label: "Francês" },
    ],
    [],
  );
  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const onSubmit = useCallback(
    (data: FilterValues) => {
      setFilters(data);
      onApplyFilters(getFormattedFilters());
    },
    [setFilters, getFormattedFilters, onApplyFilters],
  );

  const handleClearFilters = useCallback(() => {
    clearFilters();
    reset();
    onClearFilters();
  }, [clearFilters, reset, onClearFilters]);

  const {
    data: dataGenres,
    isError: isErrorGenres,
    isLoading,
    isPending,
  } = genresData;

  if (isErrorGenres) {
    return (
      <h1 className="dark:text-mauve-1">Houve um erro ao buscar gêneros</h1>
    );
  }

  if (isLoading || isPending) {
    return <h1 className="dark:text-mauve-1">Gêneros carregando</h1>;
  }

  if (!isPressed) return null;

  const { genres } = dataGenres;

  return (
    <div className="relative z-10">
      <div className="mx-auto w-full max-w-[584px] transform overflow-hidden px-4 opacity-100 transition-all duration-300 ease-out">
        <Card className="bg-mauvedark-2 border-mauvedark-9 mt-2 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-mauve-1 text-lg font-semibold">
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="genre"
                  className="text-mauve-1 text-sm font-medium"
                >
                  Gênero
                </Label>
                <Controller
                  name="genre"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="genre"
                        className="bg-mauvedark-3 border-mauvedark-9 text-mauve-1 focus:ring-purple-9"
                      >
                        <SelectValue placeholder="Todos os gêneros" />
                      </SelectTrigger>
                      <SelectContent className="bg-mauvedark-3 border-mauvedark-9">
                        {genres?.map((genre) => (
                          <SelectItem
                            key={genre.id}
                            value={String(genre.id)}
                            className="text-mauve-1 focus:bg-mauvedark-4"
                          >
                            {genre.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-mauve-1 text-sm font-medium"
                >
                  Ano de Lançamento
                </Label>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 2}
                      placeholder="Ex: 2024"
                      value={field.value}
                      onChange={field.onChange}
                      className="bg-mauvedark-3 border-mauvedark-9 text-mauve-1 placeholder:text-mauve-9 focus:ring-purple-9"
                    />
                  )}
                />
              </div>
              <div className="space-y-3">
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label className="text-mauve-1 text-sm font-medium">
                        Avaliação Mínima: {field.value[0]}/10
                      </Label>
                      <Slider
                        value={field.value}
                        onValueChange={field.onChange}
                        max={10}
                        min={0}
                        step={0.5}
                        className="bg-purple-9 text-mauve-1 w-full"
                      />
                    </>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="sortBy"
                  className="text-mauve-1 text-sm font-medium"
                >
                  Ordenar por
                </Label>
                <Controller
                  name="sortBy"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="sortBy"
                        className="bg-mauvedark-3 border-mauvedark-9 text-mauve-1 focus:ring-purple-9"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-mauvedark-3 border-mauvedark-9">
                        {sortOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-mauve-1 focus:bg-mauvedark-4"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="language"
                  className="text-mauve-1 text-sm font-medium"
                >
                  Idioma Original
                </Label>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="language"
                        className="bg-mauvedark-3 border-mauvedark-9 text-mauve-1 focus:ring-purple-9"
                      >
                        <SelectValue placeholder="Todos os idiomas" />
                      </SelectTrigger>
                      <SelectContent className="bg-mauvedark-3 border-mauvedark-9">
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                            className="text-mauve-1 focus:bg-mauvedark-4"
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-purpledark-9 hover:bg-purpledark-10 text-mauve-1 flex-1 transition-colors duration-200"
                >
                  Aplicar Filtros
                </Button>
                <Button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-purpledarka-2 hover:bg-purpledarka-3 text-mauve-1 flex-1 transition-colors duration-200"
                >
                  Limpar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
