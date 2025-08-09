export interface UserData {
  with_original_language: string;
  primary_release_date_gte: string;
  primary_release_date_lte: string;
  with_origin_country: string;
  with_genres: string;
  with_runtime_gte: string;
  with_runtime_lte: string;
}

export const initialUserData: UserData = {
  with_original_language: "",
  primary_release_date_gte: "",
  primary_release_date_lte: "",
  with_origin_country: "",
  with_genres: "",
  with_runtime_gte: "",
  with_runtime_lte: "",
};

export interface Movie {
  title: string;
  id: number;
  poster_path: string;
}

export interface MovieData {
  results: Movie[];
  total_pages: number;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreApiResponse {
  genres: Genre[];
}

export interface Endpoint {
  url: string;
  options: object;
}

export type ChangeEventWithValue = React.ChangeEvent<{ value: string }>;

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Video {
  id: number;
  results: VideoResults[];
}

interface VideoResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
