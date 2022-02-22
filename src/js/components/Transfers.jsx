import React from "react";
import useFetch from "../hooks/useFetch";

export default function Transfers() {
  const { data, error, loading } = useFetch(`${window.API_BASE_URL}/transfers`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data.message}</p>;
}
