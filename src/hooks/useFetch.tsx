import { useEffect, useState } from "react";

export default function useFetch<T>(
  url: string,
  options: object
): [T | null, string | null, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(null);
    setData(null);
    setLoading(true);
    const abortController = new AbortController();
    fetch(url, { ...options, signal: abortController.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      });
    setLoading(false);

    return () => abortController.abort();
  }, [url, options]);

  return [data, error, loading];
}
