import { type MovieData, type Movie } from "../../types";
import MovieCard from "./MovieCard";
import localStyles from "./moviedisplaytab.module.css";
import styles from "../../styles/shared.module.css";

interface MovieDisplayTabProps {
  loading: boolean;
  data: MovieData | null;
  error: string | null;
}

export default function MovieDisplayTab({
  loading,
  data,
  error,
}: MovieDisplayTabProps) {
  return (
    <div className={localStyles.movieDisplayTabContainer}>
      {loading ? (
        <div className={styles.p}>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        data &&
        data.results?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      )}
    </div>
  );
}
