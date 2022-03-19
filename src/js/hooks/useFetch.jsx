import React, { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetch with authorization header
        const result = await fetch(url, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
          },
          ...options,
        });
        const json = await result.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
