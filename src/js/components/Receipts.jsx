import React from "react";
import useFetch from "../hooks/useFetch";

export default function Receipts() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/receipts?id=BUN01`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data.message}</p>;
}
