import { useEffect, useState } from "react";

interface useFetchProps {
  url: string;
  options: object;
}

export default function useFetch<T>({ url, options }: useFetchProps): {
  data: T | null;
  error: string | null;
  loading: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setError(null);
    setData(null);
    const abortController = new AbortController();
    fetch(url, { ...options, signal: abortController.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    console.log(url);

    return () => abortController.abort();
  }, [url, options]);

  return { data, error, loading };
}
