import { useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "../../styles/shared.module.css";

import {
  type ChangeEventWithValue,
  type UserData,
  type Endpoint,
} from "../../types";

interface SelectorProps<T, U> {
  sortCompareFn: ((a: T, b: T) => number) | undefined;
  mapCallbackFn: (value: T, index: number, array: T[]) => React.ReactNode;
  name: string;
  endpoint: Endpoint;
  onChange: (e: ChangeEventWithValue) => void;
  transformData?: (data: U) => T[];
  value: UserData[keyof UserData];
}

export default function Selector<T, U = T[]>({
  sortCompareFn,
  mapCallbackFn,
  endpoint,
  name,
  transformData,
  onChange,
  value,
}: SelectorProps<T, U>) {
  const { data, loading, error } = useFetch<U>(endpoint);

  const itemsToRender = useMemo(() => {
    if (!data) return [] as T[];
    if (transformData) return transformData(data);
    return data as T[];
  }, [data, transformData]);
  return (
    <select value={value} onChange={onChange} className={styles.primaryElement}>
      <option value="" disabled hidden>
        Select {name}
      </option>
      <option value="">Any</option>
      {!loading && error ? (
        <option value="en-US">Error fetching data: {error}</option>
      ) : (
        itemsToRender.sort(sortCompareFn).map(mapCallbackFn)
      )}
    </select>
  );
}
