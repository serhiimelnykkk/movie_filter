import { useContext, useState, useMemo } from "react";
import {
  COUNTRIES_API_ENDPOINT,
  GENRES_API_ENDPOINT,
  LANGUAGES_API_ENDPOINT,
} from "../../api/tmdbConfig";
import UserDataContext from "../../contexts/UserDataContext";
import {
  type ChangeEventWithValue,
  type Country,
  type Genre,
  type GenreApiResponse,
  initialUserData,
  type Language,
  type UserData,
} from "../../types";
import styles from "../../styles/shared.module.css";
import localStyles from "./selector.module.css";
import Selector from "./Selector";
import Form from "../common/Form";

export default function MovieFilters() {
  const { userData, handleFilterUpdate, clearFilters } =
    useContext(UserDataContext);
  const [visible, setVisible] = useState(true);

  const handlers = useMemo(() => {
    const createFilterChangeHandler =
      (key: keyof UserData) => (e: ChangeEventWithValue) => {
        handleFilterUpdate({ [key]: e.target.value });
      };
    const filterKeys = Object.keys(initialUserData) as (keyof UserData)[];
    return Object.fromEntries(
      filterKeys.map((key) => {
        return [key, createFilterChangeHandler(key)];
      })
    );
  }, [handleFilterUpdate]);

  const toggleFiltersVisibility = () => {
    setVisible(!visible);
  };

  return (
    // TODOS
    // 1. Make CSS more DRY
    // 2. Make a button to fold filters menu for mobiles
    // 3. Add all filters

    <Form className={localStyles.form}>
      <div className={localStyles.flex}>
        <button
          onClick={toggleFiltersVisibility}
          className={styles.primaryElement}
        >
          Toggle Filters
        </button>
        <button
          onClick={clearFilters}
          className={styles.primaryElement}
          type="reset"
        >
          Clear
        </button>
      </div>
      <div
        className={`${!visible && localStyles.hidden}  ${
          localStyles.container
        }`}
      >
        <div className={styles.wrapper}>
          <p className={styles.p}>Selectors</p>
          <Selector<Genre, GenreApiResponse>
            sortCompareFn={(a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            }
            mapCallbackFn={(genre: Genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            )}
            name="genre"
            endpoint={GENRES_API_ENDPOINT}
            transformData={(data) => data.genres}
            onChange={handlers.with_genres}
            value={userData.with_genres}
          />
          <Selector<Country>
            sortCompareFn={(a, b) =>
              a.english_name
                .toLowerCase()
                .localeCompare(b.english_name.toLowerCase())
            }
            mapCallbackFn={(value: Country) => (
              <option key={value.iso_3166_1} value={value.iso_3166_1}>
                {value.english_name}
              </option>
            )}
            name="country"
            endpoint={COUNTRIES_API_ENDPOINT}
            onChange={handlers.with_origin_country}
            value={userData.with_origin_country}
          />
          <Selector<Language>
            sortCompareFn={(a, b) =>
              a.english_name
                .toLowerCase()
                .localeCompare(b.english_name.toLowerCase())
            }
            mapCallbackFn={(language: Language) => (
              <option key={language.iso_639_1} value={language.iso_639_1}>
                {language.english_name}
              </option>
            )}
            name="language"
            endpoint={LANGUAGES_API_ENDPOINT}
            onChange={handlers.with_original_language}
            value={userData.with_original_language}
          />
        </div>
        <div className={styles.wrapper}>
          <p className={styles.p}>Greater than date</p>
          <input
            className={styles.primaryElement}
            type="date"
            value={userData.primary_release_date_gte}
            onChange={handlers.primary_release_date_gte}
            max={userData.primary_release_date_lte}
          />
          <p className={styles.p}>Less than date</p>
          <input
            className={styles.primaryElement}
            type="date"
            value={userData.primary_release_date_lte}
            onChange={handlers.primary_release_date_lte}
            min={userData.primary_release_date_gte}
          />
        </div>
        <div className={styles.wrapper}>
          <p className={styles.p}>Greater than runtime</p>
          <input
            className={styles.primaryElement}
            type="number"
            value={userData.with_runtime_gte}
            onChange={handlers.with_runtime_gte}
            max={userData.with_runtime_lte}
            min={0}
            placeholder="Runtime lower border"
          />
          <p className={styles.p}>Less than runtime</p>
          <input
            className={styles.primaryElement}
            type="number"
            value={userData.with_runtime_lte}
            onChange={handlers.with_runtime_lte}
            min={userData.with_runtime_gte || 0}
            placeholder="Runtime higher border"
          />
        </div>
      </div>
    </Form>
  );
}
