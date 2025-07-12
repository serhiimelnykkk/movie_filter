export interface UserData {
  with_original_language: string | null;
  primary_release_date_gte: Date | null;
  primary_release_date_lte: Date | null;
}

export interface Movie {
  title: string;
  id: number;
  poster_path: string;
}

export interface MovieData {
  results: Movie[];
}
