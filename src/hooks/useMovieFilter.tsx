import { type UserData } from "../types";
import { useMemo } from "react";

interface useMovieFilterProps {
  userData: UserData;
  page: number;
}

export default function useMovieFilter({
  userData,
  page,
}: useMovieFilterProps) {
  const movieFilterBaseUrl = "https://api.themoviedb.org/3/discover/movie";
  const options = useMemo(
    () => ({
      headers: {
        accept: "application/json",
        authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    }),
    []
  );

  const url = useMemo(() => {
    const keyMap: { [key: string]: string } = {
      primary_release_date_gte: "primary_release_date.gte",
      primary_release_date_lte: "primary_release_date.lte",
      with_runtime_gte: "with_runtime.gte",
      with_runtime_lte: "with_runtime.lte",
    };

    const params = new URLSearchParams({
      page: page.toString(),
    });

    Object.entries(userData).forEach(([key, value]) => {
      if (value) {
        const paramKey = keyMap[key] || key;
        params.append(paramKey, value);
      }
    });

    return `${movieFilterBaseUrl}?${params.toString()}`;
  }, [userData, page]);

  return { url, options };
}
