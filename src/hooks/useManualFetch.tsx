import { useRef, useState } from "react";

export default function useManualFetch<T>(
  url: string,
  options: object
): {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const fetchData = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setError(null);
    setData(null);
    setLoading(true);

    fetch(url, { ...options, signal: abortControllerRef.current.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => setLoading(false));
  };

  return { data, error, loading, fetchData };
}
