import { type MovieData } from "../../types";
import styles from "../../styles/shared.module.css";
import localStyles from "./moviepagination.module.css";

interface MenuBarProps {
  page: number;
  onSetPage: React.Dispatch<React.SetStateAction<number>>;
  movieData: MovieData | null;
}

export default function MoviePagination({
  page,
  onSetPage,
  movieData,
}: MenuBarProps) {
  const handleNextPageButtonClick = () => {
    if (movieData && page < movieData.total_pages) {
      onSetPage(() => page + 1);
    }
  };

  const handlePreviousPageButtonClick = () => {
    if (page > 1) {
      onSetPage(() => page - 1);
    }
  };

  return (
    <div className={localStyles.wrapper}>
      <button
        className={styles.primaryElement}
        onClick={handlePreviousPageButtonClick}
      >
        {"<"}
      </button>
      <button
        className={styles.primaryElement}
        onClick={handleNextPageButtonClick}
      >
        {">"}
      </button>
    </div>
  );
}
