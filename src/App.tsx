import { useMemo, useState } from "react";

import useManualFetch from "./hooks/useManualFetch";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

import { type Movie, type MovieData, type UserData } from "./types";

export default function App() {
  const [userData, setUserData] = useState<UserData>({
    with_original_language: null,
    primary_release_date_gte: null,
    primary_release_date_lte: null,
  });

  const posterBaseUrl = "http://image.tmdb.org/t/p/w92";

  const baseUrl = "https://api.themoviedb.org/3/discover/movie";
  const options = useMemo(
    () => ({
      headers: {
        accept: "application/json",
        authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    }),
    []
  );

  const params = new URLSearchParams({
    with_original_language: userData.with_original_language || "",
    "primary_release_date.gte":
      userData.primary_release_date_gte?.toLocaleDateString("en-CA") || "",
    "primary_release_date.lte":
      userData.primary_release_date_lte?.toLocaleDateString("en-CA") || "",
  });
  const url = `${baseUrl}?${params.toString()}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevData) => ({
      ...prevData,
      with_original_language: e.target.value,
    }));
  };

  const handleDatePickerChangeGte = (date: Date | null) => {
    if (date) {
      setUserData((prevData) => ({
        ...prevData,
        primary_release_date_gte: date,
      }));
    }
  };

  const handleDatePickerChangeLte = (date: Date | null) => {
    if (date) {
      setUserData((prevData) => ({
        ...prevData,
        primary_release_date_lte: date,
      }));
    }
  };

  const { data, fetchData, loading } = useManualFetch<MovieData>(url, options);

  return (
    <>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="with_original_language"
      />
      <p>gte</p>
      <DatePicker
        selected={userData.primary_release_date_gte}
        onChange={handleDatePickerChangeGte}
      />
      <p>lte</p>
      <DatePicker
        selected={userData.primary_release_date_lte}
        onChange={handleDatePickerChangeLte}
      />
      <button onClick={fetchData}>Search</button>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data &&
          data.results.map((movie: Movie) => (
            <div key={movie.id}>
              <p>{movie.title}</p>
              <img src={`${posterBaseUrl}${movie.poster_path}`} alt="" />
            </div>
          ))
        )}
      </div>
    </>
  );
}
