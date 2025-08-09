import { useParams, Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import {
  MOVIE_API_ENDPOINT,
  posterBaseUrl,
  videoBaseUrl,
} from "../../api/tmdbConfig";
import { type MovieDetails, type Video } from "../../types";
import localStyles from "./moviedetails.module.css";
import { minutesToHoursAndMinutes } from "../../utils";
import { useEffect } from "react";
import styles from "../../styles/shared.module.css";

export default function MovieDetails() {
  const params = useParams();

  const finalMovieEndpoint = {
    ...MOVIE_API_ENDPOINT,
    url: `${MOVIE_API_ENDPOINT.url}${params.id}`,
  };

  const {
    data: movieData,
    loading: movieLoading,
    error: movieError,
  } = useFetch<MovieDetails>(finalMovieEndpoint);

  const videoEndpoint = {
    ...MOVIE_API_ENDPOINT,
    url: `${finalMovieEndpoint.url}/videos`,
  };

  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
  } = useFetch<Video>(videoEndpoint);

  const trailer = videoData?.results?.find(
    (element) => element.type === "Trailer"
  );

  const videoUrl = `${videoBaseUrl}${
    trailer ? trailer.key : videoData?.results[0]?.key
  }`;

  const body = window.document.body;

  useEffect(() => {
    body.style.backgroundImage = `url("${posterBaseUrl}${movieData?.backdrop_path}")`;
    body.className = localStyles.body;

    return () => {
      body.style.backgroundImage = "";
      body.className = "";
    };
  }, [movieData, body]);

  return (
    <>
      {movieLoading ? (
        <>loading...</>
      ) : movieError ? (
        <>{movieError}</>
      ) : (
        movieData && (
          <>
            <div className={localStyles.header}>
              <Link to="/">
                <button className={styles.primaryElement}>Home</button>
              </Link>
            </div>
            <div className={localStyles.container}>
              <h1 className={localStyles.title}>{movieData.title}</h1>
              <div>
                <span className={localStyles.undertitle}>
                  {new Date(movieData.release_date).getFullYear()}
                  {" - "}
                  {`${minutesToHoursAndMinutes(movieData.runtime).hours}h ${
                    minutesToHoursAndMinutes(movieData.runtime).minutes
                  }m`}
                </span>
              </div>
              <div className={localStyles.mediaContainer}>
                <img
                  className={localStyles.poster}
                  src={`${posterBaseUrl}${movieData.poster_path}`}
                  alt=""
                />
                {videoLoading ? (
                  <>Loading...</>
                ) : videoError ? (
                  <>Error: {videoError.toString()}</>
                ) : (
                  videoData && (
                    <iframe
                      className={localStyles.video}
                      src={videoUrl}
                    ></iframe>
                  )
                )}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
