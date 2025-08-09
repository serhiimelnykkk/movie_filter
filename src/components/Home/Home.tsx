import { useState } from "react";

import { type MovieData, type UserData, initialUserData } from "../../types";

import useFetch from "../../hooks/useFetch";
import useMovieFilter from "../../hooks/useMovieFilter";

import MoviePagination from "../../components/MoviePagination/MoviePagination";
import MovieDisplayTab from "../../components/MovieDisplayTab/MovieDisplayTab";
import MovieFilters from "../../components/MovieFilters/MovieFilters";

import UserDataContext from "../../contexts/UserDataContext";

import styles from "../../app.module.css";

export default function Home() {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const [page, setPage] = useState<number>(1);

  const { url, options } = useMovieFilter({ userData, page });
  const {
    data: movieData,
    loading,
    error,
  } = useFetch<MovieData>({
    url,
    options,
  });

  const handleFilterUpdate = (filter: Partial<UserData>) => {
    setPage(1);
    setUserData((prevData) => ({
      ...prevData,
      ...filter,
    }));
  };

  const clearFilters = () => {
    setPage(1);
    setUserData(initialUserData);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuBarContainer}>
          <UserDataContext
            value={{ userData, handleFilterUpdate, clearFilters }}
          >
            <MovieFilters />
          </UserDataContext>
        </div>
        <div className={styles.paginationContainer}></div>
        <MovieDisplayTab loading={loading} data={movieData} error={error} />
      </div>
      <MoviePagination page={page} onSetPage={setPage} movieData={movieData} />
    </>
  );
}
