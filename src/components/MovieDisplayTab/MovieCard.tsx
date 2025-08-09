import { type Movie } from "../../types";
import styles from "./moviecard.module.css";
import { posterBaseUrl } from "../../api/tmdbConfig";
import { Link } from "react-router";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className={styles.container}>
        {movie.poster_path ? (
          <>
            <img
              className={styles.poster}
              src={`${posterBaseUrl}${movie.poster_path}`}
              alt=""
            />
            <p className={styles.p}>{movie.title}</p>
          </>
        ) : (
          <div>{movie.title} Poster Missing</div>
        )}
      </div>
    </Link>
  );
}
